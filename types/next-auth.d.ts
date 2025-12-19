import "next-auth"
import "next-auth/jwt"

// NextAuth.js 타입 확장
declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
    }
  }

  interface User {
    id: string
    email: string
    name?: string | null
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    email: string
    name?: string | null
  }
}


