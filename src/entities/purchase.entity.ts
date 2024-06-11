import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { User } from './user.entity';
import { Product } from './product.entity';

import { PurchaseRepository } from '../repositories/purchase.repository';

@Entity({
  tableName: 'purchase',
  repository: () => PurchaseRepository,
})
export class Purchase {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @ManyToOne(() => User)
  userId!: User;

  @ManyToOne(() => Product)
  productId!: Product;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}
