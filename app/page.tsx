import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TableIcon as TableTennis, Trophy, List } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-center">
      <TableTennis className="w-24 h-24 text-primary mb-8 animate-ping-pong" />
      <h1 className="text-5xl font-bold mb-4 font-heading">卓球ログへようこそ</h1>
      <p className="text-xl mb-8 max-w-2xl">
        直感的な試合記録システムで、記録、分析、上達させる。
      </p>
      <div className="grid gap-4 md:grid-cols-2 w-full max-w-md">
        <Button asChild size="lg" className="text-lg">
          <Link href="/register" className="flex items-center justify-center space-x-2">
            <Trophy className="w-5 h-5" />
            <span>試合を記録</span>
          </Link>
        </Button>
        <Button asChild variant="secondary" size="lg" className="text-lg">
          <Link href="/matches" className="flex items-center justify-center space-x-2">
            <List className="w-5 h-5" />
            <span>試合一覧</span>
          </Link>
        </Button>
      </div>
    </div>
  )
}

