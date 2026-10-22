import type { Metadata } from 'next';
import { LegalPage } from '@/components/ui/legal-page';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `How ${siteConfig.name} handles your personal information.`,
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      description={`How ${siteConfig.name} collects, uses and protects your personal information.`}
      sections={[
        {
          heading: 'Information we collect',
          body: [
            'We collect information you provide when you open an account, contact us or use our services, such as your name, contact details and identification information.',
            'The exact categories of data collected will be documented once finalised by Novus MFB.',
          ],
        },
        {
          heading: 'How we use your information',
          body: [
            'We use your information to provide our services, keep your account secure, comply with applicable obligations and improve our products.',
          ],
        },
        {
          heading: 'Data security',
          body: [
            'We apply technical and organisational measures to protect your information. We never ask for your PIN, OTP or full card details.',
          ],
        },
        {
          heading: 'Your rights',
          body: [
            'You may have rights to access, correct or delete your personal information. The specific rights available will be set out in the finalised policy.',
          ],
        },
        {
          heading: 'Contact us',
          body: [`Questions about privacy can be sent to ${siteConfig.contact.email}.`],
        },
      ]}
    />
  );
}
