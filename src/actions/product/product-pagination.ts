'use server';

import { Gender } from '@/src/app/generated/prisma/enums';
import prisma from '@/src/lib/prisma';

type PaginationOptions = {
  page?: number;
  take?: number;
  gender?: Gender;
};

export const getPaginatedProductsWithImages = async ({
  page = 1,
  take = 12,
  gender
}: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  try {
    // 1. Obtener los productos
    const products = await prisma.product.findMany({
      take: take,
      // (1 - 1) * 12 = 0 (1-12)
      // (2 - 1) * 12 = 12 (13-24)
      // (3 - 1) * 12 = 24 (24-36)
      skip: (page - 1) * take,
      where: {
        gender: gender as Gender
      },
      include: {
        // innerjoin
        productImages: {
          take: 2, // 2 registros
          select: {
            url: true // solo el url
          }
        }
      }
    });

    // 2. Obtener el total de páginas
    // TODO:
    const totalCount = await prisma.product.count({
      where: {
        gender: gender as Gender
      }
    });

    const totalPages = Math.ceil(totalCount / take);

    return {
      currentPage: page,
      totalPages: totalPages,
      products: products.map(product => ({
        ...product,
        images: product.productImages.map(image => image.url)
      }))
    };
  } catch (error) {
    throw new Error('No se pudieron cargar los productos');
  }
};
