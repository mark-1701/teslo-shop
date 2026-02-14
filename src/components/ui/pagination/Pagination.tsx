'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { redirect, usePathname, useSearchParams } from 'next/navigation';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import { generatePaginationNumbers } from '@/src/utils';

type PaginationProps = {
  totalPages: number;
};

export const Pagination = ({ totalPages }: PaginationProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pageString = searchParams.get('page') ?? 1;
  const currentPage = isNaN(+pageString) ? 1 : +pageString;

  // Redirecciona si es negativo o un String
  if (currentPage < 1 || isNaN(+pageString)) {
    redirect(pathname);
  }

  // String con todas las páginas
  const allPages = generatePaginationNumbers(currentPage, totalPages);

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);

    if (pageNumber === '...') `${pathname}?${params.toString()}`;
    if (+pageNumber <= 0) return `${pathname}`; // href="/"
    if (+pageNumber > totalPages) return `${pathname}?${params.toString()}`; // Next >

    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="mt-10 mb-32 flex justify-center text-center">
      <nav aria-label="Page navigation example">
        <ul className="list-style-none flex">
          <li className="page-item">
            <Link
              className="page-link focus:shadow-non relative block rounded
                border-0 bg-transparent px-3 py-1.5 text-gray-800 transition-all
                duration-300 outline-none hover:bg-gray-200 hover:text-gray-800"
              href={createPageUrl(currentPage - 1)}
            >
              <IoChevronBackOutline />
            </Link>
          </li>

          {allPages.map((page, index) => (
            <li key={`${page}+${index}`} className="page-item">
              <a
                className={clsx(
                  `page-link relative block rounded border-0 px-3 py-1.5
                  text-gray-800 transition-all duration-300 outline-none
                  focus:shadow-none`,
                  {
                    [`bg-blue-500 text-white shadow-sm hover:bg-blue-800
                    hover:text-white`]: page === currentPage
                  }
                )}
                href={createPageUrl(page)}
              >
                {page}
              </a>
            </li>
          ))}

          <li className="page-item">
            <Link
              className="page-link relative block rounded border-0
                bg-transparent px-3 py-1.5 text-gray-800 transition-all
                duration-300 outline-none hover:bg-gray-200 hover:text-gray-800
                focus:shadow-none"
              href={createPageUrl(currentPage + 1)}
            >
              <IoChevronForwardOutline />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
