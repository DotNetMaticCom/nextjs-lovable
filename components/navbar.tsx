"use client"

import { useState, useRef, useEffect } from "react"
import {
  ChevronLeft,
  ChevronRight,
  Bell,
  Search,
  User,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  X,
  Calendar,
  MessageSquare,
  BarChart2,
  FileText,
  Briefcase,
  ChevronDown,
  Home,
  Globe,
  Shield,
  AlertCircle,
  Palette,
  Sun,
  Moon,
  Check,
} from "lucide-react"
import Image from "next/image"
import { useTheme } from "./theme-provider"

type NavbarProps = {
  toggleSidebar: () => void
  sidebarVisible: boolean
}

export function Navbar({ toggleSidebar, sidebarVisible }: NavbarProps) {
  const { theme, colorScheme, toggleTheme, setColorScheme } = useTheme()

  const [searchFocused, setSearchFocused] = useState(false)
  const [searchExpanded, setSearchExpanded] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [helpMenuOpen, setHelpMenuOpen] = useState(false)
  const [moduleMenuOpen, setModuleMenuOpen] = useState(false)
  const [themeMenuOpen, setThemeMenuOpen] = useState(false)

  const searchRef = useRef<HTMLDivElement>(null)
  const notificationsRef = useRef<HTMLDivElement>(null)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const helpMenuRef = useRef<HTMLDivElement>(null)
  const moduleMenuRef = useRef<HTMLDivElement>(null)
  const themeMenuRef = useRef<HTMLDivElement>(null)

  // Color schemes
  const colorSchemes = [
    { id: "default", name: "Default", color: "bg-[hsl(142,70%,30%)]" },
    { id: "forest", name: "Forest", color: "bg-[hsl(142,70%,30%)]" },
    { id: "ocean", name: "Ocean", color: "bg-[hsl(200,70%,40%)]" },
    { id: "sunset", name: "Sunset", color: "bg-[hsl(25,70%,45%)]" },
    { id: "lavender", name: "Lavender", color: "bg-[hsl(270,60%,50%)]" },
  ]

  // Handle clicks outside of dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Close notifications dropdown if clicked outside
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false)
      }

      // Close user menu dropdown if clicked outside
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false)
      }

      // Close help menu dropdown if clicked outside
      if (helpMenuRef.current && !helpMenuRef.current.contains(event.target as Node)) {
        setHelpMenuOpen(false)
      }

      // Close module menu dropdown if clicked outside
      if (moduleMenuRef.current && !moduleMenuRef.current.contains(event.target as Node)) {
        setModuleMenuOpen(false)
      }

      // Close theme menu dropdown if clicked outside
      if (themeMenuRef.current && !themeMenuRef.current.contains(event.target as Node)) {
        setThemeMenuOpen(false)
      }

      // Close search if expanded and clicked outside
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchExpanded(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Current date for the navbar
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Notification items
  const notifications = [
    {
      id: 1,
      title: "New analytics report available",
      description: "The monthly analytics report is ready for review.",
      time: "10 minutes ago",
      icon: BarChart2,
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300",
    },
    {
      id: 2,
      title: "Meeting reminder",
      description: "Team meeting starts in 30 minutes.",
      time: "30 minutes ago",
      icon: Calendar,
      color: "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300",
    },
    {
      id: 3,
      title: "System update scheduled",
      description: "System maintenance will occur tonight at 2 AM.",
      time: "2 hours ago",
      icon: Settings,
      color: "bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300",
    },
    {
      id: 4,
      title: "New message from Support",
      description: "Your ticket #45678 has been updated.",
      time: "3 hours ago",
      icon: MessageSquare,
      color: "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300",
    },
    {
      id: 5,
      title: "Document requires approval",
      description: "A new document requires your approval.",
      time: "5 hours ago",
      icon: FileText,
      color: "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300",
    },
  ]

  // Module menu items
  const modules = [
    { id: "dashboard", name: "Dashboard", icon: Home },
    { id: "analytics", name: "Analytics", icon: BarChart2 },
    { id: "projects", name: "Projects", icon: Briefcase },
    { id: "documents", name: "Documents", icon: FileText },
    { id: "calendar", name: "Calendar", icon: Calendar },
    { id: "settings", name: "Settings", icon: Settings },
    { id: "global", name: "Global Settings", icon: Globe },
    { id: "security", name: "Security", icon: Shield },
  ]

  return (
    <div className="h-16 border-b border-border bg-card flex items-center justify-between px-4 sticky top-0 z-20 transition-colors duration-300 shadow-sm">
      {/* Left section */}
      <div className="flex items-center">
        {/* Sidebar toggle button with animation */}
        <button
          onClick={toggleSidebar}
          className="w-9 h-9 flex items-center justify-center text-muted-foreground hover:bg-primary hover:bg-opacity-10 hover:text-primary rounded-md transition-all duration-200 mr-2"
          aria-label={sidebarVisible ? "Hide sidebar" : "Show sidebar"}
        >
          {sidebarVisible ? (
            <ChevronLeft size={20} className="transition-transform duration-200" />
          ) : (
            <ChevronRight size={20} className="transition-transform duration-200" />
          )}
        </button>

        {/* Module selector dropdown */}
        <div ref={moduleMenuRef} className="relative hidden md:block">
          <button
            onClick={() => setModuleMenuOpen(!moduleMenuOpen)}
            className="flex items-center h-9 px-3 text-sm font-medium rounded-md navbar-item-hover"
          >
            <span>Analytics Module</span>
            <ChevronDown
              size={16}
              className={`ml-1 transition-transform duration-200 ${moduleMenuOpen ? "rotate-180" : ""}`}
            />
          </button>

          {moduleMenuOpen && (
            <div className="navbar-dropdown w-72 left-0 right-auto">
              <div className="p-2 border-b border-border">
                <h3 className="text-sm font-medium px-2 py-1.5">System Modules</h3>
              </div>
              <div className="p-2 max-h-[calc(100vh-200px)] overflow-y-auto">
                <div className="grid grid-cols-2 gap-1">
                  {modules.map((module) => (
                    <button key={module.id} className="flex items-center p-2 rounded-md text-sm navbar-item-hover">
                      <module.icon size={16} className="mr-2" />
                      <span>{module.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="p-2 border-t border-border bg-secondary">
                <button className="w-full text-xs text-primary hover:underline flex items-center justify-center">
                  Manage modules
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Breadcrumb - visible on medium screens and up */}
        <div className="hidden md:flex items-center ml-2">
          <span className="text-muted-foreground text-sm mx-2">/</span>
          <span className="text-sm font-medium">Dashboard</span>
          <span className="text-muted-foreground text-sm mx-2">/</span>
          <span className="text-sm">Analytics</span>
        </div>

        {/* Mobile menu button - only visible on small screens */}
        <button className="md:hidden w-9 h-9 flex items-center justify-center text-muted-foreground hover:bg-primary hover:bg-opacity-10 hover:text-primary rounded-md transition-colors ml-1">
          <Menu size={20} />
        </button>
      </div>

      {/* Center section - date display (hidden on small screens) */}
      <div className="hidden lg:flex items-center absolute left-1/2 transform -translate-x-1/2">
        <div className="text-sm text-muted-foreground">{currentDate}</div>
      </div>

      {/* Right section */}
      <div className="flex items-center space-x-1">
        {/* Search */}
        <div
          ref={searchRef}
          className={`relative transition-all duration-200 ease-in-out ${searchExpanded ? "w-64" : "w-9 md:w-48"}`}
        >
          {searchExpanded ? (
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search..."
                className="w-full h-9 pl-9 pr-9 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors duration-200 text-sm"
                autoFocus
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 rounded-md"
                onClick={() => setSearchExpanded(false)}
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => setSearchExpanded(true)}
                className="md:hidden w-9 h-9 flex items-center justify-center text-muted-foreground hover:bg-primary hover:bg-opacity-10 hover:text-primary rounded-md transition-colors"
              >
                <Search size={20} />
              </button>
              <div className="relative hidden md:block w-full">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full h-9 pl-9 pr-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors duration-200 text-sm"
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  onClick={() => setSearchExpanded(true)}
                />
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                  size={16}
                />
              </div>
            </>
          )}
        </div>

        {/* Theme customization button */}
        <div ref={themeMenuRef} className="relative">
          <button
            className="w-9 h-9 flex items-center justify-center text-muted-foreground hover:bg-primary hover:bg-opacity-10 hover:text-primary rounded-md transition-colors"
            onClick={() => {
              setThemeMenuOpen(!themeMenuOpen)
              setHelpMenuOpen(false)
              setNotificationsOpen(false)
              setUserMenuOpen(false)
            }}
            aria-label="Customize Theme"
          >
            <Palette size={20} />
          </button>

          {themeMenuOpen && (
            <div className="navbar-dropdown w-72">
              <div className="p-3 border-b border-border">
                <h3 className="font-medium text-sm">Customize Theme</h3>
              </div>
              <div className="p-4">
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">Mode</h4>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={toggleTheme}
                      className={`flex items-center justify-center w-full p-2 rounded-md text-sm ${
                        theme === "light"
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      <Sun size={16} className="mr-2" />
                      <span>Light</span>
                    </button>
                    <button
                      onClick={toggleTheme}
                      className={`flex items-center justify-center w-full p-2 rounded-md text-sm ${
                        theme === "dark"
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      <Moon size={16} className="mr-2" />
                      <span>Dark</span>
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Color Scheme</h4>
                  <div className="grid grid-cols-5 gap-2 mb-2">
                    {colorSchemes.map((scheme) => (
                      <button
                        key={scheme.id}
                        onClick={() => setColorScheme(scheme.id as any)}
                        className={`color-swatch ${scheme.color} ${colorScheme === scheme.id ? "active" : ""}`}
                        title={scheme.name}
                        aria-label={`Select ${scheme.name} color scheme`}
                      >
                        {colorScheme === scheme.id && <Check size={14} className="text-white m-auto" />}
                      </button>
                    ))}
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {colorSchemes.map((scheme) => (
                      <div key={scheme.id} className="text-xs text-center">
                        {scheme.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-3 border-t border-border bg-secondary">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mr-2">
                    <Palette size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-medium">
                      Current theme:{" "}
                      {colorScheme === "default"
                        ? "Default"
                        : colorScheme.charAt(0).toUpperCase() + colorScheme.slice(1)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Mode: {theme.charAt(0).toUpperCase() + theme.slice(1)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Help button */}
        <div ref={helpMenuRef} className="relative">
          <button
            className="w-9 h-9 flex items-center justify-center text-muted-foreground hover:bg-primary hover:bg-opacity-10 hover:text-primary rounded-md transition-colors"
            onClick={() => {
              setHelpMenuOpen(!helpMenuOpen)
              setNotificationsOpen(false)
              setUserMenuOpen(false)
              setThemeMenuOpen(false)
            }}
            aria-label="Help"
          >
            <HelpCircle size={20} />
          </button>

          {helpMenuOpen && (
            <div className="navbar-dropdown">
              <div className="p-3 border-b border-border">
                <h3 className="font-medium text-sm">Help & Resources</h3>
              </div>
              <div className="p-2">
                <button className="w-full text-left p-2 flex items-center text-sm navbar-item-hover rounded-md">
                  <FileText size={16} className="mr-2" />
                  <span>Documentation</span>
                </button>
                <button className="w-full text-left p-2 flex items-center text-sm navbar-item-hover rounded-md">
                  <MessageSquare size={16} className="mr-2" />
                  <span>Contact Support</span>
                </button>
                <button className="w-full text-left p-2 flex items-center text-sm navbar-item-hover rounded-md">
                  <AlertCircle size={16} className="mr-2" />
                  <span>Report an Issue</span>
                </button>
                <button className="w-full text-left p-2 flex items-center text-sm navbar-item-hover rounded-md">
                  <Globe size={16} className="mr-2" />
                  <span>Community Forums</span>
                </button>
              </div>
              <div className="p-3 border-t border-border bg-secondary">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mr-2">
                    <HelpCircle size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-medium">Need assistance?</p>
                    <p className="text-xs text-muted-foreground">Our support team is here to help</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Notifications dropdown */}
        <div ref={notificationsRef} className="relative">
          <button
            className="w-9 h-9 flex items-center justify-center text-muted-foreground hover:bg-primary hover:bg-opacity-10 hover:text-primary rounded-md relative transition-colors"
            onClick={() => {
              setNotificationsOpen(!notificationsOpen)
              setUserMenuOpen(false)
              setHelpMenuOpen(false)
              setThemeMenuOpen(false)
            }}
            aria-label="Notifications"
          >
            <Bell size={20} />
            <span className="navbar-badge"></span>
          </button>

          {notificationsOpen && (
            <div className="navbar-dropdown">
              <div className="p-3 border-b border-border flex items-center justify-between">
                <h3 className="font-medium text-sm">Notifications</h3>
                <div className="flex items-center">
                  <span className="bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">5</span>
                </div>
              </div>
              <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="p-3 border-b border-border hover:bg-primary hover:bg-opacity-5 cursor-pointer transition-colors"
                  >
                    <div className="flex items-start">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${notification.color}`}
                      >
                        <notification.icon size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{notification.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{notification.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-2 border-t border-border bg-secondary flex justify-between items-center">
                <button className="text-xs text-primary hover:underline">Mark all as read</button>
                <button className="text-xs text-primary hover:underline">View all notifications</button>
              </div>
            </div>
          )}
        </div>

        {/* User menu dropdown */}
        <div ref={userMenuRef} className="relative">
          <button
            className="flex items-center h-9 rounded-md navbar-item-hover px-1 md:px-2"
            onClick={() => {
              setUserMenuOpen(!userMenuOpen)
              setNotificationsOpen(false)
              setHelpMenuOpen(false)
              setThemeMenuOpen(false)
            }}
          >
            <div className="w-7 h-7 rounded-full bg-primary bg-opacity-10 overflow-hidden border-2 border-primary mr-0 md:mr-2">
              <Image
                src="/placeholder.svg?height=28&width=28"
                alt="User avatar"
                width={28}
                height={28}
                className="object-cover"
              />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium leading-tight">John Doe</p>
              <p className="text-xs text-muted-foreground leading-tight">Administrator</p>
            </div>
            <ChevronDown
              size={16}
              className={`hidden md:block ml-1 transition-transform duration-200 ${userMenuOpen ? "rotate-180" : ""}`}
            />
          </button>

          {userMenuOpen && (
            <div className="navbar-dropdown">
              <div className="p-4 border-b border-border flex items-center">
                <div className="w-12 h-12 rounded-full bg-primary bg-opacity-10 overflow-hidden border-2 border-primary mr-3">
                  <Image
                    src="/placeholder.svg?height=48&width=48"
                    alt="User avatar"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">john.doe@example.com</p>
                  <p className="text-xs text-primary mt-1">Administrator</p>
                </div>
              </div>
              <div className="p-2">
                <button className="w-full text-left p-2 flex items-center text-sm navbar-item-hover rounded-md">
                  <User size={16} className="mr-2" />
                  <span>My Profile</span>
                </button>
                <button className="w-full text-left p-2 flex items-center text-sm navbar-item-hover rounded-md">
                  <Settings size={16} className="mr-2" />
                  <span>Account Settings</span>
                </button>
                <button className="w-full text-left p-2 flex items-center text-sm navbar-item-hover rounded-md">
                  <Calendar size={16} className="mr-2" />
                  <span>My Calendar</span>
                </button>
                <button className="w-full text-left p-2 flex items-center text-sm navbar-item-hover rounded-md">
                  <MessageSquare size={16} className="mr-2" />
                  <span>Messages</span>
                  <span className="ml-auto bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
                    3
                  </span>
                </button>
              </div>
              <div className="border-t border-border mt-1 p-2">
                <button className="w-full text-left p-2 flex items-center text-sm hover:bg-red-50 dark:hover:bg-red-950 hover:text-red-600 dark:hover:text-red-400 rounded-md transition-colors">
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
