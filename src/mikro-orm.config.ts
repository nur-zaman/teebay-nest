import { EntityGenerator } from '@mikro-orm/entity-generator';
import { defineConfig } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { Migrator } from '@mikro-orm/migrations';
export default defineConfig({
  schemaGenerator: {
    disableForeignKeys: true, // wrap statements with `set foreign_key_checks = 0` or equivalent
    createForeignKeyConstraints: true, // whether to generate FK constraints
    ignoreSchema: [], // allows ignoring some schemas when diffing
  },
  clientUrl:
    process.env.POSTGRES_URL ||
    'postgres://default:ult9YHwLdnz2@ep-late-resonance-a1um4y7i-pooler.ap-southeast-1.aws.neon.tech/verceldb?sslmode=require',
  host:
    process.env.POSTGRES_HOST ||
    'ep-late-resonance-a1um4y7i-pooler.ap-southeast-1.aws.neon.tech',
  user: process.env.POSTGRES_USER || 'default',
  password: process.env.POSTGRES_PASSWORD || 'ult9YHwLdnz2',
  dbName: process.env.POSTGRES_DATABASE || 'verceldb',
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  debug: true,
  metadataProvider: TsMorphMetadataProvider,
  // registerRequestContext: false,
  driverOptions: {
    connection: { ssl: true },
  },
  extensions: [Migrator, EntityGenerator],
});
