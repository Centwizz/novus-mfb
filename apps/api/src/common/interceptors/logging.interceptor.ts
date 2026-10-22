import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { randomUUID } from 'node:crypto';
import type { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * Attaches a request ID to every request/response and emits a structured access
 * log line. Sensitive fields are never logged.
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const http = context.switchToHttp();
    const request = http.getRequest<Request & { requestId?: string }>();
    const response = http.getResponse<Response>();

    const requestId = request.requestId ?? randomUUID();
    request.requestId = requestId;
    response.setHeader('x-request-id', requestId);

    const start = Date.now();
    const { method, originalUrl } = request;

    return next.handle().pipe(
      tap({
        next: () => {
          const ms = Date.now() - start;
          // eslint-disable-next-line no-console
          console.log(`${method} ${originalUrl} ${response.statusCode} ${ms}ms [${requestId}]`);
        },
        error: () => {
          const ms = Date.now() - start;
          // eslint-disable-next-line no-console
          console.log(`${method} ${originalUrl} ERROR ${ms}ms [${requestId}]`);
        },
      }),
    );
  }
}
