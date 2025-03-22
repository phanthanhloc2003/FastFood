import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { DatabaseModule } from 'src/db/database.module';
import { usersProviders } from './providers/users.providers';

@Module({
  imports: [DatabaseModule],

  controllers: [UserController],
  providers: [...usersProviders, UserService],
})
export class UsersControllerModule {}
