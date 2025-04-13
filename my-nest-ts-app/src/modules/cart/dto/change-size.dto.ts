// src/cart/dto/change-size.dto.ts
import { IsInt, Min } from 'class-validator';

export class ChangeSizeDto {
  @IsInt()
  @Min(1)
  oldSizeId: number;

  @IsInt()
  @Min(1)
  newSizeId: number;
}
