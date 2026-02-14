'use client';

import Link from 'next/link';
import { useUIStore } from '@/src/store';
import { logout } from '@/src/actions';
import clsx from 'clsx';
import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline
} from 'react-icons/io5';

type SidebarItemsProps = {
  isAdmin: boolean;
  isAuthenticated: boolean;
};

export const SidebarItems = ({
  isAdmin,
  isAuthenticated
}: SidebarItemsProps) => {
  const isSideMenuOpen = useUIStore(state => state.isSideMenuOpen);
  const closeMenu = useUIStore(state => state.closeSideMenu);

  return (
    <div>
      {/* Background black */}
      {isSideMenuOpen && (
        <div
          className="fixed top-0 left-0 z-10 h-screen w-screen bg-black
            opacity-30"
        ></div>
      )}

      {/* Blue */}
      {isSideMenuOpen && (
        <div
          onClick={closeMenu}
          className="fade-in fixed top-0 left-0 z-10 h-screen w-screen
            backdrop-blur-sm backdrop-filter"
        ></div>
      )}

      {/* Sidemenu */}
      {/* aplicar clases de forma dímica con clsx */}
      <nav
        className={clsx(
          `fixed top-0 right-0 z-20 h-screen w-[500px] transform bg-white p-5
          shadow-2xl transition-all duration-300`,
          {
            'translate-x-full': !isSideMenuOpen
          }
        )}
      >
        <IoCloseOutline
          size={20}
          className="absolute right-5 cursor-pointer"
          onClick={closeMenu}
        />

        {/* input búsqueda */}
        <div className="relative mt-14">
          <IoSearchOutline size={20} className="absolute top-2 left-2" />
          <input
            type="text"
            placeholder="Buscar"
            className="w-full rounded border-b-2 border-gray-200 bg-gray-50 py-1
              pr-10 pl-10 text-xl focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Menú */}
        {isAuthenticated && (
          <>
            <Link
              href="/profile"
              className="mt-10 flex items-center rounded p-2 transition-all
                hover:bg-gray-100"
              onClick={closeMenu}
            >
              <IoPersonOutline size={30} />
              <span className="ml-3 text-xl">Perfil</span>
            </Link>

            <Link
              href="/orders"
              className="mt-10 flex items-center rounded p-2 transition-all
                hover:bg-gray-100"
              onClick={closeMenu}
            >
              <IoTicketOutline size={30} />
              <span className="ml-3 text-xl">Ordenes</span>
            </Link>
          </>
        )}

        {isAuthenticated && (
          <button
            className="mt-10 flex w-full cursor-pointer items-center rounded p-2
              transition-all hover:bg-gray-100"
            onClick={() => {
              logout();
              closeMenu();
            }}
          >
            <IoLogOutOutline size={30} />
            <span className="ml-3 text-xl">Salir</span>
          </button>
        )}

        {!isAuthenticated && (
          <Link
            href="/profile"
            className="mt-10 flex items-center rounded p-2 transition-all
              hover:bg-gray-100"
            onClick={() => {
              closeMenu();
            }}
          >
            <IoLogInOutline size={30} />
            <span className="ml-3 text-xl">Ingresar</span>
          </Link>
        )}

        {isAdmin && (
          <>
            {/* Line Separator */}
            <div className="my-10 h-px w-full bg-gray-200"></div>

            <Link
              href="/admin/products"
              className="mt-10 flex items-center rounded p-2 transition-all
                hover:bg-gray-100"
              onClick={closeMenu}
            >
              <IoShirtOutline size={30} />
              <span className="ml-3 text-xl">Productos</span>
            </Link>

            <Link
              href="/admin/orders"
              className="mt-10 flex items-center rounded p-2 transition-all
                hover:bg-gray-100"
              onClick={closeMenu}
            >
              <IoTicketOutline size={30} />
              <span className="ml-3 text-xl">Todas las ordenes</span>
            </Link>

            <Link
              href="/admin/users"
              className="mt-10 flex items-center rounded p-2 transition-all
                hover:bg-gray-100"
            >
              <IoPeopleOutline size={30} />
              <span className="ml-3 text-xl">Usuarios</span>
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};
