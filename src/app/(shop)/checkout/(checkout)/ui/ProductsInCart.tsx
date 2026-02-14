'use client';

import Image from 'next/image';
import { useCartStore } from '@/src/store';
import { currencyFormat } from '@/src/utils';

export const ProductsInCart = () => {
  const productsInCart = useCartStore(state => state.cart);

  return (
    <div>
      {productsInCart.map(product => (
        <div key={`${product.slug}-${product.size}`} className="mb-5 flex">
          <Image
            src={`/products/${product.image}`}
            width={100}
            height={100}
            style={{
              width: '100px',
              height: '100px'
            }}
            alt={product.title}
            className="mr-5 rounded"
          />

          <div>
            <span>
              {product.size} - {product.title} ({product.quantity})
            </span>

            <p className="font-bold">
              {currencyFormat(product.price * product.quantity)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
