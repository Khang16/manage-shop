import { IsEnum } from "class-validator";
import { ResourceActionValue } from "src/permissions/enums/resource-action-value.enum";

export class AllActionPermissionDto{
  @IsEnum(ResourceActionValue)
  read: ResourceActionValue;

  @IsEnum(ResourceActionValue)
  update: ResourceActionValue;

  @IsEnum(ResourceActionValue)
  delete: ResourceActionValue;

  @IsEnum(ResourceActionValue)
  create: ResourceActionValue;

}