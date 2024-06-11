import { EntityRepository } from '@mikro-orm/postgresql';
import { Category } from '../entities/category.entity';

export class CategoryRepository extends EntityRepository<Category> {}
