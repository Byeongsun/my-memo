"use client"

import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"

// NextAuth 세션 프로바이더 컴포넌트
export function AuthSessionProvider({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>
}


