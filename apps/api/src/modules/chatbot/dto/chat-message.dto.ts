import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

/**
 * A conversation id is either a database UUID or an in-memory id issued during
 * an outage (`mem-<base36 timestamp>-<counter>`). Anything else is rejected so
 * callers cannot create arbitrary keys in the fallback transcript map.
 */
const CONVERSATION_ID_PATTERN =
  /^(?:mem-[a-z0-9-]{1,80}|[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})$/i;

export class ChatMessageDto {
  @ApiPropertyOptional({ description: 'Existing conversation ID to continue' })
  @IsOptional()
  @IsString()
  @Matches(CONVERSATION_ID_PATTERN, {
    message: 'conversationId must be a conversation id returned by this API',
  })
  @MaxLength(100)
  conversationId?: string;

  @ApiProperty({ description: 'The customer message', maxLength: 2000 })
  @IsString()
  @MinLength(1)
  @MaxLength(2000)
  message!: string;

  @ApiPropertyOptional({ enum: ['en', 'pcm', 'yo', 'ig', 'ha'] })
  @IsOptional()
  @IsIn(['en', 'pcm', 'yo', 'ig', 'ha'])
  language?: string;
}
