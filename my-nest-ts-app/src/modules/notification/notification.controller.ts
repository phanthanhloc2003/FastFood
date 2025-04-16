import {
  Controller,
  Get,
  Post,
  Req,
  Param,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { User } from 'src/common/decorators/public-router.decorator';
import { IUserNoPassWord } from '../Users/interfaces/user.interface';
import { Notification } from './entity/notification.entity';
import { Role } from 'src/common/enum/role.enum';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}
  @Roles(Role.Admin)
  @Get()
  async getNotifications(
    @User() user: IUserNoPassWord,
  ): Promise<Notification[]> {
    return this.notificationService.getUserNotifications(user.id);
  }

    @Post(':id/read')
    @Roles(Role.Admin)
    async markAsRead(@User() user:IUserNoPassWord, @Param('id', ParseIntPipe) notificationId: number): Promise<void> {
      await this.notificationService.markNotificationAsRead(notificationId, user.id);
    }


    @Delete(':id')
    @Roles(Role.Admin)
    async delete(@User() user:IUserNoPassWord, @Param('id', ParseIntPipe) notificationId: number): Promise<void> {
      await this.notificationService.deleteNotificationIfRead(notificationId, user.id);
    }
}
