import { IsNotEmpty, IsOptional, IsArray, IsString } from 'class-validator';

export class UpdateProfileDto {
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

  zodiac: string;

  horoscope: string;

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
