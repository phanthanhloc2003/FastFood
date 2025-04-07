import { ConflictException, Inject, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
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

  async updateAvatar(email: string, file: Express.Multer.File): Promise<IUserNoPassWord> {
    if (!file) {
      throw new BadRequestException('Không có file được tải lên');
    }
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('Định dạng file không hợp lệ. Chỉ chấp nhận JPG, PNG hoặc GIF');
    }
    const maxSize = 5 * 1024 * 1024; 
    if (file.size > maxSize) {
      throw new BadRequestException('Kích thước file quá lớn. Tối đa 5MB');
    }

    const user = await this.findOne(email);
    if (!user) {
      throw new NotFoundException('Không tìm thấy người dùng');
    }

    try {
      
      if (user.avatar) {
        const publicId = user.avatar.split('/').pop()?.split('.')[0];
        if (publicId) {
          await this.cloudinaryService.deleteImage(publicId);
        }
      }
      const uploadResult = await this.cloudinaryService.uploadImage(file);
      user.avatar = uploadResult.secure_url;
      const updatedUser = await this.userRepository.save(user);
    
      const { password: _, ...userWithoutPassword } = updatedUser;
      return userWithoutPassword;
    } catch (error) {
      throw new BadRequestException('Lỗi khi cập nhật avatar: ' + error.message);
    }
  }
}
