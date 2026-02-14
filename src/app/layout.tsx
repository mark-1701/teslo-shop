import type { Metadata } from 'next';

import './globals.css';
import { inter } from '@/src/config/fonts';
import { StoreHydration } from '../store';
import Providers from '../components/providers/Providers';

export const metadata: Metadata = {
  title: {
    template: '%s - Teslo | Shop', // %s - se sustituye por el título de la página
    default: 'Home - Teslo | Shop'
  },
  description: 'Una tienda virtual de productos'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <StoreHydration />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
