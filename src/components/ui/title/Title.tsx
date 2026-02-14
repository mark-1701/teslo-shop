import { titleFont } from '@/src/config/fonts';

type TitleProps = {
  title: string;
  subtitle?: string;
  className?: string;
};

export const Title = ({ title, subtitle, className }: TitleProps) => {
  return (
    <div className={`mt-3 ${className}`}>
      <h1
        className={`${titleFont.className} my-10 text-4xl font-semibold
          antialiased`}
      >
        {title}
      </h1>

      {subtitle && <h3 className="mb-5 text-xl">{subtitle}</h3>}
    </div>
  );
};
