import { HttpException, HttpStatus, Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { UserService } from '../Users/users.service';
import * as bcrypt from 'bcrypt';
import { IUserNoPassWord } from '../Users/interfaces/user.interface';
import { JwtService } from '@nestjs/jwt';
import { User } from '../Users/entity/users.entity';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private userService: UserService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<IUserNoPassWord> {
    try {
      this.logger.log(`Validating user: ${email}`);
      const findUser: User | null = await this.userService.findOne(email);
      
      if (!findUser) {
        this.logger.warn(`User not found: ${email}`);
        throw new HttpException(
          'Email or password is incorrect',
          HttpStatus.BAD_REQUEST,
        );
      }

      const isPasswordValid = await bcrypt.compare(pass, findUser.password);
      if (!isPasswordValid) {
        this.logger.warn(`Invalid password for user: ${email}`);
        throw new HttpException(
          'Email or password is incorrect',
          HttpStatus.BAD_REQUEST,
        );
      }

      const { password: _, ...userNoPassWord } = findUser;
      this.logger.log(`User validated successfully: ${email}`);
      return userNoPassWord;
    } catch (error) {
      this.logger.error(`Validation failed for user: ${email}`, error.stack);
      throw error;
    }
  }

  login(user: IUserNoPassWord, response: Response) {
    try {
      this.logger.log(`Generating tokens for user: ${user.email}`);
      const refreshToken = this.createRefreshToken(user);
      
      response.cookie('c_user', refreshToken, {
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'none',   
        path: '/',
      });

      const payload = {
        id: user.id,
        email: user.email,
        name: user.fullName,
        role: user.role
      };

      const accessToken = this.jwtService.sign(payload);
      
      this.logger.log(`Tokens generated successfully for user: ${user.email}`);
      return {
        access_token: accessToken,
        user: user,
      };
    } catch (error) {
      this.logger.error(`Token generation failed for user: ${user.email}`, error.stack);
      throw error;
    }
  }

  async handleRefreshToken(refreshToken: string) {
    try {
      this.logger.log('Processing refresh token');
      if (!refreshToken) {
        throw new UnauthorizedException('No refresh token provided');
      }

      const payload = await this.jwtService.verifyAsync<
        IUserNoPassWord & { exp: number; iat: number }
      >(refreshToken, {
        secret: this.configService.get<string>('KEY_REFRESH_TOKEN'),
      });

      const user = await this.userService.findOne(payload.email);
      if (!user) {
        this.logger.warn(`User not found for refresh token: ${payload.email}`);
        throw new UnauthorizedException();
      }

      const newPayload = {
        id: user.id,
        email: user.email,
        name: user.fullName,
        role: user.role
      };

      this.logger.log(`Refresh token processed successfully for user: ${user.email}`);
      return {
        accessToken: this.jwtService.sign(newPayload),
      };
    } catch (error) {
      this.logger.error('Refresh token processing failed', error.stack);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  createRefreshToken(payload: IUserNoPassWord, time?: number) {
    try {
      return this.jwtService.sign(payload, {
        secret: this.configService.get<string>('KEY_REFRESH_TOKEN'),
        expiresIn: time ? `${time}s` : '24h'
      });
    } catch (error) {
      this.logger.error('Failed to create refresh token', error.stack);
      throw error;
    }
  }


  async handleLogout(response: Response): Promise<{ message: string }> {
    response.clearCookie('c_user');

    return { message: 'Logged out successfully' };
  }
}
