import { authConfig } from '@/auth.config';
import NextAuth from 'next-auth';

export default NextAuth(authConfig).auth;

export const config = {
  // https://nextjs.org/docs/app/api-reference/file-conventions/proxy#matcher
  matcher: [
    '/admin/:path*',
    '/profile/:path*',
    '/checkout/address/:path*',
    '/orders'
  ]
};
