import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

// Prisma 클라이언트를 동적으로 import하여 로딩 문제 방지
let prisma: any
async function getPrisma() {
  if (!prisma) {
    try {
      const { prisma: prismaClient } = await import("@/lib/prisma")
      prisma = prismaClient
    } catch (error) {
      console.error("Prisma 클라이언트 import 오류:", error)
      throw error
    }
  }
  return prisma
}

// NextAuth.js 설정 옵션 (NextAuth v5)
export const authOptions: NextAuthConfig = {
  providers: [
    // 이메일/비밀번호로 로그인하는 Credentials Provider
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "이메일", type: "email" },
        password: { label: "비밀번호", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("이메일과 비밀번호를 입력해주세요.")
        }

        // Prisma 클라이언트 가져오기
        const prismaClient = await getPrisma()

        // 데이터베이스에서 사용자 찾기
        const user = await prismaClient.user.findUnique({
          where: {
            email: credentials.email,
          },
        })

        if (!user) {
          throw new Error("이메일 또는 비밀번호가 올바르지 않습니다.")
        }

        // 비밀번호 확인
        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        )

        if (!isPasswordValid) {
          throw new Error("이메일 또는 비밀번호가 올바르지 않습니다.")
        }

        // 인증 성공 시 사용자 정보 반환
        return {
          id: user.id,
          email: user.email,
          name: user.name,
        }
      },
    }),
  ],
  pages: {
    signIn: "/login", // 로그인 페이지 경로
    signOut: "/", // 로그아웃 후 리다이렉트 경로
  },
  session: {
    strategy: "jwt", // JWT 세션 전략 사용
  },
  callbacks: {
    // JWT 토큰에 사용자 정보 추가
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
      }
      return token
    },
    // 세션에 사용자 정보 추가
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key-change-in-production",
}

