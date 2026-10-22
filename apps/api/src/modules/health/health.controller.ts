import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HealthService } from './health.service';

@ApiTags('health')
@Controller({ path: 'health', version: '1' })
export class HealthController {
  constructor(private readonly health: HealthService) {}

  @Get()
  @ApiOperation({ summary: 'Liveness and dependency status of the API' })
  check() {
    return this.health.check();
  }

  @Get('live')
  @ApiOperation({ summary: 'Minimal liveness probe' })
  live() {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }
}
