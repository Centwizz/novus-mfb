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
      const error =
        body && typeof body === 'object' && 'error' in body
          ? (body as ApiErrorBody).error
          : { code: 'REQUEST_FAILED', message: 'Something went wrong. Please try again.' };
      return { ok: false, error };
    }

    return { ok: true, data: body as T };
  } catch {
    return {
      ok: false,
      error: { code: 'NETWORK_ERROR', message: 'We could not reach the server. Please try again.' },
    };
  }
}
