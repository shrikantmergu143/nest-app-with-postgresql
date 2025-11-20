import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import type { CreateUserDto } from '../models/post.interface';
import { from, Observable } from 'rxjs';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post()
  createUser(@Body() payload: CreateUserDto): Observable<CreateUserDto> {
    return from(this.usersService.create(payload));
  }
}
