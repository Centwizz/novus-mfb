import { homeImages, type ImageSlot } from './images';

/**
 * Central video manifest.
 *
 * Every looping video on the public site is declared here and rendered through
 * `<SmartVideo>`. The file always lives in `apps/web/public/videos/...`, so the
 * owner can replace a clip by dropping a new MP4 over the same filename — no
 * code change and no rebuild of any component.
 *
 * `poster` is a normal entry from the image manifest. It is shown while the
 * video buffers, if autoplay is blocked, and if the video file is missing
 * entirely, so a slot can never collapse or show a broken frame.
 *
 * See `apps/web/public/videos/README.md` for the full file inventory and
 * `docs/VIDEO_ASSET_GUIDE.md` for the replacement workflow.
 */
export interface VideoSlot {
  /** Public path of the video file. */
  src: string;
  /** Image shown before playback / when the file is unavailable. */
  poster: ImageSlot;
  /** Recommended source resolution (pixels). */
  width: number;
  height: number;
  /** CSS aspect ratio string, e.g. "4 / 3". */
  aspect: string;
  /** Short human description, used for documentation and alt text. */
  label: string;
  /** Length of the bundled placeholder clip, in seconds. */
  durationSeconds: number;
  /**
   * `true` while the file at `src` is a generated placeholder. Set to `false`
   * once the owner supplies the real footage (purely informational — the UI
   * does not change).
   */
  isPlaceholder: boolean;
}

export const homeVideos = {
  customerService: {
    src: '/videos/home/customer-service.mp4',
    poster: homeImages.satisfactionService,
    width: 1200,
    height: 900,
    aspect: '4 / 3',
    label: 'Novus MFB customer service team helping a customer',
    durationSeconds: 8,
    isPlaceholder: true,
  },
  customerStories: {
    src: '/videos/home/customer-stories.mp4',
    poster: homeImages.satisfactionCustomers,
    width: 1200,
    height: 900,
    aspect: '4 / 3',
    label: 'Novus MFB customers sharing their experience',
    durationSeconds: 8,
    isPlaceholder: true,
  },
  securityFraud: {
    src: '/videos/home/security-fraud.mp4',
    poster: homeImages.securityShield,
    width: 1004,
    height: 426,
    aspect: '1004 / 425',
    label: 'How Novus MFB protects customers from fraud',
    durationSeconds: 8,
    isPlaceholder: true,
  },
  securityLock: {
    src: '/videos/home/security-lock.mp4',
    poster: homeImages.securityLock,
    width: 1004,
    height: 426,
    aspect: '1004 / 425',
    label: 'Locking a Novus MFB card instantly in the app',
    durationSeconds: 8,
    isPlaceholder: true,
  },
} satisfies Record<string, VideoSlot>;

export type HomeVideo = (typeof homeVideos)[keyof typeof homeVideos];
