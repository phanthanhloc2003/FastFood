import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Order } from './order.entity';

@Entity('tables')
export class Table {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Order, (order) => order.table)
  orders: Order[];
  @Column({ type: 'int' })
  capacity: number;
}
