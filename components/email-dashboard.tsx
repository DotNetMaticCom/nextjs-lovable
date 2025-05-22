"use client"

import type React from "react"

import { useState } from "react"
import {
  Star,
  Trash2,
  Archive,
  AlertTriangle,
  ChevronDown,
  MoreHorizontal,
  RefreshCw,
  Filter,
  CheckSquare,
  Square,
  Flag,
  Mail,
  Paperclip,
  Download,
  Reply,
  Forward,
  Printer,
  ExternalLink,
} from "lucide-react"
import Image from "next/image"

// Email interface
interface Email {
  id: string
  sender: {
    name: string
    email: string
    avatar?: string
    initial?: string
    color?: string
  }
  subject: string
  preview: string
  date: string
  read: boolean
  starred: boolean
  flagged?: boolean
  hasAttachment?: boolean
  category?: "primary" | "social" | "promotions" | "updates"
  labels?: string[]
  content?: React.ReactNode
}

// Sample emails data
const emails: Email[] = [
  {
    id: "1",
    sender: {
      name: "themeforest.net",
      email: "info@themeforest.net",
      initial: "T",
      color: "bg-teal-100",
    },
    subject: "2025's Best WP Themes - Easy To Use",
    preview: "ThemeForest 45,000+ WP Themes ...",
    date: "22:50",
    read: false,
    starred: true,
    category: "promotions",
    content: (
      <div>
        <p className="mb-4">Hello,</p>
        <p className="mb-4">
          Discover our collection of the best WordPress themes for 2025. These themes are designed to be easy to use and
          highly customizable.
        </p>
        <p className="mb-4">
          With over 45,000 WordPress themes available, you'll find the perfect match for your website. Our themes are
          regularly updated and come with excellent support.
        </p>
        <p className="mb-4">
          <strong>Featured Themes:</strong>
        </p>
        <ul className="list-disc pl-5 mb-4">
          <li>Avada - The #1 selling theme of all time</li>
          <li>Enfold - Clean, super flexible and responsive</li>
          <li>BeTheme - Responsive multi-purpose WordPress theme</li>
          <li>Bridge - Creative multi-purpose WordPress theme</li>
        </ul>
        <p>
          Best regards,
          <br />
          ThemeForest Team
        </p>
      </div>
    ),
  },
  {
    id: "2",
    sender: {
      name: "fgseckin@bib-web.com",
      email: "fgseckin@bib-web.com",
      initial: "F",
      color: "bg-pink-100",
    },
    subject: "RE: Entegrasyon Hk.",
    preview: "",
    date: "21:35",
    read: true,
    starred: false,
    category: "primary",
    hasAttachment: true,
    content: (
      <div>
        <p className="mb-4">Merhaba,</p>
        <p className="mb-4">
          Entegrasyon hakkında gönderdiğiniz bilgiler için teşekkür ederiz. Sistem entegrasyonu için gerekli adımları
          başlattık.
        </p>
        <p className="mb-4">
          Ekteki dosyada entegrasyon için gerekli API bilgilerini bulabilirsiniz. Herhangi bir sorunuz olursa lütfen
          bize bildirin.
        </p>
        <p>
          Saygılarımla,
          <br />
          Fatih Seçkin
        </p>
        <div className="mt-4 p-3 bg-secondary rounded-md">
          <div className="flex items-center">
            <Paperclip size={16} className="mr-2" />
            <span className="text-sm font-medium">api-documentation.pdf</span>
            <span className="text-xs text-muted-foreground ml-2">(2.4 MB)</span>
            <Download size={16} className="ml-auto cursor-pointer text-primary" />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "3",
    sender: {
      name: "Serkan Özdogan",
      email: "serkan@example.com",
      initial: "S",
      color: "bg-gray-100",
    },
    subject: "GREENCARD",
    preview: "",
    date: "20:15",
    read: true,
    starred: false,
    flagged: true,
    category: "primary",
    content: (
      <div>
        <p className="mb-4">Hello,</p>
        <p className="mb-4">
          I wanted to inform you about the Green Card application process. The application period is now open and will
          close on November 10, 2025.
        </p>
        <p className="mb-4">
          Please make sure to submit your application before the deadline. Let me know if you need any assistance with
          the application process.
        </p>
        <p>
          Best regards,
          <br />
          Serkan Özdogan
        </p>
      </div>
    ),
  },
  {
    id: "4",
    sender: {
      name: "omer.abay@pankobirlik.com.tr",
      email: "omer.abay@pankobirlik.com.tr",
      initial: "O",
      color: "bg-gray-200",
    },
    subject: "Fwd: Koopbis Entegrasyonu",
    preview: "",
    date: "19:22",
    read: true,
    starred: false,
    category: "updates",
    content: (
      <div>
        <p className="mb-4">Merhaba,</p>
        <p className="mb-4">Size Koopbis entegrasyonu ile ilgili bilgileri iletiyorum.</p>
        <p className="mb-4">
          Entegrasyon sürecinde herhangi bir sorun yaşarsanız lütfen bize bildirin. Teknik ekibimiz size yardımcı
          olacaktır.
        </p>
        <p>
          Saygılarımla,
          <br />
          Ömer Abay
        </p>
      </div>
    ),
  },
  {
    id: "5",
    sender: {
      name: "omer.abay@pankobirlik.com.tr",
      email: "omer.abay@pankobirlik.com.tr",
      initial: "O",
      color: "bg-gray-200",
    },
    subject: "Fwd: KOOPBİS - Panko Birlik Entegrasyonu",
    preview: "",
    date: "18:45",
    read: true,
    starred: false,
    category: "updates",
    hasAttachment: true,
    content: (
      <div>
        <p className="mb-4">Merhaba,</p>
        <p className="mb-4">
          Panko Birlik entegrasyonu için gerekli dokümanları ekte bulabilirsiniz. Entegrasyon sürecinde bu dokümanları
          referans olarak kullanabilirsiniz.
        </p>
        <p>
          Saygılarımla,
          <br />
          Ömer Abay
        </p>
        <div className="mt-4 p-3 bg-secondary rounded-md">
          <div className="flex items-center">
            <Paperclip size={16} className="mr-2" />
            <span className="text-sm font-medium">entegrasyon-dokumani.pdf</span>
            <span className="text-xs text-muted-foreground ml-2">(1.8 MB)</span>
            <Download size={16} className="ml-auto cursor-pointer text-primary" />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "6",
    sender: {
      name: "Fatih Çakıroğlu",
      email: "fatih@example.com",
      initial: "F",
      color: "bg-blue-100",
    },
    subject: "Microservice Eğitim Kayıtları Hk.",
    preview: "",
    date: "17:30",
    read: true,
    starred: false,
    category: "primary",
    content: (
      <div>
        <p className="mb-4">Merhaba,</p>
        <p className="mb-4">
          Microservice eğitim kayıtları tamamlanmıştır. Eğitim 15 Haziran 2025 tarihinde başlayacaktır.
        </p>
        <p className="mb-4">
          Eğitim programı ve materyalleri önümüzdeki hafta e-posta ile gönderilecektir. Herhangi bir sorunuz olursa
          lütfen bize bildirin.
        </p>
        <p>
          Saygılarımla,
          <br />
          Fatih Çakıroğlu
        </p>
      </div>
    ),
  },
  {
    id: "7",
    sender: {
      name: "Fatih Çakıroğlu",
      email: "fatih@example.com",
      initial: "F",
      color: "bg-blue-100",
    },
    subject: "Microservices With Net Eğitimi",
    preview: "",
    date: "16:15",
    read: true,
    starred: false,
    category: "primary",
    content: (
      <div>
        <p className="mb-4">Merhaba,</p>
        <p className="mb-4">
          .NET ile Microservices eğitimi için kayıtlar açılmıştır. Eğitim programı ve içeriği hakkında detaylı bilgiyi
          aşağıda bulabilirsiniz.
        </p>
        <p className="mb-4">
          <strong>Eğitim İçeriği:</strong>
        </p>
        <ul className="list-disc pl-5 mb-4">
          <li>Microservice Mimarisi ve Prensipleri</li>
          <li>Docker ve Containerization</li>
          <li>Kubernetes ile Orchestration</li>
          <li>API Gateway ve Service Discovery</li>
          <li>Event-Driven Architecture</li>
        </ul>
        <p>
          Saygılarımla,
          <br />
          Fatih Çakıroğlu
        </p>
      </div>
    ),
  },
  {
    id: "8",
    sender: {
      name: "Cursor",
      email: "noreply@cursor.com",
      initial: "C",
      color: "bg-gray-200",
    },
    subject: "Sign in to Cursor",
    preview: "Your one-time code is 814770. This ...",
    date: "22:50",
    read: false,
    starred: false,
    category: "updates",
    content: (
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
          <div className="w-10 h-10">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="24" height="24" rx="4" fill="#F3F4F6" />
              <path d="M7 7H17V17H7V7Z" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        <h2 className="text-xl font-bold mb-4">Sign in to Cursor</h2>
        <p className="text-center mb-6">You requested to sign in to Cursor. Your one-time code is:</p>
        <div className="text-3xl font-bold mb-6">814770</div>
        <p className="text-sm text-muted-foreground mb-4">This code expires in 10 minutes.</p>
        <p className="text-sm text-muted-foreground text-center">
          If you didn't request to sign in to Cursor, you can safely ignore this email. Someone else might have typed
          your email address by mistake.
        </p>
      </div>
    ),
  },
  {
    id: "9",
    sender: {
      name: "Cursor",
      email: "noreply@cursor.com",
      initial: "C",
      color: "bg-gray-200",
    },
    subject: "Reset your password",
    preview: "This link expires in 15 minutes. If yo...",
    date: "22:49",
    read: false,
    starred: false,
    category: "updates",
    content: (
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
          <div className="w-10 h-10">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="24" height="24" rx="4" fill="#F3F4F6" />
              <path d="M7 7H17V17H7V7Z" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        <h2 className="text-xl font-bold mb-4">Reset your password</h2>
        <p className="text-center mb-6">You requested to reset your password for your Cursor account.</p>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md mb-6">Reset Password</button>
        <p className="text-sm text-muted-foreground mb-4">This link expires in 15 minutes.</p>
        <p className="text-sm text-muted-foreground text-center">
          If you didn't request a password reset, you can safely ignore this email. Someone else might have typed your
          email address by mistake.
        </p>
      </div>
    ),
  },
  {
    id: "10",
    sender: {
      name: "Cloudflare",
      email: "no-reply@cloudflare.com",
      initial: "C",
      color: "bg-teal-100",
    },
    subject: "Your April Cloudflare Summary",
    preview: "85.51 GB of data transferred from 3...",
    date: "22:00",
    read: false,
    starred: false,
    category: "updates",
    content: (
      <div>
        <p className="mb-4">Hello,</p>
        <p className="mb-4">Here's your Cloudflare usage summary for April 2025:</p>
        <div className="bg-secondary p-4 rounded-md mb-4">
          <h3 className="font-medium mb-2">Usage Statistics</h3>
          <ul className="space-y-2">
            <li>
              <span className="font-medium">Data Transfer:</span> 85.51 GB
            </li>
            <li>
              <span className="font-medium">Requests:</span> 1.2M
            </li>
            <li>
              <span className="font-medium">Threats Blocked:</span> 12,345
            </li>
          </ul>
        </div>
        <p className="mb-4">
          Your website performance has improved by 15% compared to last month. We've also blocked 12,345 threats,
          ensuring your website remains secure.
        </p>
        <p>
          Best regards,
          <br />
          The Cloudflare Team
        </p>
      </div>
    ),
  },
]

export function EmailDashboard() {
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(emails[7]) // Default to the Cursor email
  const [selectedEmails, setSelectedEmails] = useState<string[]>([])

  const toggleSelectEmail = (id: string) => {
    if (selectedEmails.includes(id)) {
      setSelectedEmails(selectedEmails.filter((emailId) => emailId !== id))
    } else {
      setSelectedEmails([...selectedEmails, id])
    }
  }

  const selectAllEmails = () => {
    if (selectedEmails.length === emails.length) {
      setSelectedEmails([])
    } else {
      setSelectedEmails(emails.map((email) => email.id))
    }
  }

  const toggleStarEmail = (id: string, event: React.MouseEvent) => {
    event.stopPropagation()
    // In a real app, this would update the starred status in the database
    console.log(`Toggle star for email ${id}`)
  }

  return (
    <div className="flex h-full bg-background">
      {/* Email list sidebar */}
      <div className="w-full md:w-[400px] border-r border-border h-full flex flex-col">
        {/* Email toolbar */}
        <div className="p-2 border-b border-border flex items-center justify-between">
          <div className="flex items-center">
            <button
              className="p-1.5 rounded-md hover:bg-secondary transition-colors"
              onClick={selectAllEmails}
              title={selectedEmails.length === emails.length ? "Deselect all" : "Select all"}
            >
              {selectedEmails.length === emails.length ? (
                <CheckSquare size={18} className="text-primary" />
              ) : (
                <Square size={18} />
              )}
            </button>
            <button className="p-1.5 rounded-md hover:bg-secondary transition-colors ml-1" title="Refresh">
              <RefreshCw size={18} />
            </button>
            <button className="p-1.5 rounded-md hover:bg-secondary transition-colors ml-1" title="Filter">
              <Filter size={18} />
            </button>
          </div>
          <div className="flex items-center">
            <span className="text-xs text-muted-foreground mr-2">1-10 of 235</span>
            <button className="p-1.5 rounded-md hover:bg-secondary transition-colors" title="More options">
              <MoreHorizontal size={18} />
            </button>
          </div>
        </div>

        {/* Email categories */}
        <div className="flex border-b border-border">
          <button className="flex-1 py-2 text-sm font-medium text-primary border-b-2 border-primary">Primary</button>
          <button className="flex-1 py-2 text-sm font-medium text-muted-foreground">Social</button>
          <button className="flex-1 py-2 text-sm font-medium text-muted-foreground">Promotions</button>
          <button className="flex-1 py-2 text-sm font-medium text-muted-foreground">Updates</button>
        </div>

        {/* Email list */}
        <div className="flex-1 overflow-auto">
          {emails.map((email) => (
            <div
              key={email.id}
              className={`flex border-b border-border p-2 cursor-pointer ${
                selectedEmail?.id === email.id ? "bg-secondary" : email.read ? "" : "bg-secondary/30"
              } hover:bg-secondary transition-colors`}
              onClick={() => setSelectedEmail(email)}
            >
              <div className="flex items-center mr-2">
                <button
                  className="p-1 rounded-md hover:bg-secondary transition-colors"
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleSelectEmail(email.id)
                  }}
                >
                  {selectedEmails.includes(email.id) ? (
                    <CheckSquare size={16} className="text-primary" />
                  ) : (
                    <Square size={16} />
                  )}
                </button>
                <button
                  className="p-1 rounded-md hover:bg-secondary transition-colors"
                  onClick={(e) => toggleStarEmail(email.id, e)}
                >
                  <Star
                    size={16}
                    className={email.starred ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}
                  />
                </button>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full ${email.sender.color || "bg-gray-200"} flex items-center justify-center mr-2`}
                  >
                    {email.sender.avatar ? (
                      <Image
                        src={email.sender.avatar || "/placeholder.svg"}
                        alt={email.sender.name}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    ) : (
                      <span className="text-sm font-medium">{email.sender.initial}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <p className={`text-sm truncate ${!email.read && "font-medium"}`}>{email.sender.name}</p>
                      <p className="text-xs text-muted-foreground ml-2 whitespace-nowrap">{email.date}</p>
                    </div>
                    <p className={`text-sm truncate ${!email.read && "font-medium"}`}>{email.subject}</p>
                    <p className="text-xs text-muted-foreground truncate">{email.preview}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center ml-2">
                {email.flagged && <Flag size={14} className="text-red-500 mb-1" />}
                {email.hasAttachment && <Paperclip size={14} className="text-muted-foreground" />}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Email content */}
      {selectedEmail ? (
        <div className="hidden md:flex flex-1 flex-col h-full overflow-auto">
          {/* Email header */}
          <div className="p-4 border-b border-border">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-medium">{selectedEmail.subject}</h2>
              <div className="flex items-center">
                <button className="p-1.5 rounded-md hover:bg-secondary transition-colors" title="Archive">
                  <Archive size={18} />
                </button>
                <button className="p-1.5 rounded-md hover:bg-secondary transition-colors ml-1" title="Delete">
                  <Trash2 size={18} />
                </button>
                <button className="p-1.5 rounded-md hover:bg-secondary transition-colors ml-1" title="Mark as spam">
                  <AlertTriangle size={18} />
                </button>
                <button className="p-1.5 rounded-md hover:bg-secondary transition-colors ml-1" title="More options">
                  <MoreHorizontal size={18} />
                </button>
              </div>
            </div>
            <div className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full ${
                  selectedEmail.sender.color || "bg-gray-200"
                } flex items-center justify-center mr-3`}
              >
                {selectedEmail.sender.avatar ? (
                  <Image
                    src={selectedEmail.sender.avatar || "/placeholder.svg"}
                    alt={selectedEmail.sender.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                ) : (
                  <span className="text-sm font-medium">{selectedEmail.sender.initial}</span>
                )}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{selectedEmail.sender.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedEmail.sender.email}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">{selectedEmail.date}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Email body */}
          <div className="flex-1 p-6 overflow-auto">{selectedEmail.content}</div>

          {/* Email actions */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center">
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md flex items-center">
                <Reply size={16} className="mr-2" />
                Reply
              </button>
              <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md flex items-center ml-2">
                <Forward size={16} className="mr-2" />
                Forward
              </button>
              <div className="ml-auto flex items-center">
                <button className="p-1.5 rounded-md hover:bg-secondary transition-colors" title="Print">
                  <Printer size={18} />
                </button>
                <button
                  className="p-1.5 rounded-md hover:bg-secondary transition-colors ml-1"
                  title="Open in new window"
                >
                  <ExternalLink size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden md:flex flex-1 items-center justify-center">
          <div className="text-center">
            <Mail size={48} className="mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-medium mb-2">Select an email to read</h2>
            <p className="text-muted-foreground">Choose an email from the list to view its contents</p>
          </div>
        </div>
      )}

      {/* Mobile view - when email is selected */}
      {selectedEmail && (
        <div className="fixed inset-0 bg-background z-50 md:hidden flex flex-col">
          <div className="p-4 border-b border-border flex items-center">
            <button
              className="p-1.5 rounded-md hover:bg-secondary transition-colors mr-2"
              onClick={() => setSelectedEmail(null)}
            >
              <ChevronDown size={18} />
            </button>
            <div className="flex-1">
              <h2 className="font-medium truncate">{selectedEmail.subject}</h2>
            </div>
            <div className="flex items-center">
              <button className="p-1.5 rounded-md hover:bg-secondary transition-colors" title="Archive">
                <Archive size={18} />
              </button>
              <button className="p-1.5 rounded-md hover:bg-secondary transition-colors ml-1" title="Delete">
                <Trash2 size={18} />
              </button>
              <button className="p-1.5 rounded-md hover:bg-secondary transition-colors ml-1" title="More options">
                <MoreHorizontal size={18} />
              </button>
            </div>
          </div>
          <div className="p-4 border-b border-border">
            <div className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full ${
                  selectedEmail.sender.color || "bg-gray-200"
                } flex items-center justify-center mr-3`}
              >
                {selectedEmail.sender.avatar ? (
                  <Image
                    src={selectedEmail.sender.avatar || "/placeholder.svg"}
                    alt={selectedEmail.sender.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                ) : (
                  <span className="text-sm font-medium">{selectedEmail.sender.initial}</span>
                )}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{selectedEmail.sender.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedEmail.sender.email}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">{selectedEmail.date}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 p-4 overflow-auto">{selectedEmail.content}</div>
          <div className="p-4 border-t border-border">
            <div className="flex items-center">
              <button className="flex-1 py-2 bg-primary text-primary-foreground rounded-md flex items-center justify-center">
                <Reply size={16} className="mr-2" />
                Reply
              </button>
              <button className="flex-1 py-2 bg-secondary text-secondary-foreground rounded-md flex items-center justify-center ml-2">
                <Forward size={16} className="mr-2" />
                Forward
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
