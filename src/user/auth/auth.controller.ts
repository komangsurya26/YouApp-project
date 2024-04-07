import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('api')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  async login(@Body() loginDto: LoginUserDto): Promise<any> {
    try {
      const result = await this.authService.login(loginDto);
      return {
        statusCode: 200,
        message: 'success login',
        data: result,
      };
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  @Post('register')
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  async register(@Body() registerDto: RegisterUserDto): Promise<any> {
    try {
      return await this.authService.register(registerDto);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
