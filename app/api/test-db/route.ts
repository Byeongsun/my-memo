import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// 데이터베이스 연결 테스트 API
export async function GET() {
  try {
    // Prisma 클라이언트가 제대로 로드되는지 확인
    const userCount = await prisma.user.count()
    
    return NextResponse.json({
      success: true,
      message: "데이터베이스 연결 성공",
      userCount,
    })
  } catch (error) {
    console.error("데이터베이스 테스트 오류:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    )
  }
}


