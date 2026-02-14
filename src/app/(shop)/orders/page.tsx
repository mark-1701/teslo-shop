// https://tailwindcomponents.com/component/hoverable-table

import Link from 'next/link';
import { redirect } from 'next/navigation';
import { IoCardOutline } from 'react-icons/io5';
import { getOrderByUser } from '@/src/actions';
import { Pagination, Title } from '@/src/components';

const OrdersPage = async () => {
  const { code, ok, orders = [] } = await getOrderByUser();

  if (code === 401) redirect('/auth/login');
  if (!ok) redirect('/');

  return (
    <>
      <Title title="Orders" />

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="border-b bg-gray-200">
            <tr>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-medium
                  text-gray-900"
              >
                #ID
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-medium
                  text-gray-900"
              >
                Nombre completo
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-medium
                  text-gray-900"
              >
                Estado
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-medium
                  text-gray-900"
              >
                Opciones
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr
                key={order.id}
                className="border-b bg-white transition duration-300 ease-in-out
                  hover:bg-gray-100"
              >
                <td
                  className="px-6 py-4 text-sm font-medium whitespace-nowrap
                    text-gray-900"
                >
                  {order.id.split('-').at(-1)}
                </td>
                <td
                  className="px-6 py-4 text-sm font-light whitespace-nowrap
                    text-gray-900"
                >
                  {order.orderAddresses?.firstName}{' '}
                  {order.orderAddresses?.lastName}
                </td>
                <td
                  className="flex items-center px-6 py-4 text-sm font-light
                    whitespace-nowrap text-gray-900"
                >
                  {order.IsPaid ? (
                    <>
                      <IoCardOutline className="text-green-800" />
                      <span className="mx-2 text-green-800">Pagada</span>
                    </>
                  ) : (
                    <>
                      <IoCardOutline className="text-red-800" />
                      <span className="mx-2 text-red-800">No Pagada</span>
                    </>
                  )}
                </td>
                <td className="px-6 text-sm font-light text-gray-900">
                  <Link
                    href={`/orders/${order.id}`}
                    className="hover:underline"
                  >
                    Ver orden
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination totalPages={3} />
    </>
  );
};

export default OrdersPage;
