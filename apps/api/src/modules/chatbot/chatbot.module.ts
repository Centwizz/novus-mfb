import { Module } from '@nestjs/common';
import { ChatbotController } from './chatbot.controller';
import { ChatbotService } from './chatbot.service';
import { LLM_ADAPTER } from './llm/llm-adapter.interface';
import { OpenAiCompatibleAdapter } from './llm/openai-compatible.adapter';

@Module({
  controllers: [ChatbotController],
  providers: [
    ChatbotService,
    {
      provide: LLM_ADAPTER,
      useClass: OpenAiCompatibleAdapter,
    },
  ],
})
export class ChatbotModule {}
