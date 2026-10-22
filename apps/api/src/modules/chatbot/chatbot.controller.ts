import { Body, Controller, Post, Req, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import type { Request } from 'express';
import { ChatbotService } from './chatbot.service';
import { ChatMessageDto } from './dto/chat-message.dto';

@ApiTags('chatbot')
@Controller({ path: 'chatbot', version: '1' })
export class ChatbotController {
  constructor(private readonly chatbot: ChatbotService) {}

  @Post('message')
  @HttpCode(200)
  @Throttle({ default: { ttl: 60_000, limit: 20 } })
  @ApiOperation({ summary: 'Send a message to Nova and receive a reply' })
  async message(@Body() dto: ChatMessageDto, @Req() req: Request) {
    // Authentication is optional at this endpoint (customers may chat before
    // signing in), but when a session exists the ticket is attached to the user.
    const userId = (req as Request & { user?: { id: string } }).user?.id;

    return this.chatbot.handleMessage({
      conversationId: dto.conversationId,
      message: dto.message,
      userId,
    });
  }
}
