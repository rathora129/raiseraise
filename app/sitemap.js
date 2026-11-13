import { site } from '@/lib/site';

const routes = [
  { path: '/', priority: 1, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.8, changeFrequency: 'yearly' },
  { path: '/products', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/installation', priority: 0.8, changeFrequency: 'yearly' },
  { path: '/maintenance', priority: 0.8, changeFrequency: 'yearly' },
  { path: '/repair', priority: 0.8, changeFrequency: 'yearly' },
  { path: '/modernization', priority: 0.8, changeFrequency: 'yearly' },
  { path: '/interiors', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/projects', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.9, changeFrequency: 'yearly' },
];

export default function sitemap() {
  const lastModified = new Date();
  return routes.map((route) => ({
    url: `${site.url}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
