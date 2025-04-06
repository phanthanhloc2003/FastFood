import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create.users.dto';
import { IUserNoPassWord } from './interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import { User } from './entity/users.entity';
import { CloudinaryService } from '../../common/cloudinary/cloudinary.service'; // Import CloudinaryService

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    private cloudinaryService: CloudinaryService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<IUserNoPassWord> {
    const existingUser = await this.findOne(createUserDto.email);

    if (existingUser) {
      throw new ConflictException({
        statusCode: 409,
        message: 'Nguời dùng này đã được tồn tại ',
      });
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(newUser);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = savedUser;
    return userWithoutPassword;
  }

  async findOne(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async updateAvatar(email: string, file: Express.Multer.File): Promise<User> {
    // Upload ảnh lên Cloudinary
    let uploadResult;
    try {
      uploadResult = await this.cloudinaryService.uploadImage(file);
    } catch (error) {
      throw new Error('Error uploading avatar to Cloudinary');
    }

    const userOne = await this.findOne(email);
    if (!userOne) {
      throw new Error('User not found');
    }

    // Cập nhật avatar URL
    userOne.avatar = uploadResult.secure_url;
    return this.userRepository.save(userOne);
  }
}
