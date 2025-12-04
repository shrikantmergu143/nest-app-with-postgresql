import { Body, Controller, Get, Next, Post, Req, Res } from '@nestjs/common';
import { CreateUserDto } from '../models/create-user.dto';
import { from, Observable } from 'rxjs';
import response from 'src/constants/response';
import { NextFunction, Request, Response } from 'express';
import { UsersService } from '../services/auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../models/user.entity';
import { Repository } from 'typeorm';
import { CONSTANT, MESSAGE } from 'src/constants/message';

@Controller('auth')
export class UsersController {
  constructor(
    private usersService: UsersService,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}
  @Post('signup/user')
  async signUp(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const user = await this.usersRepository.findOne({
        where: [{ email: createUserDto?.email }],
      });
      if (user) {
        response.successResponse(
          { data: user, message: MESSAGE.USER_ALREADY_EXIST },
          res,
        );
      } else {
        const result = await this.usersService.signUp(createUserDto);
        if (result) {
          return response.successResponse(
            {
              message: CONSTANT.SUCCESS.COMPLETE_VERIFICATION('Signup'),
              data: { id: result.id },
            },
            res,
          );
        }
      }
    } catch (error) {
      return response.failureResponse(error, res);
    }
  }
  @Get('user/get')
  async getUser(@Req() user: Request, @Res() res: Response) {
    const result = await this.usersService.findAll();
    response.successResponse(
      {
        data: result,
        message: CONSTANT.SUCCESS.DEFAULT,
      },
      res,
    );
  }
}
