'use client';

import { useCartStore } from '@/src/store';
import { currencyFormat } from '@/src/utils';

const OrderSummary = () => {
  const { itemsInCart, subTotal, tax, total } = useCartStore(state =>
    state.getSummaryInformation()
  );

  return (
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
      <span className="mt-5 text-right text-2xl">{currencyFormat(total)}</span>
    </div>
  );
};

export default OrderSummary;
