'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Credenciales inválidas.';
        default:
          return 'Algo salió mal.';
      }
    }
    throw error;
  }
}

export const login = async (
  email: string,
  password: string,
  redirectTo: string
) => {
  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo
    });
    return {
      ok: true
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Credenciales inválidas.';
        default:
          return 'Algo salió mal.';
      }
    }
    throw error;
  }
};
