"use client"

import { NoteCard } from "@/components/note-card"

const sampleNotes = [
  {
    id: 1,
    title: "오늘 할 일",
    content: "장보기, 운동하기, 책 읽기, 친구와 저녁 약속",
    color: "from-yellow-100 to-yellow-50",
    updatedAt: "방금 전",
  },
  {
    id: 2,
    title: "프로젝트 아이디어",
    content: "새로운 앱 디자인 컨셉 - 밝고 화사한 테마, 사용자 친화적인 인터페이스",
    color: "from-pink-100 to-pink-50",
    updatedAt: "5분 전",
  },
  {
    id: 3,
    title: "독서 노트",
    content: "최근 읽은 책에서 인상 깊었던 구절을 기록해두자. 좋은 문장은 계속 영감을 준다.",
    color: "from-blue-100 to-blue-50",
    updatedAt: "1시간 전",
  },
  {
    id: 4,
    title: "여행 계획",
    content: "제주도 3박 4일 일정 - 카페 투어, 해변 산책, 맛집 탐방",
    color: "from-green-100 to-green-50",
    updatedAt: "2시간 전",
  },
  {
    id: 5,
    title: "회의 메모",
    content: "다음 주 프로젝트 미팅 준비 사항 점검. 발표 자료 마무리하기.",
    color: "from-purple-100 to-purple-50",
    updatedAt: "어제",
  },
  {
    id: 6,
    title: "레시피",
    content: "맛있는 파스타 만드는 법 - 올리브 오일, 마늘, 토마토, 바질",
    color: "from-orange-100 to-orange-50",
    updatedAt: "2일 전",
  },
]

export function NotesGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {sampleNotes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  )
}
