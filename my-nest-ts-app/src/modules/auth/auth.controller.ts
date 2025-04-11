import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import {
  PublicRouter,
  User,
} from 'src/common/decorators/public-router.decorator';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';
import { Request as RequestCookie } from 'supertest';
import { AuthService } from './ auth.service';
import { IUserNoPassWord } from '../Users/interfaces/user.interface';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

  @Post('login')
  @PublicRouter()
  @UseGuards(LocalAuthGuard)
  async login(
    @User() user: IUserNoPassWord,
    @Res({ passthrough: true }) response: Response,
  ) {
    try {
      this.logger.log(`Login attempt for user: ${user.email}`);
      const result = await this.authService.login(user, response);
      this.logger.log(`Login successful for user: ${user.email}`);
      return result;
    } catch (error) {
      this.logger.error(`Login failed for user: ${user.email}`, error.stack);
      throw error;
    }
  }

  @PublicRouter()
  @Get('refresh-token')
  async refreshToken(@Req() request: RequestCookie) {
    try {
      const refreshToken = request.cookies['c_user'];
      if (!refreshToken) {
        throw new Error('No refresh token found');
      }
      return await this.authService.handleRefreshToken(refreshToken);
    } catch (error) {
      this.logger.error('Refresh token failed', error.stack);
      throw error;
    }
  }

  @Get('logout')
  async logOut(
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ message: string }> {
    return await this.authService.handleLogout(response);
  }
}
