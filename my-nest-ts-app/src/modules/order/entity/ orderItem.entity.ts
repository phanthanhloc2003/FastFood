// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
// import { Order } from './order.entity';
// import { ProductSize } from './product-size.entity';

// @Entity('order_items')
// export class OrderItem {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @ManyToOne(() => Order, order => order.items, { onDelete: 'CASCADE' })
//   order: Order;

//   @ManyToOne(() => ProductSize, { onDelete: 'CASCADE' })
//   productSize: ProductSize;

//   @Column()
//   quantity: number;

//   @Column({ type: 'decimal', precision: 10, scale: 2 })
//   price: number;

//   @Column({ type: 'varchar', length: 100, nullable: true })
//   product_name: string;

//   @Column({ type: 'varchar', length: 50, nullable: true })
//   size: string;
// }
