import RepairPage from '@/components/pages/RepairPage';
import { buildMetadata, breadcrumbJsonLd, serviceJsonLd } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Elevator repair & breakdown support',
  description:
    'Elevator repair and breakdown diagnosis — door systems, controllers, traction, electrical faults, levelling and safety sensors.',
  path: '/repair',
  image: '/images/details/control-panel.jpg',
});

export default function Page() {
  return (
    <>
      <RepairPage />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceJsonLd({
              name: 'Elevator repair and breakdown support',
              description:
                'Diagnosis and repair for elevator door systems, controllers, traction machinery, electrical faults and safety sensors.',
              path: '/repair',
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
              { name: 'Repair & emergency', href: '/repair' },
            ])
          ),
        }}
      />
    </>
  );
}
