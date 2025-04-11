import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary'; // Import cloudinary
import { UsersControllerModule } from './modules/Users/users.module';
import { AuthControllerModule } from './modules/auth/auth.module';
import { configureCloudinary } from './common/cloudinary/cloudinary.config';
import { CloudinaryModule } from './common/cloudinary/cloudinary.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { RolesGuard } from './common/guards/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    CloudinaryModule,
    UsersControllerModule,
    AuthControllerModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
