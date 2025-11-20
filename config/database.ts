import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

const database = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get<string>('POSTGRES_HOST'),
  port: parseInt(configService.get<string>('POSTGRES_PORT'), 10), // FIXED
  username: configService.get<string>('POSTGRES_USER'),
  password: configService.get<string>('POSTGRES_PASSWORD'),
  database: configService.get<string>('POSTGRES_DATABASE'),
  entities: [join(__dirname, '../**/*.entity.{ts,js}')], // FIXED
  migrations: [join(__dirname, '../migrations/**/*.{ts,js}')],
  synchronize: false,
  dropSchema: false,
  migrationsRun: false,
  logging: false,
});

export default database;
