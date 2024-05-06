import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { User } from './user.entity';
import { Product } from './product.entity';

@Entity()
export class Rental {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' }) // Assuming PostgreSQL
  id!: string;

  @ManyToOne(() => User)
  userId!: User;

  @ManyToOne(() => Product)
  productId!: Product;

  @Property()
  startDate!: Date;

  @Property()
  endDate!: Date;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}
