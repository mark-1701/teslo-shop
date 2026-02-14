'use server';

import { Address } from '@/src/interfaces';
import prisma from '@/src/lib/prisma';

export const setUserAddress = async (address: Address, userId: string) => {
  try {
    const newAddress = await createOrReplaceAdress(address, userId);

    return {
      ok: true,
      address: newAddress
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'No se pudo guardar la dirección.'
    };
  }
};

const createOrReplaceAdress = async (address: Address, userId: string) => {
  try {
    const storedAddress = await prisma.userAddress.findUnique({
      where: {
        userId
      }
    });

    const { country, ...restAddress } = address;
    const newAddressToSave = {
      ...restAddress,
      userId: userId,
      countryId: address.country
    };

    // Si no existe se crea
    if (!storedAddress) {
      const newAddress = await prisma.userAddress.create({
        data: newAddressToSave
      });
      return newAddress;
    }

    // Si existe se actualiza
    const updatedAddress = await prisma.userAddress.update({
      where: {
        userId
      },
      data: newAddressToSave
    });
    return updatedAddress;
  } catch (error) {
    console.log(error);
    throw new Error('No se pudo grabar la dirección');
  }
};
