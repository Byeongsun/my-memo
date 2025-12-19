import { PrismaClient } from "@prisma/client"

// Prisma 클라이언트 싱글톤 인스턴스 생성
// 개발 환경에서 핫 리로드 시 여러 인스턴스가 생성되는 것을 방지
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

export const prisma =
  globalThis.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  })

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma

