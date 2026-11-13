import { site } from '@/lib/site';

export default function manifest() {
  return {
    name: site.name,
    short_name: site.shortName,
    description: site.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#041713',
    theme_color: '#041713',
    lang: 'en-IN',
    icons: [
      { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/images/brand/raiseraise-icon.png', sizes: '1200x1419', type: 'image/png' },
    ],
  };
}
