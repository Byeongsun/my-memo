"use client"

import { Plus, Search, LogOut, LogIn, User } from "lucide-react"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function NotesHeader() {
  const { data: session, status } = useSession()
  const router = useRouter()

  // 로그아웃 처리 함수
  const handleLogout = async () => {
    await signOut({ redirect: false })
    router.push("/login")
    router.refresh()
  }

  return (
    <header className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-bold text-balance bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          나의 메모
        </h1>
        <div className="flex items-center gap-3">
          {status === "loading" ? (
            <div className="h-10 w-20 bg-gray-200 animate-pulse rounded-md" />
          ) : session ? (
            <>
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg"
              >
                <Plus className="mr-2 h-5 w-5" />새 메모
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="lg" className="gap-2">
                    <User className="h-4 w-4" />
                    {session.user?.name || session.user?.email}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{session.user?.name || "사용자"}</p>
                      <p className="text-xs text-muted-foreground">{session.user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    로그아웃
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button
              size="lg"
              variant="outline"
              onClick={() => router.push("/login")}
              className="gap-2"
            >
              <LogIn className="h-4 w-4" />
              로그인
            </Button>
          )}
        </div>
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="메모 검색..."
          className="pl-10 bg-white/80 backdrop-blur-sm border-purple-200/50 focus:border-purple-400 h-12 text-base"
        />
      </div>
    </header>
  )
}
