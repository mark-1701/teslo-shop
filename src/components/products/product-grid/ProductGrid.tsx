import { Product } from '@/src/interfaces';
import { ProductGridItem } from './ProductGridItem';

type ProductGridProps = {
  products: Product[];
};

export const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    <div className="mb-10 grid grid-cols-2 gap-10 sm:grid-cols-3">
      {products.map(product => (
        <ProductGridItem key={product.slug} product={product} />
      ))}
    </div>
  );
};
