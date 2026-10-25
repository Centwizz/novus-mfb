'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/cn';
import type { VideoSlot } from '@/lib/videos';

interface SmartVideoProps {
  slot: VideoSlot;
  className?: string;
}

/**
 * Renders a looping brand video declared in the central manifest (`lib/videos.ts`).
 *
 * Behaviour:
 *   - muted + inline + loop, so mobile browsers are allowed to autoplay it;
 *   - the poster image is always set, so a missing/renamed file degrades to the
 *     still image instead of a broken player;
 *   - users who ask for reduced motion get the poster only — playback is paused
 *     as soon as the preference is detected.
 *
 * The video is decorative background media; the surrounding section carries the
 * real heading and copy, so it is hidden from assistive technology.
 */
export function SmartVideo({ slot, className }: SmartVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const query = window.matchMedia('(prefers-reduced-motion: reduce)');

    const apply = () => {
      if (query.matches) {
        video.pause();
      } else {
        void video.play().catch(() => {
          // Autoplay can be blocked by the browser or a battery saver; the
          // poster remains visible, which is an acceptable fallback.
        });
      }
    };

    apply();
    query.addEventListener('change', apply);
    return () => query.removeEventListener('change', apply);
  }, []);

  return (
    <video
      ref={videoRef}
      className={cn('h-full w-full object-cover', className)}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={slot.poster.src ?? undefined}
      aria-hidden="true"
      tabIndex={-1}
    >
      <source src={slot.src} type="video/mp4" />
    </video>
  );
}
