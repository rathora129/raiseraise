import ProjectsPage from '@/components/pages/ProjectsPage';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Concept studies & gallery',
  description:
    'Explore RaiseRaise elevator concept studies — passenger and panoramic cabins, lobbies, ceilings, control details and engineering. Clearly labelled as concept visuals.',
  path: '/projects',
  image: '/images/cabins/panoramic-glass.jpg',
});

export default function Page() {
  return (
    <>
      <ProjectsPage />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', href: '/' },
              { name: 'Projects', href: '/projects' },
            ])
          ),
        }}
      />
    </>
  );
}
