// user.entity.ts
import { Entity, PrimaryKey, Property, OneToMany, Collection } from "@mikro-orm/core";
import { Product } from './product.entity';
import { Rental } from './rental.entity';
import { Purchase } from './purchase.entity';

@Entity()
export class User {
  @PrimaryKey()
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

  @OneToMany(() => Product, (product) => product.user)
  products = new Collection<Product>(this);

  @OneToMany(() => Rental, (rental) => rental.userId)
  rentals = new Collection<Rental>(this);

  @OneToMany(() => Purchase, (purchase) => purchase.user)
  purchases = new Collection<Purchase>(this);
}
