import { IsInt, Min } from 'class-validator';

export class UpdateCartItemQuantityDto {
  @IsInt()
  sizeId: number;

  @IsInt()
  @Min(1, { message: 'Số lượng tối thiểu là 1' })
  quantity: number;
}
