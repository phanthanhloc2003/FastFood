import {
  Injectable,
  NotFoundException,
  Inject,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Cart } from './entity/cart.entity';
import { CartItem } from './entity/cart-item.entity';
import { ProductSize } from '../product/entity/product-size.entity';
import { IUserNoPassWord } from '../Users/interfaces/user.interface';
import { ProductService } from '../product/product.service';
import { CartItemDto } from './dto/cart-item.dto';
import { UserService } from '../Users/users.service';

@Injectable()
export class CartService {
  constructor(
    private productService: ProductService,
    private userService: UserService,
    @Inject('CART_REPOSITORY')
    private cartRepository: Repository<Cart>,
    @Inject('CART_ITEM_REPOSITORY')
    private cartItemRepository: Repository<CartItem>,
  ) {}
  async create(user: IUserNoPassWord, body: CartItemDto): Promise<CartItem> {
    try {
      const isUser = await this.userService.findOne(user.email);
      if (!isUser) {
        throw new NotFoundException('User not found');
      }
      let cart = await this.cartRepository.findOne({
        where: { user: { id: isUser.id } },
        relations: ['user', 'items'],
      });
      if (!cart) {
        cart = this.cartRepository.create({ user: isUser });
        cart = await this.cartRepository.save(cart);
      }
      const productSize = await this.productService.findBySize(
        body.productSizeId,
      );
      if (!productSize) {
        throw new NotFoundException('Product size not found');
      }

      // 4. Kiểm tra item đã tồn tại trong giỏ hàng chưa
      let cartItem = await this.cartItemRepository.findOne({
        where: {
          cart: { id: cart.id },
          productSize: { id: productSize.id },
        },
      });

      if (cartItem) {
        cartItem.quantity += body.quantity;
      } else {
        cartItem = this.cartItemRepository.create({
          cart,
          productSize,
          quantity: body.quantity,
        });
      }

      await this.cartItemRepository.save(cartItem);
      return cartItem;
    } catch (error) {
      console.error('Add to cart error:', error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async findOne(userId: number): Promise<CartItem[] | null> {
    try {
      let cart = await this.cartRepository.findOne({
        where: { user: { id: userId } },
        relations: ['user', 'items'],
      });

      if (!cart) return [];
      const cartItem = await this.cartItemRepository.find({
        where: {
          cart: {
            user: {
              id: userId,
            },
          },
        },
        relations: {
          productSize: {
            product: {
              sizes: true,
              images: true,
            },
          },
        },
      });
      return cartItem.length === 0 ? null : cartItem;
    } catch (error) {
      console.error('Error finding cart items:', error);
      throw new Error('Failed to fetch cart items');
    }
  }

  // async remove(userId: number): Promise<void> {
  //   const cart = await this.findOne(userId);
  //   await this.cartRepository.remove(cart);
  // }

  // async updateItemQuantity(
  //   userId: number,
  //   productSizeId: number,
  //   quantity: number,
  // ): Promise<Cart> {
  //   const cart = await this.findOne(userId);
  //   const cartItem = cart.items.find(
  //     (item) => item.productSize.id === productSizeId,
  //   );

  //   if (!cartItem) {
  //     throw new NotFoundException(
  //       `Item with product size id ${productSizeId} not found in cart`,
  //     );
  //   }

  //   if (quantity <= 0) {
  //     await this.cartItemRepository.remove(cartItem);
  //   } else {
  //     cartItem.quantity = quantity;
  //     await this.cartItemRepository.save(cartItem);
  //   }

  //   return this.findOne(userId);
  // }

  async removeItem(email: string, sizeId: number) {
   try {
    const isUser = await this.userService.findOne(email);
    if (!isUser) throw new NotFoundException('User not found');
    const cart = await this.cartRepository.findOne({
      where: { user: { id: isUser.id } },
    });
    if (!cart) throw new NotFoundException('Cart not found');
    const cartItem = await this.cartItemRepository.findOne({
      where: {
        cart: { id: cart.id },
        productSize: { id: sizeId },
      },
    });

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    await this.cartItemRepository.remove(cartItem);

    return { message: 'Cart item deleted successfully' };
    
   } catch (error) {
    console.error("err",error)
    throw error;
   }
  }

  async updateQuantity(
    user: IUserNoPassWord,
    sizeId: number,
    quantity: number,
  ) {
    try {
      const isUser = await this.userService.findOne(user.email);
    if (!isUser) throw new NotFoundException('User not found');
    const cart = await this.cartRepository.findOne({
      where: { user: { id: isUser.id } },
    });
    if (!cart) throw new NotFoundException('Cart not found');
    const cartItem = await this.cartItemRepository.findOne({
      where: {
        cart: { id: cart.id },
        productSize: { id: sizeId },
      },
      relations: ['productSize'],
    });
    if (!cartItem) throw new NotFoundException('Cart item not found');
    console.log("cartItem",cartItem)
    cartItem.quantity = quantity;
    await this.cartItemRepository.save(cartItem);
    return { message: 'Quantity updated successfully', cartItem };
    } catch (error) {
      console.error("error",error)
      throw error;
    }
  }
  
}
