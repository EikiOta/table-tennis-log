"use client"

import type React from "react"
import { createContext, useState, useContext, useEffect } from "react"

export interface Match {
  id: string
  outcome: "Win" | "Lose"
  score: string
  opponentHand: "Left-handed" | "Right-handed"
  opponentRubber: string
  opponentRacket: string
  impressions: string
  tags: string[]
  date: string
}

interface MatchesContextType {
  matches: Match[]
  addMatch: (match: Omit<Match, "id" | "date">) => void
  deleteMatch: (id: string) => void
  updateMatch: (id: string, match: Omit<Match, "id" | "date">) => void
  tags: string[]
  addTag: (tag: string) => void
}

const MatchesContext = createContext<MatchesContextType | undefined>(undefined)

export const useMatches = () => {
  const context = useContext(MatchesContext)
  if (!context) {
    throw new Error("useMatches must be used within a MatchesProvider")
  }
  return context
}

export const MatchesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [matches, setMatches] = useState<Match[]>([])
  const [tags, setTags] = useState<string[]>([])

  useEffect(() => {
    const storedMatches = localStorage.getItem("matches")
    const storedTags = localStorage.getItem("tags")
    if (storedMatches) setMatches(JSON.parse(storedMatches))
    if (storedTags) setTags(JSON.parse(storedTags))
  }, [])

  useEffect(() => {
    localStorage.setItem("matches", JSON.stringify(matches))
    localStorage.setItem("tags", JSON.stringify(tags))
  }, [matches, tags])

  const addMatch = (match: Omit<Match, "id" | "date">) => {
    const newMatch = {
      ...match,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    }
    setMatches([...matches, newMatch])
    match.tags.forEach((tag) => {
      if (!tags.includes(tag)) {
        setTags([...tags, tag])
      }
    })
  }

  const deleteMatch = (id: string) => {
    setMatches(matches.filter((match) => match.id !== id))
  }

  const updateMatch = (id: string, updatedMatch: Omit<Match, "id" | "date">) => {
    setMatches(matches.map((match) => (match.id === id ? { ...match, ...updatedMatch } : match)))
    updatedMatch.tags.forEach((tag) => {
      if (!tags.includes(tag)) {
        setTags([...tags, tag])
      }
    })
  }

  const addTag = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag])
    }
  }

  return (
    <MatchesContext.Provider value={{ matches, addMatch, deleteMatch, updateMatch, tags, addTag }}>
      {children}
    </MatchesContext.Provider>
  )
}

