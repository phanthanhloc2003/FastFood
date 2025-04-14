import { IsString, IsBoolean, IsNotEmpty, IsOptional, Length, IsPhoneNumber } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(9, 15)
  phone: string;

  @IsString()
  @IsNotEmpty()
  province: string;

  @IsString()
  @IsNotEmpty()
  district: string;

  @IsString()
  @IsNotEmpty()
  ward: string;

  @IsString()
  @IsNotEmpty()
  address_line: string;

  @IsBoolean()
  @IsOptional()
  is_default?: boolean;
}
