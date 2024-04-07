import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { PrismaService } from 'src/prisma.service';
import { Socket } from 'socket.io';

@WebSocketGateway({
  namespace: '/api/sendMessage',
})
export class ChatGateway {
  @WebSocketServer() server;

  constructor(
    private readonly chatService: ChatService,
    private readonly prisma: PrismaService,
  ) {}

  @SubscribeMessage('sendMessage')
  async handleChat(client: Socket, data: any): Promise<void> {
    try {
      // cek token user valid
      const token = client.handshake.headers.authorization;
      const decodeToken = await this.chatService.verifyToken(token, client);
      const senderName = decodeToken.username;

      //create receiver with query
      const receiverName = client.handshake.query.to;
      const message = data;

      // check data type
      if (
        typeof senderName !== 'string' ||
        typeof receiverName !== 'string' ||
        typeof message !== 'string'
      ) {
        throw new Error('Invalid data: data must be string');
      }

      // cek receiver not empty
      if (!receiverName || receiverName === '') {
        client.disconnect();
        throw new Error('Invalid data: receiver cannot empty');
      }

      // cek message and receiver not empty
      if (!message || message === '') {
        throw new Error('Invalid data: data cannot empty');
      }

      //make sure have 2 users different
      if (senderName === receiverName) {
        client.disconnect();
        throw new Error('Invalid data: sender and receiver cannot be same');
      }

      // cek userName and receiveName exist in database
      const userExist = await this.chatService.userExistsInDatabase(
        senderName,
        receiverName,
      );

      // throw error if user not found
      if (!userExist) {
        client.disconnect();
        throw new Error('User not found');
      }

      // cek conversation already exist or not
      const conversation = await this.chatService.findConversation(
        senderName,
        receiverName,
      );

      // if conversation not exist, create conversation
      if (!conversation) {
        const convers = await this.chatService.createConversation(
          senderName,
          receiverName,
          message,
        );
        client.join(convers.id);
        this.server.to(convers.id).emit('receiveMessage', message);

        // if conversation exist, send message
      } else {
        await this.chatService.createMessage(senderName, conversation, message);
        client.join(conversation.id);
        this.server.to(conversation.id).emit('receiveMessage', message);
      }
    } catch (error) {
      console.log('Error: ', error.message);
      // send errror to client
      this.server.emit('errorMessage', error.message);
    }
  }
}
