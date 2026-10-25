'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/cn';

interface CarouselProps {
  /** Accessible name for the carousel region. */
  label: string;
  /** Total number of slides. */
  count: number;
  children: React.ReactNode;
  /** Slides shown at the smallest breakpoint, tablet, and desktop. */
  perView?: { base: number; sm: number; lg: number };
  className?: string;
}

/**
 * Accessible, responsive, touch-enabled carousel.
 *
 * One slide is stepped at a time; `count` slides are laid out and translated as a
 * single track, so the visible number of cards adapts to the breakpoint while the
 * keyboard/swipe model stays simple and predictable.
 *
 * Accessibility:
 *   - region with an accessible name;
 *   - prev/next are real buttons with labels and disabled states at the ends;
 *   - ArrowLeft/ArrowRight move between slides when the region has focus;
 *   - Home/End jump to the first/last slide;
 *   - the live region announces the current position for screen readers;
 *   - `aria-hidden` is not used on off-screen slides, so all content stays reachable.
 *
 * Touch: pointer events provide horizontal swiping without a gesture library.
 * Horizontal overflow is impossible because the track is clipped with overflow-x hidden.
 */
export function Carousel({
  label,
  count,
  children,
  perView = { base: 1, sm: 2, lg: 3 },
  className,
}: CarouselProps) {
  const [index, setIndex] = useState(0);
  const regionRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; active: boolean }>({ x: 0, active: false });

  // The furthest reachable index depends on how many slides fit on screen.
  const [visible, setVisible] = useState(perView.lg);

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      if (w >= 1024) return perView.lg;
      if (w >= 640) return perView.sm;
      return perView.base;
    };
    const update = () => {
      const next = compute();
      setVisible(next);
      setIndex((i) => Math.min(i, Math.max(0, count - next)));
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [count, perView.base, perView.sm, perView.lg]);

  const maxIndex = Math.max(0, count - visible);

  const go = useCallback(
    (next: number) => {
      const target = Math.min(Math.max(next, 0), maxIndex);
      setIndex(target);
    },
    [maxIndex],
  );

  const onKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        go(index - 1);
        break;
      case 'ArrowRight':
        event.preventDefault();
        go(index + 1);
        break;
      case 'Home':
        event.preventDefault();
        go(0);
        break;
      case 'End':
        event.preventDefault();
        go(maxIndex);
        break;
      default:
        break;
    }
  };

  const onPointerDown = (event: React.PointerEvent) => {
    drag.current = { x: event.clientX, active: true };
  };
  const onPointerUp = (event: React.PointerEvent) => {
    if (!drag.current.active) return;
    const dx = event.clientX - drag.current.x;
    drag.current.active = false;
    // 40px threshold prevents accidental navigation on a tap.
    if (dx > 40) go(index - 1);
    else if (dx < -40) go(index + 1);
  };

  const atStart = index <= 0;
  const atEnd = index >= maxIndex;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      // The region wraps the slides AND the controls, so assistive technology
      // reaches Previous/Next inside the named carousel instead of finding them
      // orphaned after it.
      onKeyDown={onKeyDown}
      className={cn(
        'w-full rounded-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2',
        className,
      )}
    >
      <div
        ref={regionRef}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (drag.current.active = false)}
        // Without this, dragging a card starts a native image drag, which fires
        // pointercancel and silently kills horizontal swiping on desktop.
        onDragStart={(event) => event.preventDefault()}
        className="touch-pan-y select-none overflow-hidden"
      >
        <div
          className="flex transition-transform duration-[400ms] ease-out"
          style={{
            // The track is wider than the viewport by count/visible. Each slide is
            // 100/count of the TRACK. translateX percentages are resolved against
            // the track's own width, so one step must also be 100/count of the
            // track — not 100/visible, which would over-scroll off the end.
            transform: `translateX(-${index * (100 / count)}%)`,
            width: `${(count / visible) * 100}%`,
          }}
        >
          {children}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => go(index - 1)}
            disabled={atStart}
            aria-label="Previous"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-ink-brand transition-colors hover:border-brand-700 hover:text-brand-700 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border disabled:hover:text-ink-brand"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            disabled={atEnd}
            aria-label="Next"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-ink-brand transition-colors hover:border-brand-700 hover:text-brand-700 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border disabled:hover:text-ink-brand"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Pagination dots */}
        <ul className="flex items-center gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <li key={i}>
              <button
                type="button"
                onClick={() => go(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index ? 'true' : undefined}
                className={cn(
                  'h-2.5 rounded-full transition-all',
                  i === index ? 'w-6 bg-brand-700' : 'w-2.5 bg-brand-200 hover:bg-brand-300',
                )}
              />
            </li>
          ))}
        </ul>
      </div>

      {/* Screen-reader position announcement */}
      <p aria-live="polite" className="sr-only">
        Showing slide {index + 1} of {maxIndex + 1}
      </p>
    </div>
  );
}
