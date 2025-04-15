import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.payments, { onDelete: 'CASCADE' })
  order: Order;

  @Column({ type: 'varchar', length: 50 })
  payment_method: 'Cash' | 'Card' | 'Online';

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'varchar', length: 50, default: 'Pending' })
  status: 'Pending' | 'Paid' | 'Failed';

  @CreateDateColumn()
  created_at: Date;
}