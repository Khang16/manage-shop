import { IsString, IsNotEmpty, MinLength, IsEmail } from 'class-validator';

export class CreateAuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;
}