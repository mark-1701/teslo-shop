import Link from 'next/link';
import { IoCartOutline } from 'react-icons/io5';

const EmptyPage = () => {
  return (
    <div className="flex h-[800px] items-center justify-center">
      <IoCartOutline size={80} className="mx-5" />

      <div className="flex flex-col items-center">
        <h1 className="text-xl font-semibold">Tu carrito está vacío</h1>

        <Link href="/" className="mt-2 text-4xl text-blue-500">
          Regresar
        </Link>
      </div>
    </div>
  );
};

export default EmptyPage;
