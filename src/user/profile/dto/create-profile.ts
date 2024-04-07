import { IsNotEmpty, IsOptional, IsArray, IsString } from 'class-validator';

export class CreateProfileDto {
  userId: string;

  @IsOptional()
  @IsString()
  profilImage?: string;

  @IsNotEmpty()
  @IsString()
  displayName: string;

  @IsNotEmpty()
  @IsString()
  gender: string;

  @IsNotEmpty()
  @IsString()
  birthday: string;

  age: number;

  horoscope: string;

  zodiac: string;

  @IsNotEmpty()
  @IsString()
  height: string;

  @IsString()
  @IsNotEmpty()
  weight: string;

  @IsArray()
  @IsNotEmpty()
  interest: string[];
}
