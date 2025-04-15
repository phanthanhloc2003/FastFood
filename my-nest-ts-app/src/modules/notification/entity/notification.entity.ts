import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from 'src/modules/Users/entity/users.entity';
import { Order } from 'src/modules/order/entity/order.entity';

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.notifications, { onDelete: 'CASCADE' })
  order: Order;
  
  @ManyToOne(() => User, (user) => user.notifications, { nullable: true, onDelete: 'SET NULL' })
  user: User;

  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'varchar', length: 50, default: 'Unread' })
  status: 'Unread' | 'Read';

  @Column({ type: 'varchar', length: 50, default: 'general', nullable: false })
  type: string;

  @CreateDateColumn()
  created_at: Date;
}