"use client"

import Link from "next/link"
import { useMatches } from "@/context/MatchesContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tag } from "lucide-react"

export default function TagList() {
  const { matches, tags } = useMatches()

  const tagCounts = tags.reduce(
    (acc, tag) => {
      acc[tag] = matches.filter((match) => match.tags.includes(tag)).length
      return acc
    },
    {} as Record<string, number>,
  )

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold font-heading flex items-center space-x-2">
        <Tag className="w-8 h-8 text-primary" />
        <span>タグ一覧</span>
      </h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tags.map((tag) => (
          <Link href={`/matches?tag=${tag}`} key={tag}>
            <Card className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between">
                  <span>{tag}</span>
                  <span className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-sm">
                    {tagCounts[tag]}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="w-full">
                  試合を表示
                </Button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

