import { Module } from '@nestjs/common';
import { UsersControllerModule } from '../Users/users.module';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { DatabaseModule } from 'src/db/database.module';
import { notificationProviders } from './providers/orderProviders';
@Module({
  imports: [ DatabaseModule, UsersControllerModule,UsersControllerModule],
  controllers: [NotificationController],
  providers: [NotificationService ,...notificationProviders],
  exports: [NotificationService,],
})
export class NotificationModule {}