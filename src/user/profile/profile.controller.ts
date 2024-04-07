import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Put,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth.guard';
import { CreateProfileDto } from './dto/create-profile';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile';

@Controller('api')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  // get profile
  @Get('getProfile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req): Promise<any> {
    const userId = req.user.id;
    const profile = await this.profileService.getProfileByUserId(userId);
    return {
      statusCode: 200,
      message: 'success get profile',
      data: profile,
    };
  }

  // update profile
  @Put('updateProfile')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  async updateProfile(
    @Body() updateProfile: UpdateProfileDto,
    @Request() req,
  ): Promise<any> {
    const userId = req.user.id;

    const update = await this.profileService.updateProfile(
      userId,
      updateProfile,
    );
    return {
      statusCode: 200,
      message: 'success update profile',
      data: update,
    };
  }

  // create profile
  @Post('createProfile')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  async createProfile(
    @Body() createProfileDto: CreateProfileDto,
    @Request() req,
  ): Promise<any> {
    const userId = req.user.id;

    // check if profile already exists
    const profileExist = await this.profileService.getProfileByUserId(userId);
    if (profileExist) {
      throw new HttpException('Profile already exists', 400);
    }

    // create profile
    const profile = await this.profileService.createProfile(
      userId,
      createProfileDto,
    );
    return {
      statusCode: 201,
      message: 'success create profile',
      data: profile,
    };
  }
}
