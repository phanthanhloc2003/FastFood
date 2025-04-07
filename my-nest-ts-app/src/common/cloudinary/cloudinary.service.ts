// src/common/cloudinary/cloudinary.service.ts
import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  async uploadImage(file: Express.Multer.File) {
    try {
      return await cloudinary.uploader.upload(`data:${file.mimetype};base64,${file.buffer.toString('base64')}`, {
        folder: 'avatars',
        resource_type: 'image',
      });
    } catch (error) {
      throw new Error('Cloudinary upload failed: ' + error.message);
    }
  }

  async deleteImage(publicId: string) {
    try {
      return await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      throw new Error('Cloudinary delete failed: ' + error.message);
    }
  }
}
