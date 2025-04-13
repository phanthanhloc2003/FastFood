import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from './product.entity';
import { CartItem } from 'src/modules/cart/entity/cart-item.entity';


@Entity('product_sizes')
export class ProductSize {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.sizes, {
    onDelete: 'CASCADE',
  })
  product: Product;

  @Column({ length: 50 })
  size: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

}
