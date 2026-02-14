export const revalidate = 60;

import { redirect } from 'next/navigation';
import { getPaginatedProductsWithImages } from '@/src/actions';
import { Pagination, ProductGrid, Title } from '@/src/components';
import { Gender } from '@/src/app/generated/prisma/enums';

type CategoryIdPageProps = {
  params: {
    gender: Gender;
  };
  searchParams: {
    page?: string;
  };
};

const GenderIdPage = async ({ params, searchParams }: CategoryIdPageProps) => {
  const { gender } = await params;
  const { page } = await searchParams;
  const parsePage = page ? parseInt(page) : 1;

  // * Pagination
  const { totalPages, products } = await getPaginatedProductsWithImages({
    page: parsePage,
    gender
  });

  // * Redirección
  if (products.length === 0) redirect('/gender/men');

  // TODO Recordar
  // const labels: Record<Category, string> = {
  const labels: { [key: string]: string } = {
    // tipar un objeto con una cantidad de atributos x, con tipo para la clave y valor
    men: 'para Hombres',
    women: 'para Mujeres',
    kid: 'para Niños',
    unisex: 'para todos'
  };

  return (
    <div>
      <Title
        title={`Artículos de ${labels[gender]}`}
        subtitle="Productos por categoría"
      />

      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
    </div>
  );
};

export default GenderIdPage;
