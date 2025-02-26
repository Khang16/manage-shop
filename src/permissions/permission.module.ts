import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Permission } from "src/entities/permission.entity";
import { DataSource } from "typeorm";
import { PermissionService } from "./permission.service";
import { PermissionController } from "./controllers/permission.controller";
import { PermissionRepository } from "./permission.repository";


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
