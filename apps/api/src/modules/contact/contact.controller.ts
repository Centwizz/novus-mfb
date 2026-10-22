import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { ContactDto } from './dto/contact.dto';

@ApiTags('contact')
@Controller({ path: 'contact', version: '1' })
export class ContactController {
  @Post()
  @HttpCode(202)
  @Throttle({ default: { ttl: 60_000, limit: 5 } })
  @ApiOperation({ summary: 'Submit a general contact enquiry' })
  submit(@Body() _dto: ContactDto) {
    // Phase 5 will persist enquiries and notify the support queue. We acknowledge
    // honestly rather than pretending an email was sent, since no provider key is
    // configured at the foundation stage.
    return {
      received: true,
      message:
        'Thank you. Your enquiry has been received and will be reviewed by our support team.',
    };
  }
}
