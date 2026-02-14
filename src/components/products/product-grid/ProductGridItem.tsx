'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Product } from '@/src/interfaces';

type ProductGridItemProps = {
  product: Product;
};

export const ProductGridItem = ({ product }: ProductGridItemProps) => {
  const [displayImage, setDisplayImage] = useState(product.images[0]);

  const localSrc = displayImage
    ? displayImage.startsWith('http')
      ? displayImage
      : `/products/${displayImage}`
    : '/imgs/placeholder.jpg';
  return (
    <div className="fade-in overflow-hidden rounded-md">
      <Link href={`/product/${product.slug}`}>
        <Image
          src={localSrc}
          alt={product.title}
          className="w-full rounded object-cover"
          width={500}
          height={500}
          onMouseEnter={() => setDisplayImage(product.images[1])}
          onMouseLeave={() => setDisplayImage(product.images[0])}
        />
      </Link>

      <div className="flex flex-col p-4">
        <Link href={`/product/${product.slug}`} className="hover:text-blue-600">
          {product.title}
        </Link>
        <span className="font-bold">$ {product.price}</span>
      </div>
    </div>
  );
};
