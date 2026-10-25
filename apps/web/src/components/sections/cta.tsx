import { ButtonLink } from '@/components/ui/button';

export function CtaSection() {
  return (
    <section className="section">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl bg-brand-700 px-8 py-14 text-center text-white sm:px-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl"
          />
          <h2 className="mx-auto max-w-2xl text-3xl font-bold text-white sm:text-4xl">
            Ready to bank with Novus MFB?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/80">
            Open your account today and get support from Nova and our team whenever you need it.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink
              href="/register"
              size="lg"
              className="bg-white text-brand-700 hover:bg-white/90"
            >
              Open an account
            </ButtonLink>
            <ButtonLink
              href="/contact"
              variant="outline"
              size="lg"
              className="border-white/40 bg-transparent text-white hover:border-white hover:text-white"
            >
              Contact us
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}