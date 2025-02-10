import "./globals.css"
import type { Metadata } from "next"
import { Poppins, Rubik } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { MatchesProvider } from "@/context/MatchesContext"
import Navbar from "@/components/Navbar"
import type React from "react"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-sans",
})

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-heading",
})

export const metadata: Metadata = {
  title: "卓球試合トラッカー",
  description: "卓球の試合を記録し分析する",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${rubik.variable} font-sans ping-pong-bg`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <MatchesProvider>
            <div className="min-h-screen bg-background/80 backdrop-blur-sm">
              <Navbar />
              <main className="container mx-auto py-6 px-4">{children}</main>
            </div>
          </MatchesProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

