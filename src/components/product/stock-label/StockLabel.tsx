'use client';

import { getStockBySlug } from '@/src/actions/product/get-stock-by-slug';
import { titleFont } from '@/src/config/fonts';
import { useEffect, useState } from 'react';

type StockLabelProps = {
  slug: string;
};

export const StockLabel = ({ slug }: StockLabelProps) => {
  const [stock, setStock] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getStock();
  }, []);

  const getStock = async () => {
    const stockFromDB = await getStockBySlug(slug);
    setStock(stockFromDB);
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <h1
          className={`${titleFont.className} mb-2 animate-pulse bg-gray-200
            text-lg font-bold font-light antialiased`}
        >
          &nbsp;
        </h1>
      ) : (
        <h1
          className={`${titleFont.className} mb-2 text-lg font-bold font-light
            antialiased`}
        >
          Stock: {stock}
        </h1>
      )}
    </>
  );
};
