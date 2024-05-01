// category.entity.ts
import {
  Entity,
  PrimaryKey,
  Property,
  ManyToMany,
  Collection,
} from '@mikro-orm/core';
import { Product } from './product.entity';

@Entity()
export class Category {
  @PrimaryKey()
  id!: string;

  @Property({ unique: true })
  name!: string;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  @ManyToMany(() => Product, (product) => product.categories)
  products = new Collection<Product>(this);
}
