import {
  Injectable,
  NotFoundException,
  Inject,
  HttpException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { Repository, Table } from 'typeorm';
import { Cart } from './entity/cart.entity';
import { CartItem } from './entity/cart-item.entity';
import { ProductSize } from '../product/entity/product-size.entity';
import { IUserNoPassWord } from '../Users/interfaces/user.interface';
import { ProductService } from '../product/product.service';
import { CartItemDto } from './dto/cart-item.dto';
import { UserService } from '../Users/users.service';
import { Address } from '../adrress/entity/address.entity';

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

      if (!cartItem) {
        throw new NotFoundException('Cart not found');
      }
  
      return cartItem;
    } catch (error) {
      console.error('Error finding cart items:', error);
      throw new Error('Failed to fetch cart items');
    }
  }

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
      console.error('err', error);
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
      cartItem.quantity = quantity;
      await this.cartItemRepository.save(cartItem);
      return { message: 'Quantity updated successfully', cartItem };
    } catch (error) {
      console.error('error', error);
      throw error;
    }
  }

  async changeItemSize(
    user: IUserNoPassWord,
    oldSizeId: number,
    newSizeId: number,
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
          productSize: { id: oldSizeId },
        },
        relations: {
          productSize: {
            product: {
              sizes: true,
            },
          },
        },
      });
      if (!cartItem) {
        throw new NotFoundException('Cart item with old size not found');
      }
      const newSize = await this.productService.findBySize(newSizeId);
      if (!newSize) {
        throw new NotFoundException('New size not found');
      }
      if (newSize.product.id !== cartItem.productSize.product.id) {
        throw new BadRequestException('New size must belong to same product');
      }
      cartItem.productSize = newSize;
      await this.cartItemRepository.save(cartItem);
      return { message: 'Size updated successfully' };
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  }

  async clearCart(user: IUserNoPassWord) {
    try {
      const isUser = await this.userService.findOne(user.email);
      if (!isUser) throw new NotFoundException('User not found');
      const cart = await this.cartRepository.findOne({
        where: { user: { id: isUser.id } },
        relations: ['items'], 
      });
      if (!cart) throw new NotFoundException('Cart not found');
      await this.cartItemRepository.delete({ cart: { id: cart.id } });
      return { message: 'Cart cleared successfully' };
    } catch (error) {
      console.error('err', error);
      throw error;
    }
  }
}
