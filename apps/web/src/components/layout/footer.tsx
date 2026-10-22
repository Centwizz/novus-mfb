import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { Logo } from '@/components/brand/logo';
import { footerNav } from '@/lib/navigation';
import { siteConfig } from '@/lib/site-config';

const socialLinks = [
  { key: 'facebook', href: siteConfig.social.facebook, label: 'Facebook', Icon: Facebook },
  { key: 'twitter', href: siteConfig.social.twitter, label: 'X (Twitter)', Icon: Twitter },
  { key: 'instagram', href: siteConfig.social.instagram, label: 'Instagram', Icon: Instagram },
  { key: 'linkedin', href: siteConfig.social.linkedin, label: 'LinkedIn', Icon: Linkedin },
] as const;

export function Footer() {
  const year = new Date().getFullYear();
  const available = socialLinks.filter((s) => s.href);

  return (
    <footer className="mt-auto border-t border-border bg-surface-muted">
      <div className="container-page py-14">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-muted">
              {siteConfig.description}
            </p>
            <p className="mt-4 text-xs text-ink-subtle">
              Customer support: {siteConfig.contact.supportHours}
            </p>
          </div>

          <FooterColumn title="Company" links={footerNav.company} />
          <FooterColumn title="Products" links={footerNav.products} />
          <FooterColumn title="Resources" links={footerNav.resources} />
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-ink-muted">
            © {year} {siteConfig.legalName}. All rights reserved.
          </p>
          {available.length > 0 && (
            <ul className="flex items-center gap-3">
              {available.map(({ key, href, label, Icon }) => (
                <li key={key}>
                  <a
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-white text-ink-muted transition-colors hover:text-brand-700"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <p className="mt-6 text-xs leading-relaxed text-ink-subtle">
          {siteConfig.name} is a demonstration project. Business details, product terms and
          regulatory information are placeholders until verified by the bank and must be
          configured before public launch.
        </p>
      </div>
    </footer>
  );
}
function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-ink">{title}</h2>
      <ul className="mt-4 flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-ink-muted transition-colors hover:text-brand-700"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}