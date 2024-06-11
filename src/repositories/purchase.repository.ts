import { EntityRepository } from '@mikro-orm/postgresql';

import { Purchase } from '../entities/purchase.entity';

export class PurchaseRepository extends EntityRepository<Purchase> {}
