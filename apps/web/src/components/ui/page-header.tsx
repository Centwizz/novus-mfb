import { cn } from '@/lib/cn';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}

/** Consistent hero band used across inner public pages. */
export function PageHeader({ eyebrow, title, description, className }: PageHeaderProps) {
  return (
    <section className={cn('border-b border-border bg-surface-muted', className)}>
      <div className="container-page py-14 sm:py-20">
        <div className="max-w-3xl animate-fade-in">
          {eyebrow ? <p className="eyebrow mb-3">{eyebrow}</p> : null}
          <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">{title}</h1>
          {description ? (
            <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
              {description}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
