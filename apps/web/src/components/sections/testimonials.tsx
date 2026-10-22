import { Quote } from 'lucide-react';

/**
 * "Here is what our customers think" — present in the reference, missing before.
 *
 * The reference renders testimonial content dynamically (its container is empty in the
 * server-rendered HTML and populated client-side). Because I cannot read the real
 * quotes from the static markup, and because inventing customer testimonials would be
 * dishonest, this section renders the correct structure with clearly-labelled
 * placeholders. TODO(owner): supply verified, attributed customer quotes.
 */

const placeholders = [
  { role: 'Personal banking customer', quote: 'Customer quote pending verification.' },
  { role: 'Small business customer', quote: 'Customer quote pending verification.' },
  { role: 'Savings customer', quote: 'Customer quote pending verification.' },
];

export function TestimonialsSection() {
  return (
    <section className="w-full bg-white py-12 lg:py-[4vw]">
      <div className="px-[5.65vw]">
        <h2 className="text-center text-[5.55vw] font-semibold leading-tight text-ink-brand lg:text-[3.13vw] lg:font-bold lg:leading-[4.65vw]">
          Here is what our customers think
        </h2>

        <div className="mt-8 grid gap-5 md:grid-cols-3 lg:mt-[3vw]">
          {placeholders.map((item) => (
            <figure
              key={item.role}
              className="flex flex-col rounded-2xl border border-border bg-surface-muted p-6 lg:rounded-[1vw] lg:p-[2vw]"
            >
              <Quote className="h-6 w-6 text-brand-300" aria-hidden="true" />
              <blockquote className="mt-4 flex-1 text-[3.4vw] italic leading-relaxed text-ink-muted lg:text-[1.04vw] lg:leading-[1.8vw]">
                {item.quote}
              </blockquote>
              <figcaption className="mt-4 text-[3.2vw] font-semibold text-ink-brand lg:text-[0.95vw]">
                {item.role}
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mt-6 text-center text-[3.2vw] text-ink-subtle lg:text-[0.9vw]">
          Verified customer testimonials will be published here once supplied and approved by
          the bank.
        </p>
      </div>
    </section>
  );
}
