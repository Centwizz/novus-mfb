import { cn } from '@/lib/cn';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  muted?: boolean;
}

export function Section({ children, className, id, muted }: SectionProps) {
  return (
    <section id={id} className={cn('section', muted && 'bg-surface-muted', className)}>
      <div className="container-page">{children}</div>
    </section>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'max-w-2xl',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className,
      )}
    >
      {eyebrow ? <p className="eyebrow mb-3">{eyebrow}</p> : null}
      <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-ink-muted">{description}</p>
      ) : null}
    </div>
  );
}
