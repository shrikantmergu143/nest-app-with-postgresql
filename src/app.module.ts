import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import database from 'config/database';
import { validationSchema } from 'config/validation';
import { configuration } from 'config/configuration';
import { UsersModule } from './users/auth.module';
import { AuthMiddleware } from './middleware/auth/auth.middleware';
import { CallGateway } from './call.gateway';
import { AdminModule } from './admin/admin.module';
import { DiscoveryModule } from '@nestjs/core';
import { ApiDocsModule } from './shared/services/api.docs.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${__dirname}/../../.env`,
      validationSchema: validationSchema,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => database(configService),
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      debug: true,
      playground: true,
    }),
    UsersModule,
    AdminModule,
    DiscoveryModule,
    ApiDocsModule,
  ],
  controllers: [AppController],
  providers: [AppService, CallGateway],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: 'api/*path',
      method: RequestMethod.ALL,
    });
  }
}
