import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, wrap } from '@mikro-orm/postgresql';
import { Product, RentStatus } from '../entities/product.entity';
import { Category } from '../entities/category.entity';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilterProductDto } from './dto/filter-product.dto';
// import { Purchase } from '../entities/purchase.entity';
// import { Rental } from '../entities/rental.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductRepository } from '../repositories/product.repository';
import { CategoryRepository } from '../repositories/category.repository';
import { RentalRepository } from '../repositories/rental.repository';
import { PurchaseRepository } from '../repositories/purchase.repository';

@Injectable()
export class ProductService {
  constructor(
    private readonly em: EntityManager,
    private readonly productRepository: ProductRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly rentalRepository: RentalRepository,
    private readonly purchaseRepository: PurchaseRepository,
    // @InjectRepository(Product)
    // private readonly productRepository: EntityRepository<Product>,
    // @InjectRepository(Category)
    // private readonly categoryRepository: EntityRepository<Category>,
    // @InjectRepository(Rental)
    // private readonly rentalRepository: EntityRepository<Rental>,
    // @InjectRepository(Purchase)
    // private readonly purchaseRepository: EntityRepository<Purchase>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = this.productRepository.create({
      ...createProductDto,
      categories: [], // Initialize categories as an empty array
    });

    for (const categoryName of createProductDto.categories) {
      let category = await this.categoryRepository.findOne({
        name: categoryName,
      });
      if (!category) {
        await this.em.transactional(async (em) => {
          category = em.create(Category, { name: categoryName });
          await em.persistAndFlush(category);
        });
      }
      product.categories.add(category);
    }

    await this.em.persistAndFlush(product);
    return product;
  }

  async findAll(filterProductDto: FilterProductDto) {
    const { userId, status, exceptUserId, exceptStatus } = filterProductDto;
    const qb = this.productRepository.createQueryBuilder('p');

    if (userId) {
      qb.andWhere({ userId });
    }

    if (status) {
      qb.andWhere({ status: status as RentStatus });
    } else {
      qb.andWhere({ status: null });
    }

    if (exceptUserId || exceptStatus) {
      qb.andWhere({
        $not: {
          $or: [
            ...(exceptUserId ? [{ userId: exceptUserId }] : []),
            ...(exceptStatus ? [{ status: exceptStatus as RentStatus }] : []),
          ],
        },
      });
    }

    qb.leftJoinAndSelect('p.categories', 'c');
    return await qb.getResult();
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne(id, {
      populate: ['categories'],
    });
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOne(id, {
      populate: ['categories'],
    });
    if (!product) {
      throw new Error('Product not found');
    }

    wrap<Product>(product).assign(updateProductDto, { em: this.em });

    product.categories.removeAll();

    for (const categoryName of updateProductDto.categories) {
      let category = await this.categoryRepository.findOne({
        name: categoryName,
      });
      if (!category) {
        await this.em.transactional(async (em) => {
          category = em.create(Category, { name: categoryName });
          await em.persistAndFlush(category);
        });
      }
      product.categories.add(category);
    }

    await this.em.flush();
    return product;
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    await this.em.removeAndFlush(product);
  }

  async buy(userId: string, productId: string) {
    const product = await this.findOne(productId);
    if (product.status !== null) {
      throw new Error('Product is not available for purchase');
    }

    const purchase = this.purchaseRepository.create({ userId, productId });
    product.status = RentStatus.SOLD;
    await this.em.persistAndFlush(purchase);
    return product;
  }

  async rent(
    userId: string,
    productId: string,
    startDate: Date,
    endDate: Date,
  ) {
    const product = await this.findOne(productId);
    if (product.status !== null) {
      throw new Error('Product is not available for rent');
    }

    const overlappingRental = await this.rentalRepository.findOne({
      productId,
      $or: [
        { startDate: { $lt: endDate }, endDate: { $gt: startDate } },
        { startDate: { $lte: endDate }, endDate: { $gte: startDate } },
      ],
    });
    if (overlappingRental) {
      throw new Error('Rental period overlaps with an existing rental.');
    }

    const rental = this.rentalRepository.create({
      userId,
      productId,
      startDate,
      endDate,
    });
    product.status = RentStatus.RENTED;
    await this.em.persistAndFlush(rental);
    return product;
  }
}
