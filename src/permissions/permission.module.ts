import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Permission } from "src/entities/permission.entity";
import { PermissionService } from "./permission.service";
import { DataSource } from "typeorm";
import { PermissionRepository } from "./permission.repository";
import { PermissionController } from "./permission.controller";

@Module(
  {
    imports: [TypeOrmModule.forFeature([Permission])],
    providers: [
      PermissionService,
      {
        provide: 'PermissionRepository',
        useFactory: (dataSource: DataSource)=> new PermissionRepository(dataSource),
        inject: [DataSource]
      }
    ],
    controllers: [PermissionController],
    exports: [PermissionService]
  }
)
export class PermissionModule{}
