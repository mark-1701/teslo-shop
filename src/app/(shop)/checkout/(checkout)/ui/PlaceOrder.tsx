'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAddressStore, useCartStore } from '@/src/store';
import { placeOrder } from '@/src/actions';
import { currencyFormat } from '@/src/utils';
import clsx from 'clsx';

export const PlaceOrder = () => {
  const router = useRouter();
  const address = useAddressStore(state => state.address);
  const { itemsInCart, subTotal, tax, total } = useCartStore(state =>
    state.getSummaryInformation()
  );
  const clearCart = useCartStore(state => state.clearCart);
  const cart = useCartStore(state => state.cart);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);

    const productsToOrder = cart.map(product => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size
    }));

    // Server action
    const resp = await placeOrder(productsToOrder, address);
    if (!resp.ok) {
      setIsPlacingOrder(false);
      setErrorMessage(resp.message);
      return;
    }

    // * Salio bien
    clearCart();
    router.replace(`/orders/${resp.order?.id}`);
  };

  return (
    <div className="rounded-xl bg-white p-7 shadow-xl">
      <h2 className="mb-1 text-2xl font-bold">Dirección de entrega</h2>
      <div className="mb-6">
        <p className="text-xl">
          {address.firstName} {address.lastName}
        </p>
        <p>{address.address}</p>
        <p>{address.address2}</p>
        <p>{address.postalCode}</p>
        <p>
          {address.city}, {address.country}
        </p>
        <p>{address.phone}</p>
      </div>

      {/* Devider */}
      <div className="mb-6 h-0.5 bg-gray-100"></div>

      <div className="grid grid-cols-2">
        <span>No. Productos</span>
        <span className="text-right">
          {itemsInCart === 1 ? '1 artículo' : `${itemsInCart} artículos`}
        </span>

        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(subTotal)}</span>

        <span>Impuestos (15%)</span>
        <span className="text-right">{currencyFormat(tax)}</span>

        <span className="mt-5 text-2xl">Total</span>
        <span className="mt-5 text-right text-2xl">
          {currencyFormat(total)}
        </span>
      </div>

      <div className="mt-8 w-full">
        <p className="mb-8">
          {/* Disclaimer */}
          <span className="text-xs">
            Al hacer clic en "Colocar orden", aceptas nuestros{' '}
            <a href="#" className="underline">
              Términos y codiciones
            </a>
            {' y '}
            <a href="#" className="underline">
              política de privacidad
            </a>
          </span>
        </p>

        <p className="mb-3 text-sm text-red-500">{errorMessage}</p>

        <button
          // href="/orders/123"
          onClick={onPlaceOrder}
          className={clsx({
            'btn-primary': !isPlacingOrder,
            'btn-disabled': isPlacingOrder
          })}
        >
          Colocar orden
        </button>
      </div>
    </div>
  );
};
