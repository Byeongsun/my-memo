"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

// 인증이 필요한 페이지를 보호하는 컴포넌트
export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  // 로딩 중이거나 인증되지 않은 경우 로딩 표시
  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100/50 via-pink-100/30 to-blue-100/40 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">로딩 중...</p>
        </div>
      </div>
    )
  }

  // 인증된 경우 자식 컴포넌트 렌더링
  return <>{children}</>
}


