import { PartialType } from "@nestjs/swagger";
import { CreatePermissionDto } from "./create-permission.dto";

export class UpdatedPermissionDto extends PartialType(CreatePermissionDto){
  
}