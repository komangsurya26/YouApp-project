import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { PrismaService } from 'src/prisma.service';
import { Age } from './helper/age.helper';
import { Zodiac } from './helper/zodiac.helper';
import { Horoscope } from './helper/horoscope.helper';

@Module({
  imports: [],
  providers: [ProfileService, PrismaService, Zodiac, Horoscope, Age],
  controllers: [ProfileController],
})
export class ProfileModule {}
