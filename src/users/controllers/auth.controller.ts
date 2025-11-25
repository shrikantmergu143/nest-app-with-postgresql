import { Body, Controller, Next, Post, Req, Res } from '@nestjs/common';
import { CreateUserDto } from '../models/create-user.dto';
import { from, Observable } from 'rxjs';
import response from 'src/constants/response';
import { NextFunction, Request, Response } from 'express';
import { UsersService } from '../services/auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../models/user.entity';
import { Repository } from 'typeorm';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const user = await this.usersRepository.findOne({
        where: [{ email: createUserDto?.email }],
      });
      response.successResponse(
        { data: user, message: 'User created successfully' },
        res,
      );
    } catch (error) {
      return response.failureResponse(error, res);
    }
  }
}
