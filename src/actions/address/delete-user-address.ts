'use server';

import prisma from '@/src/lib/prisma';

export const deleteUserAddress = async (userId: string) => {
  try {
    const AddressFound = await prisma.userAddress.findFirst({
      where: {
        userId
      }
    });
    if (!AddressFound)
      return { ok: true, message: 'Dirección ya está eliminada.' };

    !(await prisma.userAddress.delete({
      where: {
        userId
      }
    }));
    return {
      ok: true
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'No se pudo eliminar la dirección.'
    };
  }
};
