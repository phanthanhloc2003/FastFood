import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create.users.dto';
import { UserService } from './users.service';
import { IUserNoPassWord } from './interfaces/user.interface';
import {
  PublicRouter,
  User,
} from 'src/common/decorators/public-router.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @PublicRouter()
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<IUserNoPassWord> {
    return this.userService.create(createUserDto);
  }

  @Get('detail-user')
  async detailUser(
    @User() user: IUserNoPassWord,
  ): Promise<IUserNoPassWord | null> {
    const isUser = await this.userService.findOne(user.email);
    if (!isUser) return null;
    const { password: _, ...userWithoutPassword } = isUser;
    return userWithoutPassword;
  }

  @Put('user/avatar')
  @UseInterceptors(FileInterceptor('file'))
  async updateAvatar(
    @User() user: IUserNoPassWord,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const updatedUser = await this.userService.updateAvatar(user.email, file);
    return {
      message: 'Avatar updated successfully',
      avatarUrl: updatedUser.avatar,
    };
  }
}
