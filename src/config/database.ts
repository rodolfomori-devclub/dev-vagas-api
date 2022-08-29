import { DataSource } from 'typeorm';

export const connectionSource = new DataSource({
  migrationsTableName: 'migrations',
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Postgres2019!',
  database: 'sso',
  logging: false,
  synchronize: false,
  name: 'default',
  entities: ['src/modules/**/*.entity{.ts,.js}'],
  migrations: ['src/database/migrations/**/*{.ts,.js}'],
  subscribers: ['src/database/subscriber/**/*{.ts,.js}'],
});
