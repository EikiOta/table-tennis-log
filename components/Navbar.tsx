import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TableIcon as TableTennis } from "lucide-react"

export default function Navbar() {
  return (
    <nav className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-heading font-bold flex items-center space-x-2">
          <TableTennis className="w-8 h-8" />
          <span>卓球ログ</span>
        </Link>
        <div className="space-x-2">
          <Button variant="secondary" asChild className="font-semibold">
            <Link href="/register">試合を記録</Link>
          </Button>
          <Button variant="ghost" asChild className="text-primary-foreground font-semibold">
            <Link href="/matches">試合一覧</Link>
          </Button>
          <Button variant="ghost" asChild className="text-primary-foreground font-semibold">
            <Link href="/tags">タグ</Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}

