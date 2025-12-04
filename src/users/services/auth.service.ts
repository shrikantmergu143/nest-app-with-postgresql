import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../models/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../models/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}
  signUp(data: CreateUserDto) {
    return this.usersRepository?.save(data);
  }
  findAll(): Promise<Users[]> {
    return this.usersRepository.find({ where: { status: 'active' } });
  }
  findOne(data: Users): Promise<Users> {
    return this.usersRepository.findOneBy(data);
  }
  update(id: string, data: Partial<Users>): Promise<any> {
    return this.usersRepository.update(id, data);
  }
}
