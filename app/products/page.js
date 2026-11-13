import ProductsPage from '@/components/pages/ProductsPage';
import { products, faqs } from '@/lib/content';
import {
  buildMetadata,
  breadcrumbJsonLd,
  faqJsonLd,
  productJsonLd,
} from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Elevator ranges — passenger, home, hospital, goods & panoramic',
  description:
    'Explore passenger, home and villa, hospital, goods, commercial, panoramic, automobile, dumbwaiter, MRL and bespoke elevator ranges from RaiseRaise Elevators.',
  path: '/products',
  image: '/images/cabins/passenger-cabin.jpg',
  keywords: [
    'passenger elevator',
    'home lift',
    'hospital elevator',
    'goods elevator',
    'panoramic lift',
  ],
});

export default function Page() {
  return (
    <>
      <ProductsPage />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: 'Home', href: '/' },
              { name: 'Products', href: '/products' },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }}
      />
      {products.map((product) => (
        <script
          key={product.id}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              productJsonLd({
                name: product.name,
                description: product.summary,
                path: `/products#${product.id}`,
                image: product.image,
              })
            ),
          }}
        />
      ))}
    </>
  );
}
