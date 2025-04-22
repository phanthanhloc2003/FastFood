import { IsInt, Min, Max, IsString, IsOptional, Length } from 'class-validator';

export class UpdateReviewDto {
  @IsInt()
  @Min(1)
  @Max(5)
  @IsOptional()
  rating?: number;

  @IsString()
  @IsOptional()
  @Length(0, 500)
  comment?: string;
}