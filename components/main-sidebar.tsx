"use client"

import {
  ChevronRight,
  Plus,
  Minus,
  LayoutDashboard,
  Zap,
  PieChart,
  BarChart,
  Search,
  Clock,
  LayoutGrid,
  Target,
  MonitorSmartphone,
  SettingsIcon,
  Layers,
  FileText,
  Users,
  Database,
  Upload,
  Edit,
  Sliders,
  HelpCircle,
  Folder,
} from "lucide-react"
import { useState } from "react"

type MainSidebarProps = {
  activeSection: string
}

export function MainSidebar({ activeSection }: MainSidebarProps) {
  return (
    <div className="w-full h-full bg-[hsl(var(--sidebar-bg))] border-r border-[hsl(var(--sidebar-border))] overflow-y-auto transition-colors duration-300 flex flex-col">
      <div className="flex-1 overflow-y-auto">
        {activeSection === "home" && <CampaignsSection />}
        {activeSection === "layers" && <LayersSection />}
        {activeSection === "analytics" && <AnalyticsSection />}
        {activeSection === "settings" && <SettingsSection />}
        {activeSection === "editor" && <EditorSection />}
        {activeSection === "documents" && <DocumentsSection />}
        {activeSection === "uploads" && <UploadsSection />}
        {activeSection === "preferences" && <PreferencesSection />}
      </div>

      {/* Team info section - fixed at bottom */}
      <div className="px-4 py-4 border-t border-[hsl(var(--sidebar-border))] sticky bottom-0 bg-[hsl(var(--sidebar-bg))] transition-colors duration-300">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full analytics-gradient flex items-center justify-center mr-3">
            <div className="w-4 h-4 text-white">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="currentColor" fillOpacity="0.2" />
                <path d="M12 6V18M6 12H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Team Catalog</h3>
              <ChevronRight size={16} className="text-[hsl(var(--muted-foreground))]" />
            </div>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">
              Analytics ID <span className="font-mono">63066612</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Individual section components
function CampaignsSection() {
  const [campaignsOpen, setCampaignsOpen] = useState(true)
  const [adGroupsOpen, setAdGroupsOpen] = useState(true)
  const [audiencesOpen, setAudiencesOpen] = useState(false)

  return (
    <>
      <div className="border-b border-[hsl(var(--sidebar-border))] transition-colors duration-300">
        <div
          className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-[hsl(var(--secondary))] transition-colors"
          onClick={() => setCampaignsOpen(!campaignsOpen)}
        >
          <h2 className="text-xs font-bold uppercase tracking-wide text-[hsl(var(--sidebar-fg))]">Campaigns</h2>
          <button
            className="text-[hsl(var(--sidebar-icon))]"
            onClick={(e) => {
              e.stopPropagation()
              setCampaignsOpen(!campaignsOpen)
            }}
          >
            {campaignsOpen ? <Minus size={18} /> : <Plus size={18} />}
          </button>
        </div>

        {campaignsOpen && (
          <div className="px-2 pb-2">
            <button className="w-full flex items-center px-2 py-2 text-sm text-[hsl(var(--sidebar-icon-active))] bg-[hsl(var(--sidebar-icon-active-bg))] rounded-md">
              <LayoutDashboard size={18} className="mr-3 text-[hsl(var(--sidebar-icon-active))]" />
              <span>Overview</span>
            </button>

            <button className="w-full flex items-center px-2 py-2 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-1 transition-colors">
              <Zap size={18} className="mr-3 text-[hsl(var(--sidebar-icon))]" />
              <span>Recommendations</span>
            </button>

            <button className="w-full flex items-center justify-between px-2 py-2 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-1 transition-colors">
              <div className="flex items-center">
                <PieChart size={18} className="mr-3 text-[hsl(var(--sidebar-icon))]" />
                <span>Insights</span>
              </div>
              <span className="text-xs bg-[hsl(var(--sidebar-icon-active-bg))] text-[hsl(var(--sidebar-icon-active))] px-2 py-0.5 rounded-full">
                10
              </span>
            </button>

            <button className="w-full flex items-center px-2 py-2 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-1 transition-colors">
              <BarChart size={18} className="mr-3 text-[hsl(var(--sidebar-icon))]" />
              <span>Campaigns</span>
            </button>

            <button className="w-full flex items-center px-2 py-2 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-1 transition-colors">
              <Search size={18} className="mr-3 text-[hsl(var(--sidebar-icon))]" />
              <span>Keywords</span>
            </button>

            <button className="w-full flex items-center px-2 py-2 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-1 transition-colors">
              <Clock size={18} className="mr-3 text-[hsl(var(--sidebar-icon))]" />
              <span>Reporting</span>
            </button>
          </div>
        )}
      </div>

      <div className="border-b border-[hsl(var(--sidebar-border))] transition-colors duration-300">
        <div
          className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-[hsl(var(--secondary))] transition-colors"
          onClick={() => setAdGroupsOpen(!adGroupsOpen)}
        >
          <h2 className="text-xs font-bold uppercase tracking-wide text-[hsl(var(--sidebar-fg))]">Ad groups</h2>
          <button
            className="text-[hsl(var(--sidebar-icon))]"
            onClick={(e) => {
              e.stopPropagation()
              setAdGroupsOpen(!adGroupsOpen)
            }}
          >
            {adGroupsOpen ? <Minus size={18} /> : <Plus size={18} />}
          </button>
        </div>

        {adGroupsOpen && (
          <div className="px-2 pb-2">
            <button className="w-full flex items-center px-2 py-2 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md transition-colors">
              <LayoutDashboard size={18} className="mr-3 text-[hsl(var(--sidebar-icon))]" />
              <span>Overview</span>
            </button>

            <button className="w-full flex items-center px-2 py-2 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-1 transition-colors">
              <LayoutGrid size={18} className="mr-3 text-[hsl(var(--sidebar-icon))]" />
              <span>Ad groups</span>
            </button>

            <button className="w-full flex items-center px-2 py-2 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-1 transition-colors">
              <Target size={18} className="mr-3 text-[hsl(var(--sidebar-icon))]" />
              <span>Ads & extensions</span>
            </button>

            <button className="w-full flex items-center px-2 py-2 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-1 transition-colors">
              <MonitorSmartphone size={18} className="mr-3 text-[hsl(var(--sidebar-icon))]" />
              <span>Landing pages</span>
            </button>

            <button className="w-full flex items-center px-2 py-2 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-1 transition-colors">
              <Clock size={18} className="mr-3 text-[hsl(var(--sidebar-icon))]" />
              <span>Reporting</span>
            </button>

            <button className="w-full flex items-center px-2 py-2 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-1 transition-colors">
              <SettingsIcon size={18} className="mr-3 text-[hsl(var(--sidebar-icon))]" />
              <span>Settings</span>
            </button>
          </div>
        )}
      </div>

      <div className="border-b border-[hsl(var(--sidebar-border))] transition-colors duration-300">
        <div
          className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-[hsl(var(--secondary))] transition-colors"
          onClick={() => setAudiencesOpen(!audiencesOpen)}
        >
          <h2 className="text-xs font-bold uppercase tracking-wide text-[hsl(var(--sidebar-fg))]">Audiences</h2>
          <button
            className="text-[hsl(var(--sidebar-icon))]"
            onClick={(e) => {
              e.stopPropagation()
              setAudiencesOpen(!audiencesOpen)
            }}
          >
            {audiencesOpen ? <Minus size={18} /> : <Plus size={18} />}
          </button>
        </div>

        {audiencesOpen && (
          <div className="px-2 pb-2">
            <p className="text-xs text-[hsl(var(--muted-foreground))] p-2">No audiences configured</p>
          </div>
        )}
      </div>
    </>
  )
}

// Other section components remain the same structure but with updated color variables
// I'll update the AnalyticsSection as an example since it's most relevant to the Analytics ID

function AnalyticsSection() {
  const [analyticsOpen, setAnalyticsOpen] = useState(true)

  return (
    <div className="border-b border-[hsl(var(--sidebar-border))] transition-colors duration-300">
      <div
        className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-[hsl(var(--secondary))] transition-colors"
        onClick={() => setAnalyticsOpen(!analyticsOpen)}
      >
        <h2 className="text-xs font-bold uppercase tracking-wide text-[hsl(var(--sidebar-fg))]">Analytics</h2>
        <button
          className="text-[hsl(var(--sidebar-icon))]"
          onClick={(e) => {
            e.stopPropagation()
            setAnalyticsOpen(!analyticsOpen)
          }}
        >
          {analyticsOpen ? <Minus size={18} /> : <Plus size={18} />}
        </button>
      </div>

      {analyticsOpen && (
        <div className="px-2 pb-2">
          <button className="w-full flex items-center px-2 py-2 text-sm text-[hsl(var(--sidebar-icon-active))] bg-[hsl(var(--sidebar-icon-active-bg))] rounded-md">
            <BarChart size={18} className="mr-3 text-[hsl(var(--sidebar-icon-active))]" />
            <span>Dashboard</span>
          </button>

          <button className="w-full flex items-center px-2 py-2 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-1 transition-colors">
            <PieChart size={18} className="mr-3 text-[hsl(var(--sidebar-icon))]" />
            <span>Reports</span>
          </button>

          <button className="w-full flex items-center px-2 py-2 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-1 transition-colors">
            <Clock size={18} className="mr-3 text-[hsl(var(--sidebar-icon))]" />
            <span>Real-time</span>
          </button>

          <button className="w-full flex items-center px-2 py-2 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-1 transition-colors">
            <Users size={18} className="mr-3 text-[hsl(var(--sidebar-icon))]" />
            <span>Audience</span>
          </button>

          <div className="mt-4 px-2 py-3 bg-[hsl(var(--secondary))] rounded-md">
            <h3 className="text-xs font-semibold mb-1">Analytics ID</h3>
            <p className="text-sm font-mono">63066612</p>
            <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">Connected to Team Catalog</p>
          </div>
        </div>
      )}
    </div>
  )
}

// The rest of the section components would be updated similarly
// For brevity, I'm not including all of them here, but they would follow the same pattern

function LayersSection() {
  const [projectsOpen, setProjectsOpen] = useState(true)

  return (
    <div className="border-b border-[hsl(var(--sidebar-border))] transition-colors duration-300">
      <div
        className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-[hsl(var(--secondary))] transition-colors"
        onClick={() => setProjectsOpen(!projectsOpen)}
      >
        <h2 className="text-xs font-bold uppercase tracking-wide text-[hsl(var(--sidebar-fg))]">Projects</h2>
        <button
          className="text-[hsl(var(--sidebar-icon))]"
          onClick={(e) => {
            e.stopPropagation()
            setProjectsOpen(!projectsOpen)
          }}
        >
          {projectsOpen ? <Minus size={18} /> : <Plus size={18} />}
        </button>
      </div>

      {projectsOpen && (
        <div className="px-2 pb-2">
          <button className="w-full flex items-center px-2 py-2 text-sm text-[hsl(var(--sidebar-icon-active))] bg-[hsl(var(--sidebar-icon-active-bg))] rounded-md">
            <Layers size={18} className="mr-3 text-[hsl(var(--sidebar-icon-active))]" />
            <span>All Projects</span>
          </button>

          <button className="w-full flex items-center px-2 py-2 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-1 transition-colors">
            <FileText size={18} className="mr-3 text-[hsl(var(--sidebar-icon))]" />
            <span>Documentation</span>
          </button>

          <button className="w-full flex items-center px-2 py-2 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-1 transition-colors">
            <Users size={18} className="mr-3 text-[hsl(var(--sidebar-icon))]" />
            <span>Team Projects</span>
          </button>

          <button className="w-full flex items-center px-2 py-2 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-1 transition-colors">
            <Database size={18} className="mr-3 text-[hsl(var(--sidebar-icon))]" />
            <span>Resources</span>
          </button>
        </div>
      )}
    </div>
  )
}

function SettingsSection() {
  const [settingsOpen, setSettingsOpen] = useState(true)

  return (
    <div className="border-b border-[hsl(var(--sidebar-border))] transition-colors duration-300">
      <div
        className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-[hsl(var(--secondary))] transition-colors"
        onClick={() => setSettingsOpen(!settingsOpen)}
      >
        <h2 className="text-xs font-bold uppercase tracking-wide text-[hsl(var(--sidebar-fg))]">Settings</h2>
        <button
          className="text-[hsl(var(--sidebar-icon))]"
          onClick={(e) => {
            e.stopPropagation()
            setSettingsOpen(!settingsOpen)
          }}
        >
          {settingsOpen ? <Minus size={18} /> : <Plus size={18} />}
        </button>
      </div>

      {settingsOpen && (
        <div className="px-2 pb-2">
          <button className="w-full flex items-center px-2 py-2 text-sm text-[hsl(var(--sidebar-icon-active))] bg-[hsl(var(--sidebar-icon-active-bg))] rounded-md">
            <Sliders size={18} className="mr-3 text-[hsl(var(--sidebar-icon-active))]" />
            <span>General</span>
          </button>

          <button className="w-full flex items-center px-2 py-2 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-1 transition-colors">
            <Users size={18} className="mr-3 text-[hsl(var(--sidebar-icon))]" />
            <span>Users</span>
          </button>

          <button className="w-full flex items-center px-2 py-2 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-1 transition-colors">
            <Database size={18} className="mr-3 text-[hsl(var(--sidebar-icon))]" />
            <span>Database</span>
          </button>

          <button className="w-full flex items-center px-2 py-2 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-1 transition-colors">
            <SettingsIcon size={18} className="mr-3 text-[hsl(var(--sidebar-icon))]" />
            <span>Advanced</span>
          </button>
        </div>
      )}
    </div>
  )
}

function EditorSection() {
  const [editorOpen, setEditorOpen] = useState(true)

  return (
    <div className="border-b border-[hsl(var(--sidebar-border))] transition-colors duration-300">
      <div
        className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-[hsl(var(--secondary))] transition-colors"
        onClick={() => setEditorOpen(!editorOpen)}
      >
        <h2 className="text-xs font-bold uppercase tracking-wide text-[hsl(var(--sidebar-fg))]">Editor</h2>
        <button
          className="text-[hsl(var(--sidebar-icon))]"
          onClick={(e) => {
            e.stopPropagation()
            setEditorOpen(!editorOpen)
          }}
        >
          {editorOpen ? <Minus size={18} /> : <Plus size={18} />}
        </button>
      </div>

      {editorOpen && (
        <div className="px-2 pb-2">
          <button className="w-full flex items-center px-2 py-2 text-sm text-[hsl(var(--sidebar-icon-active))] bg-[hsl(var(--sidebar-icon-active-bg))] rounded-md">
            <Edit size={18} className="mr-3 text-[hsl(var(--sidebar-icon-active))]" />
            <span>Content</span>
          </button>

          <button className="w-full flex items-center px-2 py-2 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-1 transition-colors">
            <FileText size={18} className="mr-3 text-[hsl(var(--sidebar-icon))]" />
            <span>Pages</span>
          </button>

          <button className="w-full flex items-center px-2 py-2 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-1 transition-colors">
            <Layers size={18} className="mr-3 text-[hsl(var(--sidebar-icon))]" />
            <span>Templates</span>
          </button>
        </div>
      )}
    </div>
  )
}

function DocumentsSection() {
  const [documentsOpen, setDocumentsOpen] = useState(true)

  return (
    <div className="border-b border-[hsl(var(--sidebar-border))] transition-colors duration-300">
      <div
        className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-[hsl(var(--secondary))] transition-colors"
        onClick={() => setDocumentsOpen(!documentsOpen)}
      >
        <h2 className="text-xs font-bold uppercase tracking-wide text-[hsl(var(--sidebar-fg))]">Documents</h2>
        <button
          className="text-[hsl(var(--sidebar-icon))]"
          onClick={(e) => {
            e.stopPropagation()
            setDocumentsOpen(!documentsOpen)
          }}
        >
          {documentsOpen ? <Minus size={18} /> : <Plus size={18} />}
        </button>
      </div>

      {documentsOpen && (
        <div className="px-2 pb-2">
          <button className="w-full flex items-center px-2 py-2 text-sm text-[hsl(var(--sidebar-icon-active))] bg-[hsl(var(--sidebar-icon-active-bg))] rounded-md">
            <Folder size={18} className="mr-3 text-[hsl(var(--sidebar-icon-active))]" />
            <span>All Files</span>
          </button>

          <button className="w-full flex items-center px-2 py-2 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-1 transition-colors">
            <FileText size={18} className="mr-3 text-[hsl(var(--sidebar-icon))]" />
            <span>Shared</span>
          </button>

          <button className="w-full flex items-center px-2 py-2 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-1 transition-colors">
            <Clock size={18} className="mr-3 text-[hsl(var(--sidebar-icon))]" />
            <span>Recent</span>
          </button>
        </div>
      )}
    </div>
  )
}

function UploadsSection() {
  const [uploadsOpen, setUploadsOpen] = useState(true)

  return (
    <div className="border-b border-[hsl(var(--sidebar-border))] transition-colors duration-300">
      <div
        className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-[hsl(var(--secondary))] transition-colors"
        onClick={() => setUploadsOpen(!uploadsOpen)}
      >
        <h2 className="text-xs font-bold uppercase tracking-wide text-[hsl(var(--sidebar-fg))]">Uploads</h2>
        <button
          className="text-[hsl(var(--sidebar-icon))]"
          onClick={(e) => {
            e.stopPropagation()
            setUploadsOpen(!uploadsOpen)
          }}
        >
          {uploadsOpen ? <Minus size={18} /> : <Plus size={18} />}
        </button>
      </div>

      {uploadsOpen && (
        <div className="px-2 pb-2">
          <button className="w-full flex items-center px-2 py-2 text-sm text-[hsl(var(--sidebar-icon-active))] bg-[hsl(var(--sidebar-icon-active-bg))] rounded-md">
            <Upload size={18} className="mr-3 text-[hsl(var(--sidebar-icon-active))]" />
            <span>All Uploads</span>
          </button>

          <button className="w-full flex items-center px-2 py-2 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-1 transition-colors">
            <Clock size={18} className="mr-3 text-[hsl(var(--sidebar-icon))]" />
            <span>Recent</span>
          </button>

          <button className="w-full flex items-center px-2 py-2 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-1 transition-colors">
            <FileText size={18} className="mr-3 text-[hsl(var(--sidebar-icon))]" />
            <span>Documents</span>
          </button>

          <button className="w-full flex items-center px-2 py-2 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-1 transition-colors">
            <MonitorSmartphone size={18} className="mr-3 text-[hsl(var(--sidebar-icon))]" />
            <span>Media</span>
          </button>
        </div>
      )}
    </div>
  )
}

function PreferencesSection() {
  const [preferencesOpen, setPreferencesOpen] = useState(true)

  return (
    <div className="border-b border-[hsl(var(--sidebar-border))] transition-colors duration-300">
      <div
        className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-[hsl(var(--secondary))] transition-colors"
        onClick={() => setPreferencesOpen(!preferencesOpen)}
      >
        <h2 className="text-xs font-bold uppercase tracking-wide text-[hsl(var(--sidebar-fg))]">Preferences</h2>
        <button
          className="text-[hsl(var(--sidebar-icon))]"
          onClick={(e) => {
            e.stopPropagation()
            setPreferencesOpen(!preferencesOpen)
          }}
        >
          {preferencesOpen ? <Minus size={18} /> : <Plus size={18} />}
        </button>
      </div>

      {preferencesOpen && (
        <div className="px-2 pb-2">
          <button className="w-full flex items-center px-2 py-2 text-sm text-[hsl(var(--sidebar-icon-active))] bg-[hsl(var(--sidebar-icon-active-bg))] rounded-md">
            <SettingsIcon size={18} className="mr-3 text-[hsl(var(--sidebar-icon-active))]" />
            <span>Account</span>
          </button>

          <button className="w-full flex items-center px-2 py-2 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-1 transition-colors">
            <Users size={18} className="mr-3 text-[hsl(var(--sidebar-icon))]" />
            <span>Team</span>
          </button>

          <button className="w-full flex items-center px-2 py-2 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-1 transition-colors">
            <HelpCircle size={18} className="mr-3 text-[hsl(var(--sidebar-icon))]" />
            <span>Help & Support</span>
          </button>
        </div>
      )}
    </div>
  )
}
