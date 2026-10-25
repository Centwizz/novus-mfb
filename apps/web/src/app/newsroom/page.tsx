import type { Metadata } from 'next';
import { PageBanner } from '@/components/ui/page-banner';
import { Section } from '@/components/ui/section';
import { Card } from '@/components/ui/card';
import { bannerImages } from '@/lib/images';

export const metadata: Metadata = {
  title: 'Newsroom',
  description: 'News and announcements from Novus MFB.',
};

export default function NewsroomPage() {
  return (
    <>
      <PageBanner
        slot={bannerImages.newsroom}
        eyebrow="Newsroom"
        title="News & announcements"
        description="The latest updates from Novus MFB."
      />
      <Section>
        <div className="mx-auto max-w-3xl">
          <Card className="text-center">
            <h2 className="text-lg font-semibold">No announcements yet</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              Verified press releases and company news will be published here. The admin dashboard
              will allow the bank to manage newsroom content once the platform is live.
            </p>
          </Card>
        </div>
      </Section>
    </>
  );
}
