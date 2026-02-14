// https://tailwindcomponents.com/component/hoverable-table

import Link from 'next/link';
import { getPaginatedProductsWithImages } from '@/src/actions';
import { Pagination, ProductImage, Title } from '@/src/components';
import { currencyFormat } from '@/src/utils';

type OrdersPageProps = {
  searchParams: {
    page?: string;
  };
};

const OrdersPage = async ({ searchParams }: OrdersPageProps) => {
  const { page } = await searchParams;
  const parsePage = page ? parseInt(page) : 1;

  const { products, currentPage, totalPages } =
    await getPaginatedProductsWithImages({ page: parsePage });

  return (
    <>
      <Title title="Mantenimiento de productos" />

      <div className="mb-5 flex justify-end">
        <Link href="/admin/product/new" className="btn-primary">
          Nuevo Producto
        </Link>
      </div>

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="border-b bg-gray-200">
            <tr>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-medium
                  text-gray-900"
              >
                Image
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-medium
                  text-gray-900"
              >
                Título
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-medium
                  text-gray-900"
              >
                Precio
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-medium
                  text-gray-900"
              >
                Género
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-medium
                  text-gray-900"
              >
                Inventario
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-medium
                  text-gray-900"
              >
                Tallas
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr
                key={product.id}
                className="border-b bg-white transition duration-300 ease-in-out
                  hover:bg-gray-100"
              >
                <td
                  className="px-6 py-4 text-sm font-medium whitespace-nowrap
                    text-gray-900"
                >
                  <Link href={`/product/${product.slug}`}>
                    <ProductImage
                      src={product.productImages[0]?.url}
                      width={80}
                      height={80}
                      alt={product.title}
                      className="h-20 w-20 rounded object-cover"
                    />
                  </Link>
                </td>
                <td
                  className="px-6 py-4 text-sm font-light whitespace-nowrap
                    text-gray-900"
                >
                  <Link
                    href={`/admin/product/${product.slug}`}
                    className="hover:underline"
                  >
                    {product.title}
                  </Link>
                </td>
                <td
                  className="px-6 py-4 text-sm font-bold whitespace-nowrap
                    text-gray-900"
                >
                  {currencyFormat(product.price)}
                </td>
                <td
                  className="r px-6 py-4 text-sm font-light whitespace-nowrap
                    text-gray-900"
                >
                  {product.gender}
                </td>
                <td
                  className="px-6 py-4 text-sm font-bold whitespace-nowrap
                    text-gray-900"
                >
                  {product.inStock}
                </td>
                <td
                  className="px-6 py-4 text-sm font-bold whitespace-nowrap
                    text-gray-900"
                >
                  {product.sizes.join(', ')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
};

export default OrdersPage;
