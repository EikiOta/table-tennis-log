"use client"

import { useState } from "react"
import Link from "next/link"
import { useMatches } from "@/context/MatchesContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, X, Search, SortAsc, SortDesc } from "lucide-react"

export default function MatchList() {
  const { matches } = useMatches()
  const [filter, setFilter] = useState("")
  const [sortBy, setSortBy] = useState("date")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  const sortedMatches = [...matches]
    .filter(
      (match) =>
        match.outcome.toLowerCase().includes(filter.toLowerCase()) ||
        match.score.toLowerCase().includes(filter.toLowerCase()) ||
        match.tags.some((tag) => tag.toLowerCase().includes(filter.toLowerCase())),
    )
    .sort((a, b) => {
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)
      if (sortBy === "date") {
        return sortOrder === "asc" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime()
      }
      return 0
    })

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold font-heading">試合履歴</h1>

      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="タグ、結果、スコアで絞り込み"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="並び替え" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">日付</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={() => setSortOrder((order) => (order === "asc" ? "desc" : "asc"))} variant="outline">
          {sortOrder === "asc" ? <SortAsc className="mr-2 h-4 w-4" /> : <SortDesc className="mr-2 h-4 w-4" />}
          {sortOrder === "asc" ? "昇順" : "降順"}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedMatches.map((match) => (
          <Link href={`/matches/${match.id}`} key={match.id}>
            <Card className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center space-x-2">
                  {match.outcome === "Win" ? (
                    <Trophy className="w-5 h-5 text-secondary" />
                  ) : (
                    <X className="w-5 h-5 text-destructive" />
                  )}
                  <span>{match.outcome === "Win" ? "勝利" : "敗北"}</span>
                </CardTitle>
                <CardDescription>{new Date(match.date).toLocaleDateString("ja-JP")}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold mb-2">{match.score}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {match.tags.map((tag) => (
                    <span key={tag} className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

