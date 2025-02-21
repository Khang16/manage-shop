import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities/users.entity";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { DataSource } from "typeorm";
import { UserRepository } from "./user.repository";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UserService,
    {
      provide: 'UserRepository',
      useFactory: (dataSource: DataSource) => new UserRepository(dataSource),
      inject: [DataSource]
    }
  ],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule{}