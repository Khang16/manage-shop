import { BaseRepository } from "src/repositories/base.repository";
import { User } from "src/entities/users.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

export class UserRepository extends BaseRepository<User>{
  constructor(
    dataSource: DataSource
  ){
    super(User, dataSource)
  }
}