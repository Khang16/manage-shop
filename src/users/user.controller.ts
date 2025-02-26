import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException, UseGuards, BadRequestException, UseFilters, SetMetadata } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AllExceptionsFilter } from 'src/common/helper';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auths/guards/auth.guard';

@Controller('api/v1/users')
@UseFilters(AllExceptionsFilter)
@UseGuards(AuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  @SetMetadata('action', 'read')
  async findOne(@Param('id') id: number): Promise<User> {
    const user = await this.userService.getUserById(id, 'permission');
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Get()
  @SetMetadata('action', 'read')
  async index(@Body() body: { limit: number; page: number; conditions: any; populate: any }): Promise<{ data: User[]; page: number; limit: number; total: number; totalPage: number }> {
    const { limit, page, conditions, populate } = body;
    return this.userService.paginateUsers(conditions, limit, page, populate);
  }

  @Post()
  @SetMetadata('action', 'create')
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  @SetMetadata('action', 'update')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userService.getUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @SetMetadata('action', 'delete')
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    const user = await this.userService.getUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userService.deleteUser(id);
    return { message: 'User deleted successfully' };
  }
}
