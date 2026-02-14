'use client';

import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5';

type QuantitySelectorProps = {
  quantity: number;
  onQuantityChanged: (quantity: number) => void;
};

export const QuantitySelector = ({
  quantity,
  onQuantityChanged
}: QuantitySelectorProps) => {
  
  const onValueChanged = (value: number) => {
    if (quantity + value < 1) return;
    onQuantityChanged(quantity + value);
  };

  return (
    <div className="flex">
      <button className="cursor-pointer" onClick={() => onValueChanged(-1)}>
        <IoRemoveCircleOutline size={30} />
      </button>
      <span
        className="mx-3 flex w-20 items-center justify-center rounded
          bg-gray-200 px-5 text-center"
      >
        {quantity}
      </span>

      <button className="cursor-pointer" onClick={() => onValueChanged(+1)}>
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  );
};
