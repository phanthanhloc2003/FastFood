// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
// import { User } from './user.entity';
// import { Order } from './order.entity';

// @Entity('order_history')
// export class OrderHistory {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @ManyToOne(() => User, user => user.orderHistories, { onDelete: 'CASCADE' })
//   user: User;

//   @ManyToOne(() => Order, order => order.histories, { onDelete: 'CASCADE' })
//   order: Order;

//   @CreateDateColumn()
//   viewed_at: Date;
// }
