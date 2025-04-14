// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
// import { Order } from './order.entity';

// @Entity('order_status_logs')
// export class OrderStatusLog {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @ManyToOne(() => Order, order => order.statusLogs, { onDelete: 'CASCADE' })
//   order: Order;

//   @Column({ type: 'varchar', length: 50 })
//   status: string;

//   @Column('text', { nullable: true })
//   message: string;

//   @CreateDateColumn()
//   created_at: Date;
// }
