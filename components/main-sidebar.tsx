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
  Mail,
  Inbox,
  Send,
  AlertTriangle,
  Archive,
  Trash2,
  Star,
  Tag,
  FileImage,
  FileSpreadsheet,
  FileCode,
  FileIcon as FilePdf,
  FileArchive,
  FileIcon as FilePresentation,
  FileVideo,
  FileAudio,
  Share2,
  Lock,
  Bookmark,
  History,
  Download,
  Cloud,
  UserPlus,
  GitBranch,
  GitMerge,
  GitPullRequest,
  CheckCircle,
  AlertCircle,
  User,
  Video,
  Calendar,
  MessageSquare,
} from "lucide-react"
import { useState } from "react"

type MainSidebarProps = {
  activeSection: string
}

export function MainSidebar({ activeSection }: MainSidebarProps) {
  return (
    <div className="w-full h-full bg-[hsl(var(--sidebar-bg))] border-r border-[hsl(var(--sidebar-border))] overflow-y-auto transition-colors duration-300 flex flex-col shadow-sm">
      <div className="flex-1 overflow-y-auto">
        {activeSection === "home" && <CampaignsSection />}
        {activeSection === "layers" && <LayersSection />}
        {activeSection === "analytics" && <AnalyticsSection />}
        {activeSection === "settings" && <SettingsSection />}
        {activeSection === "editor" && <EditorSection />}
        {activeSection === "documents" && <DocumentsSection />}
        {activeSection === "uploads" && <UploadsSection />}
        {activeSection === "preferences" && <PreferencesSection />}
        {activeSection === "email" && <EmailSection />}
        {activeSection === "chat" && <ChatSection />}
      </div>

      {/* Team info section - fixed at bottom */}
      <div className="px-3 py-3 border-t border-[hsl(var(--sidebar-border))] sticky bottom-0 bg-[hsl(var(--sidebar-bg))] transition-colors duration-300">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full analytics-gradient flex items-center justify-center mr-2">
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
              <ChevronRight size={14} className="text-[hsl(var(--muted-foreground))]" />
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

// Enhanced Documents Section
function DocumentsSection() {
  const [myDocumentsOpen, setMyDocumentsOpen] = useState(true)
  const [sharedDocumentsOpen, setSharedDocumentsOpen] = useState(true)
  const [projectDocumentsOpen, setProjectDocumentsOpen] = useState(false)
  const [documentTypesOpen, setDocumentTypesOpen] = useState(false)
  const [workflowsOpen, setWorkflowsOpen] = useState(false)
  const [tagsOpen, setTagsOpen] = useState(false)

  return (
    <>
      <div className="border-b border-[hsl(var(--sidebar-border))] transition-colors duration-300">
        <div className="flex items-center justify-between px-3 py-3">
          <h2 className="text-xs font-bold uppercase tracking-wide text-[hsl(var(--sidebar-fg))]">Document Center</h2>
          <div className="flex items-center space-x-1">
            <button className="text-[hsl(var(--sidebar-icon))] p-1 rounded-md hover:bg-[hsl(var(--sidebar-icon-active-bg))] hover:text-[hsl(var(--sidebar-icon-active))]">
              <Plus size={14} />
            </button>
            <button className="text-[hsl(var(--sidebar-icon))] p-1 rounded-md hover:bg-[hsl(var(--sidebar-icon-active-bg))] hover:text-[hsl(var(--sidebar-icon-active))]">
              <Search size={14} />
            </button>
          </div>
        </div>

        <div className="px-2 pb-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search documents..."
              className="w-full h-8 px-8 py-2 text-sm bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] rounded-md focus:outline-none focus:ring-1 focus:ring-[hsl(var(--primary))]"
            />
            <Search
              className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-[hsl(var(--muted-foreground))]"
              size={14}
            />
          </div>
        </div>
      </div>

      {/* My Documents Section */}
      <div className="border-b border-[hsl(var(--sidebar-border))] transition-colors duration-300">
        <div
          className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-[hsl(var(--secondary))] transition-colors"
          onClick={() => setMyDocumentsOpen(!myDocumentsOpen)}
        >
          <h2 className="text-xs font-bold uppercase tracking-wide text-[hsl(var(--sidebar-fg))]">My Documents</h2>
          <button
            className="text-[hsl(var(--sidebar-icon))] p-1 rounded-md hover:bg-[hsl(var(--sidebar-icon-active-bg))] hover:text-[hsl(var(--sidebar-icon-active))]"
            onClick={(e) => {
              e.stopPropagation()
              setMyDocumentsOpen(!myDocumentsOpen)
            }}
          >
            {myDocumentsOpen ? <Minus size={14} /> : <Plus size={14} />}
          </button>
        </div>

        {myDocumentsOpen && (
          <div className="px-2 pb-1">
            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-icon-active))] bg-[hsl(var(--sidebar-icon-active-bg))] rounded-md">
              <FileText size={16} className="mr-2 text-[hsl(var(--sidebar-icon-active))]" />
              <span>All Documents</span>
            </button>

            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
              <Clock size={16} className="mr-2 text-[hsl(var(--sidebar-icon))]" />
              <span>Recent</span>
            </button>

            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
              <Star size={16} className="mr-2 text-[hsl(var(--sidebar-icon))]" />
              <span>Favorites</span>
            </button>

            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
              <Bookmark size={16} className="mr-2 text-[hsl(var(--sidebar-icon))]" />
              <span>Bookmarked</span>
            </button>

            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
              <History size={16} className="mr-2 text-[hsl(var(--sidebar-icon))]" />
              <span>Version History</span>
            </button>

            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
              <Trash2 size={16} className="mr-2 text-[hsl(var(--sidebar-icon))]" />
              <span>Trash</span>
            </button>
          </div>
        )}
      </div>

      {/* Shared Documents Section */}
      <div className="border-b border-[hsl(var(--sidebar-border))] transition-colors duration-300">
        <div
          className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-[hsl(var(--secondary))] transition-colors"
          onClick={() => setSharedDocumentsOpen(!sharedDocumentsOpen)}
        >
          <h2 className="text-xs font-bold uppercase tracking-wide text-[hsl(var(--sidebar-fg))]">Shared</h2>
          <button
            className="text-[hsl(var(--sidebar-icon))] p-1 rounded-md hover:bg-[hsl(var(--sidebar-icon-active-bg))] hover:text-[hsl(var(--sidebar-icon-active))]"
            onClick={(e) => {
              e.stopPropagation()
              setSharedDocumentsOpen(!sharedDocumentsOpen)
            }}
          >
            {sharedDocumentsOpen ? <Minus size={14} /> : <Plus size={14} />}
          </button>
        </div>

        {sharedDocumentsOpen && (
          <div className="px-2 pb-1">
            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md transition-colors">
              <Share2 size={16} className="mr-2 text-[hsl(var(--sidebar-icon))]" />
              <span>Shared with Me</span>
            </button>

            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
              <UserPlus size={16} className="mr-2 text-[hsl(var(--sidebar-icon))]" />
              <span>Shared by Me</span>
            </button>

            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
              <Users size={16} className="mr-2 text-[hsl(var(--sidebar-icon))]" />
              <span>Team Documents</span>
            </button>

            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
              <Lock size={16} className="mr-2 text-[hsl(var(--sidebar-icon))]" />
              <span>Private Documents</span>
            </button>
          </div>
        )}
      </div>

      {/* Project Documents Section */}
      <div className="border-b border-[hsl(var(--sidebar-border))] transition-colors duration-300">
        <div
          className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-[hsl(var(--secondary))] transition-colors"
          onClick={() => setProjectDocumentsOpen(!projectDocumentsOpen)}
        >
          <h2 className="text-xs font-bold uppercase tracking-wide text-[hsl(var(--sidebar-fg))]">Projects</h2>
          <button
            className="text-[hsl(var(--sidebar-icon))] p-1 rounded-md hover:bg-[hsl(var(--sidebar-icon-active-bg))] hover:text-[hsl(var(--sidebar-icon-active))]"
            onClick={(e) => {
              e.stopPropagation()
              setProjectDocumentsOpen(!projectDocumentsOpen)
            }}
          >
            {projectDocumentsOpen ? <Minus size={14} /> : <Plus size={14} />}
          </button>
        </div>

        {projectDocumentsOpen && (
          <div className="px-2 pb-1">
            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md transition-colors">
              <Folder size={16} className="mr-2 text-blue-500" />
              <span>Marketing Campaign</span>
            </button>

            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
              <Folder size={16} className="mr-2 text-green-500" />
              <span>Product Development</span>
            </button>

            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
              <Folder size={16} className="mr-2 text-purple-500" />
              <span>Research & Analysis</span>
            </button>

            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
              <Folder size={16} className="mr-2 text-orange-500" />
              <span>Client Presentations</span>
            </button>

            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
              <Folder size={16} className="mr-2 text-red-500" />
              <span>Financial Reports</span>
            </button>
          </div>
        )}
      </div>

      {/* Document Types Section */}
      <div className="border-b border-[hsl(var(--sidebar-border))] transition-colors duration-300">
        <div
          className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-[hsl(var(--secondary))] transition-colors"
          onClick={() => setDocumentTypesOpen(!documentTypesOpen)}
        >
          <h2 className="text-xs font-bold uppercase tracking-wide text-[hsl(var(--sidebar-fg))]">Document Types</h2>
          <button
            className="text-[hsl(var(--sidebar-icon))] p-1 rounded-md hover:bg-[hsl(var(--sidebar-icon-active-bg))] hover:text-[hsl(var(--sidebar-icon-active))]"
            onClick={(e) => {
              e.stopPropagation()
              setDocumentTypesOpen(!documentTypesOpen)
            }}
          >
            {documentTypesOpen ? <Minus size={14} /> : <Plus size={14} />}
          </button>
        </div>

        {documentTypesOpen && (
          <div className="px-2 pb-1">
            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md transition-colors">
              <FileText size={16} className="mr-2 text-[hsl(var(--sidebar-icon))]" />
              <span>Text Documents</span>
            </button>

            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
              <FileSpreadsheet size={16} className="mr-2 text-[hsl(var(--sidebar-icon))]" />
              <span>Spreadsheets</span>
            </button>

            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
              <FilePresentation size={16} className="mr-2 text-[hsl(var(--sidebar-icon))]" />
              <span>Presentations</span>
            </button>

            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
              <FilePdf size={16} className="mr-2 text-[hsl(var(--sidebar-icon))]" />
              <span>PDF Documents</span>
            </button>

            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
              <FileImage size={16} className="mr-2 text-[hsl(var(--sidebar-icon))]" />
              <span>Images</span>
            </button>

            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
              <FileVideo size={16} className="mr-2 text-[hsl(var(--sidebar-icon))]" />
              <span>Videos</span>
            </button>

            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
              <FileAudio size={16} className="mr-2 text-[hsl(var(--sidebar-icon))]" />
              <span>Audio Files</span>
            </button>

            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
              <FileCode size={16} className="mr-2 text-[hsl(var(--sidebar-icon))]" />
              <span>Code Files</span>
            </button>

            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
              <FileArchive size={16} className="mr-2 text-[hsl(var(--sidebar-icon))]" />
              <span>Archives</span>
            </button>
          </div>
        )}
      </div>

      {/* Workflows Section */}
      <div className="border-b border-[hsl(var(--sidebar-border))] transition-colors duration-300">
        <div
          className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-[hsl(var(--secondary))] transition-colors"
          onClick={() => setWorkflowsOpen(!workflowsOpen)}
        >
          <h2 className="text-xs font-bold uppercase tracking-wide text-[hsl(var(--sidebar-fg))]">Workflows</h2>
          <button
            className="text-[hsl(var(--sidebar-icon))] p-1 rounded-md hover:bg-[hsl(var(--sidebar-icon-active-bg))] hover:text-[hsl(var(--sidebar-icon-active))]"
            onClick={(e) => {
              e.stopPropagation()
              setWorkflowsOpen(!workflowsOpen)
            }}
          >
            {workflowsOpen ? <Minus size={14} /> : <Plus size={14} />}
          </button>
        </div>

        {workflowsOpen && (
          <div className="px-2 pb-1">
            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md transition-colors">
              <GitBranch size={16} className="mr-2 text-[hsl(var(--sidebar-icon))]" />
              <span>In Progress</span>
            </button>

            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
              <GitPullRequest size={16} className="mr-2 text-[hsl(var(--sidebar-icon))]" />
              <span>Under Review</span>
            </button>

            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
              <AlertCircle size={16} className="mr-2 text-[hsl(var(--sidebar-icon))]" />
              <span>Needs Attention</span>
            </button>

            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
              <GitMerge size={16} className="mr-2 text-[hsl(var(--sidebar-icon))]" />
              <span>Pending Approval</span>
            </button>

            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
              <CheckCircle size={16} className="mr-2 text-[hsl(var(--sidebar-icon))]" />
              <span>Approved</span>
            </button>
          </div>
        )}
      </div>

      {/* Tags Section */}
      <div className="border-b border-[hsl(var(--sidebar-border))] transition-colors duration-300">
        <div
          className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-[hsl(var(--secondary))] transition-colors"
          onClick={() => setTagsOpen(!tagsOpen)}
        >
          <h2 className="text-xs font-bold uppercase tracking-wide text-[hsl(var(--sidebar-fg))]">Tags</h2>
          <button
            className="text-[hsl(var(--sidebar-icon))] p-1 rounded-md hover:bg-[hsl(var(--sidebar-icon-active-bg))] hover:text-[hsl(var(--sidebar-icon-active))]"
            onClick={(e) => {
              e.stopPropagation()
              setTagsOpen(!tagsOpen)
            }}
          >
            {tagsOpen ? <Minus size={14} /> : <Plus size={14} />}
          </button>
        </div>

        {tagsOpen && (
          <div className="px-2 pb-1">
            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md transition-colors">
              <Tag size={16} className="mr-2 text-red-500" />
              <span>Urgent</span>
            </button>

            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
              <Tag size={16} className="mr-2 text-blue-500" />
              <span>Important</span>
            </button>

            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
              <Tag size={16} className="mr-2 text-green-500" />
              <span>Completed</span>
            </button>

            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
              <Tag size={16} className="mr-2 text-yellow-500" />
              <span>In Progress</span>
            </button>

            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
              <Tag size={16} className="mr-2 text-purple-500" />
              <span>Draft</span>
            </button>
          </div>
        )}
      </div>

      {/* Storage Section */}
      <div className="mt-3 px-3">
        <div className="bg-[hsl(var(--secondary))] rounded-md p-3">
          <div className="flex items-center mb-2">
            <Cloud size={16} className="mr-2 text-[hsl(var(--primary))]" />
            <h3 className="text-sm font-medium">Document Storage</h3>
          </div>
          <div className="w-full h-2 bg-[hsl(var(--muted))] rounded-full overflow-hidden">
            <div className="h-full bg-[hsl(var(--primary))]" style={{ width: "45%" }}></div>
          </div>
          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-2">4.5 GB of 10 GB used</p>
          <button className="w-full mt-2 text-xs text-[hsl(var(--primary))] flex items-center justify-center">
            <Download size={12} className="mr-1" />
            <span>Manage Storage</span>
          </button>
        </div>
      </div>
    </>
  )
}

// New Email Section
function EmailSection() {
  const [inboxOpen, setInboxOpen] = useState(true)
  const [sentOpen, setSentOpen] = useState(false)
  const [spamOpen, setSpamOpen] = useState(false)
  const [foldersOpen, setFoldersOpen] = useState(false)
  const [labelsOpen, setLabelsOpen] = useState(false)

  return (
    <>
      <div className="border-b border-[hsl(var(--sidebar-border))] transition-colors duration-300">
        <div className="flex items-center justify-between px-3 py-3">
          <h2 className="text-xs font-bold uppercase tracking-wide text-[hsl(var(--sidebar-fg))]">Email</h2>
          <div className="flex items-center space-x-1">
            <button className="text-[hsl(var(--sidebar-icon))] p-1 rounded-md hover:bg-[hsl(var(--sidebar-icon-active-bg))] hover:text-[hsl(var(--sidebar-icon-active))]">
              <Plus size={14} />
            </button>
            <button
              className="text-[hsl(var(--sidebar-icon))] p-1 rounded-md hover:bg-[hsl(var(--sidebar-icon-active-bg))] hover:text-[hsl(var(--sidebar-icon-active))]"
              onClick={() => setInboxOpen(!inboxOpen)}
            >
              {inboxOpen ? <Minus size={14} /> : <Plus size={14} />}
            </button>
          </div>
        </div>

        {inboxOpen && (
          <div className="px-2 pb-1">
            <button className="w-full flex items-center justify-between px-2 py-1.5 text-sm text-[hsl(var(--sidebar-icon-active))] bg-[hsl(var(--sidebar-icon-active-bg))] rounded-md">
              <div className="flex items-center">
                <Inbox size={16} className="mr-2 text-[hsl(var(--sidebar-icon-active))]" />
                <span>Inbox</span>
              </div>
              <span className="text-xs bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] px-1.5 py-0.5 rounded-full">
                12
              </span>
            </button>

            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
              <Star size={16} className="mr-2 text-[hsl(var(--sidebar-icon))]" />
              <span>Starred</span>
            </button>

            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
              <Send size={16} className="mr-2 text-[hsl(var(--sidebar-icon))]" />
              <span>Sent</span>
            </button>

            <button className="w-full flex items-center justify-between px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
              <div className="flex items-center">
                <AlertTriangle size={16} className="mr-2 text-[hsl(var(--sidebar-icon))]" />
                <span>Spam</span>
              </div>
              <span className="text-xs bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] px-1.5 py-0.5 rounded-full">
                36
              </span>
            </button>

            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
              <Archive size={16} className="mr-2 text-[hsl(var(--sidebar-icon))]" />
              <span>Archive</span>
            </button>

            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
              <Trash2 size={16} className="mr-2 text-[hsl(var(--sidebar-icon))]" />
              <span>Trash</span>
            </button>
          </div>
        )}
      </div>

      <div className="border-b border-[hsl(var(--sidebar-border))] transition-colors duration-300">
        <div
          className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-[hsl(var(--secondary))] transition-colors"
          onClick={() => setFoldersOpen(!foldersOpen)}
        >
          <h2 className="text-xs font-bold uppercase tracking-wide text-[hsl(var(--sidebar-fg))]">Folders</h2>
          <button
            className="text-[hsl(var(--sidebar-icon))] p-1 rounded-md hover:bg-[hsl(var(--sidebar-icon-active-bg))] hover:text-[hsl(var(--sidebar-icon-active))]"
            onClick={(e) => {
              e.stopPropagation()
              setFoldersOpen(!foldersOpen)
            }}
          >
            {foldersOpen ? <Minus size={14} /> : <Plus size={14} />}
          </button>
        </div>

        {foldersOpen && (
          <div className="px-2 pb-1">
            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md transition-colors">
              <Folder size={16} className="mr-2 text-[hsl(var(--sidebar-icon))]" />
              <span>Work</span>
            </button>

            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
              <Folder size={16} className="mr-2 text-[hsl(var(--sidebar-icon))]" />
              <span>Personal</span>
            </button>

            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
              <Folder size={16} className="mr-2 text-[hsl(var(--sidebar-icon))]" />
              <span>Projects</span>
            </button>

            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
              <Folder size={16} className="mr-2 text-[hsl(var(--sidebar-icon))]" />
              <span>Clients</span>
            </button>
          </div>
        )}
      </div>

      <div className="border-b border-[hsl(var(--sidebar-border))] transition-colors duration-300">
        <div
          className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-[hsl(var(--secondary))] transition-colors"
          onClick={() => setLabelsOpen(!labelsOpen)}
        >
          <h2 className="text-xs font-bold uppercase tracking-wide text-[hsl(var(--sidebar-fg))]">Labels</h2>
          <button
            className="text-[hsl(var(--sidebar-icon))] p-1 rounded-md hover:bg-[hsl(var(--sidebar-icon-active-bg))] hover:text-[hsl(var(--sidebar-icon-active))]"
            onClick={(e) => {
              e.stopPropagation()
              setLabelsOpen(!labelsOpen)
            }}
          >
            {labelsOpen ? <Minus size={14} /> : <Plus size={14} />}
          </button>
        </div>

        {labelsOpen && (
          <div className="px-2 pb-1">
            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md transition-colors">
              <Tag size={16} className="mr-2 text-red-500" />
              <span>Important</span>
            </button>

            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
              <Tag size={16} className="mr-2 text-blue-500" />
              <span>Business</span>
            </button>

            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
              <Tag size={16} className="mr-2 text-green-500" />
              <span>Personal</span>
            </button>

            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
              <Tag size={16} className="mr-2 text-yellow-500" />
              <span>Urgent</span>
            </button>
          </div>
        )}
      </div>

      <div className="mt-3 px-3">
        <div className="bg-[hsl(var(--secondary))] rounded-md p-3">
          <div className="flex items-center mb-2">
            <Mail size={16} className="mr-2 text-[hsl(var(--primary))]" />
            <h3 className="text-sm font-medium">Email Storage</h3>
          </div>
          <div className="w-full h-2 bg-[hsl(var(--muted))] rounded-full overflow-hidden">
            <div className="h-full bg-[hsl(var(--primary))]" style={{ width: "65%" }}></div>
          </div>
          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-2">6.5 GB of 10 GB used</p>
        </div>
      </div>
    </>
  )
}

// Other sections remain the same
function CampaignsSection() {
  const [campaignsOpen, setCampaignsOpen] = useState(true)
  const [adGroupsOpen, setAdGroupsOpen] = useState(true)
  const [audiencesOpen, setAudiencesOpen] = useState(false)

  return (
    <>
      <div className="border-b border-[hsl(var(--sidebar-border))] transition-colors duration-300">
        <div
          className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-[hsl(var(--secondary))] transition-colors"
          onClick={() => setCampaignsOpen(!campaignsOpen)}
        >
          <h2 className="text-xs font-bold uppercase tracking-wide text-[hsl(var(--sidebar-fg))]">Campaigns</h2>
          <button
            className="text-[hsl(var(--sidebar-icon))] p-1 rounded-md hover:bg-[hsl(var(--sidebar-icon-active-bg))] hover:text-[hsl(var(--sidebar-icon-active))]"
            onClick={(e) => {
              e.stopPropagation()
              setCampaignsOpen(!campaignsOpen)
            }}
          >
            {campaignsOpen ? <Minus size={14} /> : <Plus size={14} />}
          </button>
        </div>

        {campaignsOpen && (
          <div className="px-2 pb-1">
            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-icon-active))] bg-[hsl(var(--sidebar-icon-active-bg))] rounded-md">
              <LayoutDashboard size={16} className="mr-2 text-[hsl(var(--sidebar-icon-active))]" />
              <span>Overview</span>
            </button>

            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
              <Zap size={16} className="mr-2 text-[hsl(var(--sidebar-icon))]" />
              <span>Recommendations</span>
            </button>

            <button className="w-full flex items-center justify-between px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
              <div className="flex items-center">
                <PieChart size={16} className="mr-2 text-[hsl(var(--sidebar-icon))]" />
                <span>Insights</span>
              </div>
              <span className="text-xs bg-[hsl(var(--sidebar-icon-active-bg))] text-[hsl(var(--sidebar-icon-active))] px-1.5 py-0.5 rounded-full">
                10
              </span>
            </button>

            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
              <BarChart size={16} className="mr-2 text-[hsl(var(--sidebar-icon))]" />
              <span>Campaigns</span>
            </button>

            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
              <Search size={16} className="mr-2 text-[hsl(var(--sidebar-icon))]" />
              <span>Keywords</span>
            </button>

            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
              <Clock size={16} className="mr-2 text-[hsl(var(--sidebar-icon))]" />
              <span>Reporting</span>
            </button>
          </div>
        )}
      </div>

      <div className="border-b border-[hsl(var(--sidebar-border))] transition-colors duration-300">
        <div
          className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-[hsl(var(--secondary))] transition-colors"
          onClick={() => setAdGroupsOpen(!adGroupsOpen)}
        >
          <h2 className="text-xs font-bold uppercase tracking-wide text-[hsl(var(--sidebar-fg))]">Ad groups</h2>
          <button
            className="text-[hsl(var(--sidebar-icon))] p-1 rounded-md hover:bg-[hsl(var(--sidebar-icon-active-bg))] hover:text-[hsl(var(--sidebar-icon-active))]"
            onClick={(e) => {
              e.stopPropagation()
              setAdGroupsOpen(!adGroupsOpen)
            }}
          >
            {adGroupsOpen ? <Minus size={14} /> : <Plus size={14} />}
          </button>
        </div>

        {adGroupsOpen && (
          <div className="px-2 pb-1">
            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md transition-colors">
              <LayoutDashboard size={16} className="mr-2 text-[hsl(var(--sidebar-icon))]" />
              <span>Overview</span>
            </button>

            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
              <LayoutGrid size={16} className="mr-2 text-[hsl(var(--sidebar-icon))]" />
              <span>Ad groups</span>
            </button>

            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
              <Target size={16} className="mr-2 text-[hsl(var(--sidebar-icon))]" />
              <span>Ads & extensions</span>
            </button>

            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
              <MonitorSmartphone size={16} className="mr-2 text-[hsl(var(--sidebar-icon))]" />
              <span>Landing pages</span>
            </button>

            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
              <Clock size={16} className="mr-2 text-[hsl(var(--sidebar-icon))]" />
              <span>Reporting</span>
            </button>

            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
              <SettingsIcon size={16} className="mr-2 text-[hsl(var(--sidebar-icon))]" />
              <span>Settings</span>
            </button>
          </div>
        )}
      </div>

      <div className="border-b border-[hsl(var(--sidebar-border))] transition-colors duration-300">
        <div
          className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-[hsl(var(--secondary))] transition-colors"
          onClick={() => setAudiencesOpen(!audiencesOpen)}
        >
          <h2 className="text-xs font-bold uppercase tracking-wide text-[hsl(var(--sidebar-fg))]">Audiences</h2>
          <button
            className="text-[hsl(var(--sidebar-icon))] p-1 rounded-md hover:bg-[hsl(var(--sidebar-icon-active-bg))] hover:text-[hsl(var(--sidebar-icon-active))]"
            onClick={(e) => {
              e.stopPropagation()
              setAudiencesOpen(!audiencesOpen)
            }}
          >
            {audiencesOpen ? <Minus size={14} /> : <Plus size={14} />}
          </button>
        </div>

        {audiencesOpen && (
          <div className="px-2 pb-1">
            <p className="text-xs text-[hsl(var(--muted-foreground))] p-2">No audiences configured</p>
          </div>
        )}
      </div>
    </>
  )
}

// Other section components remain the same
function AnalyticsSection() {
  // Implementation remains the same
  const [analyticsOpen, setAnalyticsOpen] = useState(true)

  return (
    <div className="border-b border-[hsl(var(--sidebar-border))] transition-colors duration-300">
      <div
        className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-[hsl(var(--secondary))] transition-colors"
        onClick={() => setAnalyticsOpen(!analyticsOpen)}
      >
        <h2 className="text-xs font-bold uppercase tracking-wide text-[hsl(var(--sidebar-fg))]">Analytics</h2>
        <button
          className="text-[hsl(var(--sidebar-icon))] p-1 rounded-md hover:bg-[hsl(var(--sidebar-icon-active-bg))] hover:text-[hsl(var(--sidebar-icon-active))]"
          onClick={(e) => {
            e.stopPropagation()
            setAnalyticsOpen(!analyticsOpen)
          }}
        >
          {analyticsOpen ? <Minus size={14} /> : <Plus size={14} />}
        </button>
      </div>

      {analyticsOpen && (
        <div className="px-2 pb-1">
          <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-icon-active))] bg-[hsl(var(--sidebar-icon-active-bg))] rounded-md">
            <BarChart size={16} className="mr-2 text-[hsl(var(--sidebar-icon-active))]" />
            <span>Dashboard</span>
          </button>

          <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
            <PieChart size={16} className="mr-2 text-[hsl(var(--sidebar-icon))]" />
            <span>Reports</span>
          </button>

          <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
            <Clock size={16} className="mr-2 text-[hsl(var(--sidebar-icon))]" />
            <span>Real-time</span>
          </button>

          <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
            <Users size={16} className="mr-2 text-[hsl(var(--sidebar-icon))]" />
            <span>Audience</span>
          </button>

          <div className="mt-3 px-2 py-2 bg-[hsl(var(--secondary))] rounded-md">
            <h3 className="text-xs font-semibold mb-1">Analytics ID</h3>
            <p className="text-sm font-mono">63066612</p>
            <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">Connected to Team Catalog</p>
          </div>
        </div>
      )}
    </div>
  )
}

function LayersSection() {
  // Implementation remains the same
  const [projectsOpen, setProjectsOpen] = useState(true)

  return (
    <div className="border-b border-[hsl(var(--sidebar-border))] transition-colors duration-300">
      <div
        className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-[hsl(var(--secondary))] transition-colors"
        onClick={() => setProjectsOpen(!projectsOpen)}
      >
        <h2 className="text-xs font-bold uppercase tracking-wide text-[hsl(var(--sidebar-fg))]">Projects</h2>
        <button
          className="text-[hsl(var(--sidebar-icon))] p-1 rounded-md hover:bg-[hsl(var(--sidebar-icon-active-bg))] hover:text-[hsl(var(--sidebar-icon-active))]"
          onClick={(e) => {
            e.stopPropagation()
            setProjectsOpen(!projectsOpen)
          }}
        >
          {projectsOpen ? <Minus size={14} /> : <Plus size={14} />}
        </button>
      </div>

      {projectsOpen && (
        <div className="px-2 pb-1">
          <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-icon-active))] bg-[hsl(var(--sidebar-icon-active-bg))] rounded-md">
            <Layers size={16} className="mr-2 text-[hsl(var(--sidebar-icon-active))]" />
            <span>All Projects</span>
          </button>

          <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
            <FileText size={16} className="mr-2 text-[hsl(var(--sidebar-icon))]" />
            <span>Documentation</span>
          </button>

          <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
            <Users size={16} className="mr-2 text-[hsl(var(--sidebar-icon))]" />
            <span>Team Projects</span>
          </button>

          <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
            <Database size={16} className="mr-2 text-[hsl(var(--sidebar-icon))]" />
            <span>Resources</span>
          </button>
        </div>
      )}
    </div>
  )
}

function SettingsSection() {
  // Implementation remains the same
  const [settingsOpen, setSettingsOpen] = useState(true)

  return (
    <div className="border-b border-[hsl(var(--sidebar-border))] transition-colors duration-300">
      <div
        className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-[hsl(var(--secondary))] transition-colors"
        onClick={() => setSettingsOpen(!settingsOpen)}
      >
        <h2 className="text-xs font-bold uppercase tracking-wide text-[hsl(var(--sidebar-fg))]">Settings</h2>
        <button
          className="text-[hsl(var(--sidebar-icon))] p-1 rounded-md hover:bg-[hsl(var(--sidebar-icon-active-bg))] hover:text-[hsl(var(--sidebar-icon-active))]"
          onClick={(e) => {
            e.stopPropagation()
            setSettingsOpen(!settingsOpen)
          }}
        >
          {settingsOpen ? <Minus size={14} /> : <Plus size={14} />}
        </button>
      </div>

      {settingsOpen && (
        <div className="px-2 pb-1">
          <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-icon-active))] bg-[hsl(var(--sidebar-icon-active-bg))] rounded-md">
            <Sliders size={16} className="mr-2 text-[hsl(var(--sidebar-icon-active))]" />
            <span>General</span>
          </button>

          <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
            <Users size={16} className="mr-2 text-[hsl(var(--sidebar-icon))]" />
            <span>Users</span>
          </button>

          <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
            <Database size={16} className="mr-2 text-[hsl(var(--sidebar-icon))]" />
            <span>Database</span>
          </button>

          <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
            <SettingsIcon size={16} className="mr-2 text-[hsl(var(--sidebar-icon))]" />
            <span>Advanced</span>
          </button>
        </div>
      )}
    </div>
  )
}

function EditorSection() {
  // Implementation remains the same
  const [editorOpen, setEditorOpen] = useState(true)

  return (
    <div className="border-b border-[hsl(var(--sidebar-border))] transition-colors duration-300">
      <div
        className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-[hsl(var(--secondary))] transition-colors"
        onClick={() => setEditorOpen(!editorOpen)}
      >
        <h2 className="text-xs font-bold uppercase tracking-wide text-[hsl(var(--sidebar-fg))]">Editor</h2>
        <button
          className="text-[hsl(var(--sidebar-icon))] p-1 rounded-md hover:bg-[hsl(var(--sidebar-icon-active-bg))] hover:text-[hsl(var(--sidebar-icon-active))]"
          onClick={(e) => {
            e.stopPropagation()
            setEditorOpen(!editorOpen)
          }}
        >
          {editorOpen ? <Minus size={14} /> : <Plus size={14} />}
        </button>
      </div>

      {editorOpen && (
        <div className="px-2 pb-1">
          <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-icon-active))] bg-[hsl(var(--sidebar-icon-active-bg))] rounded-md">
            <Edit size={16} className="mr-2 text-[hsl(var(--sidebar-icon-active))]" />
            <span>Content</span>
          </button>

          <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
            <FileText size={16} className="mr-2 text-[hsl(var(--sidebar-icon))]" />
            <span>Pages</span>
          </button>

          <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
            <Layers size={16} className="mr-2 text-[hsl(var(--sidebar-icon))]" />
            <span>Templates</span>
          </button>
        </div>
      )}
    </div>
  )
}

function UploadsSection() {
  // Implementation remains the same
  const [uploadsOpen, setUploadsOpen] = useState(true)

  return (
    <div className="border-b border-[hsl(var(--sidebar-border))] transition-colors duration-300">
      <div
        className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-[hsl(var(--secondary))] transition-colors"
        onClick={() => setUploadsOpen(!uploadsOpen)}
      >
        <h2 className="text-xs font-bold uppercase tracking-wide text-[hsl(var(--sidebar-fg))]">Uploads</h2>
        <button
          className="text-[hsl(var(--sidebar-icon))] p-1 rounded-md hover:bg-[hsl(var(--sidebar-icon-active-bg))] hover:text-[hsl(var(--sidebar-icon-active))]"
          onClick={(e) => {
            e.stopPropagation()
            setUploadsOpen(!uploadsOpen)
          }}
        >
          {uploadsOpen ? <Minus size={14} /> : <Plus size={14} />}
        </button>
      </div>

      {uploadsOpen && (
        <div className="px-2 pb-1">
          <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-icon-active))] bg-[hsl(var(--sidebar-icon-active-bg))] rounded-md">
            <Upload size={16} className="mr-2 text-[hsl(var(--sidebar-icon-active))]" />
            <span>All Uploads</span>
          </button>

          <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
            <Clock size={16} className="mr-2 text-[hsl(var(--sidebar-icon))]" />
            <span>Recent</span>
          </button>

          <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
            <FileText size={16} className="mr-2 text-[hsl(var(--sidebar-icon))]" />
            <span>Documents</span>
          </button>

          <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
            <MonitorSmartphone size={16} className="mr-2 text-[hsl(var(--sidebar-icon))]" />
            <span>Media</span>
          </button>
        </div>
      )}
    </div>
  )
}

function PreferencesSection() {
  // Implementation remains the same
  const [preferencesOpen, setPreferencesOpen] = useState(true)

  return (
    <div className="border-b border-[hsl(var(--sidebar-border))] transition-colors duration-300">
      <div
        className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-[hsl(var(--secondary))] transition-colors"
        onClick={() => setPreferencesOpen(!preferencesOpen)}
      >
        <h2 className="text-xs font-bold uppercase tracking-wide text-[hsl(var(--sidebar-fg))]">Preferences</h2>
        <button
          className="text-[hsl(var(--sidebar-icon))] p-1 rounded-md hover:bg-[hsl(var(--sidebar-icon-active-bg))] hover:text-[hsl(var(--sidebar-icon-active))]"
          onClick={(e) => {
            e.stopPropagation()
            setPreferencesOpen(!preferencesOpen)
          }}
        >
          {preferencesOpen ? <Minus size={14} /> : <Plus size={14} />}
        </button>
      </div>

      {preferencesOpen && (
        <div className="px-2 pb-1">
          <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-icon-active))] bg-[hsl(var(--sidebar-icon-active-bg))] rounded-md">
            <SettingsIcon size={16} className="mr-2 text-[hsl(var(--sidebar-icon-active))]" />
            <span>Account</span>
          </button>

          <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
            <Users size={16} className="mr-2 text-[hsl(var(--sidebar-icon))]" />
            <span>Team</span>
          </button>

          <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
            <HelpCircle size={16} className="mr-2 text-[hsl(var(--sidebar-icon))]" />
            <span>Help & Support</span>
          </button>
        </div>
      )}
    </div>
  )
}

// Chat Section
function ChatSection() {
  const [directMessagesOpen, setDirectMessagesOpen] = useState(true)
  const [groupChatsOpen, setGroupChatsOpen] = useState(true)
  const [contactsOpen, setContactsOpen] = useState(false)
  const [meetingsOpen, setMeetingsOpen] = useState(false)

  return (
    <>
      <div className="border-b border-[hsl(var(--sidebar-border))] transition-colors duration-300">
        <div className="flex items-center justify-between px-3 py-3">
          <h2 className="text-xs font-bold uppercase tracking-wide text-[hsl(var(--sidebar-fg))]">Chat</h2>
          <div className="flex items-center space-x-1">
            <button className="text-[hsl(var(--sidebar-icon))] p-1 rounded-md hover:bg-[hsl(var(--sidebar-icon-active-bg))] hover:text-[hsl(var(--sidebar-icon-active))]">
              <Plus size={14} />
            </button>
            <button className="text-[hsl(var(--sidebar-icon))] p-1 rounded-md hover:bg-[hsl(var(--sidebar-icon-active-bg))] hover:text-[hsl(var(--sidebar-icon-active))]">
              <Search size={14} />
            </button>
          </div>
        </div>

        <div className="px-2 pb-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search messages..."
              className="w-full h-8 px-8 py-2 text-sm bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] rounded-md focus:outline-none focus:ring-1 focus:ring-[hsl(var(--primary))]"
            />
            <Search
              className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-[hsl(var(--muted-foreground))]"
              size={14}
            />
          </div>
        </div>
      </div>

      {/* Direct Messages Section */}
      <div className="border-b border-[hsl(var(--sidebar-border))] transition-colors duration-300">
        <div
          className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-[hsl(var(--secondary))] transition-colors"
          onClick={() => setDirectMessagesOpen(!directMessagesOpen)}
        >
          <h2 className="text-xs font-bold uppercase tracking-wide text-[hsl(var(--sidebar-fg))]">Direct Messages</h2>
          <button
            className="text-[hsl(var(--sidebar-icon))] p-1 rounded-md hover:bg-[hsl(var(--sidebar-icon-active-bg))] hover:text-[hsl(var(--sidebar-icon-active))]"
            onClick={(e) => {
              e.stopPropagation()
              setDirectMessagesOpen(!directMessagesOpen)
            }}
          >
            {directMessagesOpen ? <Minus size={14} /> : <Plus size={14} />}
          </button>
        </div>

        {directMessagesOpen && (
          <div className="px-2 pb-1">
            <button className="w-full flex items-center justify-between px-2 py-1.5 text-sm text-[hsl(var(--sidebar-icon-active))] bg-[hsl(var(--sidebar-icon-active-bg))] rounded-md">
              <div className="flex items-center">
                <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                  <span className="text-xs font-medium">JD</span>
                </div>
                <span>John Doe</span>
              </div>
              <span className="text-xs bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] px-1.5 py-0.5 rounded-full">
                3
              </span>
            </button>

            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
              <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center mr-2">
                <span className="text-xs font-medium">SJ</span>
              </div>
              <span>Sarah Johnson</span>
            </button>

            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
              <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center mr-2">
                <span className="text-xs font-medium">MB</span>
              </div>
              <span>Michael Brown</span>
            </button>

            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
              <div className="w-7 h-7 rounded-full bg-pink-100 flex items-center justify-center mr-2">
                <span className="text-xs font-medium">EW</span>
              </div>
              <span>Emily Wilson</span>
            </button>

            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
              <div className="w-7 h-7 rounded-full bg-yellow-100 flex items-center justify-center mr-2">
                <span className="text-xs font-medium">RC</span>
              </div>
              <span>Robert Chen</span>
            </button>
          </div>
        )}
      </div>

      {/* Group Chats Section */}
      <div className="border-b border-[hsl(var(--sidebar-border))] transition-colors duration-300">
        <div
          className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-[hsl(var(--secondary))] transition-colors"
          onClick={() => setGroupChatsOpen(!groupChatsOpen)}
        >
          <h2 className="text-xs font-bold uppercase tracking-wide text-[hsl(var(--sidebar-fg))]">Group Chats</h2>
          <button
            className="text-[hsl(var(--sidebar-icon))] p-1 rounded-md hover:bg-[hsl(var(--sidebar-icon-active-bg))] hover:text-[hsl(var(--sidebar-icon-active))]"
            onClick={(e) => {
              e.stopPropagation()
              setGroupChatsOpen(!groupChatsOpen)
            }}
          >
            {groupChatsOpen ? <Minus size={14} /> : <Plus size={14} />}
          </button>
        </div>

        {groupChatsOpen && (
          <div className="px-2 pb-1">
            <button className="w-full flex items-center justify-between px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md transition-colors">
              <div className="flex items-center">
                <div className="w-7 h-7 rounded-md bg-blue-500 flex items-center justify-center mr-2">
                  <Users size={14} className="text-white" />
                </div>
                <span>Marketing Team</span>
              </div>
              <span className="text-xs bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] px-1.5 py-0.5 rounded-full">
                2
              </span>
            </button>

            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
              <div className="w-7 h-7 rounded-md bg-green-500 flex items-center justify-center mr-2">
                <Users size={14} className="text-white" />
              </div>
              <span>Product Development</span>
            </button>

            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
              <div className="w-7 h-7 rounded-md bg-purple-500 flex items-center justify-center mr-2">
                <Users size={14} className="text-white" />
              </div>
              <span>Research Team</span>
            </button>

            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
              <div className="w-7 h-7 rounded-md bg-orange-500 flex items-center justify-center mr-2">
                <Users size={14} className="text-white" />
              </div>
              <span>Sales Department</span>
            </button>
          </div>
        )}
      </div>

      {/* Contacts Section */}
      <div className="border-b border-[hsl(var(--sidebar-border))] transition-colors duration-300">
        <div
          className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-[hsl(var(--secondary))] transition-colors"
          onClick={() => setContactsOpen(!contactsOpen)}
        >
          <h2 className="text-xs font-bold uppercase tracking-wide text-[hsl(var(--sidebar-fg))]">Contacts</h2>
          <button
            className="text-[hsl(var(--sidebar-icon))] p-1 rounded-md hover:bg-[hsl(var(--sidebar-icon-active-bg))] hover:text-[hsl(var(--sidebar-icon-active))]"
            onClick={(e) => {
              e.stopPropagation()
              setContactsOpen(!contactsOpen)
            }}
          >
            {contactsOpen ? <Minus size={14} /> : <Plus size={14} />}
          </button>
        </div>

        {contactsOpen && (
          <div className="px-2 pb-1">
            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md transition-colors">
              <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                <User size={14} className="text-gray-600" />
              </div>
              <span>All Contacts</span>
            </button>

            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
              <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                <Star size={14} className="text-blue-600" />
              </div>
              <span>Favorites</span>
            </button>

            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
              <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center mr-2">
                <Users size={14} className="text-green-600" />
              </div>
              <span>Teams</span>
            </button>
          </div>
        )}
      </div>

      {/* Meetings Section */}
      <div className="border-b border-[hsl(var(--sidebar-border))] transition-colors duration-300">
        <div
          className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-[hsl(var(--secondary))] transition-colors"
          onClick={() => setMeetingsOpen(!meetingsOpen)}
        >
          <h2 className="text-xs font-bold uppercase tracking-wide text-[hsl(var(--sidebar-fg))]">Meetings</h2>
          <button
            className="text-[hsl(var(--sidebar-icon))] p-1 rounded-md hover:bg-[hsl(var(--sidebar-icon-active-bg))] hover:text-[hsl(var(--sidebar-icon-active))]"
            onClick={(e) => {
              e.stopPropagation()
              setMeetingsOpen(!meetingsOpen)
            }}
          >
            {meetingsOpen ? <Minus size={14} /> : <Plus size={14} />}
          </button>
        </div>

        {meetingsOpen && (
          <div className="px-2 pb-1">
            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md transition-colors">
              <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center mr-2">
                <Video size={14} className="text-purple-600" />
              </div>
              <span>New Meeting</span>
            </button>

            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
              <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                <Calendar size={14} className="text-blue-600" />
              </div>
              <span>Scheduled</span>
            </button>

            <button className="w-full flex items-center px-2 py-1.5 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--secondary))] rounded-md mt-0.5 transition-colors">
              <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center mr-2">
                <History size={14} className="text-green-600" />
              </div>
              <span>Recent</span>
            </button>
          </div>
        )}
      </div>

      {/* Status Section */}
      <div className="mt-3 px-3">
        <div className="bg-[hsl(var(--secondary))] rounded-md p-3">
          <div className="flex items-center mb-2">
            <MessageSquare size={16} className="mr-2 text-[hsl(var(--primary))]" />
            <h3 className="text-sm font-medium">Your Status</h3>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-2 relative">
              <span className="text-xs font-medium">JD</span>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[hsl(var(--secondary))]"></span>
            </div>
            <div>
              <p className="text-sm font-medium">Active</p>
              <p className="text-xs text-[hsl(var(--muted-foreground))]">Available for chat</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
