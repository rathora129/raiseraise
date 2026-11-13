import AboutPage from '@/components/pages/AboutPage';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'About us — how we plan, build and care',
  description:
    'How RaiseRaise Elevators plans, installs and supports lifts — with a clear view of what is manufactured by partners, what is installed and what is serviced.',
  path: '/about',
  image: '/images/spaces/lobby-hero.jpg',
});

export default function Page() {
  return (
    <>
      <AboutPage />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', href: '/' },
              { name: 'About', href: '/about' },
            ])
          ),
        }}
      />
    </>
  );
}
