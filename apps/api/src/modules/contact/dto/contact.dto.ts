import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class ContactDto {
  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  name!: string;

  @ApiProperty()
  @IsEmail()
  email!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Matches(/^(?:\+234|0)[789][01]\d{8}$/, { message: 'Invalid Nigerian phone number' })
  phone?: string;

  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(140)
  subject!: string;

  @ApiProperty()
  @IsString()
  @MinLength(10)
  @MaxLength(5000)
  message!: string;
}
