import { IsInt, Min, Max, IsString, IsOptional, Length } from 'class-validator';

export class CreateReviewDto {
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsString()
  @IsOptional()
  @Length(0, 500)
  comment?: string;
}