import { Type } from "class-transformer";
import { IsObject, ValidateNested } from "class-validator";
import { UserActionPermission } from "./action-permission/user-action-permisson";

export class ResourceActionDto{
  @IsObject()
  @ValidateNested()
  @Type(()=> UserActionPermission)
  manageUser: UserActionPermission;
}