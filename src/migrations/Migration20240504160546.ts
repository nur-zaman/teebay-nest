import { Migration } from '@mikro-orm/migrations';

export class Migration20240504160546 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "_CategoryToProduct" drop constraint "_CategoryToProduct_A_fkey";',
    );

    this.addSql(
      'alter table "Purchase" drop constraint "Purchase_productId_fkey";',
    );

    this.addSql(
      'alter table "Rental" drop constraint "Rental_productId_fkey";',
    );

    this.addSql(
      'alter table "_CategoryToProduct" drop constraint "_CategoryToProduct_B_fkey";',
    );

    this.addSql('alter table "Product" drop constraint "Product_userId_fkey";');

    this.addSql(
      'alter table "Purchase" drop constraint "Purchase_userId_fkey";',
    );

    this.addSql('alter table "Rental" drop constraint "Rental_userId_fkey";');

    this.addSql(
      'create table "category" ("id" uuid not null default gen_random_uuid(), "name" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, constraint "category_pkey" primary key ("id"));',
    );
    this.addSql(
      'alter table "category" add constraint "category_name_unique" unique ("name");',
    );

    this.addSql(
      'create table "user" ("id" uuid not null default gen_random_uuid(), "first_name" varchar(255) not null, "last_name" varchar(255) null, "phone" varchar(255) null, "address" varchar(255) null, "email" varchar(255) not null, "password" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, constraint "user_pkey" primary key ("id"));',
    );
    this.addSql(
      'alter table "user" add constraint "user_email_unique" unique ("email");',
    );

    this.addSql(
      'create table "product" ("id" uuid not null default gen_random_uuid(), "title" varchar(255) not null, "description" varchar(255) not null, "price" int not null, "rent" int not null, "rate" text check ("rate" in (\'YEAR\', \'WEEK\', \'MONTH\', \'DAY\')) not null, "user_id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "status" text check ("status" in (\'RENTED\', \'SOLD\')) null, constraint "product_pkey" primary key ("id"));',
    );

    this.addSql(
      'create table "rental" ("id" uuid not null default gen_random_uuid(), "user_id_id" uuid not null, "product_id" uuid not null, "start_date" timestamptz not null, "end_date" timestamptz not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, constraint "rental_pkey" primary key ("id"));',
    );

    this.addSql(
      'create table "purchase" ("id" uuid not null default gen_random_uuid(), "user_id" uuid not null, "product_id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, constraint "purchase_pkey" primary key ("id"));',
    );

    this.addSql(
      'create table "product_categories" ("product_id" uuid not null, "category_id" uuid not null, constraint "product_categories_pkey" primary key ("product_id", "category_id"));',
    );

    this.addSql(
      'alter table "product" add constraint "product_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "rental" add constraint "rental_user_id_id_foreign" foreign key ("user_id_id") references "user" ("id") on update cascade;',
    );
    this.addSql(
      'alter table "rental" add constraint "rental_product_id_foreign" foreign key ("product_id") references "product" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "purchase" add constraint "purchase_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;',
    );
    this.addSql(
      'alter table "purchase" add constraint "purchase_product_id_foreign" foreign key ("product_id") references "product" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "product_categories" add constraint "product_categories_product_id_foreign" foreign key ("product_id") references "product" ("id") on update cascade on delete cascade;',
    );
    this.addSql(
      'alter table "product_categories" add constraint "product_categories_category_id_foreign" foreign key ("category_id") references "category" ("id") on update cascade on delete cascade;',
    );

    this.addSql('drop table if exists "Category" cascade;');

    this.addSql('drop table if exists "Product" cascade;');

    this.addSql('drop table if exists "Purchase" cascade;');

    this.addSql('drop table if exists "Rental" cascade;');

    this.addSql('drop table if exists "User" cascade;');

    this.addSql('drop table if exists "_CategoryToProduct" cascade;');

    this.addSql('drop type "RateType";');
    this.addSql('drop type "RentStatus";');
  }

  async down(): Promise<void> {
    this.addSql(
      "create type \"RateType\" as enum ('YEAR', 'WEEK', 'MONTH', 'DAY');",
    );
    this.addSql(
      "create type \"RentStatus\" as enum ('BOUGHT', 'RENTED', 'SOLD', 'BORROWED');",
    );
    this.addSql(
      'alter table "product_categories" drop constraint "product_categories_category_id_foreign";',
    );

    this.addSql(
      'alter table "product" drop constraint "product_user_id_foreign";',
    );

    this.addSql(
      'alter table "rental" drop constraint "rental_user_id_id_foreign";',
    );

    this.addSql(
      'alter table "purchase" drop constraint "purchase_user_id_foreign";',
    );

    this.addSql(
      'alter table "rental" drop constraint "rental_product_id_foreign";',
    );

    this.addSql(
      'alter table "purchase" drop constraint "purchase_product_id_foreign";',
    );

    this.addSql(
      'alter table "product_categories" drop constraint "product_categories_product_id_foreign";',
    );

    this.addSql(
      'create table "Category" ("id" text not null, "name" text not null, "createdAt" timestamp(3) not null default CURRENT_TIMESTAMP, "updatedAt" timestamp(3) not null, constraint "Category_pkey" primary key ("id"));',
    );
    this.addSql(
      'alter table "Category" add constraint "Category_name_key" unique ("name");',
    );

    this.addSql(
      'create table "Product" ("id" text not null, "description" text not null, "price" float8 not null, "rent" float8 not null, "rate" "RateType" not null, "userId" text not null, "createdAt" timestamp(3) not null default CURRENT_TIMESTAMP, "updatedAt" timestamp(3) not null, "status" "RentStatus" null, "title" text not null, constraint "Product_pkey" primary key ("id"));',
    );

    this.addSql(
      'create table "Purchase" ("id" text not null, "userId" text not null, "productId" text not null, "createdAt" timestamp(3) not null default CURRENT_TIMESTAMP, "updatedAt" timestamp(3) not null, constraint "Purchase_pkey" primary key ("id"));',
    );

    this.addSql(
      'create table "Rental" ("id" text not null, "userId" text not null, "productId" text not null, "startDate" timestamp(3) not null, "endDate" timestamp(3) not null, "createdAt" timestamp(3) not null default CURRENT_TIMESTAMP, "updatedAt" timestamp(3) not null, constraint "Rental_pkey" primary key ("id"));',
    );

    this.addSql(
      'create table "User" ("id" text not null, "email" text not null, "password" text not null, "createdAt" timestamp(3) not null default CURRENT_TIMESTAMP, "updatedAt" timestamp(3) not null, "address" text null, "firstName" text not null, "lastName" text null, "phone" text null, constraint "User_pkey" primary key ("id"));',
    );
    this.addSql(
      'alter table "User" add constraint "User_email_key" unique ("email");',
    );

    this.addSql(
      'create table "_CategoryToProduct" ("A" text not null, "B" text not null);',
    );
    this.addSql(
      'alter table "_CategoryToProduct" add constraint "_CategoryToProduct_AB_unique" unique ("A", "B");',
    );
    this.addSql(
      'CREATE INDEX "_CategoryToProduct_B_index" ON public."_CategoryToProduct" USING btree ("B");',
    );

    this.addSql(
      'alter table "Product" add constraint "Product_userId_fkey" foreign key ("userId") references "User" ("id") on update cascade on delete restrict;',
    );

    this.addSql(
      'alter table "Purchase" add constraint "Purchase_productId_fkey" foreign key ("productId") references "Product" ("id") on update cascade on delete restrict;',
    );
    this.addSql(
      'alter table "Purchase" add constraint "Purchase_userId_fkey" foreign key ("userId") references "User" ("id") on update cascade on delete restrict;',
    );

    this.addSql(
      'alter table "Rental" add constraint "Rental_productId_fkey" foreign key ("productId") references "Product" ("id") on update cascade on delete restrict;',
    );
    this.addSql(
      'alter table "Rental" add constraint "Rental_userId_fkey" foreign key ("userId") references "User" ("id") on update cascade on delete restrict;',
    );

    this.addSql(
      'alter table "_CategoryToProduct" add constraint "_CategoryToProduct_A_fkey" foreign key ("A") references "Category" ("id") on update cascade on delete cascade;',
    );
    this.addSql(
      'alter table "_CategoryToProduct" add constraint "_CategoryToProduct_B_fkey" foreign key ("B") references "Product" ("id") on update cascade on delete cascade;',
    );

    this.addSql('drop table if exists "category" cascade;');

    this.addSql('drop table if exists "user" cascade;');

    this.addSql('drop table if exists "product" cascade;');

    this.addSql('drop table if exists "rental" cascade;');

    this.addSql('drop table if exists "purchase" cascade;');

    this.addSql('drop table if exists "product_categories" cascade;');
  }
}
