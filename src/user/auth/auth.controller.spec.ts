import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from '../../prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { HttpException, NotFoundException } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, PrismaService, JwtService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should return success register', async () => {
    const registerDto: RegisterUserDto = {
      username: 'testuser',
      email: 'testemail@example.com',
      password: 'testpassword',
    };

    const mockReturn = {
      statusCode: 201,
      message: 'success register',
      data: {
        id: '1',
        email: 'testemail@example.com',
        username: 'testuser',
      },
    };

    jest.spyOn(authService, 'register').mockResolvedValueOnce(mockReturn);

    const result = await controller.register(registerDto);

    expect(result).toEqual(mockReturn);
  });

  it('should return user details with token if login is successful', async () => {
    const loginDto: LoginUserDto = {
      username: 'testuser',
      password: 'testpassword',
    };

    const mockUser = {
      id: '1',
      username: 'testuser',
      email: 'testemail@example.com',
      password: '$2b$10$HXkZxN8ANaE5VJQ9/U6BduhMFE.3tjHxk9QIyH4Wd9l/ZxGXQyRYrd', // hashed password
    };

    const mockToken = 'testtoken.jwt';

    jest.spyOn(authService, 'login').mockResolvedValueOnce({
      id: mockUser.id,
      username: mockUser.username,
      token: mockToken,
    });

    const result = await controller.login(loginDto);

    expect(result).toEqual({
      statusCode: 200,
      message: 'success login',
      data: {
        id: mockUser.id,
        username: mockUser.username,
        token: mockToken,
      },
    });
  });
  it('should return failed login because password is incorrect', async () => {
    const loginDto: LoginUserDto = {
      username: 'testuser',
      password: 'wrongpassword', // wrong password
    };

    jest
      .spyOn(authService, 'login')
      .mockRejectedValueOnce(new NotFoundException('Invalid password'));

    try {
      await controller.login(loginDto);
    } catch (error) {
      expect(error.status).toEqual(500);
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toEqual('Invalid password');
    }
  });

  it('should throw 500 error if login fails due to user not found', async () => {
    const loginDto: LoginUserDto = {
      username: 'usernotfound', // wrong username
      password: 'wrongpassword',
    };

    jest
      .spyOn(authService, 'login')
      .mockRejectedValueOnce(new NotFoundException('User not found'));

    try {
      await controller.login(loginDto);
    } catch (error) {
      expect(error.status).toEqual(500);
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toEqual('User not found');
    }
  });
});
