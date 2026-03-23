/* eslint-disable @typescript-eslint/require-await */
import { Args, Query, Resolver } from '@nestjs/graphql';
import { Users } from './models/user.entity';
import { UsersService } from './services/auth.service';
import { registerEnumType } from '@nestjs/graphql';

export enum UserSortField {
  email = 'email',
  name = 'name',
  frist_name = 'frist_name', // ⚠️ keep same as entity (or fix typo later)
  last_name = 'last_name',
  phone_number = 'phone_number',
  user_type = 'user_type',
  employee_type = 'employee_type',
  company = 'company',
  status = 'status',
  dob = 'dob',
  gender = 'gender',
  is_active = 'is_active',
  created_at = 'created_at', // from BaseEntity
}

registerEnumType(UserSortField, {
  name: 'UserSortField',
});

@Resolver(() => Users)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}
  @Query(() => [Users], { name: 'users' })
  async findAll(
    @Args('sortBy', { type: () => UserSortField, nullable: true })
    sortBy?: keyof Users,
    @Args('order', { type: () => String, nullable: true })
    order?: 'ASC' | 'DESC',
  ) {
    return this.usersService.findAll({ order: order, sortBy: sortBy });
  }
}
