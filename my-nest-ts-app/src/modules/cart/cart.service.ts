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
      // 1. Tìm người dùng
      const isUser = await this.userService.findOne(user.email);
      if (!isUser) {
        throw new NotFoundException('User not found');
      }

      // 2. Tìm giỏ hàng hiện tại hoặc tạo mới
      let cart = await this.cartRepository.findOne({
        where: { user: { id: isUser.id } },
        relations: ['user', 'items'],
      });

      if (!cart) {
        cart = this.cartRepository.create({ user: isUser });
        cart = await this.cartRepository.save(cart);
      }

      // 3. Kiểm tra productSize hợp lệ
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

  async findOne(userId: number): Promise<Cart> {
    const cart = await this.cartRepository.findOne({
      where: { user: { id: userId } },
    });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    return cart;
  }

  async remove(userId: number): Promise<void> {
    const cart = await this.findOne(userId);
    await this.cartRepository.remove(cart);
  }

  async addItem(
    userId: number,
    productSizeId: number,
    quantity: number,
  ): Promise<Cart> {
    const cart = await this.findOne(userId);
    // const productSize = await this.productSizeRepository.findOne({
    //   where: { id: productSizeId },
    // });

    // if (!productSize) {
    //   throw new NotFoundException(`Product size with id ${productSizeId} not found`);
    // }

    // Kiểm tra xem item đã tồn tại chưa
    let cartItem = cart.items.find(
      (item) => item.productSize.id === productSizeId,
    );

    if (cartItem) {
      // Nếu đã tồn tại, cập nhật số lượng
      cartItem.quantity += quantity;
      await this.cartItemRepository.save(cartItem);
    } else {
      // Nếu chưa tồn tại, tạo mới
      cartItem = this.cartItemRepository.create({
        cart,
        // productSize,
        quantity,
      });
      await this.cartItemRepository.save(cartItem);
    }

    return this.findOne(userId);
  }

  async updateItemQuantity(
    userId: number,
    productSizeId: number,
    quantity: number,
  ): Promise<Cart> {
    const cart = await this.findOne(userId);
    const cartItem = cart.items.find(
      (item) => item.productSize.id === productSizeId,
    );

    if (!cartItem) {
      throw new NotFoundException(
        `Item with product size id ${productSizeId} not found in cart`,
      );
    }

    if (quantity <= 0) {
      await this.cartItemRepository.remove(cartItem);
    } else {
      cartItem.quantity = quantity;
      await this.cartItemRepository.save(cartItem);
    }

    return this.findOne(userId);
  }

  async removeItem(userId: number, productSizeId: number): Promise<Cart> {
    const cart = await this.findOne(userId);
    const cartItem = cart.items.find(
      (item) => item.productSize.id === productSizeId,
    );

    if (!cartItem) {
      throw new NotFoundException(
        `Item with product size id ${productSizeId} not found in cart`,
      );
    }

    await this.cartItemRepository.remove(cartItem);
    return this.findOne(userId);
  }
}
