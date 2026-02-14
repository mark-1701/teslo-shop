import Image from 'next/image';

type ProductImageprops = {
  src?: string;
  alt: string;
  // formatear className
  className?: React.StyleHTMLAttributes<HTMLImageElement>['className'];
  style?: React.StyleHTMLAttributes<HTMLImageElement>['style'];
  width: number;
  height: number;
};

export const ProductImage = ({
  src,
  alt,
  className,
  style,
  width,
  height
}: ProductImageprops) => {
  const localSrc = src
    ? src.startsWith('http')
      ? src
      : `/products/${src}`
    : '/imgs/placeholder.jpg';

  return (
    <div>
      <Image
        src={localSrc}
        width={width}
        height={height}
        alt={alt}
        className={className}
        style={style}
      />
    </div>
  );
};
