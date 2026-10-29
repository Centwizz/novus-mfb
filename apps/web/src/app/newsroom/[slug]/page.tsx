import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageBanner } from '@/components/ui/page-banner';
import { Section } from '@/components/ui/section';
import { Card } from '@/components/ui/card';
import { ButtonLink } from '@/components/ui/button';
import { bannerImages } from '@/lib/images';

const newsroomArticles = [
  {
    slug: 'novus-mfb-launch-update',
    title: 'Novus MFB Launch Update',
    date: '2025-01-15',
    summary: 'An update on Novus Microfinance Bank’s digital banking rollout and commitment to accessible financial services.',
    content:
      'Novus MFB is committed to delivering simple, secure and accessible financial services. This update highlights our focus on customer-centric banking, robust security practices, and expanding access to essential financial tools for individuals and businesses. More details will be shared as we reach key milestones.',
  },
  {
    slug: 'strengthening-customer-security',
    title: 'Strengthening Customer Security',
    date: '2025-02-10',
    summary: 'How Novus MFB is prioritising fraud prevention and safe digital banking practices.',
    content:
      'Security remains at the core of everything we do at Novus MFB. We continuously enhance safeguards across our digital channels, educate customers on safe banking habits, and provide clear reporting channels for any suspected fraud. If you suspect fraud, please use our official Report an Issue page or contact our support team through verified channels.',
  },
];

function getArticle(slug: string) {
  return newsroomArticles.find((article) => article.slug === slug);
}

export function generateStaticParams() {
  return newsroomArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: `${article.title} | Newsroom`,
    description: article.summary,
  };
}

export default async function NewsroomArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      <PageBanner
        slot={bannerImages.newsroom}
        eyebrow="Newsroom"
        title={article.title}
        description={article.summary}
      />
      <Section>
        <div className="mx-auto max-w-3xl space-y-8">
          <Card className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-ink-muted">
              <time dateTime={article.date}>
                {new Date(article.date).toLocaleDateString('en-GB', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <Link href="/newsroom" className="text-brand-700 hover:underline">
                Back to Newsroom
              </Link>
            </div>
            <div className="prose prose-slate max-w-none">
              <p className="text-base leading-relaxed text-ink">{article.content}</p>
            </div>
          </Card>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/newsroom" variant="secondary">
              View all announcements
            </ButtonLink>
            <ButtonLink href="/contact">Contact us</ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
