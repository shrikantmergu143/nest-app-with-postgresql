/* eslint-disable no-unsafe-optional-chaining */
import { Body, Controller, Delete, Get, Post, Req, Res } from '@nestjs/common';
import { CreateUserDto } from '../models/create-user.dto';
import response from 'src/constants/response';
import { Request, Response } from 'express';
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
        response?.errorResponse?.(
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
  @Delete('user/delete/:id')
  async deleteUser(@Req() req: Request, @Res() res: Response) {
    const { id } = req?.params;
    try {
      const result = await this?.usersRepository?.delete(id);
      console.log('result', result);
      if (result?.affected) {
        return response?.successResponse(
          {
            message: CONSTANT.SUCCESS.DELETE('User'),
            data: { id: id },
          },
          res,
        );
      } else {
        return response?.errorResponse(
          {
            message: CONSTANT.ERROR.NOT_FOUND('User'),
            data: { id: id },
          },
          res,
        );
      }
    } catch (error) {
      return response?.failureResponse(error, res);
    }
  }
}
