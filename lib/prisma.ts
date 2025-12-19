// Prisma 7에서는 getPrismaClient를 사용하여 클라이언트 생성
// @ts-ignore - Prisma 7 with custom output path requires this workaround
import { PrismaClient } from "@prisma/client"

// Prisma 클라이언트 싱글톤 인스턴스 생성
// 개발 환경에서 핫 리로드 시 여러 인스턴스가 생성되는 것을 방지
declare global {
  // eslint-disable-next-line no-var
  var prisma: InstanceType<typeof PrismaClient> | undefined
}

// Prisma 클라이언트 생성 함수 (에러 핸들링 포함)
function createPrismaClient() {
  try {
    // Prisma 7에서는 adapter나 accelerateUrl이 필요 없을 수도 있음
    // 빈 옵션으로 시도
    const client = new PrismaClient({
      log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    } as any)
    
    return client
  } catch (error) {
    console.error("Prisma 클라이언트 생성 오류:", error)
    console.error("에러 타입:", error instanceof Error ? error.constructor.name : typeof error)
    console.error("에러 메시지:", error instanceof Error ? error.message : String(error))
    
    // Prisma 7의 adapter/accelerateUrl 요구사항 에러인 경우
    if (error instanceof Error && error.message.includes("adapter") || error.message.includes("accelerateUrl")) {
      console.error("Prisma 7에서는 adapter 또는 accelerateUrl이 필요합니다.")
      console.error("DATABASE_URL을 확인하거나 Prisma 설정을 확인하세요.")
    }
    
    throw error
  }
}

export const prisma =
  globalThis.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma

