import type { Metadata } from 'next';
import { Hero } from '@/components/sections/hero';
import { ServicesSection } from '@/components/sections/services';
import { SecuritySection } from '@/components/sections/security';
import { SupportSection } from '@/components/sections/support';
import { FaqSection } from '@/components/sections/faq';
import { CtaSection } from '@/components/sections/cta';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <SecuritySection />
      <SupportSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
