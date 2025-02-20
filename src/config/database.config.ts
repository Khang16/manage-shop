import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Permission } from "src/entities/permission.entity";
import { User } from "src/entities/users.entity";

export  const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'khang1422',
  database: 'manage-shop',
  entities: [User, Permission],
  synchronize: true
}