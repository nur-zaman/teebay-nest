import { EntityRepository } from '@mikro-orm/postgresql';

import { Product } from '../entities/product.entity';

export class ProductRepository extends EntityRepository<Product> {}
