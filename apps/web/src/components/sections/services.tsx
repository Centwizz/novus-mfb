import { ArrowUpRight, CreditCard, PiggyBank, Send } from 'lucide-react';
import Link from 'next/link';
import { Section, SectionHeading } from '@/components/ui/section';
import { cn } from '@/lib/cn';

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}

const services: Service[] = [
  {
    icon: <Send className="h-6 w-6" />,
    title: 'Send & receive money',
    description:
      'Move money between Novus accounts and other Nigerian banks with clear, upfront information about any applicable limits.',
    href: '/personal',
  },
  {
    icon: <CreditCard className="h-6 w-6" />,
    title: 'Cards & everyday payments',
    description:
      'Manage your card, pay bills and keep track of spending from a single, secure dashboard.',
    href: '/personal',
  },
  {
    icon: <PiggyBank className="h-6 w-6" />,
    title: 'Savings & goals',
    description:
      'Set savings targets, automate contributions and watch your progress grow over time.',
    href: '/savings',
  },
];

export function ServicesSection() {
  return (
    <Section id="services">
      <SectionHeading
        eyebrow="Our services"
        title="Everything you need in one account"
        description="Simple, transparent banking products that help you manage everyday money and plan for what comes next."
      />

      <ul className="mt-14 grid gap-6 md:grid-cols-3">
        {services.map((service) => (
          <li key={service.title}>
            <Link
              href={service.href}
              className={cn(
                'group flex h-full flex-col rounded-2xl border border-border bg-white p-7 shadow-card transition-all duration-200',
                'hover:-translate-y-1 hover:border-brand-100 hover:shadow-card-hover',
              )}
            >
              <span
                aria-hidden="true"
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700"
              >
                {service.icon}
              </span>
              <h3 className="mt-5 text-lg font-semibold">{service.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
                {service.description}
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
                Learn more
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
