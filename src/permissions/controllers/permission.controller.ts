import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseFilters } from "@nestjs/common";
import { AllExceptionsFilter } from "src/common/helper";
import { Permission } from "src/entities/permission.entity";
import { PermissionService } from "../permission.service";
import { CreatePermissionDto } from "../dto/create-permission.dto";
import { UpdatedPermissionDto } from "../dto/update-permission.dto";
import { ApiBody, ApiTags } from "@nestjs/swagger";


@Controller('api/v1/permissions')
@ApiTags('permissions')
@UseFilters(AllExceptionsFilter)
export class PermissionController{
  constructor(private permissionService: PermissionService){}

  @Post()
  @ApiBody({
    type: CreatePermissionDto
  })
  async create(@Body() createPermissionDto: CreatePermissionDto): Promise<Permission>{
    return this.permissionService.createPermission(createPermissionDto)
  }

  @Get(':id')
  async show(@Param('id') id: number): Promise<Permission>{
    return this.permissionService.showPermission(id)
  }

  @Get()
  async index(@Body() body: {limit: number; page: number; conditions: any; populate: any}): Promise<Permission[]>{
    const {limit, page, conditions, populate} = body
    return this.permissionService.indexPermission(conditions, limit, page, populate)
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updatedPermissionDto: UpdatedPermissionDto): Promise<Permission>{
    const updatedData = {
      ...updatedPermissionDto,
      resourceActions: JSON.stringify(updatedPermissionDto.resourceActions)
    };
    return this.permissionService.updatePermission(id, updatedData)
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{message: string}>{
     const permission = await this.permissionService.showPermission(id);
        if (!permission) {
          throw new NotFoundException('User not found');
        }
        await this.permissionService.deletePermission(id);
        return { message: 'Permission deleted successfully' };
  }
}