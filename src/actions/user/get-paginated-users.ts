'use server';

import { auth } from '@/auth';
import prisma from '@/src/lib/prisma';

export const getPaginatedUsers = async () => {
  const session = await auth();

  if (session?.user.role !== 'admin')
    return {
      code: 401,
      ok: false,
      message: 'Debe de ser un usuario administrador'
    };

  const users = await prisma.user.findMany({
    orderBy: {
      name: 'desc'
    }
  });

  return {
    ok: true,
    users
  };
};
