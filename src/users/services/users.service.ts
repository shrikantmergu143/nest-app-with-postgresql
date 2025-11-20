import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../models/user.entity';
import { Repository } from 'typeorm';
import { from, Observable } from 'rxjs';
import { CreateUserDto } from '../models/post.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}
  create(data: CreateUserDto): Observable<CreateUserDto> {
    // const user = this.usersRepository.create(data);
    return from(this.usersRepository?.save(data));
  }
  findAll(): Promise<Users[]> {
    return this.usersRepository.find({ where: { status: 'active' } });
  }
  findOne(id: string): Promise<Users> {
    return this.usersRepository.findOneBy({ id });
  }
  update(id: string, data: Partial<Users>): Promise<any> {
    return this.usersRepository.update(id, data);
  }
  remove;
}
