import { IsString, IsEnum, IsOptional } from 'class-validator';
import { Role } from 'src/common/enum/role.enum';
export class UpdateUserDto {
  @IsString()
  @IsOptional()
  fullName?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsEnum(Role)
  @IsOptional()
  role?: Role;
}
