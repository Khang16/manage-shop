import { Permission } from "src/entities/permission.entity";
import { User } from "src/entities/users.entity";
import { BaseRepository } from "src/repositories/base.repository";
import { DataSource } from "typeorm";

export class PermissionRepository extends BaseRepository<Permission>{
  constructor(
    dataSource: DataSource
  ){
    super(Permission, dataSource)
  }
}