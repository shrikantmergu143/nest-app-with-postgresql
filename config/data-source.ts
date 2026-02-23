import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

const isUrlConfig = !!process.env.DATABASE_URL;

export const appDataSource: DataSourceOptions = isUrlConfig
  ? {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: ['dist/**/*.entity.js'],
      migrations: ['dist/src/migrations/*.js'],
      synchronize: false,
      ssl: {
        rejectUnauthorized: false, // For cloud DB (Aiven, Neon, etc.)
      },
    }
  : {
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT) || 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: ['dist/**/*.entity.js'],
      migrations: ['dist/src/migrations/*.js'],
      synchronize: false,
      ssl: false, // Local DB usually does NOT use SSL
    };

const dataSource = new DataSource(appDataSource);

export default dataSource;
