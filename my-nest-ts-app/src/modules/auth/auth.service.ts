import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../Users/users.service';
import * as bcrypt from 'bcrypt';
import { IUserNoPassWord } from '../Users/interfaces/user.interface';
import { JwtService } from '@nestjs/jwt';
import { User } from '../Users/entity/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<IUserNoPassWord> {
    try {
      const findUser = await this.userService.findOne(email);
      if (!findUser) {
        throw new HttpException(
          'Email hoặc mật khẩu không chính xác',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const isPasswordValid = await bcrypt.compare(pass, findUser.password);
      if (!isPasswordValid) {
        throw new HttpException(
          'Email hoặc mật khẩu không chính xác',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const { password: _, ...userNoPassWord } = findUser;
      return userNoPassWord;
    } catch (e) {
      throw e;
    }
  }

  login(user: IUserNoPassWord) {
    const payload = {
      id: user.id,
      email: user.email,
      name: user.fullName,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: user,
    };
  }
} 