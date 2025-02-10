"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
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

export default function RegisterMatch() {
  const router = useRouter()
  const { addMatch, tags } = useMatches()
  const [outcome, setOutcome] = useState<"Win" | "Lose">("Win")
  const [score, setScore] = useState("")
  const [opponentHand, setOpponentHand] = useState<"Left-handed" | "Right-handed">("Right-handed")
  const [opponentRubber, setOpponentRubber] = useState("")
  const [opponentRacket, setOpponentRacket] = useState("")
  const [impressions, setImpressions] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateScore(score)) {
      toast({
        title: "スコアが無効です",
        description: "スコアは 'number-number' の形式で入力してください",
        variant: "destructive",
      })
      return
    }
    addMatch({ outcome, score, opponentHand, opponentRubber, opponentRacket, impressions, tags: selectedTags })
    toast({
      title: "試合が登録されました",
      description: "試合の記録が正常に保存されました。",
    })
    router.push("/matches")
  }

  const validateScore = (score: string) => {
    return /^\d+-\d+$/.test(score)
  }

  const handleTagChange = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const handleAddNewTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setSelectedTags((prev) => [...prev, newTag])
      setNewTag("")
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl font-bold font-heading flex items-center space-x-2">
          <Trophy className="w-8 h-8 text-primary" />
          <span>試合を記録</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label className="text-lg font-semibold">結果</Label>
            <RadioGroup
              value={outcome}
              onValueChange={(value: "Win" | "Lose") => setOutcome(value)}
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
              value={score}
              onChange={(e) => setScore(e.target.value)}
              placeholder="例: 3-2"
              className="text-lg"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-lg font-semibold">相手の利き手</Label>
            <RadioGroup
              value={opponentHand}
              onValueChange={(value: "Left-handed" | "Right-handed") => setOpponentHand(value)}
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
            <Select value={opponentRubber} onValueChange={setOpponentRubber}>
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
            <Select value={opponentRacket} onValueChange={setOpponentRacket}>
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
              value={impressions}
              onChange={(e) => setImpressions(e.target.value)}
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
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleTagChange(tag)}
                  className="rounded-full"
                >
                  {tag}
                </Button>
              ))}
            </div>
            <div className="flex space-x-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="新しいタグ"
                className="text-lg"
              />
              <Button type="button" onClick={handleAddNewTag} variant="secondary">
                タグを追加
              </Button>
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full text-lg">
            試合を登録
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

