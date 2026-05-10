import type { NextAuthConfig } from "next-auth"

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/login",
  },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isAuthPage = nextUrl.pathname.startsWith("/auth")

      if (!isLoggedIn && !isAuthPage) return false

      if (isLoggedIn && isAuthPage) {
        return Response.redirect(new URL("/motorcycles", nextUrl))
      }

      return true
    },
  },
}