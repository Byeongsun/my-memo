import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"

// NextAuth.js 핸들러 생성 (NextAuth v5)
// NextAuth v5에서는 { handlers, auth }를 반환
const { handlers } = NextAuth(authOptions)

// handlers에서 GET과 POST를 export
export const { GET, POST } = handlers

