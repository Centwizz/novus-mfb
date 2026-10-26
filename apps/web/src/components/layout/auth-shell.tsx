import Link from 'next/link';
import { Info } from 'lucide-react';
import { Logo } from '@/components/brand/logo';

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <div className="grid min-h-[calc(100dvh-var(--nav-h))] lg:grid-cols-2">
      {/* Brand panel */}
      <div className="relative hidden overflow-hidden bg-brand-700 p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/10 blur-3xl"
        />
        <Logo tone="inverse" />
        <div className="relative">
          <h2 className="text-3xl font-bold leading-tight text-white">
            Banking built around you.
          </h2>
          <p className="mt-4 max-w-sm text-white/80">
            Manage your money, get instant answers from Nova and reach a human whenever you need
            one.
          </p>
        </div>
        <p className="relative text-xs text-white/60">
          Demonstration build — no real financial data is processed.
        </p>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center px-5 py-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden">
            <Logo />
          </div>
          <h1 className="mt-6 text-2xl font-bold sm:text-3xl">{title}</h1>
          <p className="mt-2 text-sm text-ink-muted">{subtitle}</p>
          {/* Honest status: the auth API is not built yet (Phase 4). Without this,
              submitting the form produced a generic "something went wrong",
              which invited pointless retries. */}
          <p className="mt-4 flex items-start gap-2 rounded-xl border border-brand-100 bg-brand-50 px-4 py-3 text-xs leading-relaxed text-brand-700">
            <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>
              Preview only — accounts are not open yet. Sign-in, registration and password
              recovery are delivered in a later phase.
            </span>
          </p>
          <div className="mt-8">{children}</div>
          <div className="mt-6 text-sm text-ink-muted">{footer}</div>
          <p className="mt-8 text-center text-xs text-ink-subtle">
            <Link href="/" className="hover:text-brand-700">
              &larr; Back to home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
