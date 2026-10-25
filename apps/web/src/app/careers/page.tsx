import type { Metadata } from 'next';
import { PageBanner } from '@/components/ui/page-banner';
import { Section } from '@/components/ui/section';
import { Card } from '@/components/ui/card';
import { CtaSection } from '@/components/sections/cta';
import { bannerImages } from '@/lib/images';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Join the team building Novus MFB.',
};

export default function CareersPage() {
  return (
    <>
      <PageBanner
        slot={bannerImages.careers}
        eyebrow="Careers"
        title="Build the future of banking"
        description="We are always looking for people who care about doing right by customers."
      />
      <Section>
        <div className="mx-auto max-w-3xl">
          <Card className="text-center">
            <h2 className="text-lg font-semibold">No open roles listed yet</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              Vacancies will be published here once confirmed. In the meantime you can reach us at{' '}
              <span className="font-medium text-ink">{siteConfig.contact.email}</span>.
            </p>
          </Card>
        </div>
      </Section>
      <CtaSection />
    </>
  );
}
