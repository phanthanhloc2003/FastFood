import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Product } from './product.entity';
import { User } from 'src/modules/Users/entity/users.entity';

@Entity('product_reviews')
export class ProductReview {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.reviews, { onDelete: 'CASCADE' })
  product: Product;

  @ManyToOne(() => User, (user) => user.reviews, { nullable: true, onDelete: 'SET NULL' })
  user: User;

  @Column({ type: 'int' })
  rating: number;

  @Column({ type: 'int', nullable: true })
  delivery_rating: number;

  @Column({ type: 'text', nullable: true })
  comment: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}