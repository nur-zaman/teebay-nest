import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  Enum,
  ManyToMany,
  Collection,
  OneToMany,
} from '@mikro-orm/core';
import { User } from './user.entity';
import { Category } from './category.entity';
import { Rental } from './rental.entity';
import { Purchase } from './purchase.entity';
import { ProductRepository } from '../repositories/product.repository';

@Entity({
  tableName: 'product',
  repository: () => ProductRepository,
})
export class Product {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @Property()
  title!: string;

  @Property()
  description!: string;

  @Property()
  price!: number;

  @Property()
  rent!: number;

  @Enum(() => RateType)
  rate!: RateType;
  @ManyToOne(() => User, { inversedBy: 'products' })
  userId!: User;

  @ManyToMany(() => Category, (category) => category.products, { owner: true })
  categories = new Collection<Category>(this);

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  @OneToMany(() => Rental, (rental) => rental.productId)
  rentals = new Collection<Rental>(this);

  @OneToMany(() => Purchase, (purchase) => purchase.productId)
  purchases = new Collection<Purchase>(this);

  @Enum({ items: () => RentStatus, nullable: true })
  status?: RentStatus;
}

export enum RateType {
  YEAR = 'YEAR',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
  DAY = 'DAY',
}

export enum RentStatus {
  RENTED = 'RENTED',
  SOLD = 'SOLD',
}
