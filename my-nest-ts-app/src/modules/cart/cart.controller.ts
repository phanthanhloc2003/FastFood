import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  UseGuards,
  Put,
  Patch,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { Cart } from './entity/cart.entity';
import { IUserNoPassWord } from '../Users/interfaces/user.interface';
import { User } from 'src/common/decorators/public-router.decorator';
import { CartItemDto } from './dto/cart-item.dto';
import { UpdateCartItemQuantityDto } from './dto/quantityItem.dto';
import { ChangeSizeDto } from './dto/change-size.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async create(@User() user: IUserNoPassWord, @Body() body: CartItemDto) {
    return this.cartService.create(user, body);
  }

  @Get()
  async findOne(@User() user: IUserNoPassWord) {
    return this.cartService.findOne(user.id);
  }

  @Patch('quantity')
  updateCartItemQuantity(
    @User() user: IUserNoPassWord,
    @Body() body: UpdateCartItemQuantityDto,
  ) {
    return this.cartService.updateQuantity(user, body.sizeId, body.quantity);
  }

  @Patch('change-size')
  changeCartItemSize(
    @User() user: IUserNoPassWord,
    @Body() body: ChangeSizeDto,
  ) {
    return this.cartService.changeItemSize(
      user,
      body.oldSizeId,
      body.newSizeId,
    );
  }

  @Delete('/:productSizeId')
  async removeItem(
    @User() user: IUserNoPassWord,
    @Param('productSizeId') productSizeId: string,
  ) {
    return this.cartService.removeItem(user.email, +productSizeId);
  }
}
