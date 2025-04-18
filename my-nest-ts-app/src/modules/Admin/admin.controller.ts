
import { Controller, Get, Patch, Query, Param, Body, ParseIntPipe, Req } from '@nestjs/common';
import { OrderService } from '../order/order.service';
import { Order } from '../order/entity/order.entity';

@Controller('admin/orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getAllOrders(@Query('status') status?: string): Promise<Order[]> {
    return this.orderService.getAllOrders(status);
  }

  @Get(':id')
  async getOrderDetails(@Param('id', ParseIntPipe) orderId: number): Promise<Order> {
    return this.orderService.getOrderDetails(orderId);
  }

  @Patch(':id/status')
  async updateOrderStatus(
    @Param('id', ParseIntPipe) orderId: number,
    @Body() body: { status: 'Pending' | 'Completed' | 'Cancelled'; message?: string },
  ): Promise<Order> {
    return this.orderService.updateOrderStatus(orderId, body.status, body?.message);
  }


}