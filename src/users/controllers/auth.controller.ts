/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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
import { LoginAdminDto } from '../models/admin-login.dto';
import { Admin } from 'src/admin/entities/admin.entity';
import { compareHash } from 'src/constants/utils';
import * as jwt from 'jsonwebtoken';
import { ApiDoc } from 'src/shared/decorators/api-doc.decorator';

@Controller('auth')
export class UsersController {
  constructor(
    private usersService: UsersService,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,

    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}
  generateToken = (id, table) => {
    return jwt.sign({ id, table }, process.env.JWT_SECRET_KEY, {
      expiresIn: '365d',
    });
  };
  @Post('signup/user')
  async signUp(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      if (createUserDto?.user_type == 'admin') {
        return response?.errorResponse?.(
          {
            data: [],
            message: MESSAGE.INVALID_CREDENTIALS,
          },
          res,
        );
      }
      const user = await this.usersService.findOneEmail({
        email: createUserDto?.email,
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
  @Post('login/admin')
  @ApiDoc({
    description: 'Login Admin',
    body: {
      email: 'string',
      password: 'string',
      device_id: 'string',
      device_type: 'string',
    },
    response: {
      id: 'uuid',
      email: 'string',
    },
  })
  async adminLogin(@Body() loginAdminDto: LoginAdminDto, @Res() res: Response) {
    try {
      const adminResponse = await this.adminRepository.findOne({
        where: { email: loginAdminDto.email },
        select: [
          'id',
          'email',
          'password',
          'first_name',
          'last_name',
          'created_at',
          'updated_at',
        ],
      });
      if (!adminResponse) {
        return response.badRequest(
          { message: MESSAGE.WRONG_CREDENTIALS, data: {} },
          res,
        );
      }
      const comparePassword = await compareHash(
        loginAdminDto?.password,
        adminResponse?.password,
      );
      if (!comparePassword) {
        return response.badRequest(
          { message: MESSAGE.WRONG_CREDENTIALS, data: {} },
          res,
        );
      }
      const token = this.generateToken(adminResponse?.id, 'admin');
      response.successResponse(
        {
          data: {
            id: adminResponse?.id,
            email: adminResponse?.email,
            first_name: adminResponse?.first_name,
            last_name: adminResponse?.last_name,
            token: token,
          },
          message: CONSTANT.SUCCESS.DEFAULT,
        },
        res,
      );
    } catch (error) {
      console.log('error', error);
      return response.errorResponse(
        { message: MESSAGE.INVALID_CREDENTIALS, data: {} },
        res,
      );
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
