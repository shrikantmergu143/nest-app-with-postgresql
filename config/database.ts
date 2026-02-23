import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

const database = (configService: ConfigService): TypeOrmModuleOptions => {
  const databaseUrl = configService.get<string>('DATABASE_URL');

  if (databaseUrl) {
    return {
      type: 'postgres',
      url: databaseUrl,
      entities: [join(__dirname, '../**/*.entity.{ts,js}')],
      migrations: [join(__dirname, '../migrations/**/*.{ts,js}')],
      synchronize: false,
      dropSchema: false,
      migrationsRun: false,
      logging: false,
      ssl: {
        rejectUnauthorized: false,
      },
    };
  }

  return {
    type: 'postgres',
    host: configService.get<string>('POSTGRES_HOST'),
    port: parseInt(configService.get<string>('POSTGRES_PORT') || '5432', 10),
    username: configService.get<string>('POSTGRES_USER'),
    password: configService.get<string>('POSTGRES_PASSWORD'),
    database: configService.get<string>('POSTGRES_DATABASE'),
    entities: [join(__dirname, '../**/*.entity.{ts,js}')],
    migrations: [join(__dirname, '../migrations/**/*.{ts,js}')],
    synchronize: false,
    dropSchema: false,
    migrationsRun: false,
    logging: false,
    ssl: false,
  };
};

export default database;
