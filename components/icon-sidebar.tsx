"use client"

import { Home, Layers, BarChart2, Sliders, Edit3, Folder, Upload, Settings, Sun, Moon } from "lucide-react"
import Image from "next/image"
import { Tooltip } from "./tooltip"
import { useTheme } from "./theme-provider"

type IconSidebarProps = {
  activeIcon: string
  setActiveIcon: (icon: string) => void
}

export function IconSidebar({ activeIcon, setActiveIcon }: IconSidebarProps) {
  const { theme, toggleTheme } = useTheme()

  // Define the navigation icons with labels for tooltips
  const navIcons = [
    { id: "home", icon: Home, label: "Home" },
    { id: "layers", icon: Layers, label: "Projects" },
    { id: "analytics", icon: BarChart2, label: "Analytics" },
    { id: "settings", icon: Sliders, label: "Settings" },
    { id: "editor", icon: Edit3, label: "Editor" },
    { id: "documents", icon: Folder, label: "Documents" },
    { id: "uploads", icon: Upload, label: "Uploads" },
  ]

  return (
    <div className="w-16 h-full bg-[hsl(var(--sidebar-bg))] border-r border-[hsl(var(--sidebar-border))] flex flex-col items-center z-20 transition-colors duration-300">
      {/* App logo */}
      <div className="w-10 h-10 rounded-lg analytics-gradient flex items-center justify-center mt-4 mb-6">
        <div className="w-5 h-5 text-white">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4 5.5C4 4.67157 4.67157 4 5.5 4H9.5C10.3284 4 11 4.67157 11 5.5V9.5C11 10.3284 10.3284 11 9.5 11H5.5C4.67157 11 4 10.3284 4 9.5V5.5Z"
              fill="currentColor"
            />
            <path
              d="M13 5.5C13 4.67157 13.6716 4 14.5 4H18.5C19.3284 4 20 4.67157 20 5.5V9.5C20 10.3284 19.3284 11 18.5 11H14.5C13.6716 11 13 10.3284 13 9.5V5.5Z"
              fill="currentColor"
            />
            <path
              d="M4 14.5C4 13.6716 4.67157 13 5.5 13H9.5C10.3284 13 11 13.6716 11 14.5V18.5C11 19.3284 10.3284 20 9.5 20H5.5C4.67157 20 4 19.3284 4 18.5V14.5Z"
              fill="currentColor"
            />
            <path
              d="M13 14.5C13 13.6716 13.6716 13 14.5 13H18.5C19.3284 13 20 13.6716 20 14.5V18.5C20 19.3284 19.3284 20 18.5 20H14.5C13.6716 20 13 19.3284 13 18.5V14.5Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>

      {/* Navigation icons */}
      <div className="flex flex-col items-center space-y-6 mt-2">
        {navIcons.map((item) => {
          const Icon = item.icon
          const isActive = activeIcon === item.id

          return (
            <Tooltip key={item.id} content={item.label}>
              <button
                className={`w-10 h-10 flex items-center justify-center rounded-md transition-colors ${
                  isActive
                    ? "text-[hsl(var(--sidebar-icon-active))] bg-[hsl(var(--sidebar-icon-active-bg))]"
                    : "text-[hsl(var(--sidebar-icon))] hover:text-foreground hover:bg-[hsl(var(--secondary))]"
                }`}
                onClick={() => setActiveIcon(item.id)}
                aria-label={item.label}
              >
                <Icon size={20} />
              </button>
            </Tooltip>
          )
        })}
      </div>

      {/* Settings icon */}
      <Tooltip content="Preferences">
        <button
          className={`w-10 h-10 flex items-center justify-center rounded-md mt-auto transition-colors ${
            activeIcon === "preferences"
              ? "text-[hsl(var(--sidebar-icon-active))] bg-[hsl(var(--sidebar-icon-active-bg))]"
              : "text-[hsl(var(--sidebar-icon))] hover:text-foreground hover:bg-[hsl(var(--secondary))]"
          }`}
          onClick={() => setActiveIcon("preferences")}
          aria-label="Preferences"
        >
          <Settings size={20} />
        </button>
      </Tooltip>

      {/* Theme toggle */}
      <div className="flex flex-col items-center mb-4 mt-4 space-y-4">
        <Tooltip content={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}>
          <button
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center text-[hsl(var(--sidebar-icon))] hover:text-foreground hover:bg-[hsl(var(--secondary))] rounded-md transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </Tooltip>
      </div>

      {/* User avatar */}
      <Tooltip content="User Profile">
        <div className="mb-4 mt-2">
          <div className="w-10 h-10 rounded-full bg-orange-100 overflow-hidden cursor-pointer">
            <Image
              src="/placeholder.svg?height=40&width=40"
              alt="User avatar"
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
        </div>
      </Tooltip>
    </div>
  )
}
