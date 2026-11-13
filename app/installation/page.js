import InstallationPage from '@/components/pages/InstallationPage';
import { buildMetadata, breadcrumbJsonLd, serviceJsonLd } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Elevator installation & engineering',
  description:
    'Elevator installation planning, shaft surveys, structural coordination, testing, commissioning and documented handover by RaiseRaise Elevators.',
  path: '/installation',
  image: '/images/engineering/shaft.jpg',
});

export default function Page() {
  return (
    <>
      <InstallationPage />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceJsonLd({
              name: 'Elevator installation and engineering',
              description:
                'Site survey, installation planning, coordination, testing and handover for passenger, home, hospital and goods elevators.',
              path: '/installation',
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
              { name: 'Installation', href: '/installation' },
            ])
          ),
        }}
      />
    </>
  );
}
