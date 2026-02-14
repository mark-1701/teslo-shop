import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  providers: [],
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account'
  },
  callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },
    jwt({ token, user }) {
      if (user) token.data = user;
      return token;
    },
    session({ session, token, user }) {
      session.user = token.data as any;
      return session;
    }
  }
} satisfies NextAuthConfig;
