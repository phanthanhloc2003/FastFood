import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersControllerModule } from './modules/Users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersControllerModule,
  ],
})
export class AppModule {}
