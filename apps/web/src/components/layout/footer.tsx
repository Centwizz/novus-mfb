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

/**
 * Footer — reconstructed from the reference.
 *
 * Reference measurements (desktop, from opayweb.com CSS):
 *   - .footer-container:     background image (foot-bc.png), background-size cover,
 *                            padding-left 5.65vw
 *   - .footer-content:       flex row, padding-top 0
 *   - columns:               Company 9vw / Resources 10.17vw / Discover 9.5vw /
 *                            Office 10.17vw (margin-right 4vw) / Offices 38vw
 *   - .column-title:         0.78vw (~11px), weight 700, colour #fff
 *   - .menu-item:            0.69vw (~10px), line-height 1.3vw (~19px), colour #fff
 *   - .footer-tip-container: SEQUENTIALLY SEPARATE bottom bar, padding 20px 0 15px 110px
 *   - .footer-logo:          80px wide
 *   - .footer-copyright:     14px
 *   - .social-icon:          33x33, border-radius 50%, background #d2f5ec (Novus: brand-100)
 *
 * Novus has no branch list yet, so the office columns are present in the correct
 * widths with clearly-marked placeholders rather than invented addresses.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full">
      {/* Dark ground — the reference uses a photographic background image. */}
      <div className="w-full bg-gradient-to-br from-brand-700 via-brand-800 to-brand-900 pl-[5.65vw]">
        <div className="flex flex-col flex-wrap pb-[4vw] pt-[8.88vw] lg:flex-row lg:pt-[3.73vw]">
          {/* 1. Company */}
          <div className="w-1/2 py-[3vw] lg:w-[9vw] lg:py-[3.73vw]">
            <h2 className="text-[5vw] font-bold text-white lg:text-[0.78vw]">Company</h2>
            <div className="pt-[0.5vw]">
              {footerNav.company.map((link) => (
                <div key={link.href} className="mt-[1vw] text-[4.44vw] leading-[8.33vw] lg:mt-[0.69vw] lg:text-[0.69vw] lg:leading-[1.3vw]">
                  <Link href={link.href} className="text-white transition-opacity hover:opacity-80">
                    {link.label}
                  </Link>
                </div>
              ))}
            </div>

            <div className="mt-[1vw] text-[4.44vw] leading-[8.33vw] lg:relative lg:-bottom-[25px] lg:mt-[0.69vw] lg:text-[0.69vw] lg:leading-[1.3vw]">
              <div className="font-bold text-white">Whistleblowing:</div>
              {/* TODO(owner): supply the whistleblowing contact address. */}
              <div className="mt-1 text-white/80">Not configured yet</div>
            </div>
          </div>

          {/* 2. Resources */}
          <div className="w-1/2 py-[3vw] lg:w-[10.17vw] lg:py-[3.73vw]">
            <h2 className="text-[5vw] font-bold text-white lg:text-[0.78vw]">Resources</h2>
            <div className="pt-[0.5vw]">
              {footerNav.resources.map((link) => (
                <div key={link.href} className="mt-[1vw] text-[4.44vw] leading-[8.33vw] lg:mt-[0.69vw] lg:text-[0.69vw] lg:leading-[1.3vw]">
                  <Link href={link.href} className="text-white transition-opacity hover:opacity-80">
                    {link.label}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Discover (products) */}
          <div className="w-1/2 py-[3vw] lg:w-[9.5vw] lg:py-[3.73vw]">
            <h2 className="text-[5vw] font-bold text-white lg:text-[0.78vw]">Discover</h2>
            <div className="pt-[0.5vw]">
              {footerNav.products.map((link) => (
                <div key={link.href} className="mt-[1vw] text-[4.44vw] leading-[8.33vw] lg:mt-[0.69vw] lg:text-[0.69vw] lg:leading-[1.3vw]">
                  <Link href={link.href} className="text-white transition-opacity hover:opacity-80">
                    {link.label}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Head office */}
          <div className="w-1/2 py-[3vw] lg:mr-[4vw] lg:w-[10.17vw] lg:py-[3.73vw]">
            <h2 className="text-[5vw] font-bold text-white lg:text-[0.78vw]">Novus Office</h2>
            <div className="mt-[1vw] text-[4.44vw] leading-[8.33vw] text-white lg:mt-[0.69vw] lg:text-[0.69vw] lg:leading-[1.3vw]">
              {/* TODO(owner): supply the registered head-office address. */}
              <span className="font-bold">HQ:</span> Address not configured yet
            </div>
          </div>

          {/* 5. Branch offices */}
          <div className="w-full py-[3vw] lg:w-[38vw] lg:py-[3.73vw]">
            <h2 className="text-[5vw] font-bold text-white lg:text-[0.78vw]">
              Novus Office Address
            </h2>
            <div className="mt-[1vw] text-[4.44vw] leading-[8.33vw] text-white lg:mt-[0.69vw] lg:text-[0.69vw] lg:leading-[1.3vw]">
              {/* TODO(owner): supply verified branch addresses. */}
              <div>Branch addresses will be published once confirmed.</div>
              <div className="mt-[1vw] lg:mt-[0.69vw]">
                <Link
                  href="/contact"
                  className="text-white underline underline-offset-2 transition-opacity hover:opacity-80"
                >
                  More &gt;&gt;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Separate bottom bar (reference: .footer-tip-container) */}
      <div className="w-full bg-white">
        <div className="flex flex-wrap items-center justify-between gap-[2.67vw] px-[5.73vw] py-[2.5vw] lg:px-0 lg:py-[20px] lg:pl-[110px]">
          <Logo height={40} withWordmark={false} className="lg:w-20" />

          <p className="text-center text-[3.59vw] leading-[3.59vw] text-ink-brand lg:text-[14px] lg:leading-[20px]">
            © {year} {siteConfig.legalName}.
          </p>

          <ul className="flex items-center gap-[1.54vw] pr-[5.47vw] lg:gap-[6px] lg:pr-[105px]">
            {socialLinks.map(({ key, href, label, Icon }) => (
              <li key={key}>
                <a
                  href={href ?? '#'}
                  aria-label={label}
                  {...(href ? { target: '_blank', rel: 'noopener noreferrer' } : { 'aria-disabled': true })}
                  className="flex h-[4.44vw] w-[4.44vw] items-center justify-center rounded-full bg-brand-100 text-brand-700 transition-opacity hover:opacity-80 lg:h-[33px] lg:w-[33px]"
                >
                  <Icon className="h-[55%] w-[55%]" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
