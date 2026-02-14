'use client';

import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { SessionProvider } from 'next-auth/react';

type ProviderProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProviderProps) {
  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '',
        intent: 'capture',
        currency: 'USD'
      }}
    >
      <SessionProvider>{children}</SessionProvider>
    </PayPalScriptProvider>
  );
}
