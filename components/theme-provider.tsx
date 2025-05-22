"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark"
type ColorScheme = "forest" | "ocean" | "sunset" | "lavender" | "default"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  defaultColorScheme?: ColorScheme
}

type ThemeProviderState = {
  theme: Theme
  colorScheme: ColorScheme
  toggleTheme: () => void
  setColorScheme: (scheme: ColorScheme) => void
}

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined)

export function ThemeProvider({
  children,
  defaultTheme = "light",
  defaultColorScheme = "default",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const [colorScheme, setColorScheme] = useState<ColorScheme>(defaultColorScheme)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null
    const savedColorScheme = localStorage.getItem("colorScheme") as ColorScheme | null

    if (savedTheme) {
      setTheme(savedTheme)
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark")
    }

    if (savedColorScheme) {
      setColorScheme(savedColorScheme)
    }
  }, [])

  useEffect(() => {
    const root = window.document.documentElement

    // Remove all theme and color scheme classes
    root.classList.remove("light", "dark")
    root.classList.remove("theme-forest", "theme-ocean", "theme-sunset", "theme-lavender", "theme-default")

    // Add current theme and color scheme
    root.classList.add(theme)
    if (colorScheme !== "default") {
      root.classList.add(`theme-${colorScheme}`)
    }

    // Store preferences
    localStorage.setItem("theme", theme)
    localStorage.setItem("colorScheme", colorScheme)
  }, [theme, colorScheme])

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"))
  }

  const value = {
    theme,
    colorScheme,
    toggleTheme,
    setColorScheme,
  }

  return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
