import { EntityRepository } from '@mikro-orm/postgresql';

import { Rental } from '../entities/rental.entity';

export class RentalRepository extends EntityRepository<Rental> {}
