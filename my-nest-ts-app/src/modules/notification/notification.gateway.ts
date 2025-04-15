// import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
// import { Server } from 'socket.io';
import { Notification } from './entity/notification.entity';

// @WebSocketGateway({ cors: true })
// export class NotificationGateway {
//   @WebSocketServer()
//   server: Server;

//   sendNotificationToUser(userId: number, notifications: Notification) {
//     this.server.to(`user_${userId}`).emit('new_notification', notifications);
//   }

//   @SubscribeMessage('register')
//   handleRegister(@MessageBody() userId: number) {
//     this.server.socketsJoin(`user_${userId}`);
//   }
// }