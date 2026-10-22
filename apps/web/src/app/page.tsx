import type { Metadata } from 'next';
import { Hero } from '@/components/sections/hero';
import { ServicesSection } from '@/components/sections/services';
import { DownloadAppSection } from '@/components/sections/download-app';
import { TestimonialsSection } from '@/components/sections/testimonials';
import { SecuritySection } from '@/components/sections/security';
import { SatisfactionSection } from '@/components/sections/satisfaction';
import { SupportSection } from '@/components/sections/support';
import { FaqSection } from '@/components/sections/faq';
import { CtaSection } from '@/components/sections/cta';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
};

/**
 * Homepage section order.
 *
 * The ordering below follows the verified structure of the reference site
 * (https://www.opayweb.com/), inspected directly on 2026-10-22:
 *
 *   1. Hero (photo banner + overlaid text + store badges)
 *   2. Our Services (three alternating full-width panels)
 *   3. Download the app (neutral band, phone art + QR)
 *   4. "Here is what our customers think" (testimonials)
 *   5. Security (solid brand band: media tiles + text)
 *   6. Customer satisfaction (text + media tiles)
 *   7. Support + FAQ  ← Novus addition; the reference handles this inside its app
 *   8. Closing call to action
 *
 * Sections 7 and 8 are documented Novus divergences: the reference has no
 * equivalent because it routes support and sign-up through its mobile app. They
 * are placed at the end so they do not disturb the reference's opening rhythm.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <DownloadAppSection />
      <TestimonialsSection />
      <SecuritySection />
      <SatisfactionSection />
      <SupportSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
