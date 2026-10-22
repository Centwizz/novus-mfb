/**
 * Shared types across the Novus MFB platform.
 * Imported by both the Next.js web app and the NestJS API.
 */

export type UserRole = 'CUSTOMER' | 'SUPPORT_AGENT' | 'ADMIN' | 'SUPER_ADMIN';

export type TicketStatus =
  | 'OPEN'
  | 'IN_PROGRESS'
  | 'WAITING_FOR_CUSTOMER'
  | 'ESCALATED'
  | 'RESOLVED'
  | 'CLOSED';

export type TicketPriority = 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';

export type ConversationStatus = 'ACTIVE' | 'ESCALATED' | 'AGENT_JOINED' | 'CLOSED';

export type MessageSender = 'CUSTOMER' | 'NOVA' | 'AGENT' | 'SYSTEM';

export type SupportedLanguage = 'en' | 'pcm' | 'yo' | 'ig' | 'ha';

export interface ApiSuccess<T> {
  success: true;
  data: T;
  meta?: PaginationMeta;
  requestId?: string;
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
  requestId?: string;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

export interface PaginationMeta {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

export interface PaginationQuery {
  page?: number;
  perPage?: number;
}

export interface HealthStatus {
  status: 'ok' | 'degraded' | 'down';
  uptime: number;
  version: string;
  timestamp: string;
  services: Record<string, 'up' | 'down' | 'unknown'>;
}
