import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { BaseRepository } from 'src/common/repositories/base.repository';
import { DataSource, DeepPartial } from 'typeorm';
import { UserRepository } from './user.repository';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { PermissionRepository } from '../permissions/permission.repository';
import { PasswordUtils } from 'src/common/helper';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
    @Inject('PermissionRepository') private readonly permissionRepository: PermissionRepository,
  ) {}

  async createUser(data: CreateUserDto): Promise<User> {
    const permission = await this.permissionRepository.show({ where: { id: Number(data.permissionId) } });
    if (!permission) {
      throw new BadRequestException('Permission không tồn tại');
    }
    // thêm phần mã hóa mật khẩu ở đây
    const bcryptPassword = await PasswordUtils.hash(data.password);
    data.password = bcryptPassword;
    const newUser = await this.userRepository.create({ ...data, permission });
    return newUser;
  }
  async getUserById(id: string | number, relation?: string): Promise<User | null> {
    const relations = relation ? [relation] : [];
    return this.userRepository.show({ where: { id: Number(id) }, relations });
  }

  async updateUser(id: string | number, data: Partial<User>): Promise<User> {
    return this.userRepository.update(id, data);
  }

  async deleteUser(id: string | number): Promise<void> {
    return this.userRepository.delete(id);
  }

  async paginateUsers(conditions = {}, limit = 10, page = 1, populate = ['permission']): Promise<any> {
    return this.userRepository.paginate(conditions, limit, page, populate,);
  }

  async findOne(username: string): Promise<any | undefined> {
    return this.userRepository.show({ where: { username } });
  }

  async findUser(id: number): Promise<any> {
    return this.userRepository.show({ where: { id }});
  }

}