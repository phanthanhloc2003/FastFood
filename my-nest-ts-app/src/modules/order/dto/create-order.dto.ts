import { IsEnum, IsOptional, IsNumber } from 'class-validator';

export enum DeliveryType {
  DINE_IN = 'Dine-in',
  TAKE_AWAY = 'Take-away',
  DELIVERY = 'Delivery',
}

export enum PaymentMethod {
  CASH = 'Cash',
  CARD = 'Card',
  ONLINE = 'Online',
}

export class CreateOrderDto {
  @IsEnum(DeliveryType)
  deliveryType: DeliveryType;

  @IsOptional()
  @IsNumber()
  addressId?: number;

  @IsOptional()
  @IsNumber()
  tableId?: number;
  
  @IsOptional()
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;
}
