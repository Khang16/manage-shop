import { 
  IsEmail, 
  IsEnum, 
  IsNotEmpty, 
  IsPhoneNumber, 
  MaxLength, 
  MinLength, 
  IsNumber 
} from "class-validator";

export enum UserRole {
  ADMIN = 1,
  SHOP_OWNER = 2,
  STAFF = 3,
  CUSTOMER = 4,
}

export class CreateUserDto {
  @IsNotEmpty({ message: 'Tên không được để trống' })
  @MaxLength(50, { message: 'Không quá 50 ký tự' })
  username: string;

  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @MinLength(5, { message: 'Mật khẩu ít nhất có 6 ký tự' })
  password: string;

  @IsEmail({}, { message: 'Email không hợp lệ' })
  @IsNotEmpty({ message: 'Email không được để trống' })
  email: string;

  @IsPhoneNumber('VN', { message: 'Số điện thoại không hợp lệ' })
  phone: string;

  @IsNotEmpty({ message: 'Địa chỉ không được để trống' })
  @MinLength(10, { message: 'Địa chỉ phải có ít nhất 10 ký tự' })
  address: string;

  @IsEnum(UserRole, { message: 'Vai trò không hợp lệ' })
  @IsNotEmpty({ message: 'Vai trò không được để trống' })
  role: UserRole;


}
