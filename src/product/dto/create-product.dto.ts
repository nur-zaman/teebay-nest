// create-product.dto.ts
import { IsNotEmpty, IsNumber, IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RateType } from '../../entities/product.entity';

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price!: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  rent!: number;

  @ApiProperty({ enum: RateType })
  @IsNotEmpty()
  @IsEnum(RateType)
  rate!: RateType;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId!: string;

  @ApiProperty()
  @IsNotEmpty()
  categories!: string[];
}
