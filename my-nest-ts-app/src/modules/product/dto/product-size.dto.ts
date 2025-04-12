import { IsString, IsNumber, Min } from 'class-validator';

export class ProductSizeDto {
  @IsString()
  size: string;

  @IsNumber()
  @Min(0)
  price: number;
} 