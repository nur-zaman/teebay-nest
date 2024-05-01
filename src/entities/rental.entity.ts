// rental.entity.ts
import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { User } from './user.entity';
import { Product } from './product.entity';

@Entity()
export class Rental {
  @PrimaryKey()
  id!: string;

  @Property()
  userId!: string;

  @ManyToOne(() => User, { inversedBy: 'rentals' })
  user!: User;

  @Property()
  productId!: string;

  @ManyToOne(() => Product, { inversedBy: 'rentals' })
  product!: Product;

  @Property()
  startDate!: Date;

  @Property()
  endDate!: Date;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}
