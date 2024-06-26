import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './user/auth/auth.module';
import { PrismaService } from './prisma.service';
import { ProfileModule } from './user/profile/profile.module';
import { ChatModule } from './chat/chat.module';
import { LoggerMiddleware } from './utils/logger.middleware';

@Module({
  imports: [AuthModule, ProfileModule, ChatModule, ChatModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
