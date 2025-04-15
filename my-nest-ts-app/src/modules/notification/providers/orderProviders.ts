import { Notification } from "../entity/notification.entity";
export const notificationProviders = [
 
  {
    provide: 'NOTIFICATION_REPOSITORY',
    useFactory: (dataSource: { getRepository: (arg0: typeof Notification) => any; }) => dataSource.getRepository(Notification),
    inject: ['DATA_SOURCE'],
  }
]; 