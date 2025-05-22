"use client"

import { useState, useRef, useEffect } from "react"
import {
  Search,
  Phone,
  Video,
  Info,
  MoreHorizontal,
  Paperclip,
  Smile,
  Send,
  Mic,
  ImageIcon,
  File,
  MapPin,
  Calendar,
  Users,
  Check,
  Volume2,
  VolumeX,
  UserPlus,
  PhoneOff,
  PhoneIncoming,
  PhoneOutgoing,
  PhoneMissed,
  MessageSquare,
} from "lucide-react"
import Image from "next/image"

// Message interface
interface Message {
  id: string
  content: string
  sender: {
    id: string
    name: string
    avatar?: string
    initial?: string
    color?: string
    status?: "online" | "offline" | "away" | "busy"
  }
  timestamp: string
  status: "sent" | "delivered" | "read"
  attachments?: {
    type: "image" | "file" | "location" | "audio" | "video"
    url?: string
    name?: string
    size?: string
    thumbnail?: string
    duration?: string
  }[]
  isOwn?: boolean
}

// Contact interface
interface Contact {
  id: string
  name: string
  avatar?: string
  initial?: string
  color?: string
  status: "online" | "offline" | "away" | "busy"
  lastMessage?: string
  lastMessageTime?: string
  unreadCount?: number
  isGroup?: boolean
  members?: number
  isFavorite?: boolean
}

// Call interface
interface Call {
  id: string
  contact: Contact
  type: "incoming" | "outgoing" | "missed" | "rejected"
  callType: "audio" | "video"
  duration?: string
  timestamp: string
}

// Sample contacts data
const contacts: Contact[] = [
  {
    id: "1",
    name: "John Doe",
    initial: "JD",
    color: "bg-blue-100",
    status: "online",
    lastMessage: "Can you send me the report?",
    lastMessageTime: "10:30 AM",
    unreadCount: 3,
    isFavorite: true,
  },
  {
    id: "2",
    name: "Sarah Johnson",
    initial: "SJ",
    color: "bg-green-100",
    status: "online",
    lastMessage: "Meeting at 2 PM",
    lastMessageTime: "Yesterday",
  },
  {
    id: "3",
    name: "Marketing Team",
    initial: "MT",
    color: "bg-purple-100",
    status: "online",
    lastMessage: "New campaign ideas",
    lastMessageTime: "Yesterday",
    isGroup: true,
    members: 8,
    unreadCount: 2,
  },
  {
    id: "4",
    name: "Michael Brown",
    initial: "MB",
    color: "bg-yellow-100",
    status: "away",
    lastMessage: "Let's discuss the project tomorrow",
    lastMessageTime: "Yesterday",
  },
  {
    id: "5",
    name: "Emily Wilson",
    initial: "EW",
    color: "bg-pink-100",
    status: "busy",
    lastMessage: "Thanks for your help!",
    lastMessageTime: "Monday",
    isFavorite: true,
  },
  {
    id: "6",
    name: "Product Development",
    initial: "PD",
    color: "bg-indigo-100",
    status: "online",
    lastMessage: "Sprint planning tomorrow",
    lastMessageTime: "Monday",
    isGroup: true,
    members: 12,
  },
  {
    id: "7",
    name: "Robert Chen",
    initial: "RC",
    color: "bg-red-100",
    status: "offline",
    lastMessage: "I'll check and get back to you",
    lastMessageTime: "Sunday",
  },
  {
    id: "8",
    name: "Lisa Wang",
    initial: "LW",
    color: "bg-orange-100",
    status: "online",
    lastMessage: "The designs look great!",
    lastMessageTime: "Last week",
  },
  {
    id: "9",
    name: "David Kim",
    initial: "DK",
    color: "bg-teal-100",
    status: "offline",
    lastMessage: "Let me know when you're free",
    lastMessageTime: "Last week",
  },
  {
    id: "10",
    name: "Research Team",
    initial: "RT",
    color: "bg-cyan-100",
    status: "online",
    lastMessage: "New research findings",
    lastMessageTime: "Last week",
    isGroup: true,
    members: 5,
  },
]

// Sample messages data for John Doe
const johnDoeMessages: Message[] = [
  {
    id: "1",
    content: "Hi there! How's the quarterly report coming along?",
    sender: {
      id: "1",
      name: "John Doe",
      initial: "JD",
      color: "bg-blue-100",
      status: "online",
    },
    timestamp: "10:15 AM",
    status: "read",
    isOwn: false,
  },
  {
    id: "2",
    content: "I'm almost done with it. Just finalizing the numbers for Q2.",
    sender: {
      id: "current-user",
      name: "Me",
      initial: "ME",
      color: "bg-primary",
      status: "online",
    },
    timestamp: "10:17 AM",
    status: "read",
    isOwn: true,
  },
  {
    id: "3",
    content: "Great! Can you send me what you have so far?",
    sender: {
      id: "1",
      name: "John Doe",
      initial: "JD",
      color: "bg-blue-100",
      status: "online",
    },
    timestamp: "10:19 AM",
    status: "read",
    isOwn: false,
  },
  {
    id: "4",
    content: "Sure, here's the draft report. Let me know if you need any changes.",
    sender: {
      id: "current-user",
      name: "Me",
      initial: "ME",
      color: "bg-primary",
      status: "online",
    },
    timestamp: "10:22 AM",
    status: "read",
    isOwn: true,
    attachments: [
      {
        type: "file",
        name: "Q2_Report_Draft.pdf",
        size: "2.4 MB",
      },
    ],
  },
  {
    id: "5",
    content: "Thanks! I'll review it and get back to you.",
    sender: {
      id: "1",
      name: "John Doe",
      initial: "JD",
      color: "bg-blue-100",
      status: "online",
    },
    timestamp: "10:25 AM",
    status: "read",
    isOwn: false,
  },
  {
    id: "6",
    content: "Also, here's the chart you requested for the presentation.",
    sender: {
      id: "current-user",
      name: "Me",
      initial: "ME",
      color: "bg-primary",
      status: "online",
    },
    timestamp: "10:30 AM",
    status: "delivered",
    isOwn: true,
    attachments: [
      {
        type: "image",
        name: "Q2_Growth_Chart.png",
        size: "1.2 MB",
        thumbnail: "/placeholder.svg?height=200&width=300",
      },
    ],
  },
  {
    id: "7",
    content: "Perfect! This is exactly what I needed. Can we schedule a quick call to discuss the findings?",
    sender: {
      id: "1",
      name: "John Doe",
      initial: "JD",
      color: "bg-blue-100",
      status: "online",
    },
    timestamp: "10:35 AM",
    status: "sent",
    isOwn: false,
  },
  {
    id: "8",
    content: "Sure, I'm available now if you want to jump on a call.",
    sender: {
      id: "current-user",
      name: "Me",
      initial: "ME",
      color: "bg-primary",
      status: "online",
    },
    timestamp: "10:36 AM",
    status: "sent",
    isOwn: true,
  },
  {
    id: "9",
    content: "Great! I'll call you in 5 minutes.",
    sender: {
      id: "1",
      name: "John Doe",
      initial: "JD",
      color: "bg-blue-100",
      status: "online",
    },
    timestamp: "10:37 AM",
    status: "sent",
    isOwn: false,
  },
]

// Sample recent calls
const recentCalls: Call[] = [
  {
    id: "1",
    contact: contacts[0], // John Doe
    type: "incoming",
    callType: "audio",
    duration: "5:23",
    timestamp: "Today, 11:30 AM",
  },
  {
    id: "2",
    contact: contacts[1], // Sarah Johnson
    type: "outgoing",
    callType: "video",
    duration: "12:07",
    timestamp: "Yesterday, 3:45 PM",
  },
  {
    id: "3",
    contact: contacts[3], // Michael Brown
    type: "missed",
    callType: "audio",
    timestamp: "Yesterday, 2:15 PM",
  },
  {
    id: "4",
    contact: contacts[4], // Emily Wilson
    type: "outgoing",
    callType: "audio",
    duration: "3:12",
    timestamp: "Monday, 10:20 AM",
  },
  {
    id: "5",
    contact: contacts[6], // Robert Chen
    type: "rejected",
    callType: "video",
    timestamp: "Sunday, 5:30 PM",
  },
]

// Helper function to get status color
const getStatusColor = (status: Contact["status"]) => {
  switch (status) {
    case "online":
      return "bg-green-500"
    case "away":
      return "bg-yellow-500"
    case "busy":
      return "bg-red-500"
    case "offline":
      return "bg-gray-400"
    default:
      return "bg-gray-400"
  }
}

// Helper function to get call icon
const getCallIcon = (call: Call) => {
  switch (call.type) {
    case "incoming":
      return <PhoneIncoming size={16} className="text-green-500" />
    case "outgoing":
      return <PhoneOutgoing size={16} className="text-blue-500" />
    case "missed":
      return <PhoneMissed size={16} className="text-red-500" />
    case "rejected":
      return <PhoneOff size={16} className="text-red-500" />
    default:
      return <Phone size={16} />
  }
}

export function ChatDashboard() {
  const [activeTab, setActiveTab] = useState<"chats" | "calls" | "contacts">("chats")
  const [selectedContact, setSelectedContact] = useState<Contact | null>(contacts[0]) // Default to John Doe
  const [messages, setMessages] = useState<Message[]>(johnDoeMessages)
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [showAttachMenu, setShowAttachMenu] = useState(false)
  const [isCallActive, setIsCallActive] = useState(false)
  const [callType, setCallType] = useState<"audio" | "video">("audio")

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Filter contacts based on search query
  const filteredContacts = contacts.filter((contact) => contact.name.toLowerCase().includes(searchQuery.toLowerCase()))

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Send a new message
  const sendMessage = () => {
    if (newMessage.trim() === "") return

    const newMsg: Message = {
      id: `new-${Date.now()}`,
      content: newMessage,
      sender: {
        id: "current-user",
        name: "Me",
        initial: "ME",
        color: "bg-primary",
        status: "online",
      },
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "sent",
      isOwn: true,
    }

    setMessages([...messages, newMsg])
    setNewMessage("")
    setShowEmojiPicker(false)
    setShowAttachMenu(false)
  }

  // Handle file attachment
  const handleAttachment = (type: "image" | "file" | "location" | "audio" | "video") => {
    if (type === "image" || type === "file") {
      fileInputRef.current?.click()
    }
    setShowAttachMenu(false)
  }

  // Start a call
  const startCall = (type: "audio" | "video") => {
    setCallType(type)
    setIsCallActive(true)
  }

  // End a call
  const endCall = () => {
    setIsCallActive(false)
  }

  return (
    <div className="flex h-full bg-background">
      {/* Left sidebar */}
      <div className="w-80 border-r border-border h-full flex flex-col">
        {/* Tabs */}
        <div className="flex border-b border-border">
          <button
            className={`flex-1 py-3 text-sm font-medium ${
              activeTab === "chats"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setActiveTab("chats")}
          >
            Chats
          </button>
          <button
            className={`flex-1 py-3 text-sm font-medium ${
              activeTab === "calls"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setActiveTab("calls")}
          >
            Calls
          </button>
          <button
            className={`flex-1 py-3 text-sm font-medium ${
              activeTab === "contacts"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setActiveTab("contacts")}
          >
            Contacts
          </button>
        </div>

        {/* Search */}
        <div className="p-3 border-b border-border">
          <div className="relative">
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 pl-9 pr-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors duration-200 text-sm"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
          </div>
        </div>

        {/* Content based on active tab */}
        <div className="flex-1 overflow-auto">
          {activeTab === "chats" && (
            <div>
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  className={`flex items-center p-3 cursor-pointer hover:bg-secondary/50 transition-colors ${
                    selectedContact?.id === contact.id ? "bg-secondary" : ""
                  }`}
                  onClick={() => setSelectedContact(contact)}
                >
                  <div className="relative">
                    <div
                      className={`w-10 h-10 rounded-full ${
                        contact.color || "bg-gray-200"
                      } flex items-center justify-center mr-3`}
                    >
                      {contact.avatar ? (
                        <Image
                          src={contact.avatar || "/placeholder.svg"}
                          alt={contact.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      ) : contact.isGroup ? (
                        <Users size={18} className="text-foreground" />
                      ) : (
                        <span className="text-sm font-medium">{contact.initial}</span>
                      )}
                    </div>
                    <span
                      className={`absolute bottom-0 right-0 w-3 h-3 ${getStatusColor(
                        contact.status,
                      )} rounded-full border-2 border-background`}
                    ></span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <p className="font-medium truncate">{contact.name}</p>
                      <p className="text-xs text-muted-foreground">{contact.lastMessageTime}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-muted-foreground truncate">{contact.lastMessage}</p>
                      {contact.unreadCount && (
                        <span className="ml-2 bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
                          {contact.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "calls" && (
            <div>
              {recentCalls.map((call) => (
                <div
                  key={call.id}
                  className="flex items-center p-3 cursor-pointer hover:bg-secondary/50 transition-colors"
                >
                  <div className="relative">
                    <div
                      className={`w-10 h-10 rounded-full ${
                        call.contact.color || "bg-gray-200"
                      } flex items-center justify-center mr-3`}
                    >
                      {call.contact.avatar ? (
                        <Image
                          src={call.contact.avatar || "/placeholder.svg"}
                          alt={call.contact.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      ) : (
                        <span className="text-sm font-medium">{call.contact.initial}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <p className="font-medium truncate">{call.contact.name}</p>
                      <p className="text-xs text-muted-foreground">{call.timestamp}</p>
                    </div>
                    <div className="flex items-center">
                      {getCallIcon(call)}
                      <p className="text-sm text-muted-foreground ml-1">
                        {call.callType === "video" ? "Video call" : "Audio call"}
                        {call.duration && ` · ${call.duration}`}
                      </p>
                    </div>
                  </div>
                  <div className="ml-2">
                    <button
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation()
                        startCall(call.callType)
                      }}
                    >
                      {call.callType === "video" ? <Video size={16} /> : <Phone size={16} />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "contacts" && (
            <div>
              <div className="p-3 border-b border-border">
                <button className="w-full flex items-center justify-center p-2 bg-primary text-primary-foreground rounded-md text-sm">
                  <UserPlus size={16} className="mr-2" />
                  Add New Contact
                </button>
              </div>

              <div className="p-2 border-b border-border">
                <h3 className="text-xs font-semibold text-muted-foreground px-2 py-1">FAVORITES</h3>
                {filteredContacts
                  .filter((contact) => contact.isFavorite)
                  .map((contact) => (
                    <div
                      key={contact.id}
                      className="flex items-center p-2 rounded-md cursor-pointer hover:bg-secondary/50 transition-colors"
                    >
                      <div className="relative">
                        <div
                          className={`w-8 h-8 rounded-full ${
                            contact.color || "bg-gray-200"
                          } flex items-center justify-center mr-2`}
                        >
                          {contact.avatar ? (
                            <Image
                              src={contact.avatar || "/placeholder.svg"}
                              alt={contact.name}
                              width={32}
                              height={32}
                              className="rounded-full"
                            />
                          ) : (
                            <span className="text-xs font-medium">{contact.initial}</span>
                          )}
                        </div>
                        <span
                          className={`absolute bottom-0 right-0 w-2 h-2 ${getStatusColor(
                            contact.status,
                          )} rounded-full border-2 border-background`}
                        ></span>
                      </div>
                      <p className="text-sm font-medium">{contact.name}</p>
                    </div>
                  ))}
              </div>

              <div className="p-2">
                <h3 className="text-xs font-semibold text-muted-foreground px-2 py-1">ALL CONTACTS</h3>
                {filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="flex items-center p-2 rounded-md cursor-pointer hover:bg-secondary/50 transition-colors"
                  >
                    <div className="relative">
                      <div
                        className={`w-8 h-8 rounded-full ${
                          contact.color || "bg-gray-200"
                        } flex items-center justify-center mr-2`}
                      >
                        {contact.avatar ? (
                          <Image
                            src={contact.avatar || "/placeholder.svg"}
                            alt={contact.name}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                        ) : contact.isGroup ? (
                          <Users size={14} className="text-foreground" />
                        ) : (
                          <span className="text-xs font-medium">{contact.initial}</span>
                        )}
                      </div>
                      <span
                        className={`absolute bottom-0 right-0 w-2 h-2 ${getStatusColor(
                          contact.status,
                        )} rounded-full border-2 border-background`}
                      ></span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{contact.name}</p>
                      {contact.isGroup && <p className="text-xs text-muted-foreground">{contact.members} members</p>}
                    </div>
                    <div className="flex items-center space-x-1">
                      <button className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-secondary transition-colors">
                        <MessageSquare size={14} />
                      </button>
                      <button className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-secondary transition-colors">
                        <Phone size={14} />
                      </button>
                      <button className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-secondary transition-colors">
                        <Video size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Chat area */}
      {selectedContact ? (
        <div className="flex-1 flex flex-col h-full">
          {/* Chat header */}
          <div className="h-16 border-b border-border flex items-center justify-between px-4">
            <div className="flex items-center">
              <div className="relative">
                <div
                  className={`w-10 h-10 rounded-full ${
                    selectedContact.color || "bg-gray-200"
                  } flex items-center justify-center mr-3`}
                >
                  {selectedContact.avatar ? (
                    <Image
                      src={selectedContact.avatar || "/placeholder.svg"}
                      alt={selectedContact.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  ) : selectedContact.isGroup ? (
                    <Users size={18} className="text-foreground" />
                  ) : (
                    <span className="text-sm font-medium">{selectedContact.initial}</span>
                  )}
                </div>
                <span
                  className={`absolute bottom-0 right-0 w-3 h-3 ${getStatusColor(
                    selectedContact.status,
                  )} rounded-full border-2 border-background`}
                ></span>
              </div>
              <div>
                <h2 className="font-medium">{selectedContact.name}</h2>
                <p className="text-xs text-muted-foreground">
                  {selectedContact.status === "online"
                    ? "Online"
                    : selectedContact.status === "away"
                      ? "Away"
                      : selectedContact.status === "busy"
                        ? "Do not disturb"
                        : "Offline"}
                  {selectedContact.isGroup && ` · ${selectedContact.members} members`}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-secondary transition-colors"
                onClick={() => startCall("audio")}
              >
                <Phone size={18} />
              </button>
              <button
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-secondary transition-colors"
                onClick={() => startCall("video")}
              >
                <Video size={18} />
              </button>
              <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-secondary transition-colors">
                <Info size={18} />
              </button>
              <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-secondary transition-colors">
                <MoreHorizontal size={18} />
              </button>
            </div>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-auto p-4 bg-secondary/20">
            {messages.map((message) => (
              <div key={message.id} className={`flex mb-4 ${message.isOwn ? "justify-end" : "justify-start"}`}>
                {!message.isOwn && (
                  <div className="flex-shrink-0 mr-3">
                    <div
                      className={`w-8 h-8 rounded-full ${
                        message.sender.color || "bg-gray-200"
                      } flex items-center justify-center`}
                    >
                      {message.sender.avatar ? (
                        <Image
                          src={message.sender.avatar || "/placeholder.svg"}
                          alt={message.sender.name}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                      ) : (
                        <span className="text-xs font-medium">{message.sender.initial}</span>
                      )}
                    </div>
                  </div>
                )}
                <div className={`max-w-[70%] ${message.isOwn ? "items-end" : "items-start"}`}>
                  <div
                    className={`rounded-lg p-3 ${
                      message.isOwn ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    {message.attachments && message.attachments.length > 0 && (
                      <div className="mt-2">
                        {message.attachments.map((attachment, index) => (
                          <div key={index} className="mt-1">
                            {attachment.type === "image" && attachment.thumbnail && (
                              <div className="relative">
                                <Image
                                  src={attachment.thumbnail || "/placeholder.svg"}
                                  alt={attachment.name || "Image"}
                                  width={200}
                                  height={150}
                                  className="rounded-md max-w-full"
                                />
                                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                                  {attachment.name}
                                </div>
                              </div>
                            )}
                            {attachment.type === "file" && (
                              <div
                                className={`flex items-center p-2 rounded ${
                                  message.isOwn ? "bg-primary-foreground/10" : "bg-secondary-foreground/10"
                                }`}
                              >
                                <File size={24} className="mr-2" />
                                <div>
                                  <p className="text-xs font-medium">{attachment.name}</p>
                                  <p className="text-xs opacity-70">{attachment.size}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center mt-1">
                    <p className="text-xs text-muted-foreground">{message.timestamp}</p>
                    {message.isOwn && (
                      <div className="ml-1">
                        {message.status === "sent" && <Check size={12} className="text-muted-foreground" />}
                        {message.status === "delivered" && (
                          <div className="flex">
                            <Check size={12} className="text-muted-foreground" />
                            <Check size={12} className="text-muted-foreground -ml-1" />
                          </div>
                        )}
                        {message.status === "read" && (
                          <div className="flex">
                            <Check size={12} className="text-primary" />
                            <Check size={12} className="text-primary -ml-1" />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message input */}
          <div className="border-t border-border p-3">
            <div className="relative flex items-center bg-secondary/30 rounded-lg">
              <button
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setShowAttachMenu(!showAttachMenu)}
              >
                <Paperclip size={20} />
              </button>
              {showAttachMenu && (
                <div className="absolute bottom-full left-0 mb-2 bg-card rounded-lg shadow-lg border border-border p-2 flex space-x-2">
                  <button
                    className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors"
                    onClick={() => handleAttachment("image")}
                  >
                    <ImageIcon size={18} />
                  </button>
                  <button
                    className="p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition-colors"
                    onClick={() => handleAttachment("file")}
                  >
                    <File size={18} />
                  </button>
                  <button
                    className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
                    onClick={() => handleAttachment("location")}
                  >
                    <MapPin size={18} />
                  </button>
                  <button
                    className="p-2 bg-purple-100 text-purple-600 rounded-full hover:bg-purple-200 transition-colors"
                    onClick={() => handleAttachment("audio")}
                  >
                    <Mic size={18} />
                  </button>
                  <button
                    className="p-2 bg-yellow-100 text-yellow-600 rounded-full hover:bg-yellow-200 transition-colors"
                    onClick={() => handleAttachment("video")}
                  >
                    <Video size={18} />
                  </button>
                  <button
                    className="p-2 bg-orange-100 text-orange-600 rounded-full hover:bg-orange-200 transition-colors"
                    onClick={() => handleAttachment("calendar")}
                  >
                    <Calendar size={18} />
                  </button>
                </div>
              )}
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={() => {
                  // Handle file selection
                  console.log("File selected")
                }}
              />
              <input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    sendMessage()
                  }
                }}
                className="flex-1 bg-transparent border-none outline-none px-3 py-2 text-sm"
              />
              <button
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                <Smile size={20} />
              </button>
              {showEmojiPicker && (
                <div className="absolute bottom-full right-0 mb-2 bg-card rounded-lg shadow-lg border border-border p-2">
                  <div className="grid grid-cols-8 gap-1">
                    {[
                      "😊",
                      "😂",
                      "❤️",
                      "👍",
                      "🎉",
                      "🔥",
                      "👏",
                      "😍",
                      "🤔",
                      "😢",
                      "😎",
                      "🙏",
                      "👋",
                      "🥳",
                      "😁",
                      "🤣",
                    ].map((emoji) => (
                      <button
                        key={emoji}
                        className="w-8 h-8 flex items-center justify-center hover:bg-secondary rounded transition-colors"
                        onClick={() => setNewMessage(newMessage + emoji)}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <button
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => {
                  /* Handle voice recording */
                }}
              >
                <Mic size={20} />
              </button>
              <button
                className={`p-2 rounded-r-lg ${
                  newMessage.trim()
                    ? "text-primary hover:text-primary/80"
                    : "text-muted-foreground hover:text-foreground"
                } transition-colors`}
                onClick={sendMessage}
                disabled={newMessage.trim() === ""}
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <MessageSquare size={48} className="mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-medium mb-2">Select a chat to start messaging</h2>
            <p className="text-muted-foreground">Choose a contact from the list to start a conversation</p>
          </div>
        </div>
      )}

      {/* Active call overlay */}
      {isCallActive && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-card rounded-lg shadow-lg border border-border p-6 max-w-md w-full">
            <div className="text-center mb-6">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                {selectedContact?.avatar ? (
                  <Image
                    src={selectedContact.avatar || "/placeholder.svg"}
                    alt={selectedContact.name}
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                ) : (
                  <div
                    className={`w-20 h-20 rounded-full ${
                      selectedContact?.color || "bg-gray-200"
                    } flex items-center justify-center`}
                  >
                    <span className="text-2xl font-medium">{selectedContact?.initial}</span>
                  </div>
                )}
              </div>
              <h2 className="text-xl font-medium">{selectedContact?.name}</h2>
              <p className="text-muted-foreground">
                {callType === "audio" ? "Audio call" : "Video call"} in progress...
              </p>
              <p className="text-sm text-primary mt-1">00:05</p>
            </div>
            <div className="flex justify-center space-x-4">
              <button className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors">
                <VolumeX size={20} />
              </button>
              <button className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors">
                <Volume2 size={20} />
              </button>
              <button className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors">
                <Mic size={20} />
              </button>
              <button
                className="w-12 h-12 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                onClick={endCall}
              >
                <PhoneOff size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
