import { Test, TestingModule } from '@nestjs/testing';
import { ChatController } from './chat.controller';
import { PrismaService } from '../prisma.service';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from '../user/auth/auth.guard';
import { JwtService } from '@nestjs/jwt';

describe('ChatController', () => {
  let controller: ChatController;
  let prisma: PrismaService;
  let chatService: ChatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatController],
      providers: [ChatService, PrismaService, JwtService],
      imports: [],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => jest.fn().mockReturnValue(true) })
      .compile();

    controller = module.get<ChatController>(ChatController);
    prisma = module.get<PrismaService>(PrismaService);
    chatService = module.get<ChatService>(ChatService);
  });

  it('it should be return conversation details', () => {
    expect(controller).toBeDefined();
  });

  describe('getConversation', () => {
    it('should return conversation details', async () => {
      const mockUser = { username: 'test' };
      const mockConversationPrisma = [
        {
          id: 'conversationId_1',
          users: ['komang', 'ayudea'],
          message: [
            {
              id: 'messageId_1',
              conversationId: 'conversationId_1',
              senderName: 'komang',
              content: 'hello',
            },
          ],
        },
      ];

      const mockReturn = [
        {
          conversationId: 'conversationId_1',
          senderName: 'komang',
          receiverName: 'ayudea',
          message: [
            {
              id: 'messageId_1',
              conversationId: 'conversationId_1',
              senderName: 'ayudea',
              content: 'hai mang ini ayu',
            },
          ],
        },
      ];

      jest.spyOn(chatService, 'getConversation').mockResolvedValue(mockReturn);

      jest
        .spyOn(prisma.conversation, 'findMany')
        .mockResolvedValue(mockConversationPrisma);

      const result = await controller.getConversation({ user: mockUser });

      expect(result).toEqual(mockReturn);
    });
  });
});
