import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Product } from '../entities/product.entity';
import { Category } from '../entities/category.entity';
import { Purchase } from '../entities/purchase.entity';
import { Rental } from '../entities/rental.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Product, Category, Purchase, Rental])],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
