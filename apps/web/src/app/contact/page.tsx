import type { Metadata } from 'next';
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { PageBanner } from '@/components/ui/page-banner';
import { Section } from '@/components/ui/section';
import { ContactForm } from '@/features/contact/contact-form';
import { bannerImages } from '@/lib/images';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Novus MFB by message, email or phone.',
};

const channels = [
  { icon: <Mail className="h-5 w-5" />, label: 'Email', value: 'info@novusmfb.com' },
  { icon: <Phone className="h-5 w-5" />, label: 'Phone', value: '07066887632 / 08122220105' },
  { icon: <MessageCircle className="h-5 w-5" />, label: 'Support hours', value: siteConfig.contact.supportHours },
  { icon: <MapPin className="h-5 w-5" />, label: 'Head office', value: 'Plot BNA 10558, New Bridge Road, Makurdi, Benue State' },
];

export default function ContactPage() {
  return (
    <>
      <PageBanner
        slot={bannerImages.contact}
        eyebrow="Contact us"
        title="We are here to help"
        description="Send us a message and our team will get back to you. For instant answers, try Nova."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="text-2xl font-bold">Get in touch</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              Our support team is available {siteConfig.contact.supportHours}. You can also ask Nova
              for help at any time using the chat button.
            </p>

            <ul className="mt-8 space-y-5">
              {channels.map((channel) => (
                <li key={channel.label} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700"
                  >
                    {channel.icon}
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-ink-subtle">
                      {channel.label}
                    </p>
                    <p className="text-sm font-medium text-ink">{channel.value}</p>
                  </div>
                </li>
              ))}
            </ul>

            <p className="mt-8 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-warning">
              Contact details are placeholders until verified by Novus MFB.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-white p-6 shadow-card sm:p-8">
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  );
}
