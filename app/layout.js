import localFont from 'next/font/local';
import StyledComponentsRegistry from '@/components/StyledComponentsRegistry';
import Providers from '@/components/Providers';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingCTA from '@/components/layout/FloatingCTA';
import Preloader from '@/components/layout/Preloader';
import { site } from '@/lib/site';
import { organizationJsonLd, websiteJsonLd } from '@/lib/seo';

const manrope = localFont({
  src: '../assets/fonts/Manrope.ttf',
  weight: '200 800',
  style: 'normal',
  display: 'swap',
  variable: '--font-manrope',
  fallback: ['Helvetica Neue', 'Arial', 'sans-serif'],
});

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'RaiseRaise Elevators — Passenger, Home & Commercial Lifts',
    template: '%s | RaiseRaise Elevators',
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.legalName, url: site.url }],
  creator: site.legalName,
  publisher: site.legalName,
  alternates: { canonical: site.url },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/images/brand/raiseraise-icon.png' }],
  },
  openGraph: {
    type: 'website',
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: 'RaiseRaise Elevators — Elevating every journey with safety',
    description: site.description,
    images: [
      {
        url: '/images/og/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'RaiseRaise Elevators',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RaiseRaise Elevators',
    description: site.description,
    images: ['/images/og/og-default.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#041713',
  colorScheme: 'light',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" className={manrope.variable}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <StyledComponentsRegistry>
          <Providers>
            <Preloader />
            <Header />
            <main id="main">{children}</main>
            <Footer />
            <FloatingCTA />
          </Providers>
        </StyledComponentsRegistry>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
        />
      </body>
    </html>
  );
}
