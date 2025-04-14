// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';

// @Entity('orders')
// export class Order {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({ type: 'varchar', length: 50, unique: true })
//   order_code: string;

//   @ManyToOne(() => User, user => user.orders, { onDelete: 'SET NULL' })
//   @JoinColumn({ name: 'user_id' })
//   user: User;

//   @Column({ type: 'int' })
//   table_number: number;

//   @ManyToOne(() => UserAddress, { onDelete: 'SET NULL' })
//   @JoinColumn({ name: 'address_id' })
//   address: UserAddress;

//   @Column({
//     type: 'varchar',
//     length: 20,
//     default: 'Delivery',
//     enum: ['Dine-in', 'Take-away', 'Delivery'],
//   })
//   delivery_type: string;

//   @Column({
//     type: 'varchar',
//     length: 50,
//     default: 'Pending',
//     enum: ['Pending', 'Completed', 'Cancelled'],
//   })
//   status: string;

//   @Column({ type: 'decimal', precision: 10, scale: 2 })
//   total_price: number;

//   @CreateDateColumn()
//   created_at: Date;

//   @UpdateDateColumn()
//   updated_at: Date;

//   @OneToMany(() => OrderStatusLog, log => log.order)
//   statusLogs: OrderStatusLog[];

//   @OneToMany(() => OrderItem, item => item.order)
//   items: OrderItem[];

//   @OneToMany(() => OrderHistory, history => history.order)
//   histories: OrderHistory[];

//   @OneToMany(() => Payment, payment => payment.order)
//   payments: Payment[];

//   @OneToMany(() => Notification, notification => notification.order)
//   notifications: Notification[];
// }
