import { redirect } from 'next/navigation';
import { getCategories, getProductBySlug } from '@/src/actions';
import { Title } from '@/src/components';
import { ProductForm } from './ui/ProductForm';

type ProductPageProps = {
  params: {
    slug: string;
  };
};

const ProductPage = async ({ params }: ProductPageProps) => {
  const { slug } = await params;

  const [product, categories] = await Promise.all([
    getProductBySlug(slug),
    getCategories()
  ]);

  // TODO: new
  if (!product && slug !== 'new') redirect('/admin/products');

  const title = slug === 'new' ? 'Nuevo producto' : 'Editar producto';

  return (
    <div className="mb-10">
      <Title title={title} />

      <ProductForm product={product ?? {}} categories={categories} />
    </div>
  );
};

export default ProductPage;
