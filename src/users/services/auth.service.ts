import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../models/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../models/create-user.dto';
import { hashPassword } from 'src/constants/utils';
import { QueryOptions } from 'src/constants/query-interface';

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
  findAll(options?: QueryOptions<Users>): Promise<Users[]> {
    return this.usersRepository.find({
      where: { status: 'active' },
      order: options?.sortBy
        ? { [options?.sortBy]: options?.order }
        : { created_at: 'DESC' },
    });
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
