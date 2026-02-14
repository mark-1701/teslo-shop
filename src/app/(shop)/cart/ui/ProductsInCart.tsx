'use client';

import Link from 'next/link';
import { useCartStore } from '@/src/store';
import { ProductImage, QuantitySelector } from '@/src/components';
import { currencyFormat } from '@/src/utils';

export const ProductsInCart = () => {
  const productsInCart = useCartStore(state => state.cart);
  const updatedProductQuantity = useCartStore(
    state => state.updateProductQuantity
  );
  const removeProduct = useCartStore(state => state.removeProduct);

  return (
    <div>
      {productsInCart.map(product => (
        <div key={`${product.slug}-${product.size}`} className="mb-5 flex">
          <ProductImage
            src={product.image}
            width={100}
            height={100}
            style={{
              width: '100px',
              height: '100px',
              objectFit: 'cover'
            }}
            alt={product.title}
            className="mr-5 rounded"
          />

          <div>
            <Link
              className="cursor-pointer hover:underline"
              href={`/product/${product.slug}`}
            >
              {product.size} - {product.title}
            </Link>

            <p>{currencyFormat(product.price)}</p>

            <QuantitySelector
              quantity={product.quantity}
              onQuantityChanged={quantity =>
                updatedProductQuantity(product, quantity)
              }
            />

            <button
              className="mt-3 cursor-pointer underline"
              onClick={() => {
                removeProduct(product);
              }}
            >
              Remover
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
