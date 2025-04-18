import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { IUserNoPassWord } from '../Users/interfaces/user.interface';
import { User } from 'src/common/decorators/public-router.decorator';
import { Address } from '../adrress/entity/address.entity';
import { Table } from 'typeorm';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entity/order.entity';
import { OrderStatusLog } from './entity/order-status-log.entity';
import { Role } from 'src/common/enum/role.enum';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}
  @Post('checkout')
  async getCheckoutData(
    @User() user: IUserNoPassWord,
    @Body() param: CreateOrderDto,
  ) {
    return this.orderService.getCheckoutData(user, param);
  }

  @Post()
  async createOrder(
    @User() user: IUserNoPassWord,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    return this.orderService.createOrder(user, createOrderDto);
  }

  @Get('history')
  async getUserOrders(@User() user: IUserNoPassWord): Promise<Order[]> {
    return this.orderService.getUserOrders(user.id);
  }

  @Get(':id')
  async viewOrder(
    @User() user: IUserNoPassWord,
    @Param('id', ParseIntPipe) orderId: number,
  ): Promise<Order> {
    return this.orderService.viewOrder(user.id, orderId);
  }

  @Get(':id/status-logs')
  @Roles(Role.Admin)
  async getOrderStatusLogs(
    @Param('id', ParseIntPipe) orderId: number,
    @User() user: IUserNoPassWord,
  ): Promise<OrderStatusLog[]> {
    return this.orderService.getOrderStatusLogs(orderId);
  }
}
