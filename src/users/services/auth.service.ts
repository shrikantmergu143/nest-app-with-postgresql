import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../models/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../models/create-user.dto';
import { hashPassword } from 'src/constants/utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}
  async signUp(data: CreateUserDto) {
    const password: string = await hashPassword(data?.password);
    return this.usersRepository?.save({
      ...data,
      password: password,
    });
  }
  findAll(): Promise<Users[]> {
    return this.usersRepository.find({ where: { status: 'active' } });
  }
  findOne(data?: Users): Promise<Users> {
    return this.usersRepository.findOneBy(data);
  }
  findOneEmail(data?: { email: string }): Promise<Users> {
    return this.usersRepository.findOneBy(data);
  }
  update(id: string, data: Partial<Users>): Promise<any> {
    return this.usersRepository.update(id, data);
  }
  delete(id: string): Promise<any> {
    return this.usersRepository.delete(id);
  }
}
