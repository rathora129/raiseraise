import MaintenancePage from '@/components/pages/MaintenancePage';
import { buildMetadata, breadcrumbJsonLd, serviceJsonLd } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Elevator maintenance & AMC',
  description:
    'Preventive maintenance and annual maintenance contracts for elevators — written scope, scheduled checks and documented visit reports from RaiseRaise Elevators.',
  path: '/maintenance',
  image: '/images/engineering/machine-room.jpg',
});

export default function Page() {
  return (
    <>
      <MaintenancePage />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceJsonLd({
              name: 'Elevator maintenance and annual maintenance contracts',
              description:
                'Preventive maintenance, comprehensive and non-comprehensive AMC structures for elevators.',
              path: '/maintenance',
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
              { name: 'Maintenance & AMC', href: '/maintenance' },
            ])
          ),
        }}
      />
    </>
  );
}
