import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';

@Module({
  providers: [PrismaService, JwtService, ChatGateway, ChatService],
  imports: [],
  controllers: [ChatController],
})
export class ChatModule {}
