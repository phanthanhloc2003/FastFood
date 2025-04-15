import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { Cart } from './cart.entity';
import { ProductSize } from 'src/modules/product/entity/product-size.entity';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cart, (cart) => cart.items, { onDelete: 'CASCADE' })
  cart: Cart;

  @ManyToOne(() => ProductSize, { eager: true })
  productSize: ProductSize;

  // @Column('decimal', { precision: 10, scale: 2 })
  // price: number;

  @Column()
  quantity: number;

  @CreateDateColumn()
  addedAt: Date;
}
