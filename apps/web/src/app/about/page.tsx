import type { Metadata } from 'next';
import { HeartHandshake, ShieldCheck, Target, Users } from 'lucide-react';
import { PageBanner } from '@/components/ui/page-banner';
import { Section, SectionHeading } from '@/components/ui/section';
import { FeatureCard } from '@/components/ui/card';
import { SmartImage } from '@/components/ui/smart-image';
import { PeopleCarousel } from '@/components/ui/people-carousel';
import { CtaSection } from '@/components/sections/cta';
import { aboutImages, bannerImages, boardMembers, teamMembers } from '@/lib/images';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Novus MFB — our mission to make banking simple, secure and accessible for everyday Nigerians.',
};

const values = [
  {
    icon: <Target className="h-6 w-6" />,
    title: 'Customer first',
    body: 'Every product and process is designed around what actually helps our customers.',
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: 'Trust and security',
    body: 'We protect customer data with modern security engineering and transparent practices.',
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Financial inclusion',
    body: 'We believe everyone deserves access to reliable, affordable financial services.',
  },
  {
    icon: <HeartHandshake className="h-6 w-6" />,
    title: 'Integrity',
    body: 'TODO(owner): supply approved description of this value.',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Banner image: apps/web/public/images/banners/about-hero.jpg */}
      <PageBanner
        slot={bannerImages.about}
        eyebrow="About us"
        title="Banking that puts people first"
        description="Novus MFB is a digital-first microfinance bank built to make everyday banking simpler, safer and more human."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">Our mission</h2>
            <p className="mt-4 leading-relaxed text-ink-muted">
              To empower underserved communities by providing accessible, innovative and sustainable
              financial solutions that promote entrepreneurship and economic independence.
            </p>
          </div>

          {/* Image: apps/web/public/images/about/about-intro.jpg */}
          <div className="overflow-hidden rounded-2xl border border-border">
            <SmartImage
              slot={aboutImages.intro}
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="h-full w-full"
            />
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="order-2 overflow-hidden rounded-2xl border border-border lg:order-1">
            <SmartImage
              slot={aboutImages.intro}
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="h-full w-full"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-2xl font-bold sm:text-3xl">Our Vision</h2>
            <p className="mt-4 leading-relaxed text-ink-muted">
              TODO(owner): supply approved vision statement.
            </p>
          </div>
        </div>
      </Section>

      <Section muted>
        <SectionHeading eyebrow="What we stand for" title="Our values" />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <FeatureCard key={value.title} icon={value.icon} title={value.title}>
              {value.body}
            </FeatureCard>
          ))}
        </div>
      </Section>

      <Section muted>
        <SectionHeading eyebrow="What we aim to achieve" title="Our Objectives" />
        <div className="mt-8 rounded-2xl border border-border bg-surface p-6 shadow-card sm:p-8">
          <ul className="list-disc space-y-3 pl-6 leading-relaxed text-ink-muted">
            <li>TODO(owner): supply approved objective 1.</li>
            <li>TODO(owner): supply approved objective 2.</li>
            <li>TODO(owner): supply approved objective 3.</li>
            <li>TODO(owner): supply approved objective 4.</li>
          </ul>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="How we will deliver" title="Our Strategic Goals" />
        <div className="mt-8 rounded-2xl border border-border bg-surface p-6 shadow-card sm:p-8">
          <ul className="list-disc space-y-3 pl-6 leading-relaxed text-ink-muted">
            <li>TODO(owner): supply approved strategic goal 1.</li>
            <li>TODO(owner): supply approved strategic goal 2.</li>
            <li>TODO(owner): supply approved strategic goal 3.</li>
            <li>TODO(owner): supply approved strategic goal 4.</li>
          </ul>
        </div>
      </Section>

      {/* Board of Directors.
          Portraits: apps/web/public/images/about/board-*.jpg
          Names/roles/bios: edit `boardMembers` in src/lib/images.ts */}
      <PeopleCarousel
        id="board"
        variant="board"
        label="Board of Directors"
        eyebrow="Leadership"
        title="Meet Our Board of Directors"
        description="Our board provides oversight, governance and strategic direction for the bank."
        people={boardMembers}
      />

      {/* Management team.
          Portraits: apps/web/public/images/team/*.jpg
          Names/roles/bios: edit `teamMembers` in src/lib/images.ts */}
      <div className="w-full">
        {/* Group photo: apps/web/public/images/about/team-group.jpg */}
        <div className="w-full overflow-hidden border-y border-border">
          <SmartImage
            slot={aboutImages.teamGroup}
            sizes="100vw"
            className="h-full w-full"
          />
        </div>
      </div>

      <PeopleCarousel
        id="team"
        variant="team"
        label="Our team"
        eyebrow="Our people"
        title="Meet Our Team"
        description="The people who run the day-to-day operations and support our customers."
        people={teamMembers}
      />

      <CtaSection />
    </>
  );
}
