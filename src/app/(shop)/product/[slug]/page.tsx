// ! Revalidación
export const revalidate = 604800; // Revalidar cada 7 días

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/src/actions';
import {
  ProductMobileSlideshow,
  ProductSlideshow,
  StockLabel
} from '@/src/components';
import { titleFont } from '@/src/config/fonts';
import { AddToCart } from './ui/AddToCart';

type ProductSlugPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({
  params
}: ProductSlugPageProps): Promise<Metadata> {
  const slug = (await params).slug;
  const product = await getProductBySlug(slug);
  return {
    title: product?.title ?? 'Producto no encontrado',
    description: product?.description ?? '',
    openGraph: {
      title: product?.title ?? 'Producto no encontrado',
      description: product?.description ?? '',
      images: [`/products/${product?.images[1]}`]
    }
  };
}

const ProductSlugPage = async ({ params }: ProductSlugPageProps) => {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 gap-3 md:grid-cols-3">
      {/* Slideshow */}
      <div className="col-span-1 md:col-span-2">
        {/* Mobile Slideshow */}
        <ProductMobileSlideshow
          title={product.title}
          images={product.images}
          className="block md:hidden"
        />

        {/* Desktop Slideshow */}
        <ProductSlideshow
          title={product.title}
          images={product.images}
          className="hidden md:block"
        />
      </div>

      {/* Detalles */}

      <div className="col-span-1 px-5">
        <StockLabel slug={product.slug} />

        <h1 className={`${titleFont.className} text-xl font-bold antialiased`}>
          {product.title}
        </h1>
        <p className="mb-5 text-lg">${product.price}</p>

        <AddToCart product={product} />

        {/* Descripción */}
        <h3 className="text-sm font-bold">Descripción</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductSlugPage;
