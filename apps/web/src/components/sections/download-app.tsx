import { QrCode } from 'lucide-react';
import { DownloadAppArt } from './download-app-art';

/**
 * "Download the app" band — present in the reference and missing from the previous build.
 *
 * Reference measurements (desktop, from opayweb.com CSS):
 *   - .pc-download-app:            background #ededed, padding 4.04vw 0
 *   - .pc-container:               padding 4.04vw 5.65vw
 *   - .pc-download-image-wrapper:  49.56vw x 27.56vw (~713x397), border-radius 8px
 *   - .pc-download-text-wrapper:   margin-left 3.91vw, width 31vw
 *   - .pc-download-qr:             12vw x 12.4vw (~173x179)
 *   - .pc-download-text-content:   font-size 2.08vw (~30px)
 *
 * Novus has no published app. Rather than fabricate store links, this section states
 * the position honestly and reserves the correct space so the layout matches.
 */
export function DownloadAppSection() {
  return (
    <section className="w-full bg-band">
      <div className="w-full px-[5.65vw] py-[4.04vw]">
        <div className="flex flex-col items-center lg:flex-row lg:items-center lg:justify-start">
          {/* Phone / app artwork */}
          <div className="relative h-auto w-full shrink-0 overflow-hidden rounded-lg lg:aspect-[49.56/27.56] lg:h-auto lg:w-[49.56vw]">
            <div className="aspect-[49.56/27.56] w-full">
              <DownloadAppArt className="h-full w-full" />
            </div>
          </div>

          {/* Text + QR */}
          <div className="mt-8 flex w-full flex-col items-start lg:ml-[3.91vw] lg:mt-0 lg:w-[31vw]">
            <div className="mb-[1.39vw] flex h-[32vw] w-[32vw] justify-center lg:ml-[6px] lg:h-[12.4vw] lg:w-[12vw]">
              <QrPlaceholder />
            </div>

            <div className="mt-[1.39vw] text-[5vw] lg:text-[2.08vw]">
              <p className="text-ink-brand">
                Use your phone camera to scan and download the {`Novus`} app.
              </p>
              <p className="mt-1 font-normal text-ink-brand">
                Available on{' '}
                <span className="font-semibold text-brand-700">iOS</span> and{' '}
                <span className="font-semibold text-brand-700">Android</span>
              </p>
              <p className="mt-2 text-[3.4vw] text-ink-muted lg:text-[1vw]">
                The mobile app is not published yet. This section will be activated once the
                app is released.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * QR placeholder at the reference's exact dimensions. Rendered as a clearly-marked
 * empty frame rather than a real (and therefore misleading) scannable code.
 */
function QrPlaceholder() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 border-2 border-dashed border-brand-200 bg-white text-center">
      <QrCode className="h-1/3 w-1/3 text-brand-300" aria-hidden="true" />
      <span className="px-2 text-[2.6vw] font-medium text-ink-subtle lg:text-[0.7vw]">
        QR code available at launch
      </span>
    </div>
  );
}
