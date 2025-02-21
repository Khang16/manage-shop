import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
import { BaseRepository } from 'src/repositories/base.repository';
import { DataSource, DeepPartial } from 'typeorm';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
  ) {}

  async createUser(data: DeepPartial<User>): Promise<User> {
    return this.userRepository.create(data);
  }

  async getUserById(id: string | number): Promise<User | null> {
    return this.userRepository.show({ where: { id: Number(id) } });
  }

  async updateUser(id: string | number, data: Partial<User>): Promise<User> {
    return this.userRepository.update(id, data);
  }

  async deleteUser(id: string | number): Promise<void> {
    return this.userRepository.delete(id);
  }

  async paginateUsers(conditions = {}, limit = 10, page = 1, populate = []): Promise<any> {
    return this.userRepository.paginate(conditions, limit, page, populate);
  }
}