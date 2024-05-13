import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilterProductDto } from './dto/filter-product.dto';
import { BuyProductDto } from './dto/buy-product.dto';
import { RentProductDto } from './dto/rent-product.dto';
import { ApiTags, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiCreatedResponse({ description: 'Create a new product' })
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @ApiOkResponse({ description: 'Get all products with optional filtering' })
  @Get()
  async findAll(@Query() filterProductDto: FilterProductDto) {
    return this.productService.findAll(filterProductDto);
  }

  @ApiOkResponse({ description: 'Get a product by ID' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @ApiOkResponse({ description: 'Update a product by ID' })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(id, updateProductDto);
  }

  @ApiOkResponse({ description: 'Delete a product by ID' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }

  @ApiOkResponse({ description: 'Buy a product' })
  @Post('buy')
  async buyProduct(@Body() buyProductDto: BuyProductDto) {
    return this.productService.buy(
      buyProductDto.userId,
      buyProductDto.productId,
    );
  }

  @ApiOkResponse({ description: 'Rent a product' })
  @Post('rent')
  async rentProduct(@Body() rentProductDto: RentProductDto) {
    return this.productService.rent(
      rentProductDto.userId,
      rentProductDto.productId,
      rentProductDto.startDate,
      rentProductDto.endDate,
    );
  }
}
