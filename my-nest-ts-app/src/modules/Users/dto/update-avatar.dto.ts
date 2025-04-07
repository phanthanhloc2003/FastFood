import { IsNotEmpty } from 'class-validator';

export class UpdateAvatarDto {
  @IsNotEmpty()
  avatar: Express.Multer.File;
}  