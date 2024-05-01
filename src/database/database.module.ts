// database.module.ts
import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../entities/user.entity';
import { Category } from '../entities/category.entity';
import { Product } from '../entities/product.entity';
import { Rental } from '../entities/rental.entity';
import { Purchase } from '../entities/purchase.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgresql',
        host: configService.get<string>('POSTGRES_HOST'),
        port: configService.get<number>('POSTGRES_PORT'),
        user: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        dbName: configService.get<string>('POSTGRES_DATABASE'),
        entities: [User, Category, Product, Rental, Purchase],
        migrations: {
          path: './migrations',
          pattern: /^[\w-]+\d+\.[tj]s$/,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [MikroOrmModule],
})
export class DatabaseModule {}
