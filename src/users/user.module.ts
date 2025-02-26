import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { DataSource } from "typeorm";
import { Permission } from "src/entities/permission.entity";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserRepository } from "./user.repository";
import { PermissionRepository } from "../permissions/permission.repository";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "src/auths/strategies/local.strategy";

@Module({
  imports: [TypeOrmModule.forFeature([User,Permission]), PassportModule.register({ session: true })],
  providers: [
    UserService,
    {
      provide: 'UserRepository',
      useFactory: (dataSource: DataSource) => new UserRepository(dataSource),
      inject: [DataSource]
    },

    {
      provide: 'PermissionRepository',
      useFactory: (dataSource: DataSource)=> new PermissionRepository(dataSource),
      inject: [DataSource]
    },
    LocalStrategy,
  ],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule{}