import { ButtonLink } from '@/components/ui/button';
import { siteConfig } from '@/lib/site-config';

/**
 * Homepage hero. Mirrors the reference layout (large headline, supporting copy,
 * dual CTAs, trust strip) but uses honest Novus wording and no unverified claims.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Decorative brand backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-brand-50 via-white to-white"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 -z-10 h-96 w-96 rounded-full bg-brand-100/50 blur-3xl"
      />

      <div className="container-page grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
        <div className="animate-fade-in">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-700">
            Digital banking, made human
          </span>
          <h1 className="mt-6 text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl">
            Banking built
            <span className="block text-brand-700">around you</span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-muted sm:text-lg">
            Open an account in minutes, move money securely and grow your savings with a
            microfinance bank designed for everyday Nigerians.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/register" size="lg">
              Open an account
            </ButtonLink>
            <ButtonLink href="/personal" variant="outline" size="lg">
              Explore products
            </ButtonLink>
          </div>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-6">
            <TrustStat label="Account opening" value="Minutes" />
            <TrustStat label="Support" value="Human + AI" />
            <TrustStat label="Platform" value="Mobile-first" />
          </dl>
        </div>

        <div className="relative animate-slide-up">
          <HeroCard />
        </div>
      </div>
    </section>
  );
}

function TrustStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-ink-subtle">{label}</dt>
      <dd className="mt-1 text-lg font-semibold text-ink">{value}</dd>
    </div>
  );
}

/**
 * Placeholder product preview card. Uses the assistant + support flow as an honest
 * illustration of the platform rather than fabricated balances or rates.
 */
function HeroCard() {
  return (
    <div className="mx-auto w-full max-w-md rounded-3xl border border-border bg-white p-6 shadow-card-hover">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-ink-subtle">Everyday account</p>
          <p className="mt-1 text-2xl font-bold text-ink">
            {siteConfig.shortName} Account
          </p>
        </div>
        <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
          Demo
        </span>
      </div>

      <div className="mt-6 rounded-2xl bg-gradient-to-br from-brand-700 to-brand-900 p-5 text-white">
        <p className="text-xs uppercase tracking-wide text-white/60">Example preview</p>
        <p className="mt-3 text-sm text-white/80">
          Balances, rates and product terms are not yet configured. Verified figures will appear
          here once supplied by the bank.
        </p>
      </div>

      <ul className="mt-6 space-y-3 text-sm text-ink-muted">
        {['Secure transfers', 'Flexible savings', '24/7 support with Nova'].map((item) => (
          <li key={item} className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-700" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
