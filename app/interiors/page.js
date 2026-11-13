import InteriorsPage from '@/components/pages/InteriorsPage';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Elevator interiors & cabin customization',
  description:
    'Explore elevator cabin interiors with a 360° concept studio — wall panels, flooring, ceilings, lighting, handrails and doors, with a clearly labelled material library.',
  path: '/interiors',
  image: '/images/details/ceiling-light.jpg',
});

export default function Page() {
  return (
    <>
      <InteriorsPage />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', href: '/' },
              { name: 'Interiors', href: '/interiors' },
            ])
          ),
        }}
      />
    </>
  );
}
