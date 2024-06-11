import {
  Entity,
  PrimaryKey,
  Property,
  OneToMany,
  Collection,
} from '@mikro-orm/core';
import { Product } from './product.entity';
import { Rental } from './rental.entity';
import { Purchase } from './purchase.entity';

import { UserRepository } from '../repositories/user.repository';

@Entity({
  tableName: 'user',
  repository: () => UserRepository,
})
export class User {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @Property()
  firstName!: string;

  @Property({ nullable: true })
  lastName?: string;

  @Property({ nullable: true })
  phone?: string;

  @Property({ nullable: true })
  address?: string;

  @Property({ unique: true })
  email!: string;

  @Property()
  password!: string;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  @OneToMany(() => Product, (product) => product.userId)
  products = new Collection<Product>(this);

  @OneToMany(() => Rental, (rental) => rental.userId)
  rentals = new Collection<Rental>(this);

  @OneToMany(() => Purchase, (purchase) => purchase.userId)
  purchases = new Collection<Purchase>(this);
}
