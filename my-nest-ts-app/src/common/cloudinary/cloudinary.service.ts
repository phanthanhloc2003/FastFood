// src/common/cloudinary/cloudinary.service.ts
import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  async uploadImage(file: Express.Multer.File) {
    try {
      return await cloudinary.uploader.upload(file.path, {
        folder: 'avatars', // Có thể thay đổi tên folder theo nhu cầu
        resource_type: 'image',
      });
    } catch (error) {
      throw new Error('Cloudinary upload failed');
    }
  }
}
