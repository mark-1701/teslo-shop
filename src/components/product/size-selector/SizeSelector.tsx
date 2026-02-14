import { Size, ValidSizes } from '@/src/interfaces';
import clsx from 'clsx';

type SizeSelectorProps = {
  selectedSize?: Size;
  availableSizes: Size[];
  onSizeChanged: (size: ValidSizes) => void;
};

export const SizeSelector = ({
  selectedSize,
  availableSizes,
  onSizeChanged
}: SizeSelectorProps) => {
  return (
    <div className="my-5">
      <h3 className="fontbold mb-4">Tallas disponibles</h3>

      <div className="flex">
        {availableSizes.map(size => (
          <button
            key={size}
            onClick={() => onSizeChanged(size)}
            className={clsx('mx-2 text-lg hover:underline', {
              underline: size === selectedSize
            })}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};
