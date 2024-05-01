// product.entity.ts
import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  ManyToMany,
  Enum,
  Collection,
  OneToMany,
} from '@mikro-orm/core';
import { User } from './user.entity';
import { Category } from './category.entity';
import { Rental } from './rental.entity';
import { Purchase } from './purchase.entity';

export enum RentStatus {
  RENTED = 'RENTED',
  SOLD = 'SOLD',
}

export enum RateType {
  YEAR = 'YEAR',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
  DAY = 'DAY',
}

@Entity()
export class Product {
  @PrimaryKey()
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

  @Property()
  userId!: string;

  @ManyToOne(() => User, { inversedBy: 'products' })
  user!: User;

  @ManyToMany(() => Category, (category) => category.products, { owner: true })
  categories = new Collection<Category>(this);

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  @OneToMany(() => Rental, (rental) => rental.product)
  rentals = new Collection<Rental>(this);

  @OneToMany(() => Purchase, (purchase) => purchase.product)
  purchases = new Collection<Purchase>(this);

  @Enum(() => RentStatus, { default: RentStatus.RENTED })
  status?: RentStatus;
}
