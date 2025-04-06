import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './ auth.service';
import { PassportModule } from '@nestjs/passport';
import { UsersControllerModule } from '../Users/users.module';
import { LocalStrategy } from 'src/common/strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from 'src/common/strategy/jwt.strategy';

@Module({
  imports: [
    UsersControllerModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('ACCESS_TOKEN_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('ACCESS_TOKEN_EXPIRES_IN'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthControllerModule {}
