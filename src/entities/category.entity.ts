import {
  Entity,
  PrimaryKey,
  Property,
  Collection,
  ManyToMany,
} from '@mikro-orm/core';
import { Product } from './product.entity';
import { CategoryRepository } from '../repositories/category.repository';

@Entity({
  tableName: 'category',
  repository: () => CategoryRepository,
})
export class Category {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @Property({ unique: true })
  name!: string;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  // @ManyToMany({
  //   entity: () => Product,
  //   mappedBy: 'categories',
  // })
  // products = new Collection<Product>(this);

  @ManyToMany(() => Product, (product) => product.categories)
  products = new Collection<Product>(this);
}
