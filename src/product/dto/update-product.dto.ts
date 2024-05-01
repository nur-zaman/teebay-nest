// update-product.dto.ts
import { IsOptional, IsNumber, IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RateType } from '../../entities/product.entity';

export class UpdateProductDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  rent?: number;

  @ApiProperty({ enum: RateType, required: false })
  @IsOptional()
  @IsEnum(RateType)
  rate?: RateType;

  @ApiProperty({ required: false })
  @IsOptional()
  categories?: string[]; // Assuming category names are provided
}
