import { Module } from '@nestjs/common';
import { AuthModule } from './user/auth/auth.module';
import { PrismaService } from './prisma.service';
import { ProfileModule } from './user/profile/profile.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [AuthModule, ProfileModule, ChatModule, ChatModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
