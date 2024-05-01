//
import { IsNotEmpty, IsString, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RentProductDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  productId!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  startDate!: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  endDate!: Date;
}
