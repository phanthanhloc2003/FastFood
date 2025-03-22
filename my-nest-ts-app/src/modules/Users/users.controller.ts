import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create.users.dto';
import { UserService } from './users.service';
import { IUserResponse } from './interfaces/user.interface';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<IUserResponse> {
    return this.userService.create(createUserDto);
  }
}
