import {
  BadRequestException,
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
import { UpdateAvatarDto } from './dto/update-avatar.dto';
import { memoryStorage } from 'multer';

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

  @Put('avatar')
  @UseInterceptors(FileInterceptor('avatar', {
    storage: memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB
    },
  }))
  async updateAvatar(
    @User() user: IUserNoPassWord,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Vui lòng chọn file ảnh');
    }

    const updatedUser = await this.userService.updateAvatar(user.email, file);
    return {
      statusCode: 200,
      message: 'Cập nhật avatar thành công',
      data: {
        avatarUrl: updatedUser.avatar,
      },
    };
  }
}
