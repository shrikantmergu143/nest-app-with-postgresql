import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { NestExpressApplication } from '@nestjs/platform-express';
import { urlencoded, json } from 'express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const port = process.env.PORT || 4008;
  const AllowedURL = process.env.ALLOW_WEBSITE_URLS.split(',');
  app.use(
    helmet({
      contentSecurityPolicy: false,
    }),
  );
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb', parameterLimit: 50000 }));
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: AllowedURL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  // app.enableCors();
  app.enable('trust proxy', true);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove fields not in DTO
      forbidNonWhitelisted: true, // throw error if extra fields sent
      transform: true, // auto-transform types (e.g., string → date)
    }),
  );
  await app.listen(+port);
}
bootstrap();
