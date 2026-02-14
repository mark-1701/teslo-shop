'use client';

import { useState } from 'react';
import { useCartStore } from '@/src/store';
import { QuantitySelector, SizeSelector } from '@/src/components';
import { CartProduct, Product, ValidSizes } from '@/src/interfaces';

type AddToCartProps = {
  product: Product;
};

export const AddToCart = ({ product }: AddToCartProps) => {
  const [size, setSize] = useState<ValidSizes | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);

  const addProductToCart = useCartStore(state => state.addProducttoCart);

  const addToCart = () => {
    setPosted(true);

    if (!size) return;

    // ! control + "."
    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity: quantity,
      size: size,
      image: product.images[0]
    };

    addProductToCart(cartProduct);
    setPosted(false);
    setQuantity(1);
    setSize(undefined);
  };

  return (
    <>
      {posted && !size && (
        <span className="fade-in mt-2 text-red-500">
          Debe de seleccionar una talla
        </span>
      )}

      {/* Selector de tallas */}
      <SizeSelector
        selectedSize={size}
        availableSizes={product.sizes}
        onSizeChanged={setSize}
      />

      {/* Selector de cantidad */}
      <QuantitySelector quantity={quantity} onQuantityChanged={setQuantity} />

      {/* Botón */}
      <button className="btn-primary my-5" onClick={addToCart}>
        Agregar al carrito
      </button>
    </>
  );
};
