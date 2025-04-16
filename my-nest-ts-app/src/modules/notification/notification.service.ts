import { BadRequestException, ConflictException, Inject, Injectable } from '@nestjs/common';
import { UserService } from '../Users/users.service';
import { Repository } from 'typeorm';
import { Notification } from './entity/notification.entity';
import { Order } from '../order/entity/order.entity';

@Injectable()
export class NotificationService {
  constructor(
    private userService: UserService,
    @Inject('NOTIFICATION_REPOSITORY')
    private notificationRepository: Repository<Notification>,
  ) {}

  async createAdminNotification(
    order: Order,
    type: 'new_order' | 'status_updated' | 'payment_success' | 'general',
    options: { message: string },
  ): Promise<void> {
    try {
      const admin = await this.userService.findOneAdmin();
      if (!admin) {
        throw new Error('Admin user cannot be null');
      }
  
      const notifications = this.notificationRepository.create({
        order,
        user: admin,
        message: options.message,
        status: 'Unread',
        type,
      });
  
        await this.notificationRepository.save(notifications);
     
      return;
    } catch (error) {
      console.error('err', error);
      throw error;
    }
  }
  

    async getUserNotifications(userId: number): Promise<Notification[]> {
      return this.notificationRepository.find({
        where: { user: { id: userId } },
        relations: ['order'],
        order: { created_at: 'DESC' },
      });
    }

    async markNotificationAsRead(notificationId: number, userId: number): Promise<string> {
      try {
        const notification = await this.notificationRepository.findOne({
          where: { id: notificationId, user: { id: userId } },
        });
        if (!notification) {
          throw new BadRequestException('Notification not found or you do not have access');
        }
        if (notification.status === 'Read') {
          throw new ConflictException('Notification has already been marked as read');
        }
        notification.status = 'Read';
        await this.notificationRepository.save(notification);
    
        return 'Notification marked as read successfully';
      } catch (error) {
        console.error('Error marking notification as read:', error);
        throw error;
      }
    }

    async deleteNotificationIfRead(notificationId: number, userId: number): Promise<string> {
      try {
        const notification = await this.notificationRepository.findOne({
          where: { id: notificationId, user: { id: userId } },
        });
        if (!notification) {
          throw new BadRequestException('Notification not found or you do not have access');
        }
        if (notification.status !== 'Read') {
          throw new BadRequestException('You can only delete notifications that have been read');
        }
        await this.notificationRepository.remove(notification);
        return 'Notification deleted successfully';
      } catch (error) {
        console.error('Error deleting notification:', error);
        throw error;
      }
    }
    
    
    
}
