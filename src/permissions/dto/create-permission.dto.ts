import { IsNotEmpty, MaxLength } from "class-validator";

export class CreatePermissionDto{
  @IsNotEmpty({message: "Tên của permission không được để trống"})
  @MaxLength(50, {message: "Không quá 50 ký tự"})
  name: string;

  @IsNotEmpty({message: "Mô tả không được để trống"})
  description: string;

  @IsNotEmpty({message: "Chi tiết không được để trống"})
  detail: string;
}