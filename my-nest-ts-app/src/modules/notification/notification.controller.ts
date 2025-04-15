import { Controller, Get, Post, Req, Param, ParseIntPipe } from '@nestjs/common';
import { NotificationService } from './notification.service';


@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

//   @Get()
//   async getNotifications(@Req() req): Promise<Notification[]> {
//     const userId = req.user.id;
//     return this.notificationService.getUserNotifications(userId);
//   }

//   @Post(':id/read')
//   async markAsRead(@Req() req, @Param('id', ParseIntPipe) notificationId: number): Promise<void> {
//     const userId = req.user.id;
//     await this.notificationService.markNotificationAsRead(notificationId, userId);
//   }
}