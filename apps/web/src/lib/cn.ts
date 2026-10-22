import type { ClassValue } from './cn-types';

/**
 * Minimal className join helper. Avoids pulling in clsx/tailwind-merge for the
 * handful of conditional classes we need, while still filtering falsy values.
 */
export function cn(...classes: ClassValue[]): string {
  return classes
    .flatMap((value) => {
      if (!value) return [];
      if (typeof value === 'string' || typeof value === 'number') return [String(value)];
      if (Array.isArray(value)) return [cn(...value)];
      if (typeof value === 'object') {
        return Object.entries(value)
          .filter(([, enabled]) => Boolean(enabled))
          .map(([key]) => key);
      }
      return [];
    })
    .join(' ');
}
