import { NotesGrid } from "@/components/notes-grid"
import { NotesHeader } from "@/components/notes-header"
import { AuthGuard } from "@/components/auth-guard"

export default function NotesPage() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-purple-100/50 via-pink-100/30 to-blue-100/40">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <NotesHeader />
          <NotesGrid />
        </div>
      </div>
    </AuthGuard>
  )
}
