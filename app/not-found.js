import NotFoundView from '@/components/layout/NotFoundView';

export const metadata = {
  title: 'Page not found',
  description: 'The requested page could not be found.',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return <NotFoundView />;
}
