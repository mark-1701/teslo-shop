import clsx from 'clsx';
import { IoCardOutline } from 'react-icons/io5';

type PaidMessageProps = {
  isPaid?: boolean;
};

export const OrderStatus = ({ isPaid = false }: PaidMessageProps) => {
  return (
    <div
      className={clsx(
        `mb-5 flex items-center rounded-lg px-3.5 py-2 text-xs font-bold
        text-white`,
        {
          'bg-red-500': !isPaid,
          'bg-green-700': isPaid
        }
      )}
    >
      <IoCardOutline size={30} />
      <span className="mx-2">{isPaid ? 'Pagada' : 'Pendiente de pago'}</span>
    </div>
  );
};
