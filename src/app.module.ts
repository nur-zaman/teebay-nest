// app.module.ts
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
// import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
// import { PostgreSqlDriver } from '@mikro-orm/postgresql';
// import { User } from './entities/user.entity';
// import { Category } from './entities/category.entity';
// import { Product } from './entities/product.entity';
// import { Rental } from './entities/rental.entity';
// import { Purchase } from './entities/purchase.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    AuthModule,
    ProductModule,
    MikroOrmModule.forRoot(),
  ],
})
export class AppModule {}
