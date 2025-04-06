import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary'; // Import cloudinary
import { UsersControllerModule } from './modules/Users/users.module';
import { AuthControllerModule } from './modules/auth/auth.module';
import { configureCloudinary } from './common/cloudinary/cloudinary.config';
import { CloudinaryModule } from './common/cloudinary/cloudinary.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    CloudinaryModule,
    UsersControllerModule,
    AuthControllerModule,
  ],
})
export class AppModule {}
