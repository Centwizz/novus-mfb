import { siteConfig } from '@/lib/site-config';

export interface ApiErrorBody {
  success: false;
  error: { code: string; message: string; details?: unknown };
}

/**
 * Thin fetch wrapper for the Novus MFB API.
 *
 * Always sends credentials so httpOnly session cookies are included, and normalises
 * error responses into a predictable shape for forms to display.
 */
export async function apiFetch<T>(
  path: string,
  init: RequestInit = {},
): Promise<{ ok: true; data: T } | { ok: false; error: ApiErrorBody['error'] }> {
  try {
    const res = await fetch(`${siteConfig.apiUrl}${path}`, {
      ...init,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(init.headers ?? {}),
      },
    });

    const body = (await res.json().catch(() => null)) as unknown;

    if (!res.ok) {
      const parsed =
        body && typeof body === 'object' && 'error' in body
          ? (body as ApiErrorBody).error
          : null;

      if (parsed) return { ok: false, error: parsed };

      // A 404 means the route is not implemented yet (for example the auth
      // endpoints, which arrive in Phase 4). Saying so is more useful than a
      // generic failure that invites retries.
      const notImplemented = res.status === 404;
      return {
        ok: false,
        error: {
          code: notImplemented ? 'NOT_IMPLEMENTED' : 'REQUEST_FAILED',
          message: notImplemented
            ? path.startsWith('/auth')
              ? 'Accounts are not open yet. Sign-in and registration arrive in a later release.'
              : 'This feature is not available yet. It is scheduled for a later release.'
            : 'Something went wrong. Please try again.',
        },
      };
    }

    return { ok: true, data: body as T };
  } catch {
    return {
      ok: false,
      error: { code: 'NETWORK_ERROR', message: 'We could not reach the server. Please try again.' },
    };
  }
}
