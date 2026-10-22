import { cn } from '@/lib/cn';

interface CardProps {
  className?: string;
  children: React.ReactNode;
  as?: 'div' | 'article' | 'section' | 'li';
}

export function Card({ className, children, as: Tag = 'div' }: CardProps) {
  return (
    <Tag
      className={cn(
        'rounded-2xl border border-border bg-white p-6 shadow-card transition-shadow duration-200',
        className,
      )}
    >
      {children}
    </Tag>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function FeatureCard({ icon, title, children, className }: FeatureCardProps) {
  return (
    <Card className={cn('flex flex-col gap-4 hover:shadow-card-hover', className)}>
      <span
        aria-hidden="true"
        className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700"
      >
        {icon}
      </span>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm leading-relaxed text-ink-muted">{children}</p>
    </Card>
  );
}
