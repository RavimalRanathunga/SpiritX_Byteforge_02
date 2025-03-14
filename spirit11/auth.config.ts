import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
    pages: {
        signIn: '/login',
        newUser:'/signup',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
          const isLoggedIn = !!auth?.user;
          const isOnDashboard = nextUrl.pathname.startsWith('/user_interface');
          if (isOnDashboard) {
            if (isLoggedIn) return true;
            return false; 
          } else if (isLoggedIn) {
            return Response.redirect(new URL('/user_interface', nextUrl));
          }
          return true;
        },
      },
      providers: [], 
} satisfies NextAuthConfig;