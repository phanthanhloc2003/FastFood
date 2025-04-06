import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { DatabaseModule } from 'src/db/database.module';
import { usersProviders } from './providers/users.providers';
import { CloudinaryModule } from 'src/common/cloudinary/cloudinary.module';

@Module({
  imports: [DatabaseModule,CloudinaryModule],

  controllers: [UserController],
  providers: [...usersProviders, UserService],
  exports: [UserService],
})
export class UsersControllerModule {}
