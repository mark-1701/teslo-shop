'use server';

import { auth } from '@/auth';
import prisma from '@/src/lib/prisma';

export const getOrderById = async (id: string) => {
  // Autenticacion
  const session = await auth();
  if (!session?.user) throw new Error('Debe estar autenticado.');

  try {
    const order = await prisma.order.findFirst({
      where: {
        id
      },
      include: {
        orderAddresses: true,
        orderItems: {
          include: {
            product: {
              include: {
                productImages: {
                  select: {
                    url: true
                  }
                }
              }
            }
          }
        }
      }
    });
    if (!order) throw new Error(`${id} no existe`);

    // Comprobar el acceso que tiene el usuario a la orden
    if (session.user.role === 'user') {
      if (session.user.id !== order.userId) {
        throw new Error(`${id} no es de ese usuario.`);
      }
    }

    // TODO: comprobar la consistencia del los orderItems

    return {
      ok: true,
      order,
      message: 'Datos de la orden consultada correctamente.'
    };
  } catch (error: any) {
    return {
      ok: false,
      message: error.message
    };
  }
};
