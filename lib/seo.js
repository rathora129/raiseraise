import { site } from './site';

export const absoluteUrl = (path = '/') =>
  path.startsWith('http') ? path : `${site.url}${path}`;

export const defaultOgImage = '/images/og/og-default.jpg';

export function buildMetadata({
  title,
  description,
  path = '/',
  image = defaultOgImage,
  keywords,
}) {
  const url = absoluteUrl(path);
  const ogImage = absoluteUrl(image);
  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: site.locale,
      type: 'website',
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${site.name} — ${title}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${site.url}/#organization`,
    name: site.legalName,
    alternateName: site.name,
    url: site.url,
    logo: absoluteUrl('/images/brand/raiseraise-logo.png'),
    image: absoluteUrl(defaultOgImage),
    description: site.description,
    slogan: site.tagline,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: site.phoneDisplay,
        contactType: 'customer service',
        availableLanguage: ['en', 'hi'],
        url: absoluteUrl('/contact'),
      },
    ],
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    url: site.url,
    name: site.name,
    description: site.description,
    publisher: { '@id': `${site.url}/#organization` },
    inLanguage: 'en-IN',
  };
}

export function breadcrumbJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}

export function faqJsonLd(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function serviceJsonLd({ name, description, path }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: absoluteUrl(path),
    provider: { '@id': `${site.url}/#organization` },
    areaServed: 'IN',
  };
}

export function productJsonLd({ name, description, path, image }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    url: absoluteUrl(path),
    image: absoluteUrl(image),
    brand: { '@type': 'Brand', name: site.name },
    category: 'Elevators',
  };
}
