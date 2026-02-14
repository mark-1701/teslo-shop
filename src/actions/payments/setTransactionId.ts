'use server';

import prisma from '@/src/lib/prisma';

export const setTransactionId = async (
  orderId: string,
  transactionId: string
) => {
  try {
    const orderUpdated = await prisma.order.update({
      where: {
        id: orderId
      },
      data: {
        transactionId
      }
    });

    if (!orderUpdated)
      return {
        ok: false,
        message: `No se econtró una orden con el id ${orderId}`
      };

    return {
      ok: true
    };
  } catch (error) {
    return {
      ok: false,
      message: 'No se puedo actualizar el id de la transaccion'
    };
    // TODO: verificar que se hace aquí
  }
};
