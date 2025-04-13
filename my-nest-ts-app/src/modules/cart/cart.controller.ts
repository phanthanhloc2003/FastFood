import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  UseGuards,
  Put,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { Cart } from './entity/cart.entity';
import { IUserNoPassWord } from '../Users/interfaces/user.interface';
import { User } from 'src/common/decorators/public-router.decorator';
import { CartItemDto } from './dto/cart-item.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async create(@User() user: IUserNoPassWord,
   @Body() body: CartItemDto
  ) {
    return this.cartService.create(user, body);
  }

  @Get()
  async findOne(@User() user: IUserNoPassWord) {
    return this.cartService.findOne(user.id);
  }

  // @Delete()
  // async remove(@User() user: IUserNoPassWord): Promise<void> {
  //   return this.cartService.remove(user.id);
  // }

  // @Post('items/:productSizeId')
  // async addItem(
  //   @User() user: IUserNoPassWord,
  //   @Param('productSizeId') productSizeId: string,
  //   @Body('quantity') quantity: number,
  // ): Promise<Cart> {
  //   return this.cartService.addItem(user.id, +productSizeId, quantity);
  // }

  // @Put('items/:productSizeId')
  // async updateItemQuantity(
  //   @User() user: IUserNoPassWord,
  //   @Param('productSizeId') productSizeId: string,
  //   @Body('quantity') quantity: number,
  // ): Promise<Cart> {
  //   return this.cartService.updateItemQuantity(
  //     user.id,
  //     +productSizeId,
  //     quantity,
  //   );
  // }

  // @Delete('items/:productSizeId')
  // async removeItem(
  //   @User() user: IUserNoPassWord,
  //   @Param('productSizeId') productSizeId: string,
  // ): Promise<Cart> {
  //   return this.cartService.removeItem(user.id, +productSizeId);
  // }
}
