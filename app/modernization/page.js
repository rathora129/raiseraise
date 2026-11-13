import ModernizationPage from '@/components/pages/ModernizationPage';
import { buildMetadata, breadcrumbJsonLd, serviceJsonLd } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Elevator modernization & upgrade',
  description:
    'Elevator modernization — controller upgrades, door renewal, drive replacement, cabin renovation and safety-system updates within the existing structure.',
  path: '/modernization',
  image: '/images/spaces/doors-opening.jpg',
});

export default function Page() {
  return (
    <>
      <ModernizationPage />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceJsonLd({
              name: 'Elevator modernization',
              description:
                'Staged elevator modernization covering controllers, doors, drives, cabin renovation and safety systems.',
              path: '/modernization',
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', href: '/' },
              { name: 'Modernization', href: '/modernization' },
            ])
          ),
        }}
      />
    </>
  );
}
