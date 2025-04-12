import { IsString, IsNumber, IsArray, IsOptional, Min, ValidateNested, IsUrl } from 'class-validator';
import { Type } from 'class-transformer';
import { ProductSizeDto } from './product-size.dto';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
  
  @IsNumber()
  @Type(() => Number)
  price: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  ingredients?: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductSizeDto)
  sizes: ProductSizeDto[];

  @IsArray()
  @IsUrl({}, { each: true })
  images: string[];

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  categoryId?: number;
}

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  ingredients?: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductSizeDto)
  @IsOptional()
  sizes?: ProductSizeDto[];

  @IsArray()
  @IsUrl({}, { each: true })
  @IsOptional()
  images?: string[];

  @IsNumber()
  @IsOptional()
  categoryId?: number;
} 