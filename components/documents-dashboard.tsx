"use client"

import type React from "react"

import { useState } from "react"
import {
  Search,
  Plus,
  Filter,
  SortAsc,
  Grid,
  List,
  MoreHorizontal,
  Folder,
  FileText,
  FileIcon as FilePdf,
  FileImage,
  FileSpreadsheet,
  FileIcon as FilePresentation,
  Clock,
  Download,
  Share2,
  Star,
  StarOff,
  Trash2,
  Copy,
  Edit,
  Users,
  Lock,
  Eye,
  CheckCircle,
  AlertCircle,
  GitBranch,
  GitPullRequest,
} from "lucide-react"
import Image from "next/image"

// Document interface
interface Document {
  id: string
  name: string
  type: "folder" | "document" | "spreadsheet" | "presentation" | "pdf" | "image"
  size?: string
  modified: string
  modifiedBy?: {
    name: string
    avatar?: string
    initial?: string
    color?: string
  }
  shared?: number
  status?: "approved" | "pending" | "rejected" | "draft"
  starred?: boolean
  tags?: string[]
}

// Sample documents data
const documents: Document[] = [
  {
    id: "folder-1",
    name: "Marketing Campaign",
    type: "folder",
    modified: "Today, 10:30 AM",
    modifiedBy: {
      name: "John Doe",
      initial: "J",
      color: "bg-blue-100",
    },
    shared: 5,
    starred: true,
  },
  {
    id: "folder-2",
    name: "Product Development",
    type: "folder",
    modified: "Yesterday, 3:45 PM",
    modifiedBy: {
      name: "Sarah Johnson",
      initial: "S",
      color: "bg-green-100",
    },
    shared: 8,
  },
  {
    id: "folder-3",
    name: "Research & Analysis",
    type: "folder",
    modified: "May 20, 2025",
    modifiedBy: {
      name: "Michael Brown",
      initial: "M",
      color: "bg-purple-100",
    },
    shared: 3,
  },
  {
    id: "doc-1",
    name: "Q2 Marketing Strategy.docx",
    type: "document",
    size: "2.4 MB",
    modified: "Today, 9:15 AM",
    modifiedBy: {
      name: "John Doe",
      initial: "J",
      color: "bg-blue-100",
    },
    status: "approved",
    starred: true,
    tags: ["marketing", "strategy"],
  },
  {
    id: "doc-2",
    name: "Product Roadmap 2025.docx",
    type: "document",
    size: "1.8 MB",
    modified: "Yesterday, 2:30 PM",
    modifiedBy: {
      name: "Emily Wilson",
      initial: "E",
      color: "bg-pink-100",
    },
    status: "pending",
    tags: ["product", "roadmap"],
  },
  {
    id: "sheet-1",
    name: "Budget Analysis.xlsx",
    type: "spreadsheet",
    size: "3.2 MB",
    modified: "May 21, 2025",
    modifiedBy: {
      name: "Robert Chen",
      initial: "R",
      color: "bg-yellow-100",
    },
    status: "approved",
    tags: ["finance", "budget"],
  },
  {
    id: "pres-1",
    name: "Investor Presentation.pptx",
    type: "presentation",
    size: "5.7 MB",
    modified: "May 19, 2025",
    modifiedBy: {
      name: "Sarah Johnson",
      initial: "S",
      color: "bg-green-100",
    },
    status: "approved",
    shared: 12,
    starred: true,
    tags: ["investors", "presentation"],
  },
  {
    id: "pdf-1",
    name: "Legal Contract.pdf",
    type: "pdf",
    size: "1.2 MB",
    modified: "May 18, 2025",
    modifiedBy: {
      name: "David Kim",
      initial: "D",
      color: "bg-red-100",
    },
    status: "approved",
    tags: ["legal", "contract"],
  },
  {
    id: "img-1",
    name: "Product Mockup.png",
    type: "image",
    size: "4.5 MB",
    modified: "May 17, 2025",
    modifiedBy: {
      name: "Lisa Wang",
      initial: "L",
      color: "bg-orange-100",
    },
    tags: ["design", "mockup"],
  },
  {
    id: "doc-3",
    name: "Meeting Notes.docx",
    type: "document",
    size: "0.8 MB",
    modified: "May 16, 2025",
    modifiedBy: {
      name: "Michael Brown",
      initial: "M",
      color: "bg-purple-100",
    },
    status: "draft",
    tags: ["meeting", "notes"],
  },
  {
    id: "sheet-2",
    name: "Sales Report.xlsx",
    type: "spreadsheet",
    size: "2.1 MB",
    modified: "May 15, 2025",
    modifiedBy: {
      name: "John Doe",
      initial: "J",
      color: "bg-blue-100",
    },
    status: "approved",
    tags: ["sales", "report"],
  },
]

// Helper function to get icon for document type
const getDocumentIcon = (type: Document["type"], className = "") => {
  switch (type) {
    case "folder":
      return <Folder className={className} />
    case "document":
      return <FileText className={className} />
    case "spreadsheet":
      return <FileSpreadsheet className={className} />
    case "presentation":
      return <FilePresentation className={className} />
    case "pdf":
      return <FilePdf className={className} />
    case "image":
      return <FileImage className={className} />
    default:
      return <FileText className={className} />
  }
}

// Helper function to get color for document status
const getStatusColor = (status?: Document["status"]) => {
  switch (status) {
    case "approved":
      return "text-green-500"
    case "pending":
      return "text-yellow-500"
    case "rejected":
      return "text-red-500"
    case "draft":
      return "text-gray-500"
    default:
      return ""
  }
}

// Helper function to get icon for document status
const getStatusIcon = (status?: Document["status"], className = "") => {
  switch (status) {
    case "approved":
      return <CheckCircle className={`${className} ${getStatusColor(status)}`} />
    case "pending":
      return <GitPullRequest className={`${className} ${getStatusColor(status)}`} />
    case "rejected":
      return <AlertCircle className={`${className} ${getStatusColor(status)}`} />
    case "draft":
      return <GitBranch className={`${className} ${getStatusColor(status)}`} />
    default:
      return null
  }
}

export function DocumentsDashboard() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<"name" | "modified" | "size">("modified")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  // Filter documents based on search query
  const filteredDocuments = documents.filter((doc) => doc.name.toLowerCase().includes(searchQuery.toLowerCase()))

  // Sort documents
  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    if (sortBy === "name") {
      return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    } else if (sortBy === "modified") {
      return sortOrder === "asc"
        ? new Date(a.modified).getTime() - new Date(b.modified).getTime()
        : new Date(b.modified).getTime() - new Date(a.modified).getTime()
    } else if (sortBy === "size" && a.size && b.size) {
      const sizeA = Number.parseFloat(a.size.split(" ")[0])
      const sizeB = Number.parseFloat(b.size.split(" ")[0])
      return sortOrder === "asc" ? sizeA - sizeB : sizeB - sizeA
    }
    return 0
  })

  // Toggle document selection
  const toggleSelectDocument = (id: string) => {
    if (selectedDocuments.includes(id)) {
      setSelectedDocuments(selectedDocuments.filter((docId) => docId !== id))
    } else {
      setSelectedDocuments([...selectedDocuments, id])
    }
  }

  // Select all documents
  const selectAllDocuments = () => {
    if (selectedDocuments.length === documents.length) {
      setSelectedDocuments([])
    } else {
      setSelectedDocuments(documents.map((doc) => doc.id))
    }
  }

  // Toggle star for a document
  const toggleStar = (id: string, event: React.MouseEvent) => {
    event.stopPropagation()
    // In a real app, this would update the starred status in the database
    console.log(`Toggle star for document ${id}`)
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Document toolbar */}
      <div className="p-4 border-b border-border flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Documents</h1>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md flex items-center">
              <Plus size={16} className="mr-2" />
              New
            </button>
            <button className="p-2 rounded-md hover:bg-secondary transition-colors">
              <MoreHorizontal size={20} />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors duration-200"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          </div>
          <button className="flex items-center px-3 py-2 rounded-md border border-input hover:bg-secondary transition-colors">
            <Filter size={16} className="mr-2" />
            Filter
          </button>
          <button
            className="flex items-center px-3 py-2 rounded-md border border-input hover:bg-secondary transition-colors"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          >
            <SortAsc size={16} className="mr-2" />
            Sort: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)} {sortOrder === "asc" ? "↑" : "↓"}
          </button>
          <div className="flex items-center border border-input rounded-md overflow-hidden">
            <button
              className={`p-2 ${viewMode === "grid" ? "bg-secondary" : "hover:bg-secondary"} transition-colors`}
              onClick={() => setViewMode("grid")}
              title="Grid view"
            >
              <Grid size={18} />
            </button>
            <button
              className={`p-2 ${viewMode === "list" ? "bg-secondary" : "hover:bg-secondary"} transition-colors`}
              onClick={() => setViewMode("list")}
              title="List view"
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Document list */}
      <div className="flex-1 overflow-auto p-4">
        {viewMode === "list" ? (
          <div className="bg-card rounded-lg border border-border overflow-hidden">
            <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 p-3 border-b border-border bg-secondary/50">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedDocuments.length === documents.length}
                  onChange={selectAllDocuments}
                  className="rounded border-input h-4 w-4"
                />
              </div>
              <div
                className="flex items-center cursor-pointer"
                onClick={() => {
                  setSortBy("name")
                  setSortOrder(sortBy === "name" && sortOrder === "asc" ? "desc" : "asc")
                }}
              >
                <span className="font-medium">Name</span>
                {sortBy === "name" && <span className="ml-1">{sortOrder === "asc" ? "↑" : "↓"}</span>}
              </div>
              <div
                className="flex items-center cursor-pointer"
                onClick={() => {
                  setSortBy("modified")
                  setSortOrder(sortBy === "modified" && sortOrder === "asc" ? "desc" : "asc")
                }}
              >
                <span className="font-medium">Modified</span>
                {sortBy === "modified" && <span className="ml-1">{sortOrder === "asc" ? "↑" : "↓"}</span>}
              </div>
              <div
                className="flex items-center cursor-pointer"
                onClick={() => {
                  setSortBy("size")
                  setSortOrder(sortBy === "size" && sortOrder === "asc" ? "desc" : "asc")
                }}
              >
                <span className="font-medium">Size</span>
                {sortBy === "size" && <span className="ml-1">{sortOrder === "asc" ? "↑" : "↓"}</span>}
              </div>
              <div className="flex items-center">
                <span className="font-medium">Actions</span>
              </div>
            </div>

            {sortedDocuments.map((doc) => (
              <div
                key={doc.id}
                className={`grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 p-3 border-b border-border hover:bg-secondary/30 transition-colors ${
                  selectedDocuments.includes(doc.id) ? "bg-secondary/50" : ""
                }`}
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedDocuments.includes(doc.id)}
                    onChange={() => toggleSelectDocument(doc.id)}
                    className="rounded border-input h-4 w-4"
                  />
                </div>
                <div className="flex items-center min-w-0">
                  <div className="flex items-center justify-center w-10 h-10 rounded-md bg-secondary mr-3">
                    {getDocumentIcon(doc.type, "size-5 text-primary")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center">
                      <p className="font-medium truncate">{doc.name}</p>
                      {doc.status && (
                        <div className="ml-2" title={doc.status}>
                          {getStatusIcon(doc.status, "size-4")}
                        </div>
                      )}
                      {doc.starred && (
                        <Star
                          size={16}
                          className="ml-2 text-yellow-400 fill-yellow-400"
                          onClick={(e) => toggleStar(doc.id, e)}
                        />
                      )}
                    </div>
                    {doc.tags && doc.tags.length > 0 && (
                      <div className="flex items-center mt-1">
                        {doc.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-secondary px-1.5 py-0.5 rounded mr-1 text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center text-sm text-muted-foreground whitespace-nowrap">
                  <Clock size={14} className="mr-1" />
                  {doc.modified}
                  {doc.modifiedBy && (
                    <div className="flex items-center ml-2">
                      <div
                        className={`w-5 h-5 rounded-full ${
                          doc.modifiedBy.color || "bg-gray-200"
                        } flex items-center justify-center`}
                      >
                        {doc.modifiedBy.avatar ? (
                          <Image
                            src={doc.modifiedBy.avatar || "/placeholder.svg"}
                            alt={doc.modifiedBy.name}
                            width={20}
                            height={20}
                            className="rounded-full"
                          />
                        ) : (
                          <span className="text-xs">{doc.modifiedBy.initial}</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  {doc.size || (doc.type === "folder" ? "--" : "0 KB")}
                </div>
                <div className="flex items-center">
                  <button className="p-1.5 rounded-md hover:bg-secondary transition-colors" title="Download">
                    <Download size={16} />
                  </button>
                  <button className="p-1.5 rounded-md hover:bg-secondary transition-colors" title="Share">
                    <Share2 size={16} />
                  </button>
                  <button className="p-1.5 rounded-md hover:bg-secondary transition-colors" title="More">
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {sortedDocuments.map((doc) => (
              <div
                key={doc.id}
                className={`bg-card rounded-lg border border-border overflow-hidden hover:shadow-md transition-shadow ${
                  selectedDocuments.includes(doc.id) ? "ring-2 ring-primary" : ""
                }`}
              >
                <div className="relative">
                  <div className="absolute top-2 left-2">
                    <input
                      type="checkbox"
                      checked={selectedDocuments.includes(doc.id)}
                      onChange={() => toggleSelectDocument(doc.id)}
                      className="rounded border-input h-4 w-4"
                    />
                  </div>
                  <div className="absolute top-2 right-2">
                    {doc.starred ? (
                      <button
                        className="p-1 rounded-full bg-background/80 hover:bg-background transition-colors"
                        onClick={(e) => toggleStar(doc.id, e)}
                      >
                        <Star size={16} className="text-yellow-400 fill-yellow-400" />
                      </button>
                    ) : (
                      <button
                        className="p-1 rounded-full bg-background/80 hover:bg-background transition-colors"
                        onClick={(e) => toggleStar(doc.id, e)}
                      >
                        <StarOff size={16} />
                      </button>
                    )}
                  </div>
                  <div className="h-32 flex items-center justify-center bg-secondary/50">
                    {getDocumentIcon(doc.type, "size-16 text-primary")}
                  </div>
                </div>
                <div className="p-3">
                  <div className="flex items-center mb-2">
                    <p className="font-medium truncate flex-1">{doc.name}</p>
                    {doc.status && (
                      <div className="ml-1" title={doc.status}>
                        {getStatusIcon(doc.status, "size-4")}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <Clock size={12} className="mr-1" />
                      {doc.modified.split(",")[0]}
                    </div>
                    {doc.shared && (
                      <div className="flex items-center">
                        <Users size={12} className="mr-1" />
                        {doc.shared}
                      </div>
                    )}
                    {!doc.shared && doc.type !== "folder" && (
                      <div className="flex items-center">
                        <Lock size={12} className="mr-1" />
                        Private
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex border-t border-border">
                  <button className="flex-1 p-2 text-xs hover:bg-secondary transition-colors flex items-center justify-center">
                    <Eye size={14} className="mr-1" />
                    View
                  </button>
                  <button className="flex-1 p-2 text-xs hover:bg-secondary transition-colors flex items-center justify-center border-l border-border">
                    <Share2 size={14} className="mr-1" />
                    Share
                  </button>
                  <button className="flex-1 p-2 text-xs hover:bg-secondary transition-colors flex items-center justify-center border-l border-border">
                    <MoreHorizontal size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Selection actions */}
      {selectedDocuments.length > 0 && (
        <div className="p-4 border-t border-border bg-card">
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <span className="font-medium">{selectedDocuments.length}</span> item
              {selectedDocuments.length !== 1 && "s"} selected
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 rounded-md hover:bg-secondary transition-colors flex items-center text-sm">
                <Download size={16} className="mr-1.5" />
                Download
              </button>
              <button className="px-3 py-1.5 rounded-md hover:bg-secondary transition-colors flex items-center text-sm">
                <Share2 size={16} className="mr-1.5" />
                Share
              </button>
              <button className="px-3 py-1.5 rounded-md hover:bg-secondary transition-colors flex items-center text-sm">
                <Copy size={16} className="mr-1.5" />
                Copy
              </button>
              <button className="px-3 py-1.5 rounded-md hover:bg-secondary transition-colors flex items-center text-sm">
                <Edit size={16} className="mr-1.5" />
                Rename
              </button>
              <button className="px-3 py-1.5 rounded-md hover:bg-secondary transition-colors flex items-center text-sm text-red-500">
                <Trash2 size={16} className="mr-1.5" />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
