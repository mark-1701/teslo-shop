// [1,2,3,4,5,...,7]
export const generatePaginationNumbers = (currentPage: number, totalPages: number) => {
  // Si el número total de páginas es 7 0 menos
  // vamos a mostrar todas las páginas sin puntos suspensivos

  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1); // [1, 2, 3, 4, 5, 6, 7]
  }

  // Si la página actual esta entre las primeras 3 páginas
  // mostrar las primeras 3, puntos suspensivos, y las últimos 2
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages]; // [1, 2 ,3, '...', 49, 50]
  }

  // Si la página actual esta entre las últimas 3 páginas
  // mostrar las primeras 2, puntos suspensivos, las útimas 3 páginas
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // Si la página actual esta en otro lugar medio
  // mostrar la primera página, puntos suspensivos, la página actyual y vecinos
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages
  ];
};
