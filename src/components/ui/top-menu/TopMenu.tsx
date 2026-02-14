'use client';

import { titleFont } from '@/src/config/fonts';
import { useCartStore, useUIStore } from '@/src/store';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { IoCartOutline, IoSearchOutline } from 'react-icons/io5';

export const TopMenu = () => {
  const openMenu = useUIStore(state => state.openSideMenu);
  const totalItemsInCart = useCartStore(state => state.getTotalItems());

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // resuelve problemas de hydratacion de zustand
    // es para mostrar el totalItemsInCart cuando ya se cargo todos los
    // elementos de nuestro component.
    setLoaded(true);
  }, []);

  return (
    <nav className="flex w-full items-center justify-between px-5">
      {/* Logo */}
      <div>
        <Link href="/">
          <span className={`${titleFont.className} font-bold antialiased`}>
            Teslo
          </span>
          <span> | Shop</span>
        </Link>
      </div>

      {/* Center Menu */}
      <div className="hidden sm:block">
        <Link
          className="m-2 rounded-md p-2 transition-all hover:bg-gray-100"
          href="/gender/men"
        >
          Hombres
        </Link>
        <Link
          className="m-2 rounded-md p-2 transition-all hover:bg-gray-100"
          href="/gender/women"
        >
          Mujeres
        </Link>
        <Link
          className="m-2 rounded-md p-2 transition-all hover:bg-gray-100"
          href="/gender/kid"
        >
          Niños
        </Link>
      </div>

      {/* Search, Cart, Menu */}
      <div className="flex items-center">
        <Link href="/search" className="mx-2">
          <IoSearchOutline className="h-5 w-5" />
        </Link>

        <Link
          href={totalItemsInCart === 0 ? '/empty' : '/cart'}
          className="mx-2"
        >
          <div className="relative">
            {loaded && totalItemsInCart > 0 && (
              <span
                className="fade-in absolute -top-2 -right-2 rounded-full
                  bg-blue-700 px-1 text-xs font-bold text-white"
              >
                {totalItemsInCart}
              </span>
            )}

            <IoCartOutline className="h-5 w-5" />
          </div>
        </Link>

        <button
          className="cursor-pointer rounded-md p-2 transition-all
            hover:bg-gray-100"
          onClick={openMenu}
        >
          Menu
        </button>
      </div>
    </nav>
  );
};
