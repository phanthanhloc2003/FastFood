// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
// import { Order } from './order.entity';
// import { User } from './user.entity';

// @Entity('notifications')
// export class Notification {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @ManyToOne(() => Order, order => order.notifications, { onDelete: 'CASCADE' })
//   order: Order;

//   @ManyToOne(() => User, { onDelete: 'SET NULL' })
//   user: User;

//   @Column('text')
//   message: string;

//   @Column({ type: 'varchar', length: 50, default: 'Unread', enum: ['Unread', 'Read'] })
//   status: string;

//   @CreateDateColumn()
//   created_at: Date;
// }
