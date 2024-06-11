import { Migration } from '@mikro-orm/migrations';

export class Migration20240611085313_latest extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "product" drop constraint "product_user_id_foreign";',
    );

    this.addSql(
      'alter table "rental" drop constraint "rental_product_id_foreign";',
    );

    this.addSql(
      'alter table "purchase" drop constraint "purchase_user_id_foreign";',
    );
    this.addSql(
      'alter table "purchase" drop constraint "purchase_product_id_foreign";',
    );

    this.addSql(
      'alter table "product" rename column "user_id" to "user_id_id";',
    );
    this.addSql(
      'alter table "product" add constraint "product_user_id_id_foreign" foreign key ("user_id_id") references "user" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "rental" rename column "product_id" to "product_id_id";',
    );
    this.addSql(
      'alter table "rental" add constraint "rental_product_id_id_foreign" foreign key ("product_id_id") references "product" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "purchase" drop column "user_id", drop column "product_id";',
    );

    this.addSql(
      'alter table "purchase" add column "user_id_id" uuid not null, add column "product_id_id" uuid not null;',
    );
    this.addSql(
      'alter table "purchase" add constraint "purchase_user_id_id_foreign" foreign key ("user_id_id") references "user" ("id") on update cascade;',
    );
    this.addSql(
      'alter table "purchase" add constraint "purchase_product_id_id_foreign" foreign key ("product_id_id") references "product" ("id") on update cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "product" drop constraint "product_user_id_id_foreign";',
    );

    this.addSql(
      'alter table "rental" drop constraint "rental_product_id_id_foreign";',
    );

    this.addSql(
      'alter table "purchase" drop constraint "purchase_user_id_id_foreign";',
    );
    this.addSql(
      'alter table "purchase" drop constraint "purchase_product_id_id_foreign";',
    );

    this.addSql(
      'alter table "product" rename column "user_id_id" to "user_id";',
    );
    this.addSql(
      'alter table "product" add constraint "product_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "rental" rename column "product_id_id" to "product_id";',
    );
    this.addSql(
      'alter table "rental" add constraint "rental_product_id_foreign" foreign key ("product_id") references "product" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "purchase" drop column "user_id_id", drop column "product_id_id";',
    );

    this.addSql(
      'alter table "purchase" add column "user_id" uuid not null, add column "product_id" uuid not null;',
    );
    this.addSql(
      'alter table "purchase" add constraint "purchase_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;',
    );
    this.addSql(
      'alter table "purchase" add constraint "purchase_product_id_foreign" foreign key ("product_id") references "product" ("id") on update cascade;',
    );
  }
}
