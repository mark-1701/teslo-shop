import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getOrderById } from '@/src/actions/order/get-order-by-id';
import { OrderStatus, PayPalButton, Title } from '@/src/components';
import { currencyFormat } from '@/src/utils';

type OrdersIdPageProps = {
  params: {
    id: string;
  };
};

const OrdersIdPage = async ({ params }: OrdersIdPageProps) => {
  const { id } = await params;

  // Consultar la información de la orden
  const resp = await getOrderById(id);
  const ok = resp.ok;
  const order = resp.order;

  const address = resp.order?.orderAddresses!;
  const orderItems = resp.order?.orderItems || [];

  if (!ok) notFound();

  return (
    <div className="mb-72 flex items-center justify-center px-10 sm:px-0">
      <div className="flex w-[1000px] flex-col">
        <Title title={`Orden #${id.split('-').at(-1)}`} />

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          {/* Carrito */}
          <div className="mt-5 flex flex-col">
            <OrderStatus isPaid={order?.IsPaid ?? false} />

            {/* Items */}
            {orderItems.map(item => (
              <div key={item.id} className="mb-5 flex">
                <Image
                  src={`/products/${item.product.productImages[0].url}`}
                  width={100}
                  height={100}
                  style={{
                    width: '100px',
                    height: '100px'
                  }}
                  alt={item.product.title}
                  className="mr-5 rounded"
                />

                <div>
                  <Link
                    href={`/product/${item.product.slug}`}
                    className="hover:text-blue-500"
                  >
                    {item.product.title}
                  </Link>
                  <p>$ {item.product.price}</p>
                  {/* <QuantitySelector quantity={3} /> */}

                  <button className="mt-3 underline">Remover</button>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout - Resumen de la orden*/}
          <div className="rounded-xl bg-white p-7 shadow-xl">
            <div className="mb-6">
              <h2 className="mb-2 text-2xl">Dirección de entrega</h2>
              <p className="text-xl">
                {address.firstName} {address.lastName}
              </p>
              <p>{address.address}</p>
              <p>{address.address2}</p>
              <p>{address.postalCode}</p>
              <p>
                {address.city}, {address.countryId}
              </p>
              <p>{address.phone}</p>
            </div>

            {/* Divisor */}
            <div className="mb-6 h-0.5 bg-gray-100"></div>

            {/* Summary */}
            <div>
              <h2 className="mb-2 text-2xl">Resumen de orden</h2>
              <div className="grid grid-cols-2">
                <span>No. Productos</span>
                <span className="text-right">
                  {order?.itemsInOrder === 1
                    ? '1 artículo'
                    : `${order?.itemsInOrder} artículos`}
                </span>

                <span>Subtotal</span>
                <span className="text-right">$ {order?.subTotal}</span>

                <span>Impuestos (15%)</span>
                <span className="text-right">{currencyFormat(order!.tax)}</span>

                <span className="mt-5 text-2xl">Total</span>
                <span className="mt-5 text-right text-2xl">
                  {currencyFormat(order!.total)}
                </span>
              </div>
              <div className="mt-5">
                {order?.IsPaid ? (
                  <OrderStatus isPaid={order?.IsPaid ?? false} />
                ) : (
                  <PayPalButton amount={order!.total} orderId={order!.id} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersIdPage;
