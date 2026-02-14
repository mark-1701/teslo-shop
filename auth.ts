import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import prisma from '@/src/lib/prisma';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import type { Provider } from 'next-auth/providers';

const providers: Provider[] = [
  Credentials({
    credentials: { password: { type: 'password' } },
    async authorize(credentials) {
      // Tipado con zod
      const parsedCredentials = z
        .object({ email: z.string().email(), password: z.string().min(6) })
        .safeParse(credentials);
      if (!parsedCredentials.success) return null;
      const { email, password } = parsedCredentials.data;

      // Verificar correo
      const user = await prisma.user.findUnique({
        where: { email: email.toLowerCase() }
      });
      if (!user) return null;

      // Verificar contrasenia
      if (!bcrypt.compareSync(password, user.password)) return null;

      // Regresar el usuario
      const { password: _, ...rest } = user;
      return rest;
    }
  })
];

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers
});

// export const providerMap = providers
//   .map(provider => {
//     if (typeof provider === 'function') {
//       const providerData = provider();
//       return { id: providerData.id, name: providerData.name };
//     } else {
//       return { id: provider.id, name: provider.name };
//     }
//   })
//   .filter(provider => provider.id !== 'credentials');
