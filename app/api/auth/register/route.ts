import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { z } from "zod"

// Prisma 클라이언트를 동적으로 import하여 로딩 문제 방지
async function getPrisma() {
  try {
    const { prisma } = await import("@/lib/prisma")
    return prisma
  } catch (error) {
    console.error("Prisma 클라이언트 import 오류:", error)
    throw error
  }
}

// 회원가입 요청 데이터 검증 스키마
const registerSchema = z.object({
  email: z.string().email("올바른 이메일 형식이 아닙니다."),
  password: z.string().min(6, "비밀번호는 최소 6자 이상이어야 합니다."),
  name: z.string().optional(),
})

// 회원가입 API 엔드포인트
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("회원가입 요청 받음:", { email: body.email, name: body.name })

    // 입력 데이터 검증
    const validatedData = registerSchema.parse(body)
    console.log("데이터 검증 완료:", validatedData)

    // Prisma 클라이언트 가져오기
    const prisma = await getPrisma()
    console.log("Prisma 클라이언트 로드 완료")

    // 이미 존재하는 이메일인지 확인
    console.log("사용자 존재 여부 확인 중...")
    const existingUser = await prisma.user.findUnique({
      where: {
        email: validatedData.email,
      },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "이미 사용 중인 이메일입니다." },
        { status: 400 }
      )
    }

    // 비밀번호 해시화
    console.log("비밀번호 해시화 중...")
    const hashedPassword = await bcrypt.hash(validatedData.password, 10)
    console.log("비밀번호 해시화 완료")

    // 사용자 생성
    console.log("사용자 생성 중...")
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        password: hashedPassword,
        name: validatedData.name,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    })

    return NextResponse.json(
      {
        message: "회원가입이 완료되었습니다.",
        user,
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    // 에러 상세 정보 로깅
    console.error("회원가입 오류:", error)
    console.error("에러 타입:", error instanceof Error ? error.constructor.name : typeof error)
    console.error("에러 메시지:", error instanceof Error ? error.message : String(error))
    console.error("에러 스택:", error instanceof Error ? error.stack : "N/A")

    return NextResponse.json(
      { 
        error: "회원가입 중 오류가 발생했습니다.",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
}

