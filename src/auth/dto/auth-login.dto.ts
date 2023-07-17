import { IsEmail, IsString, IsNotEmpty, Length } from 'class-validator';

export class AuthLoginDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @Length(6, 20)
  @IsNotEmpty()
  password: string;
}