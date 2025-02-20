import { Inject, Injectable } from "@nestjs/common";
import { PermissionRepository } from "./permission.repository";
import { DeepPartial } from "typeorm";
import { Permission } from "src/entities/permission.entity";

@Injectable()
export class PermissionService {
  constructor( 
    @Inject('PermissionRepository') private readonly permissionRepository: PermissionRepository
  ){}

  async createPermission(data: DeepPartial<Permission>): Promise<Permission>{
    return this.permissionRepository.create(data);
  }

  async updatePermission(id: number,data: Partial<Permission>): Promise<Permission>{
    return this.permissionRepository.update(id,data);
  }

  async indexPermission(conditions = {}, limit = 10, page = 1, populate = []): Promise<any>{
    return this.permissionRepository.paginate(conditions, limit, page, populate);
  }

  async showPermission(id: number | string): Promise<Permission>{
    return this.permissionRepository.show({ where: { id: Number(id) } });
  }

  async deletePermission(id: number): Promise<void>{
    return this.permissionRepository.delete(id)
  }
}