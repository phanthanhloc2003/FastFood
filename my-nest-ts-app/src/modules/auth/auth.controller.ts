import { Controller, Post, UseGuards } from '@nestjs/common';

import { AuthService } from './ auth.service';
import {
  PublicRouter,
  User,
} from 'src/common/decorators/public-router.decorator';
import { IUserNoPassWord } from '../Users/interfaces/user.interface';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @PublicRouter()
  @Post('login')
  login(@User() user: IUserNoPassWord) {
    return this.authService.login(user);
  }
}
