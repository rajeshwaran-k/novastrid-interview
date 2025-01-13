import { Logger, NotFoundException } from '@nestjs/common';
import { defineConfig } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';


const logger = new Logger('MikroORM');

const config = defineConfig({
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  driver: PostgreSqlDriver,
  //todo: env values not working need to check, hardcoding for now.
  dbName: 'test-dev',
  host: 'stage-postgres-db-cluster.cluster-clh8m7tanhah.ap-south-1.rds.amazonaws.com',
  password: 'eYZxX94adwMXgWk',
  user: 'adminsl',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  highlighter: new SqlHighlighter(),
  debug: true,
  logger: logger.log.bind(logger),
  metadataProvider: TsMorphMetadataProvider,
  allowGlobalContext: true,

  migrations: {
    tableName: 'mikro_orm_migrations',
    path: './migrations',
    glob: '!(*.d).{js,ts}',
    transactional: true,
    disableForeignKeys: true,
    allOrNothing: true,
    dropTables: true,
    safe: false,
    emit: 'ts',
  },
  extensions: [Migrator],
  findOneOrFailHandler: (entityName, where) => {
    throw new NotFoundException(`${entityName} not found`);
  },
});




export default config;
