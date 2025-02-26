import { BaseRepository } from "src/common/repositories/base.repository";
import { User } from "src/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

export class UserRepository extends BaseRepository<User>{
  constructor(
    dataSource: DataSource
  ){
    super(User, dataSource)
  }
}