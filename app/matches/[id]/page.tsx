"use client"

import { useParams, useRouter } from "next/navigation"
import { useMatches } from "@/context/MatchesContext"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, X, Hand, Disc, RatIcon as Racquet, FileText, Tag, Calendar } from "lucide-react"

export default function MatchDetail() {
  const { id } = useParams()
  const router = useRouter()
  const { matches, deleteMatch } = useMatches()
  const match = matches.find((m) => m.id === id)

  if (!match) {
    return <div className="text-center text-2xl mt-8">試合が見つかりません</div>
  }

  const handleDelete = () => {
    deleteMatch(match.id)
    toast({
      title: "試合が削除されました",
      description: "試合の記録が正常に削除されました。",
    })
    router.push("/matches")
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl font-bold font-heading flex items-center space-x-2">
          {match.outcome === "Win" ? (
            <Trophy className="w-8 h-8 text-secondary" />
          ) : (
            <X className="w-8 h-8 text-destructive" />
          )}
          <span>{match.outcome === "Win" ? "勝利" : "敗北"}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-muted-foreground" />
            <span className="text-lg">{new Date(match.date).toLocaleString("ja-JP")}</span>
          </div>
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-muted-foreground" />
            <span className="text-2xl font-bold">{match.score}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Hand className="w-5 h-5 text-muted-foreground" />
            <span className="text-lg">相手の利き手: {match.opponentHand === "Left-handed" ? "左利き" : "右利き"}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Disc className="w-5 h-5 text-muted-foreground" />
            <span className="text-lg">相手のラバータイプ: {match.opponentRubber}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Racquet className="w-5 h-5 text-muted-foreground" />
            <span className="text-lg">相手のラケットタイプ: {match.opponentRacket}</span>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold flex items-center space-x-2">
              <FileText className="w-5 h-5 text-muted-foreground" />
              <span>試合の感想</span>
            </h2>
            <p className="text-lg">{match.impressions}</p>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold flex items-center space-x-2">
              <Tag className="w-5 h-5 text-muted-foreground" />
              <span>タグ</span>
            </h2>
            <div className="flex flex-wrap gap-2">
              {match.tags.map((tag) => (
                <span key={tag} className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex space-x-4">
          <Button onClick={() => router.push(`/matches/${id}/edit`)}>編集</Button>
          <Button variant="destructive" onClick={handleDelete}>
            削除
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

