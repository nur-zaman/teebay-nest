import { IsOptional, IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RentStatus } from '../../entities/product.entity';

export class FilterProductDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  userId?: string;

  @ApiProperty({ enum: RentStatus, required: false })
  @IsOptional()
  @IsEnum(RentStatus)
  status?: RentStatus;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  exceptUserId?: string;

  @ApiProperty({ enum: RentStatus, required: false })
  @IsOptional()
  @IsEnum(RentStatus)
  exceptStatus?: RentStatus;
}
