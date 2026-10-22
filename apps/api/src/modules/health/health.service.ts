import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class HealthService {
  constructor(private readonly prisma: PrismaService) {}

  async check() {
    const database = await this.prisma.ping();
    const aiConfigured = Boolean(process.env.AI_PROVIDER_API_KEY);

    const services = {
      database: database ? ('up' as const) : ('down' as const),
      aiProvider: aiConfigured ? ('up' as const) : ('unknown' as const),
    };

    const allUp = database;
    return {
      status: allUp ? ('ok' as const) : ('degraded' as const),
      uptime: Math.round(process.uptime()),
      version: process.env.npm_package_version ?? '1.0.0',
      timestamp: new Date().toISOString(),
      services,
    };
  }
}
