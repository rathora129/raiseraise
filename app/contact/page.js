import ContactPage from '@/components/pages/ContactPage';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata = buildMetadata({
  title: 'Contact & enquiries',
  description:
    'Contact RaiseRaise Elevators on WhatsApp or phone to discuss a new lift, maintenance, repair or modernization. Send your building type, floors and requirements.',
  path: '/contact',
  image: '/images/spaces/lobby-hero.jpg',
});

export default function Page() {
  return (
    <>
      <ContactPage />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: 'Contact RaiseRaise Elevators',
            url: `${site.url}/contact`,
            description:
              'Contact details and project enquiry for RaiseRaise Elevators, India.',
            mainEntity: {
              '@type': 'Organization',
              '@id': `${site.url}/#organization`,
              name: site.legalName,
              telephone: site.phoneDisplay,
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: site.phoneDisplay,
                contactType: 'sales and service',
                availableLanguage: ['en', 'hi'],
                areaServed: 'IN',
              },
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', href: '/' },
              { name: 'Contact', href: '/contact' },
            ])
          ),
        }}
      />
    </>
  );
}
