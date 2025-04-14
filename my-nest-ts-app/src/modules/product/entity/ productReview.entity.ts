// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
// import { Product } from './product.entity';
// import { User } from './user.entity';

// @Entity('product_reviews')
// export class ProductReview {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @ManyToOne(() => Product, product => product.reviews, { onDelete: 'CASCADE' })
//   product: Product;

//   @ManyToOne(() => User, { onDelete: 'SET NULL' })
//   user: User;

//   @Column({ type: 'int' })
//   rating: number;

//   @Column({ type: 'int', nullable: true })
//   delivery_rating: number;

//   @Column('text', { nullable: true })
//   comment: string;

//   @CreateDateColumn()
//   created_at: Date;

//   @UpdateDateColumn()
//   updated_at: Date;
// }
