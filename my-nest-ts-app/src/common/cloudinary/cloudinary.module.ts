// src/common/cloudinary/cloudinary.module.ts
import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { ConfigService } from '@nestjs/config';
import { configureCloudinary } from './cloudinary.config';

@Module({
  providers: [
    {
      provide: 'CLOUDINARY',
      useFactory: (configService: ConfigService) => {
        configureCloudinary(configService);
        return CloudinaryService;
      },
      inject: [ConfigService],
    },
    CloudinaryService, 
  ],
  exports: [CloudinaryService], 
})
export class CloudinaryModule {}
