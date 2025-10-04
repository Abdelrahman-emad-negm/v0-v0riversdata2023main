"use client"

import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"

export function LeftSidebar() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="fixed top-0 left-0 z-50 p-6 transition-all duration-500 ease-in-out">
      <div className="flex items-center gap-3 bg-background/80 backdrop-blur-md rounded-full px-6 py-3 shadow-lg border border-border transition-all duration-500 ease-in-out">
        <Link
          href="/"
          onClick={scrollToTop}
          className="cursor-pointer hover:scale-105 transition-transform duration-300"
        >
          <h2 className="font-serif text-sm font-bold text-primary tracking-wider">Breathing Rivers</h2>
        </Link>

        <div className="h-6 w-px bg-border" />

        <ThemeToggle />
      </div>
    </div>
  )
}
