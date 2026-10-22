import { PageHeader } from '@/components/ui/page-header';
import { Section } from '@/components/ui/section';

export interface LegalSection {
  heading: string;
  body: string[];
}

interface LegalPageProps {
  title: string;
  description: string;
  updated?: string;
  sections: LegalSection[];
}

/**
 * Shared layout for legal pages. All content is placeholder text until the bank
 * supplies verified policy wording — no legal claims are asserted.
 */
export function LegalPage({ title, description, updated, sections }: LegalPageProps) {
  return (
    <>
      <PageHeader eyebrow="Legal" title={title} description={description} />
      <Section>
        <div className="mx-auto max-w-3xl">
          <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-warning">
            This is placeholder wording for a demonstration build. Verified legal text must be
            supplied and approved by Novus MFB before publication.
          </p>
          {updated ? (
            <p className="mt-4 text-xs text-ink-subtle">Last updated: {updated}</p>
          ) : null}

          <div className="mt-8 space-y-8">
            {sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-xl font-semibold">{section.heading}</h2>
                {section.body.map((paragraph, index) => (
                  <p key={index} className="mt-3 text-sm leading-relaxed text-ink-muted">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
