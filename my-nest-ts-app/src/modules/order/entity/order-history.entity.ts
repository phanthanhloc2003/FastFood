import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { Order } from './order.entity';
import { User } from 'src/modules/Users/entity/users.entity';

@Entity('order_history')
export class OrderHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.orderHistories, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Order, (order) => order.histories, { onDelete: 'CASCADE' })
  order: Order;

  @CreateDateColumn()
  viewed_at: Date;
}