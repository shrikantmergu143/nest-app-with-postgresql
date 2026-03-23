import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersController } from './controllers/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './models/user.entity';
import validationMiddleware from 'src/middleware/validation/validation-middleware';
import { userCreateSchema } from './models/sign.validation';
import { UsersService } from './services/auth.service';
import { Admin } from 'src/admin/entities/admin.entity';
import { UsersResolver } from './users.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Admin])],
  controllers: [UsersController],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(validationMiddleware(userCreateSchema))
      .forRoutes({ path: 'user', method: RequestMethod.POST });
  }
}
