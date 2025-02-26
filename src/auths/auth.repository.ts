import { User } from "src/entities/user.entity";
import { BaseRepository } from "src/common/repositories/base.repository";
import { DataSource } from "typeorm";

export class AuthRepository extends BaseRepository<User>{
  constructor(
    dataSource: DataSource
  ){
    super(User, dataSource);
  }
}