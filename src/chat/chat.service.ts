import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ChatService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async userExistsInDatabase(
    senderName: string,
    receiverName: string,
  ): Promise<boolean> {
    const senderExists = await this.prisma.user.findFirst({
      where: { username: senderName },
    });
    const receiverExists = await this.prisma.user.findFirst({
      where: { username: receiverName },
    });
    return !!senderExists && !!receiverExists; // (!!) is change to return to boolean
  }

  async verifyToken(token: string, client: any): Promise<any> {
    try {
      const decoded = await this.jwtService.verify(token.split(' ')[1], {
        secret: process.env.JWT_SECRET,
      });
      return decoded;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        client.disconnect();
        throw new Error('Token expired');
      } else {
        client.disconnect();
        throw new Error('Authentication error');
      }
    }
  }

  async findConversation(senderName: string, receiverName: string) {
    return await this.prisma.conversation.findFirst({
      where: {
        users: {
          hasEvery: [senderName, receiverName],
        },
      },
    });
  }

  async createConversation(
    senderName: string,
    receiverName: string,
    message: string,
  ) {
    return await this.prisma.conversation.create({
      data: {
        users: [senderName, receiverName],
        message: {
          create: {
            content: message,
            senderName: senderName,
          },
        },
      },
      include: {
        message: true,
      },
    });
  }

  async createMessage(senderName: string, conversation: any, message: string) {
    return await this.prisma.message.create({
      data: {
        content: message,
        senderName: senderName,
        conversationId: conversation.id,
      },
    });
  }

  async getConversation(user: string, conversation: any): Promise<any> {
    const details = conversation.map((item) => {
      return {
        conversationId: item.id,
        senderName: item.users.find((u) => u === user),
        receiverName: item.users.find((u) => u !== user),
        message: item.message,
      };
    });
    return details;
  }
}
