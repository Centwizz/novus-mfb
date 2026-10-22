import type { Metadata } from 'next';
import { LegalPage } from '@/components/ui/legal-page';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: `The terms governing your use of ${siteConfig.name} services.`,
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      description={`The terms governing your use of ${siteConfig.name} services.`}
      sections={[
        {
          heading: 'Acceptance of terms',
          body: [
            'By using our website and services you agree to these terms. The finalised terms will be provided by Novus MFB.',
          ],
        },
        {
          heading: 'Your account',
          body: [
            'You are responsible for keeping your login details secure and for any activity on your account. Notify us immediately if you suspect unauthorised access.',
          ],
        },
        {
          heading: 'Acceptable use',
          body: ['You agree not to misuse our services or use them for unlawful purposes.'],
        },
        {
          heading: 'Service availability',
          body: [
            'We aim to keep our services available but do not guarantee uninterrupted access.',
          ],
        },
        {
          heading: 'Governing law',
          body: [
            'These terms will be governed by the laws of the Federal Republic of Nigeria. The final governing terms will be confirmed by Novus MFB.',
          ],
        },
      ]}
    />
  );
}
