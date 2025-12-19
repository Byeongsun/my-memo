"use client"

import { MoreVertical, Trash2, Edit } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Note {
  id: number
  title: string
  content: string
  color: string
  updatedAt: string
}

interface NoteCardProps {
  note: Note
}

export function NoteCard({ note }: NoteCardProps) {
  return (
    <Card
      className={`group relative overflow-hidden bg-gradient-to-br ${note.color} border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
    >
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-foreground text-pretty">{note.title}</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">메뉴 열기</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                수정
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                삭제
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <p className="text-sm text-foreground/80 leading-relaxed mb-4 line-clamp-3">{note.content}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{note.updatedAt}</span>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent pointer-events-none" />
    </Card>
  )
}
