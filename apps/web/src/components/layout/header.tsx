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
        'sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur transition-shadow',
        scrolled ? 'border-border shadow-header' : 'border-transparent',
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-20">
        <Logo />

        {/* Desktop navigation */}
        <div ref={navRef} className="hidden items-center gap-1 lg:flex">
          <nav aria-label="Primary">
            <ul className="flex items-center gap-1">
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

        <div className="hidden items-center gap-2 lg:flex">
          <ButtonLink href="/login" variant="outline" size="sm">
            Log in
          </ButtonLink>
          <ButtonLink href="/register" size="sm">
            Open an account
          </ButtonLink>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto border-t border-border bg-white lg:hidden"
        >
          <nav aria-label="Mobile" className="container-page py-4">
            <ul className="flex flex-col gap-1">
              {primaryNav.map((item) =>
                isNavGroup(item) ? (
                  <li key={item.label} className="border-b border-border py-2">
                    <details className="group">
                      <summary className="flex cursor-pointer list-none items-center justify-between py-2 text-base font-semibold">
                        {item.label}
                        <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" />
                      </summary>
                      <ul className="mt-1 flex flex-col gap-1 pb-2 pl-2">
                        {item.items.map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              onClick={() => setMobileOpen(false)}
                              className="block rounded-lg px-3 py-2.5 text-sm text-ink-muted hover:bg-surface-subtle hover:text-ink"
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </details>
                  </li>
                ) : (
                  <li key={item.label} className="border-b border-border">
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-4 text-base font-semibold"
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
      )}
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
  if (!isNavGroup(item)) {
    return (
      <li>
        <Link
          href={item.href}
          className="rounded-lg px-3 py-2 text-sm font-medium text-ink-muted transition-colors hover:text-brand-700"
        >
          {item.label}
        </Link>
      </li>
    );
  }

  return (
    <li
      className="relative"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      // Keyboard: toggle with Enter/Space via the button.
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => (open ? onClose() : onOpen())}
        className={cn(
          'flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
          open ? 'text-brand-700' : 'text-ink-muted hover:text-brand-700',
        )}
      >
        {item.label}
        <ChevronDown className={cn('h-4 w-4 transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 w-72 pt-2">
          <ul className="animate-fade-in overflow-hidden rounded-2xl border border-border bg-white p-2 shadow-card-hover">
            {item.items.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-surface-subtle"
                >
                  <span className="block text-sm font-semibold text-ink">{link.label}</span>
                  {link.description ? (
                    <span className="mt-0.5 block text-xs text-ink-muted">{link.description}</span>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}
