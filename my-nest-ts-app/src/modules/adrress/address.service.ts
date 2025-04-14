import {
  Injectable,
  NotFoundException,
  Inject,
  BadRequestException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dto/create-address.dto';
import { UserService } from '../Users/users.service';
import { Address } from './entity/address.entity';

@Injectable()
export class AddressService {
  constructor(
    private userService: UserService,
    @Inject('ADDRESS_REPOSITORY')
    private addressRepository: Repository<Address>,
  ) {}

  async create(email: string, body: CreateAddressDto) {
    try {
      const user = await this.userService.findOne(email);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      if (body.is_default) {
        await this.addressRepository.update(
          { user: { id: user.id }, is_default: true },
          { is_default: false },
        );
      }
      const address = this.addressRepository.create({
        ...body,
        user,
      });
      return this.addressRepository.save(address);
    } catch (error) {
      console.error('Create address error:', error);
      throw error;
    }
  }
  async findAll(email: string) {
    try {
      const user = await this.userService.findOne(email);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      return this.addressRepository.find({
        where: { user: { id: user.id } },
        order: { is_default: 'DESC', created_at: 'DESC' },
      });
    } catch (error) {
      console.error('Find all addresses error:', error);
      throw error;
    }
  }

  async findOne(email: string, id: number) {
    try {
      const user = await this.userService.findOne(email);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const address = await this.addressRepository.findOne({
        where: { id, user: { id: user.id } },
        relations: ['user'],
      });
      if (!address) {
        throw new NotFoundException('Address not found');
      }
      return address;
    } catch (error) {
      console.error('Find one address error:', error);
      throw error;
    }
  }

  async update(email: string, id: number, body: CreateAddressDto) {
    try {
      const address = await this.findOne(email, id);
      if (body.is_default && !address.is_default) {
        await this.addressRepository.update(
          { user: { id: address.user.id }, is_default: true },
          { is_default: false },
        );
      }
      Object.assign(address, body);
      await this.addressRepository.save(address);
      return {
        message: 'Cập nhật địa chỉ thành công',
      };
    } catch (error) {
      console.error('Update address error:', error);
      throw error;
    }
  }

  async remove(email: string, id: number) {
    try {
      const address = await this.findOne(email, id);
      if (address.is_default) {
        throw new BadRequestException('Không thể xóa địa chỉ mặc định');
      }
      await this.addressRepository.remove(address);
      return { message: 'Xóa địa chỉ thành công' };
    } catch (error) {
      console.error('Remove address error:', error);
      throw error;
    }
  }

  async setDefault(email: string, id: number) {
    try {
      const address = await this.findOne(email, id);
      await this.addressRepository.update(
        { user: { id: address.user.id }, is_default: true },
        { is_default: false },
      );
      address.is_default = true;
      await this.addressRepository.save(address);
      return {
        message: 'Đặt địa chỉ mặc định thành công',
      };
    } catch (error) {
      console.error('Set default address error:', error);
      throw error;
    }
  }
}
