import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { randomUUID } from 'node:crypto';

/**
 * Centralised exception filter.
 *
 * Guarantees a consistent error envelope and never leaks stack traces, database
 * errors or secrets to the client. A request ID is attached for tracing.
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger('ExceptionFilter');

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request & { requestId?: string }>();

    const requestId = request.requestId ?? randomUUID();
    response.setHeader('x-request-id', requestId);

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'An unexpected error occurred.';
    let code = 'INTERNAL_ERROR';
    let details: unknown;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      if (typeof res === 'string') {
        message = res;
      } else if (typeof res === 'object' && res !== null) {
        const body = res as Record<string, unknown>;
        const rawMessage = body.message;
        if (Array.isArray(rawMessage)) {
          message = 'Validation failed.';
          details = rawMessage;
        } else {
          message = (rawMessage as string) ?? exception.message;
        }
        code = (body.error as string)?.toUpperCase().replace(/\s+/g, '_') ?? 'HTTP_ERROR';
      }
    } else {
      // Unexpected error — log the real cause server-side only.
      this.logger.error(
        `Unhandled error [${requestId}]: ${(exception as Error)?.message}`,
        (exception as Error)?.stack,
      );
    }

    response.status(status).json({
      success: false,
      error: { code, message, ...(details ? { details } : {}) },
      requestId,
    });
  }
}
