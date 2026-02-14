export const revalidate = 60; // 60 segundos;

import { getPaginatedProductsWithImages } from '@/src/actions';
import { Pagination, ProductGrid, Title } from '@/src/components';

type HomePageProps = {
  searchParams: {
    page?: string;
  };
};

const HomePage = async ({ searchParams }: HomePageProps) => {
  const { page } = await searchParams;
  const parsePage = page ? parseInt(page) : 1;

  const { totalPages, products } = await getPaginatedProductsWithImages({
    page: parsePage
  });

  return (
    <>
      <Title title="Tienda" subtitle="Todos los productos" />

      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
    </>
  );
};

export default HomePage;
