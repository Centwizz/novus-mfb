import type { Metadata } from 'next';
import { CheckCircle, Handshake, HeartHandshake, Leaf, ShieldCheck, Target, TrendingUp, Users } from 'lucide-react';
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
          <div className="order-2 overflow-hidden rounded-2xl border border-border lg:order-1">
            <SmartImage
              slot={aboutImages.intro}
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="h-full w-full"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-2xl font-bold sm:text-3xl">Our Story</h2>
            <p className="mt-4 leading-relaxed text-ink-muted">
              Licensed by the Central Bank of Nigeria (CBN) on March 8 2024 to operate as Novus
              Microfinance Bank. "Novus" is a Latin word meaning "New" reflecting our commitment to
              innovative and exceptional financial services. The bank was established to cater to
              the banking needs of the Benue populace by providing support for individuals,
              businesses, and agricultural activities, job creation, commerce, and rural
              development. This would be done by providing low cost – high impact financial
              products conceived to suit the peculiarities of Benue State residents. The ‘New’ in
              ‘Novus’ is a reflection of our commitment to innovative and exceptional financial
              services.
            </p>
          </div>
        </div>
      </Section>

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
              Unlocking financial freedom and opportunities for all.
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
        <p className="mt-6 max-w-4xl leading-relaxed text-ink-muted">
          Our goal is to promote economic development in the community by offering financial
          services to its members and by supporting individuals, nMSMEs, and agricultural
          endeavours as well as job creation, trade, and rural development. This will be
          accomplished by offering low-cost, high-impact financial products that are tailored to
          the unique needs of the community.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: 'Tailored Financial Products' },
            { title: 'Job Creation Initiatives' },
            { title: 'Commerce Support' },
            { title: 'Rural Development Projects' },
          ].map((item) => (
            <div
              key={item.title}
              className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4 shadow-card"
            >
              <CheckCircle className="h-5 w-5 text-brand-700" />
              <span className="font-medium text-ink">{item.title}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="How we will deliver" title="Our Strategic Goals" />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard icon={<Users className="h-6 w-6" />} title="Expand Financial Inclusion">
            Reach more unbanked and underserved populations, especially in rural areas.
          </FeatureCard>
          <FeatureCard icon={<Target className="h-6 w-6" />} title="Enhance Customer Experience">
            Leverage technology to improve service delivery and customer satisfaction.
          </FeatureCard>
          <FeatureCard icon={<Handshake className="h-6 w-6" />} title="Strengthen Partnerships">
            Collaborate with strategic partners to enhance our service offerings and reach.
          </FeatureCard>
          <FeatureCard icon={<Leaf className="h-6 w-6" />} title="Promote Economic Development">
            Support the growth of small businesses and agricultural enterprises through tailored
            financial products.
          </FeatureCard>
          <FeatureCard icon={<ShieldCheck className="h-6 w-6" />} title="Ensure Regulatory Compliance">
            Adhere to all regulatory requirements and maintain the highest standards of corporate
            governance.
          </FeatureCard>
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
