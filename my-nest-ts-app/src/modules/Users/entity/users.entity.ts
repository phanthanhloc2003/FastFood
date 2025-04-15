
import { Address } from 'src/modules/adrress/entity/address.entity';
import { Cart } from 'src/modules/cart/entity/cart.entity';
import { Notification } from 'src/modules/notification/entity/notification.entity';
import { OrderHistory } from 'src/modules/order/entity/order-history.entity';
import { Order } from 'src/modules/order/entity/order.entity';
import { ProductReview } from 'src/modules/product/entity/product-review.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  fullName: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  avatar?: string;

  @Column({
    type: 'enum',
    enum: ['user', 'admin'],
    default: 'user',
    nullable: true,
  })
  role?: 'user' | 'admin';

  @OneToMany(() => Address, (userAddress) => userAddress.user)
  addresses: Address[];
  
  @Column({ type: 'date', nullable: true })
  dateOfBirth?: Date;

  @Column({ type: 'enum', enum: ['male', 'female', 'other'], nullable: true })
  gender?: 'male' | 'female' | 'other';

  @OneToOne(() => Cart, (cart) => cart.user)
  cart: Cart;

  @OneToMany(() => OrderHistory, (history) => history.user)
  orderHistories: OrderHistory[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => ProductReview, (review) => review.user)
  reviews: ProductReview[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
