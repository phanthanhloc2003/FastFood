
import { Address } from '../adrress/entity/address.entity';
import { AddressService } from '../adrress/address.service';
import { IUserNoPassWord } from '../Users/interfaces/user.interface';
import { CreateOrderDto } from './dto/create-order.dto';
import { CartService } from '../cart/cart.service';
import { Table } from './entity/table.entity';
import { Repository } from 'typeorm';
import { Order } from './entity/order.entity';
import { UserService } from '../Users/users.service';
import { OrderItem } from './entity/order-item.entity';
import { Payment } from './entity/payment.entity';
import { emailTransporter } from 'src/config/email.config';
import { NotificationService } from '../notification/notification.service';
import { OrderStatusLog } from './entity/order-status-log.entity';
import { BadRequestException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
@Injectable()
export class OrderService {
  constructor(
    private addressService: AddressService,
    private cartService: CartService,
    private userService: UserService,
    private notificationService:NotificationService,
    @Inject('TABLE_REPOSITORY')
    private tableRepository: Repository<Table>,
    @Inject('ORDER_REPOSITORY')
    private orderRepository: Repository<Order>,
    @Inject('ORDER_ITEM_REPOSITORY')
    private orderItemRepository: Repository<OrderItem>,
    @Inject('PAYMENT_REPOSITORY')
    private paymentRepository: Repository<Payment>,
    @Inject('OEDERSTATUSLOG_REPOSITORY')
    private orderStatusLogRepository: Repository<OrderStatusLog>,
  ) {}

  async validateOrderPreparation(
    email: string,
    deliveryType: 'Dine-in' | 'Take-away' | 'Delivery',
    tableId?: number,
    addressId?: number,
  ): Promise<{ address?: Address[] | null; table?: Table | null }> {
    let address: Address[] | null = null;
    let table: Table | null = null;
    if (deliveryType === 'Delivery' && !tableId) {
      address = await this.addressService.findAll(email);
      if (!address) {
        throw new BadRequestException('Invalid address');
      }
    }
    if (tableId) {
      table = await this.tableRepository.findOne({
        where: {
          id: tableId,
        },
      });
      if (!table) {
        throw new BadRequestException('Invalid table');
      }
    }
    return { address, table };
  }

  async getCheckoutData(user: IUserNoPassWord, param: CreateOrderDto) {
    try {
      const cart = await this.cartService.findOne(user.id);

      let totalPrice: number = 0;
      if (cart) {
        totalPrice = cart.reduce((sum, item) => {
          const price: number = item.productSize.price;
          const quantity = item.quantity;
          return sum + price * quantity;
        }, 0);
      }

      if (param.deliveryType === 'Take-away') {
        return {
          cart,
          totalPrice,
          address: null,
          table: null,
        };
      }
      const { address, table } = await this.validateOrderPreparation(
        user.email,
        param.deliveryType,
        param.tableId,
      );

      return {
        cart,
        totalPrice,
        address,
        table,
      };
    } catch (error) {
      console.error('err', error);
      throw error;
    }
  }

  async createOrder(
    user: IUserNoPassWord,
    createOrderDto: CreateOrderDto,
  ): Promise<{ mess: string }> {
    try {
      const { deliveryType, addressId, tableId, paymentMethod } =
        createOrderDto;

      const currentUser = await this.userService.findOne(user.email);
      if (!currentUser) {
        throw new BadRequestException('Không tìm thấy người dùng');
      }
      // Validate bàn hoặc địa chỉ
      const { table } = await this.validateOrderPreparation(
        user.email,
        deliveryType,
        tableId,
      );
      // Kiểm tra địa chỉ nếu có
      let address: Address | null = null;
      if (addressId) {
        address = await this.addressService.findOne(user.email, addressId);
        if (!address) {
          throw new BadRequestException('Địa chỉ không hợp lệ');
        }
      }
      // Lấy giỏ hàng
      const cart = await this.cartService.findOne(user.id);
      if (!cart || cart.length === 0) {
        throw new BadRequestException('Giỏ hàng trống');
      }
      // Tính tổng tiền
      const totalPrice = cart.reduce((sum, item) => {
        return sum + item.productSize.price * item.quantity;
      }, 0);
      // Tạo đơn hàng
      const order = await this.orderRepository.create({
        order_code: await this.generateOrderCode(),
        user: currentUser,
        address: address ?? undefined,
        table_number: table?.id ?? undefined,
        delivery_type: deliveryType,
        status: 'Pending',
        total_price: totalPrice,
      });
      const savedOrder = await this.orderRepository.save(order);

      await this.orderStatusLogRepository.save(
        this.orderStatusLogRepository.create({
          order: savedOrder,
          status: 'Pending',
          message: 'Order created',
        }),
      );
      
      const orderItems = cart.map((item) =>
        this.orderItemRepository.create({
          order: savedOrder,
          product_size: item.productSize,
          quantity: item.quantity,
          price: item.productSize.price,
          product_name: item.productSize.product.name,
          size: item.productSize.size,
        }),
      );
      await this.orderItemRepository.save(orderItems);
      const payment = this.paymentRepository.create({
        order: savedOrder,
        payment_method: paymentMethod,
        amount: totalPrice,
        status: 'Pending',
      });
      await this.paymentRepository.manager.save(payment);

      await this.notificationService.createAdminNotification(savedOrder, 'new_order', {
        message: `New order ${savedOrder.order_code} has been placed with total ${savedOrder.total_price}`,
      });
      const totalPriceFormatted = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(savedOrder.total_price);
      
      
      await emailTransporter.sendMail({
        from: '"Your Company Name" <phanthanhloc11112003@gmail.com>',
        to: currentUser.email,
        subject: `Order Confirmation: ${savedOrder.order_code}`,
        text: `Dear ${currentUser.fullName},\n\nThank you for your order ${savedOrder.order_code}.\nTotal: ${totalPriceFormatted}\n\nWe appreciate your business!\nYour Company Name\nContact: support@yourcompany.com`,
        html: `
          <h2>Order Confirmation</h2>
          <p>Dear ${currentUser.fullName},</p>
          <p>Thank you for your order <strong>${savedOrder.order_code}</strong>.</p>
          <p>Total: ${savedOrder.total_price}</p>
          <p>We appreciate your business!</p>
          <p>Best regards,<br>Your Company Name<br>Contact: <a href="mailto:support@yourcompany.com">support@yourcompany.com</a></p>
        `,
      });
      
      await this.cartService.clearCart(user);
      return { mess: 'thanh toán thành công' };
    } catch (error) {
      console.error('Lỗi khi tạo đơn hàng:', {
        user: user.email,
        error: error.message,
      });
      throw new InternalServerErrorException(
        'Không thể tạo đơn hàng. Vui lòng thử lại sau.',
      );
    }
  }

  private generateOrderCode(): string {
    const now = new Date();
    const code = `ORD${now.getFullYear()}${(now.getMonth() + 1)
      .toString()
      .padStart(
        2,
        '0',
      )}${now.getDate().toString().padStart(2, '0')}${Date.now().toString().slice(-4)}`;
    return code;
  }
}
