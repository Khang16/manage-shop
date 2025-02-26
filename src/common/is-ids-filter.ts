import { Transform } from "class-transformer";
import { IsArray, IsInt, IsOptional, Min } from "class-validator"

export function IsIdsFilter() {
  return function (target: any, propertyKey: string){
    IsOptional()(target, propertyKey);
    IsArray()(target, propertyKey);
    IsInt({each: true})(target, propertyKey);
    Min(1, {each: true})(target, propertyKey);
    Transform((params) => {
      if(!params.value) return null;
      return params.value
        .toString()
        .split(',')
        .map((e: string) => Number(e))
    })(target, propertyKey);
  }
}
//target: là prototype của class UserDto
//propertyKey: là "ids"
//