import type { Metadata } from 'next';
import { PageBanner } from '@/components/ui/page-banner';
import { Section } from '@/components/ui/section';
import { Card } from '@/components/ui/card';
import { ButtonLink } from '@/components/ui/button';
import { bannerImages } from '@/lib/images';

export const metadata: Metadata = {
  title: 'Newsroom',
  description: 'News and announcements from Novus MFB.',
};

const newsroomArticles = [
  {
    slug: 'novus-mfb-launch-update',
    title: 'Novus MFB Launch Update',
    date: '2025-01-15',
    summary: 'An update on Novus Microfinance Bank’s digital banking rollout and commitment to accessible financial services.',
  },
  {
    slug: 'strengthening-customer-security',
    title: 'Strengthening Customer Security',
    date: '2025-02-10',
    summary: 'How Novus MFB is prioritising fraud prevention and safe digital banking practices.',
  },
];

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
        <div className="mx-auto max-w-5xl space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {newsroomArticles.map((article) => (
              <Card key={article.slug} className="flex h-full flex-col">
                <div className="flex flex-1 flex-col gap-3">
                  <time dateTime={article.date} className="text-xs uppercase tracking-wide text-ink-muted">
                    {new Date(article.date).toLocaleDateString('en-GB', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  <h2 className="text-xl font-semibold text-ink">{article.title}</h2>
                  <p className="text-sm leading-relaxed text-ink-muted">{article.summary}</p>
                </div>
                <div className="mt-6">
                  <ButtonLink href={`/newsroom/${article.slug}`} variant="secondary">
                    Read more
                  </ButtonLink>
                </div>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <p className="text-sm text-ink-muted">
              More announcements will be published here as they become available.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
