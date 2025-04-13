import { IsNumber, Min } from 'class-validator';

export class CartItemDto {
  @IsNumber()
  productSizeId: number;

  @IsNumber()
  @Min(1)
  quantity: number;
} 