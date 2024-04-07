import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile';
import { PrismaService } from 'src/prisma.service';
import { UpdateProfileDto } from './dto/update-profile';
import { Age } from './helper/age.helper';
import { Zodiac } from './helper/zodiac.helper';
import { Horoscope } from './helper/horoscope.helper';

@Injectable()
export class ProfileService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly zodiac: Zodiac,
    private readonly horoscope: Horoscope,
    private readonly age: Age,
  ) {}

  async createProfile(
    userId: string,
    createProfileDto: CreateProfileDto,
  ): Promise<any> {
    const { birthday } = createProfileDto;

    // calculate age
    const ageProfile = this.age.calculateAge(birthday);

    // calculate zodiac
    const zodiacSign = this.zodiac.calculateZodiac(birthday);

    // calculate horoscope
    const horoscopeSign = this.horoscope.calculateHoroscope(birthday);

    return await this.prismaService.profile.create({
      data: {
        userId,
        ...createProfileDto,
        age: ageProfile,
        zodiac: zodiacSign,
        horoscope: horoscopeSign,
      },
    });
  }

  async getProfileByUserId(userId: string): Promise<any> {
    return await this.prismaService.profile.findFirst({
      where: {
        userId,
      },
    });
  }

  async updateProfile(
    userId: string,
    updateProfile: UpdateProfileDto,
  ): Promise<any> {
    const { birthday, ...updateDataProfile } = updateProfile;

    // if birthday update
    if (birthday) {
      const zodiacSign = this.zodiac.calculateZodiac(birthday);
      const horoscopeSign = this.horoscope.calculateHoroscope(birthday);
      const ageProfileSign = this.age.calculateAge(birthday);
      updateDataProfile.zodiac = zodiacSign;
      updateDataProfile.horoscope = horoscopeSign;
      updateDataProfile.age = ageProfileSign;
    }

    return await this.prismaService.profile.updateMany({
      where: {
        userId,
      },
      data: {
        birthday,
        ...updateDataProfile,
      },
    });
  }
}
