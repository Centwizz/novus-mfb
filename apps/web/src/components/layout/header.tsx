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
  const navRef = useRef<HTMLDivElement>(null);

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

  // If the visitor rotates a tablet or widens the window past `lg`, the mobile
  // panel is hidden by CSS but its scroll lock would otherwise stay behind.
  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px)');
    const onChange = () => {
      if (query.matches) setMobileOpen(false);
    };
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return (
    <header
      className={cn(
        // Reference: position fixed, z-index 100, ALWAYS shadowed
        // (0 0 22px rgba(0,0,0,.1)) — not only after scrolling.
        'fixed inset-x-0 top-0 z-[100] w-full bg-white shadow-[0_0_22px_rgba(0,0,0,0.1)]',
        // Reference mobile ground is the tinted surface.
        'max-lg:bg-header-tint',
      )}
    >
      {/* Reference desktop height is exactly 80px; phones use 15.55vw, capped by
          `--nav-h` so tablets do not get a 159px-tall header. */}
      <div className="flex h-[var(--nav-h)] items-center px-[5.2vw] lg:px-gutter">
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
          {/* Hidden between 1024 and 1279px: there is not enough width for the
              logo + 5 nav items + both buttons, which used to make the nav
              overlap these buttons at exactly 1024px. */}
          <ButtonLink href="/login" variant="ghost" size="sm" className="hidden xl:inline-flex">
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

      {/* Mobile menu — slides down from directly below the header.
          It is only `visible` when open, so the closed panel can never extend
          the document or sit underneath the page content. */}
      <div
        id="mobile-menu"
        // `inert` keeps the closed panel out of the tab order and the
        // accessibility tree; `invisible` alone still allows keyboard focus.
        inert={!mobileOpen}
        aria-hidden={!mobileOpen}
        className={cn(
          'fixed inset-x-0 top-[var(--nav-h)] h-[calc(100dvh-var(--nav-h))] overflow-y-auto bg-header-tint pb-5 transition-all duration-300 ease-linear lg:hidden',
          mobileOpen ? 'visible z-10 translate-y-0 opacity-100' : 'invisible z-0 -translate-y-2 opacity-0',
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
            <ButtonLink
              href="/login"
              variant="outline"
              fullWidth
              onClick={() => setMobileOpen(false)}
            >
              Log in
            </ButtonLink>
            <ButtonLink href="/register" fullWidth onClick={() => setMobileOpen(false)}>
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
      <li className="mx-4 xl:mx-[max(16px,min(2vw,30px))]">
        <Link href={item.href} className={cn(itemClass, 'opacity-90')}>
          {item.label}
        </Link>
      </li>
    );
  }

  return (
    <li
      className="relative mx-4 xl:mx-[max(16px,min(2vw,30px))]"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
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

