import { Test, TestingModule } from '@nestjs/testing';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { PrismaService } from '../../prisma.service';
import { Zodiac } from './helper/zodiac.helper';
import { Horoscope } from './helper/horoscope.helper';
import { Age } from './helper/age.helper';
import { UpdateProfileDto } from './dto/update-profile';
import { CreateProfileDto } from './dto/create-profile';
import { HttpException } from '@nestjs/common';

describe('ProfileController', () => {
  let controller: ProfileController;
  let profileService: ProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
      providers: [ProfileService, PrismaService, Zodiac, Horoscope, Age],
    }).compile();

    controller = module.get<ProfileController>(ProfileController);
    profileService = module.get<ProfileService>(ProfileService);
  });

  it('should be return user profile', async () => {
    const userId = '1';
    const mockProfile = {
      id: '1',
      userId: '1',
    };

    jest
      .spyOn(profileService, 'getProfileByUserId')
      .mockResolvedValueOnce(mockProfile);

    const req = { user: { id: userId } };
    const result = await controller.getProfile(req);

    expect(result).toEqual({
      statusCode: 200,
      message: 'success get profile',
      data: mockProfile,
    });
  });

  it('should be return success update profile', async () => {
    const userId = '1';
    const updateProfile: UpdateProfileDto = {
      profilImage: 'www.fototest.com',
      displayName: 'test',
      gender: 'Male',
      birthday: '26 07 2002',
      age: 21,
      horoscope: 'Leo',
      zodiac: 'Lion',
      height: '180 cm',
      weight: '75 kg',
      interest: ['Game', 'Gym', 'Music'],
    };

    const mockUpdateProfile = {
      id: 'profileId',
      userId,
      ...updateProfile,
    };

    jest
      .spyOn(profileService, 'updateProfile')
      .mockResolvedValueOnce(mockUpdateProfile);

    const req = { user: { id: userId } };
    const result = await controller.updateProfile(updateProfile, req);

    expect(result).toEqual({
      statusCode: 200,
      message: 'success update profile',
      data: mockUpdateProfile,
    });
  });

  it('should be return success create profile', async () => {
    const userId = '1';
    const createProfileDto: CreateProfileDto = {
      userId,
      profilImage: 'www.fototest.com',
      displayName: 'test',
      gender: 'Male',
      birthday: '26 07 2002',
      age: 21,
      horoscope: 'Leo',
      zodiac: 'Lion',
      height: '180 cm',
      weight: '75 kg',
      interest: ['Game', 'Gym', 'Music'],
    };

    const mockProfile = {
      id: 'profileId',
      userId,
      ...createProfileDto,
    };

    jest
      .spyOn(profileService, 'getProfileByUserId')
      .mockResolvedValueOnce(null);

    jest
      .spyOn(profileService, 'createProfile')
      .mockResolvedValueOnce(mockProfile);

    const req = { user: { id: userId } };
    const result = await controller.createProfile(createProfileDto, req);

    expect(result).toEqual({
      statusCode: 201,
      message: 'success create profile',
      data: mockProfile,
    });
  });

  it('should be return error if profile already exists', async () => {
    const userId = '1';
    const createProfileDto: CreateProfileDto = {
      userId,
      profilImage: 'www.fototest.com',
      displayName: 'test',
      gender: 'Male',
      birthday: '26 07 2002',
      age: 21,
      horoscope: 'Leo',
      zodiac: 'Lion',
      height: '180 cm',
      weight: '75 kg',
      interest: ['Game', 'Gym', 'Music'],
    };

    jest.spyOn(profileService, 'getProfileByUserId').mockResolvedValueOnce({});

    const req = { user: { id: userId } };

    await expect(
      controller.createProfile(createProfileDto, req),
    ).rejects.toThrow(new HttpException('Profile already exists', 400));
  });
});
