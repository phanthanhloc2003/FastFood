import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { OrderStatusLog } from './order-status-log.entity';
import { OrderHistory } from './order-history.entity';
import { Payment } from './payment.entity';
import { User } from 'src/modules/Users/entity/users.entity';
import { Address } from 'src/modules/adrress/entity/address.entity';
import { OrderItem } from './order-item.entity';
import { Notification } from './notification.entity';
import { Table } from './table.entity';


@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  order_code: string;

  @ManyToOne(() => User, (user) => user.orders, { nullable: true, onDelete: 'SET NULL' })
  user: User;

  @Column({ type: 'int', nullable: true })
  table_number: number;

  @ManyToOne(() => Address, { nullable: true, onDelete: 'SET NULL' })
  address: Address;

  @Column({ type: 'varchar', length: 20, default: 'Delivery' })
  delivery_type: 'Dine-in' | 'Take-away' | 'Delivery';

  @Column({ type: 'varchar', length: 50, default: 'Pending' })
  status: 'Pending' | 'Completed' | 'Cancelled';

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total_price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  items: OrderItem[];

  @OneToMany(() => OrderStatusLog, (log) => log.order)
  statusLogs: OrderStatusLog[];

  @OneToMany(() => OrderHistory, (history) => history.order)
  histories: OrderHistory[];

  @OneToMany(() => Payment, (payment) => payment.order)
  payments: Payment[];

  @OneToMany(() => Notification, (notification) => notification.order)
  notifications: Notification[];
  
  @ManyToOne(() => Table, table => table.orders, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  table: Table;
}