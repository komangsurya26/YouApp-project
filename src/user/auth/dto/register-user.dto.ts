import { IsEmail, IsString, Length } from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(4, 20)
  username: string;

  @IsString()
  @Length(6, 20)
  password: string;
}
