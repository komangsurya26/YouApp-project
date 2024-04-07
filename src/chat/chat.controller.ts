import {
  Controller,
  Get,
  HttpCode,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { JwtAuthGuard } from 'src/user/auth/auth.guard';
import { ChatService } from './chat.service';

@Controller('api')
export class ChatController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly chatService: ChatService,
  ) {}

  @Get('viewConversation')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  async getConversation(@Request() req): Promise<any> {
    // request user with token
    const user = req.user.username;

    // get conversation by token user
    const conversation = await this.prisma.conversation.findMany({
      where: {
        users: {
          has: user,
        },
      },
      include: {
        message: true,
      },
    });

    // get conversation details with id, senderName, receiverName
    const conversationDetails = await this.chatService.getConversation(
      user,
      conversation,
    );

    return conversationDetails;
  }
}
