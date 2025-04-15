import { Body, Controller, Get, Post } from '@nestjs/common';
import { IUserNoPassWord } from '../Users/interfaces/user.interface';
import { User } from 'src/common/decorators/public-router.decorator';
import { Address } from '../adrress/entity/address.entity';
import { Table } from 'typeorm';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}
  @Post('checkout')
  async getCheckoutData(@User() user: IUserNoPassWord,@Body() param: CreateOrderDto) {
    return this.orderService.getCheckoutData(user, param);
  }

  @Post()
  async createOrder(@User() user:IUserNoPassWord, @Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(user, createOrderDto);
  }
}
