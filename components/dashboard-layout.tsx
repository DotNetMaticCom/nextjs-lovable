"use client"

import { useState, useEffect, useRef } from "react"
import { useTheme } from "./theme-provider"
import { IconSidebar } from "./icon-sidebar"
import { MainSidebar } from "./main-sidebar"
import { Navbar } from "./navbar"
import { EmailDashboard } from "./email-dashboard"
import { DocumentsDashboard } from "./documents-dashboard"
import { ChatDashboard } from "./chat-dashboard"

export function DashboardLayout() {
  // State for active sidebar item
  const [activeIcon, setActiveIcon] = useState("home")

  // State for sidebar visibility
  const [sidebarVisible, setSidebarVisible] = useState(true)

  // Ref for the sidebar container
  const sidebarRef = useRef<HTMLDivElement>(null)

  // Get theme context
  const { theme } = useTheme()

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible)
  }

  // Force sidebar to open (used when clicking the '>' icon)
  const openSidebar = () => {
    setSidebarVisible(true)
  }

  // Store sidebar state in localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("sidebarVisible", sidebarVisible.toString())
    }
  }, [sidebarVisible])

  // Retrieve sidebar state from localStorage on initial load
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedState = localStorage.getItem("sidebarVisible")
      if (storedState !== null) {
        setSidebarVisible(storedState === "true")
      }
    }
  }, [])

  // Import components
  // const { IconSidebar } = require("./icon-sidebar")
  // const { MainSidebar } = require("./main-sidebar")
  // const { Navbar } = require("./navbar")
  // const { EmailDashboard } = require("./email-dashboard")
  // const { DocumentsDashboard } = require("./documents-dashboard")

  return (
    <div className="flex h-screen overflow-hidden bg-background transition-colors duration-300">
      <IconSidebar activeIcon={activeIcon} setActiveIcon={setActiveIcon} />

      {/* Main sidebar with improved transition for collapsing */}
      <div
        ref={sidebarRef}
        className={`fixed-width-transition overflow-hidden border-r border-[hsl(var(--sidebar-border))] bg-[hsl(var(--sidebar-bg))] h-full z-10 shadow-sm`}
        style={{
          width: sidebarVisible ? "260px" : "0px",
          visibility: sidebarVisible ? "visible" : "hidden",
        }}
      >
        <MainSidebar activeSection={activeIcon} />
      </div>

      {/* Content area that expands when sidebar collapses */}
      <div
        className="flex-1 flex flex-col bg-[hsl(var(--content-bg))] relative transition-all duration-300"
        style={{
          marginLeft: sidebarVisible ? "0" : "0",
        }}
      >
        <Navbar toggleSidebar={toggleSidebar} sidebarVisible={sidebarVisible} openSidebar={openSidebar} />
        <div className="flex-1 overflow-y-auto">
          {/* Render different content based on active section */}
          {activeIcon === "email" ? (
            <EmailDashboard />
          ) : activeIcon === "documents" ? (
            <DocumentsDashboard />
          ) : activeIcon === "chat" ? (
            <ChatDashboard />
          ) : (
            <div className="p-6">
              {/* Context area content */}
              <div className="text-xl font-semibold mb-4">
                {activeIcon.charAt(0).toUpperCase() + activeIcon.slice(1)} Dashboard
              </div>
              <div className="bg-[hsl(var(--card-bg))] rounded-lg shadow border border-[hsl(var(--card-border))] p-6 transition-colors duration-300">
                <div className="mb-4">
                  <h2 className="text-lg font-medium mb-2">Analytics Overview</h2>
                  <p className="text-muted-foreground">
                    Analytics ID: <span className="font-mono text-foreground">63066612</span>
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-[hsl(var(--secondary))] p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Views</h3>
                    <p className="text-2xl font-semibold">24,532</p>
                  </div>
                  <div className="bg-[hsl(var(--secondary))] p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Unique Visitors</h3>
                    <p className="text-2xl font-semibold">12,234</p>
                  </div>
                  <div className="bg-[hsl(var(--secondary))] p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Bounce Rate</h3>
                    <p className="text-2xl font-semibold">42.3%</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  Content for {activeIcon} section. Connected to Analytics ID 63066612.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
