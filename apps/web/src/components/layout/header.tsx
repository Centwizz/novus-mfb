'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Logo } from '@/components/brand/logo';
import { ButtonLink } from '@/components/ui/button';
import { primaryNav, isNavGroup, type NavItem } from '@/lib/navigation';
import { cn } from '@/lib/cn';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menus on outside click or Escape.
  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpenDropdown(null);
        setMobileOpen(false);
      }
    }
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  // Prevent background scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        // Reference: position fixed, z-index 100, ALWAYS shadowed
        // (0 0 22px rgba(0,0,0,.1)) — not only after scrolling.
        'fixed inset-x-0 top-0 z-[100] w-full shadow-[0_0_22px_rgba(0,0,0,0.1)] transition-colors duration-300',
        // Reference desktop bg is #fff; mobile and scrolled-mobile use #f4fcfa.
        scrolled ? 'bg-white max-lg:bg-header-tint' : 'bg-white max-lg:bg-header-tint',
      )}
    >
      {/* Reference desktop height is exactly 80px; mobile is 15.55vw. */}
      <div className="flex h-[15.55vw] items-center px-[5.2vw] lg:h-nav lg:px-gutter">
        <Logo height={32} className="lg:hidden" />
        <Logo height={47} className="hidden lg:inline-flex" />

        {/* Desktop navigation — reference pushes the list immediately after the
            logo (flex:1) with a 30px left margin, NOT justified to the right. */}
        <div ref={navRef} className="hidden flex-1 lg:block">
          <nav aria-label="Primary">
            <ul className="flex h-full items-center pl-[30px]">
              {primaryNav.map((item) => (
                <DesktopNavItem
                  key={item.label}
                  item={item}
                  open={openDropdown === item.label}
                  onOpen={() => setOpenDropdown(item.label)}
                  onClose={() => setOpenDropdown(null)}
                />
              ))}
            </ul>
          </nav>
        </div>

        {/* Novus divergence (documented): the reference has no header CTAs because
            login lives inside its app. Novus is a web platform, so restrained
            account actions are required. */}
        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <ButtonLink href="/login" variant="ghost" size="sm">
            Log in
          </ButtonLink>
          <ButtonLink href="/register" size="sm">
            Open an account
          </ButtonLink>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="ml-auto inline-flex h-[30px] w-[30px] items-center justify-center text-black lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? 'Close menu' : 'Toggle navigation menu'}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu — reference slides the panel down from below the header,
          on a #f4fcfa (here: indigo-tinted) ground. */}
      <div
        id="mobile-menu"
        className={cn(
          'fixed inset-x-0 -z-[1] overflow-y-auto bg-header-tint transition-all duration-300 ease-linear lg:hidden',
          'h-[calc(100dvh-15.55vw)] pb-5',
          mobileOpen ? 'top-[15.55vw] z-10' : 'top-[100dvh]',
        )}
      >
        <nav aria-label="Mobile" className="flex flex-col px-5 pb-5 pt-6">
          <ul>
            {primaryNav.map((item) =>
              isNavGroup(item) ? (
                <li key={item.label} className="border-b border-brand-100/60">
                  <details className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-[6.67vw] font-normal text-ink-brand">
                      {item.label}
                      <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" />
                    </summary>
                    <ul className="flex flex-col gap-1 pb-3 pl-3">
                      {item.items.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            className="block rounded-lg px-3 py-2.5 text-sm text-ink-muted hover:bg-brand-100/50 hover:text-ink-brand"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              ) : (
                <li key={item.label} className="border-b border-brand-100/60">
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-4 text-[6.67vw] font-normal text-ink-brand"
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>

          <div className="mt-6 flex flex-col gap-3">
            <ButtonLink href="/login" variant="outline" fullWidth>
              Log in
            </ButtonLink>
            <ButtonLink href="/register" fullWidth>
              Open an account
            </ButtonLink>
          </div>
        </nav>
      </div>
    </header>
  );
}

function DesktopNavItem({
  item,
  open,
  onOpen,
  onClose,
}: {
  item: NavItem;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  // Reference nav spacing: margin 0 max(16px, min(2vw, 30px)); font 16px; colour
  // #210f60 at opacity .9.
  const itemClass =
    'flex items-center gap-1.5 text-base leading-[22px] text-ink-brand/90 transition-opacity hover:opacity-100';

  if (!isNavGroup(item)) {
    return (
      <li className="mx-[max(16px,min(2vw,30px))]">
        <Link href={item.href} className={cn(itemClass, 'opacity-90')}>
          {item.label}
        </Link>
      </li>
    );
  }

  return (
    <li className="relative mx-[max(16px,min(2vw,30px))]" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => (open ? onClose() : onOpen())}
        className={cn(itemClass, open ? 'opacity-100' : 'opacity-90')}
      >
        {item.label}
        <ChevronDown className={cn('h-3 w-3 transition-transform duration-200', open && 'rotate-180')} />
      </button>

      {/* Reference dropdown: plain bordered panel with simple rows — no
          descriptions, no oversized rounding. */}
      {open && (
        <div className="absolute left-0 top-full z-50 min-w-[180px] pt-2">
          <div className="animate-fade-in border border-border bg-white py-1 shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
            {item.items.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="block px-4 py-2.5 text-sm text-ink-brand/90 transition-colors hover:bg-surface-muted"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </li>
  );
}

