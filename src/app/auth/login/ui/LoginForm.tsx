'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { IoInformationOutline } from 'react-icons/io5';
import clsx from 'clsx';
import { authenticate } from '@/src/actions';
import { titleFont } from '@/src/config/fonts';

const LoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <form action={formAction} className="space-y-3">
      <h1 className={`${titleFont.className} mb-5 text-4xl`}>Ingresar</h1>
      <div className="flex flex-col">
        <label htmlFor="email">Correo electrónico</label>
        <input
          type="email"
          name="email"
          id="email"
          className="mb-5 rounded border bg-gray-200 px-5 py-2"
        />

        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          name="password"
          id="password"
          className="mb-5 rounded border bg-gray-200 px-5 py-2"
        />

        {/* Error message */}
        {errorMessage && (
          <div className="mb-3 flex">
            <IoInformationOutline className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{errorMessage}</p>
          </div>
        )}

        <input type="hidden" name="redirectTo" value={callbackUrl} />

        <button
          className={clsx({
            'w-full cursor-pointer': true,
            'btn-primary': !isPending,
            'btn-disabled': isPending
          })}
          disabled={isPending}
          aria-disabled={isPending}
        >
          Ingresar
        </button>

        {/* Divisor */}
        <div className="my-5 flex items-center">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800">O</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>

        <Link
          href="/auth/new-account"
          className="btn-secondary cursor-pointer text-center"
        >
          Crear una nueva cuenta
        </Link>
      </div>
    </form>
  );
};

// const ProvidersMap = ({ callbackUrl }: { callbackUrl?: string }) => {
//   return (
//     <>
//       {Object.values(providerMap).map(provider => (
//         <form
//           key={provider.id}
//           action={async () => {
//             'use server';
//             try {
//               await signIn(provider.id, {
//                 redirectTo: callbackUrl ?? ''
//               });
//             } catch (error) {
//               // Signin can fail for a number of reasons, such as the user
//               // not existing, or the user not having the correct role.
//               // In some cases, you may want to redirect to a custom error
//               if (error instanceof AuthError) {
//                 return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
//               }

//               // Otherwise if a redirects happens Next.js can handle it
//               // so you can just re-thrown the error and let Next.js handle it.
//               // Docs:
//               // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
//               throw error;
//             }
//           }}
//         >
//           <button type="submit">
//             <span>Sign in with {provider.name}</span>
//           </button>
//         </form>
//       ))}
//     </>
//   );
// };

export default LoginForm;
