import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entity/users.entity';
import { CreateUserDto } from './dto/create.users.dto';
import { IUserResponse } from './interfaces/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<IUserResponse> {
    const existingUser = await this.findOne(createUserDto.email);

    if (existingUser) {
      throw new ConflictException({
        statusCode: 409,
        message: 'User with this email already exists',
      });
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(newUser);
    const { password: _, ...userWithoutPassword } = savedUser;
    return userWithoutPassword;
  }

  async findOne(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email } });
  }
}
