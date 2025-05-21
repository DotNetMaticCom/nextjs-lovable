"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Bell, Search, User, Settings, HelpCircle, LogOut, Menu } from "lucide-react"

type NavbarProps = {
  toggleSidebar: () => void
  sidebarVisible: boolean
}

export function Navbar({ toggleSidebar, sidebarVisible }: NavbarProps) {
  const [searchFocused, setSearchFocused] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  return (
    <div className="h-16 border-b border-[hsl(var(--navbar-border))] bg-[hsl(var(--navbar-bg))] flex items-center justify-between px-4 sticky top-0 z-10 transition-colors duration-300">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="w-8 h-8 flex items-center justify-center text-[hsl(var(--sidebar-icon))] hover:text-foreground hover:bg-[hsl(var(--secondary))] rounded-md transition-colors"
          aria-label={sidebarVisible ? "Hide sidebar" : "Show sidebar"}
        >
          {sidebarVisible ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>

        <div className="ml-4 text-lg font-medium hidden md:block">Dashboard</div>

        {/* Mobile menu button */}
        <button className="ml-4 md:hidden w-8 h-8 flex items-center justify-center text-[hsl(var(--sidebar-icon))] hover:text-foreground hover:bg-[hsl(var(--secondary))] rounded-md transition-colors">
          <Menu size={20} />
        </button>
      </div>

      <div className="flex items-center space-x-2 md:space-x-4">
        <div className={`relative transition-all duration-200 ${searchFocused ? "w-64" : "w-40 md:w-64"}`}>
          <input
            type="text"
            placeholder="Search..."
            className="w-full h-9 pl-9 pr-4 rounded-md border border-[hsl(var(--input))] bg-[hsl(var(--background))] text-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--sidebar-icon-active))] focus:border-transparent transition-colors duration-300"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[hsl(var(--muted-foreground))]"
            size={16}
          />
        </div>

        {/* Notifications dropdown */}
        <div className="relative">
          <button
            className="w-9 h-9 flex items-center justify-center text-[hsl(var(--sidebar-icon))] hover:text-foreground hover:bg-[hsl(var(--secondary))] rounded-md relative transition-colors"
            onClick={() => {
              setNotificationsOpen(!notificationsOpen)
              setUserMenuOpen(false)
            }}
          >
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-[hsl(var(--card-bg))] rounded-md shadow-lg border border-[hsl(var(--card-border))] z-50">
              <div className="p-3 border-b border-[hsl(var(--card-border))]">
                <h3 className="font-medium">Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                <div className="p-3 border-b border-[hsl(var(--card-border))] hover:bg-[hsl(var(--secondary))] cursor-pointer transition-colors">
                  <p className="text-sm font-medium">New analytics report available</p>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">10 minutes ago</p>
                </div>
                <div className="p-3 border-b border-[hsl(var(--card-border))] hover:bg-[hsl(var(--secondary))] cursor-pointer transition-colors">
                  <p className="text-sm font-medium">Campaign performance update</p>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">1 hour ago</p>
                </div>
                <div className="p-3 hover:bg-[hsl(var(--secondary))] cursor-pointer transition-colors">
                  <p className="text-sm font-medium">System maintenance scheduled</p>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">2 days ago</p>
                </div>
              </div>
              <div className="p-2 border-t border-[hsl(var(--card-border))] text-center">
                <button className="text-xs text-[hsl(var(--sidebar-icon-active))] hover:underline">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User menu dropdown */}
        <div className="relative">
          <button
            className="w-9 h-9 flex items-center justify-center text-[hsl(var(--sidebar-icon))] hover:text-foreground hover:bg-[hsl(var(--secondary))] rounded-md transition-colors"
            onClick={() => {
              setUserMenuOpen(!userMenuOpen)
              setNotificationsOpen(false)
            }}
          >
            <User size={20} />
          </button>

          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-[hsl(var(--card-bg))] rounded-md shadow-lg border border-[hsl(var(--card-border))] z-50">
              <div className="p-3 border-b border-[hsl(var(--card-border))]">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">john.doe@example.com</p>
              </div>
              <div>
                <button className="w-full text-left p-2 flex items-center text-sm hover:bg-[hsl(var(--secondary))] transition-colors">
                  <User size={16} className="mr-2" />
                  <span>Profile</span>
                </button>
                <button className="w-full text-left p-2 flex items-center text-sm hover:bg-[hsl(var(--secondary))] transition-colors">
                  <Settings size={16} className="mr-2" />
                  <span>Settings</span>
                </button>
                <button className="w-full text-left p-2 flex items-center text-sm hover:bg-[hsl(var(--secondary))] transition-colors">
                  <HelpCircle size={16} className="mr-2" />
                  <span>Help</span>
                </button>
                <div className="border-t border-[hsl(var(--card-border))] mt-1"></div>
                <button className="w-full text-left p-2 flex items-center text-sm hover:bg-[hsl(var(--secondary))] transition-colors text-red-500">
                  <LogOut size={16} className="mr-2" />
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
