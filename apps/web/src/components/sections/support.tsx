import { MessageCircle, PhoneCall, Sparkles } from 'lucide-react';
import { Section, SectionHeading } from '@/components/ui/section';
import { ButtonLink } from '@/components/ui/button';
import { siteConfig } from '@/lib/site-config';

const channels = [
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: `${siteConfig.assistant.name}, our virtual assistant`,
    body: 'Ask questions any time and get instant, knowledge-based answers in English, Pidgin, Yoruba, Igbo or Hausa.',
    action: { label: 'Start a chat', href: '/contact' },
  },
  {
    icon: <MessageCircle className="h-6 w-6" />,
    title: 'Submit a support ticket',
    body: 'Report an issue or complaint and track its progress with a reference number.',
    action: { label: 'Report an issue', href: '/report' },
  },
  {
    icon: <PhoneCall className="h-6 w-6" />,
    title: 'Speak to our team',
    body: `Our support team is available ${siteConfig.contact.supportHours}.`,
    action: { label: 'Contact us', href: '/contact' },
  },
];

export function SupportSection() {
  return (
    <Section id="support">
      <SectionHeading
        eyebrow="Customer support"
        title="Support that is always within reach"
        description="Whether you need a quick answer or a human to step in, Novus MFB is here to help."
      />

      <ul className="mt-14 grid gap-6 md:grid-cols-3">
        {channels.map((channel) => (
          <li
            key={channel.title}
            className="flex flex-col rounded-2xl border border-border bg-white p-7 shadow-card"
          >
            <span
              aria-hidden="true"
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent-700"
            >
              {channel.icon}
            </span>
            <h3 className="mt-5 text-lg font-semibold">{channel.title}</h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">{channel.body}</p>
            <div className="mt-5">
              <ButtonLink href={channel.action.href} variant="outline" size="sm">
                {channel.action.label}
              </ButtonLink>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
