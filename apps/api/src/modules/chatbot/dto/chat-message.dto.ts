import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

export class ChatMessageDto {
  @ApiPropertyOptional({ description: 'Existing conversation ID to continue' })
  @IsOptional()
  @IsString()
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
