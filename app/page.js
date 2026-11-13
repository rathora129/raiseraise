import HomePage from '@/components/pages/HomePage';
import { buildMetadata, faqJsonLd } from '@/lib/seo';
import { faqs } from '@/lib/content';
import { site } from '@/lib/site';

export const metadata = buildMetadata({
  title: 'RaiseRaise Elevators — lifts for homes, hospitals & industry',
  description:
    'RaiseRaise Elevators supplies, installs and maintains passenger, home, hospital, goods and panoramic lifts across India — planned around your building, supported after handover.',
  path: '/',
});

export default function Page() {
  return (
    <>
      <HomePage />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Elevator ranges',
            itemListElement: [
              'Passenger elevators',
              'Home and villa lifts',
              'Hospital and stretcher elevators',
              'Goods and freight elevators',
              'Commercial elevators',
              'Panoramic and capsule lifts',
            ].map((name, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name,
              url: `${site.url}/products`,
            })),
          }),
        }}
      />
    </>
  );
}
