import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/page-header';
import { Section } from '@/components/ui/section';
import { Card } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Your Novus MFB account dashboard.',
};

const panels = [
  {
    title: 'Support tickets',
    body: 'View and track the issues you have reported.',
    action: { label: 'Create a ticket', href: '/report' },
  },
  {
    title: 'Conversations',
    body: 'Review your chats with Nova and support agents.',
    action: null,
  },
  {
    title: 'Profile',
    body: 'Keep your contact details up to date.',
    action: null,
  },
];

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        eyebrow="Your account"
        title="Dashboard"
        description="Manage your profile, support tickets and conversations."
      />
      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          {panels.map((panel) => (
            <Card key={panel.title}>
              <h2 className="text-lg font-semibold">{panel.title}</h2>
              <p className="mt-2 text-sm text-ink-muted">{panel.body}</p>
              {panel.action ? (
                <Link
                  href={panel.action.href}
                  className="mt-4 inline-block text-sm font-semibold text-brand-700 hover:underline"
                >
                  {panel.action.label}
                </Link>
              ) : null}
            </Card>
          ))}
        </div>

        <p className="mt-8 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-warning">
          Account, transaction and balance features are not enabled in this build. Banking data will
          only appear once a real integration is approved and configured (Phase 7).
        </p>
      </Section>
    </>
  );
}
