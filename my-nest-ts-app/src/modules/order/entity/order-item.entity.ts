import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Order } from './order.entity';
import { ProductSize } from 'src/modules/product/entity/product-size.entity';


@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE' })
  order: Order;

  @ManyToOne(() => ProductSize, (productSize) => productSize.orderItems, { onDelete: 'CASCADE' })
  product_size: ProductSize;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  product_name: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  size: string;
}