"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useMatches } from "@/context/MatchesContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, X, Hand } from "lucide-react"

export default function EditMatch() {
  const router = useRouter()
  const { id } = useParams()
  const { matches, updateMatch, tags } = useMatches()
  const [match, setMatch] = useState<any>(null)

  useEffect(() => {
    const foundMatch = matches.find((m) => m.id === id)
    if (foundMatch) {
      setMatch(foundMatch)
    }
  }, [id, matches])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (match) {
      updateMatch(match.id, match)
      toast({
        title: "試合が更新されました",
        description: "試合の詳細が正常に更新されました。",
      })
      router.push(`/matches/${match.id}`)
    }
  }

  if (!match) {
    return <div className="text-center text-2xl mt-8">試合が見つかりません</div>
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl font-bold font-heading flex items-center space-x-2">
          <Trophy className="w-8 h-8 text-primary" />
          <span>試合を編集</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label className="text-lg font-semibold">結果</Label>
            <RadioGroup
              value={match.outcome}
              onValueChange={(value: "Win" | "Lose") => setMatch({ ...match, outcome: value })}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Win" id="win" />
                <Label htmlFor="win" className="flex items-center space-x-1">
                  <Trophy className="w-4 h-4 text-secondary" />
                  <span>勝利</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Lose" id="lose" />
                <Label htmlFor="lose" className="flex items-center space-x-1">
                  <X className="w-4 h-4 text-destructive" />
                  <span>敗北</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="score" className="text-lg font-semibold">
              スコア
            </Label>
            <Input
              id="score"
              value={match.score}
              onChange={(e) => setMatch({ ...match, score: e.target.value })}
              placeholder="例: 3-2"
              className="text-lg"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-lg font-semibold">相手の利き手</Label>
            <RadioGroup
              value={match.opponentHand}
              onValueChange={(value: "Left-handed" | "Right-handed") => setMatch({ ...match, opponentHand: value })}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Left-handed" id="left" />
                <Label htmlFor="left" className="flex items-center space-x-1">
                  <Hand className="w-4 h-4 text-accent" />
                  <span>左利き</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Right-handed" id="right" />
                <Label htmlFor="right" className="flex items-center space-x-1">
                  <Hand className="w-4 h-4 text-accent" />
                  <span>右利き</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="opponentRubber" className="text-lg font-semibold">
              相手のラバータイプ
            </Label>
            <Select
              value={match.opponentRubber}
              onValueChange={(value) => setMatch({ ...match, opponentRubber: value })}
            >
              <SelectTrigger className="w-full text-lg">
                <SelectValue placeholder="ラバータイプを選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Back">裏ソフト</SelectItem>
                <SelectItem value="Fore">表ソフト</SelectItem>
                <SelectItem value="Pimpled high">粒高</SelectItem>
                <SelectItem value="Anti">アンチ</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="opponentRacket" className="text-lg font-semibold">
              相手のラケットタイプ
            </Label>
            <Select
              value={match.opponentRacket}
              onValueChange={(value) => setMatch({ ...match, opponentRacket: value })}
            >
              <SelectTrigger className="w-full text-lg">
                <SelectValue placeholder="ラケットタイプを選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Shakehand">シェークハンド</SelectItem>
                <SelectItem value="Penhold (Japanese style)">ペンホルダー（日本式）</SelectItem>
                <SelectItem value="Penhold (Chinese style)">ペンホルダー（中国式）</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="impressions" className="text-lg font-semibold">
              試合の感想
            </Label>
            <Textarea
              id="impressions"
              value={match.impressions}
              onChange={(e) => setMatch({ ...match, impressions: e.target.value })}
              placeholder="試合についての感想..."
              className="text-lg"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-lg font-semibold">タグ</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag) => (
                <Button
                  key={tag}
                  variant={match.tags.includes(tag) ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    const updatedTags = match.tags.includes(tag)
                      ? match.tags.filter((t: string) => t !== tag)
                      : [...match.tags, tag]
                    setMatch({ ...match, tags: updatedTags })
                  }}
                  className="rounded-full"
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full text-lg">
            更新する
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

