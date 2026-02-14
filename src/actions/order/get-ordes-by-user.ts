'use server';

import { auth } from '@/auth';
import prisma from '@/src/lib/prisma';

export const getOrderByUser = async () => {
  const session = await auth();
  if (!session?.user)
    return {
      code: 401,
      ok: false,
      message: 'Debe de estar autenticado'
    };

  try {
    const orders = await prisma.order.findMany({
      where: {
        userId: session.user.id
      },
      include: {
        orderAddresses: {
          select: {
            firstName: true,
            lastName: true
          }
        }
      }
    });
    return {
      ok: true,
      orders
    };
  } catch (error) {
    return {
      ok: false,
      message: 'Hubo algún error al consultar la orden'
    };
  }
};
