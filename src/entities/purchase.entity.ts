// purchase.entity.ts
import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { User } from './user.entity';
import { Product } from './product.entity';

@Entity()
export class Purchase {
  @PrimaryKey()
  id!: string;

  // @Property()
  // userId!: string;


  @ManyToOne(() => User, { inversedBy: 'purchases' })
  user!: User;

  // @Property()
  // productId!: string;

  @ManyToOne(() => Product, { inversedBy: 'purchases' })
  product!: Product;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}
