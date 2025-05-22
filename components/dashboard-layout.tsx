"use client"

import { useState } from "react"
import { IconSidebar } from "./icon-sidebar"
import { MainSidebar } from "./main-sidebar"
import { Navbar } from "./navbar"
import { useTheme } from "./theme-provider"
import { ChartCard } from "./chart-card"
import { StatsCard } from "./stats-card"
import { DataTable } from "./data-table"
import {
  BarChart2,
  Users,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Calendar,
  Clock,
  Globe,
  ArrowRight,
} from "lucide-react"

// Define the sidebar menu items and their content
export type SidebarItem = {
  id: string
  label: string
}

// Sample data for charts
const lineChartData = [
  { name: "Jan", visits: 4000, pageViews: 2400, bounceRate: 24 },
  { name: "Feb", visits: 3000, pageViews: 1398, bounceRate: 22 },
  { name: "Mar", visits: 2000, pageViews: 9800, bounceRate: 18 },
  { name: "Apr", visits: 2780, pageViews: 3908, bounceRate: 20 },
  { name: "May", visits: 1890, pageViews: 4800, bounceRate: 21 },
  { name: "Jun", visits: 2390, pageViews: 3800, bounceRate: 25 },
  { name: "Jul", visits: 3490, pageViews: 4300, bounceRate: 19 },
]

const barChartData = [
  { name: "Mon", desktop: 4000, mobile: 2400, tablet: 1800 },
  { name: "Tue", desktop: 3000, mobile: 1398, tablet: 2000 },
  { name: "Wed", desktop: 2000, mobile: 9800, tablet: 2200 },
  { name: "Thu", desktop: 2780, mobile: 3908, tablet: 2000 },
  { name: "Fri", desktop: 1890, mobile: 4800, tablet: 1800 },
  { name: "Sat", desktop: 2390, mobile: 3800, tablet: 1500 },
  { name: "Sun", desktop: 3490, mobile: 4300, tablet: 1200 },
]

const pieChartData = [
  { name: "Desktop", value: 400 },
  { name: "Mobile", value: 300 },
  { name: "Tablet", value: 200 },
  { name: "Other", value: 100 },
]

// Sample data for table
const tableData = [
  {
    id: 1,
    page: "/home",
    visitors: 4500,
    pageViews: 6200,
    bounceRate: "32%",
    avgTime: "2:15",
    lastVisit: "2 hours ago",
  },
  {
    id: 2,
    page: "/products",
    visitors: 3200,
    pageViews: 4800,
    bounceRate: "28%",
    avgTime: "3:42",
    lastVisit: "1 hour ago",
  },
  {
    id: 3,
    page: "/blog",
    visitors: 2800,
    pageViews: 3900,
    bounceRate: "45%",
    avgTime: "1:30",
    lastVisit: "3 hours ago",
  },
  {
    id: 4,
    page: "/contact",
    visitors: 1900,
    pageViews: 2100,
    bounceRate: "60%",
    avgTime: "0:45",
    lastVisit: "5 hours ago",
  },
  {
    id: 5,
    page: "/about",
    visitors: 1500,
    pageViews: 1800,
    bounceRate: "35%",
    avgTime: "2:00",
    lastVisit: "1 day ago",
  },
]

export function DashboardLayout() {
  // State for active sidebar item
  const [activeIcon, setActiveIcon] = useState("home")

  // State for sidebar visibility
  const [sidebarVisible, setSidebarVisible] = useState(true)

  // Get theme context
  const { theme } = useTheme()

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible)
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background transition-colors duration-300">
      <IconSidebar activeIcon={activeIcon} setActiveIcon={setActiveIcon} />

      {/* Main sidebar with transition for collapsing */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          sidebarVisible ? "w-[260px] opacity-100" : "w-0 opacity-0 overflow-hidden"
        }`}
      >
        <MainSidebar activeSection={activeIcon} />
      </div>

      {/* Content area that expands when sidebar collapses */}
      <div className="flex-1 flex flex-col bg-[hsl(var(--content-bg))] relative transition-all duration-300">
        <Navbar toggleSidebar={toggleSidebar} sidebarVisible={sidebarVisible} />
        <div className="flex-1 overflow-y-auto p-6">
          {/* Context area content */}
          <div className="text-xl font-semibold mb-4">
            {activeIcon.charAt(0).toUpperCase() + activeIcon.slice(1)} Dashboard
          </div>

          {activeIcon === "home" ? (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard
                  title="Total Visitors"
                  value="24,532"
                  icon={<Users size={18} className="text-[hsl(var(--primary))]" />}
                  trend={{ value: 12.5, isPositive: true, text: "vs. last month" }}
                />
                <StatsCard
                  title="Page Views"
                  value="98,123"
                  icon={<BarChart2 size={18} className="text-[hsl(var(--primary))]" />}
                  trend={{ value: 8.2, isPositive: true, text: "vs. last month" }}
                />
                <StatsCard
                  title="Conversion Rate"
                  value="3.42%"
                  icon={<ShoppingCart size={18} className="text-[hsl(var(--primary))]" />}
                  trend={{ value: 1.8, isPositive: false, text: "vs. last month" }}
                />
                <StatsCard
                  title="Revenue"
                  value="$12,543"
                  icon={<DollarSign size={18} className="text-[hsl(var(--primary))]" />}
                  trend={{ value: 9.3, isPositive: true, text: "vs. last month" }}
                />
              </div>

              {/* Main Chart */}
              <ChartCard
                title="Website Traffic Overview"
                description="Visitors and page views over time"
                type="line"
                data={lineChartData}
                config={{
                  visits: {
                    label: "Visitors",
                    color: "hsl(var(--chart-1))",
                  },
                  pageViews: {
                    label: "Page Views",
                    color: "hsl(var(--chart-2))",
                  },
                  bounceRate: {
                    label: "Bounce Rate",
                    color: "hsl(var(--chart-3))",
                  },
                }}
                height={300}
              />

              {/* Secondary Charts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ChartCard
                  title="Device Breakdown"
                  description="Traffic by device type"
                  type="bar"
                  data={barChartData}
                  config={{
                    desktop: {
                      label: "Desktop",
                      color: "hsl(var(--chart-1))",
                    },
                    mobile: {
                      label: "Mobile",
                      color: "hsl(var(--chart-2))",
                    },
                    tablet: {
                      label: "Tablet",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                  height={250}
                />
                <ChartCard
                  title="Traffic Sources"
                  description="Visitors by device category"
                  type="pie"
                  data={pieChartData}
                  config={{
                    value: {
                      label: "Visitors",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  height={250}
                />
              </div>

              {/* Data Table */}
              <div>
                <h2 className="text-lg font-medium mb-3">Top Pages</h2>
                <DataTable
                  data={tableData}
                  columns={[
                    { key: "page", header: "Page", sortable: true },
                    { key: "visitors", header: "Visitors", sortable: true },
                    { key: "pageViews", header: "Page Views", sortable: true },
                    { key: "bounceRate", header: "Bounce Rate", sortable: true },
                    { key: "avgTime", header: "Avg. Time", sortable: true },
                    { key: "lastVisit", header: "Last Visit", sortable: true },
                  ]}
                />
              </div>

              {/* Additional Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[hsl(var(--card-bg))] rounded-lg border border-[hsl(var(--card-border))] p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">Recent Activity</h3>
                    <Calendar size={18} className="text-[hsl(var(--primary))]" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-[hsl(var(--primary))] bg-opacity-10 flex items-center justify-center mr-3 mt-1">
                        <Users size={14} className="text-[hsl(var(--primary))]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">New user registration</p>
                        <p className="text-xs text-[hsl(var(--muted-foreground))]">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-[hsl(var(--primary))] bg-opacity-10 flex items-center justify-center mr-3 mt-1">
                        <ShoppingCart size={14} className="text-[hsl(var(--primary))]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">New order placed</p>
                        <p className="text-xs text-[hsl(var(--muted-foreground))]">4 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-[hsl(var(--primary))] bg-opacity-10 flex items-center justify-center mr-3 mt-1">
                        <TrendingUp size={14} className="text-[hsl(var(--primary))]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Traffic spike detected</p>
                        <p className="text-xs text-[hsl(var(--muted-foreground))]">6 hours ago</p>
                      </div>
                    </div>
                  </div>
                  <button className="w-full mt-3 text-xs text-[hsl(var(--primary))] flex items-center justify-center">
                    View all activity <ArrowRight size={12} className="ml-1" />
                  </button>
                </div>

                <div className="bg-[hsl(var(--card-bg))] rounded-lg border border-[hsl(var(--card-border))] p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">Upcoming Events</h3>
                    <Clock size={18} className="text-[hsl(var(--primary))]" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded bg-[hsl(var(--primary))] bg-opacity-10 flex flex-col items-center justify-center mr-3">
                        <span className="text-xs font-bold text-[hsl(var(--primary))]">24</span>
                        <span className="text-xs text-[hsl(var(--primary))]">Jun</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Marketing Campaign Launch</p>
                        <p className="text-xs text-[hsl(var(--muted-foreground))]">9:00 AM - 11:00 AM</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded bg-[hsl(var(--primary))] bg-opacity-10 flex flex-col items-center justify-center mr-3">
                        <span className="text-xs font-bold text-[hsl(var(--primary))]">28</span>
                        <span className="text-xs text-[hsl(var(--primary))]">Jun</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Team Meeting</p>
                        <p className="text-xs text-[hsl(var(--muted-foreground))]">2:00 PM - 3:30 PM</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded bg-[hsl(var(--primary))] bg-opacity-10 flex flex-col items-center justify-center mr-3">
                        <span className="text-xs font-bold text-[hsl(var(--primary))]">02</span>
                        <span className="text-xs text-[hsl(var(--primary))]">Jul</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Product Release</p>
                        <p className="text-xs text-[hsl(var(--muted-foreground))]">All day</p>
                      </div>
                    </div>
                  </div>
                  <button className="w-full mt-3 text-xs text-[hsl(var(--primary))] flex items-center justify-center">
                    View calendar <ArrowRight size={12} className="ml-1" />
                  </button>
                </div>

                <div className="bg-[hsl(var(--card-bg))] rounded-lg border border-[hsl(var(--card-border))] p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">Top Locations</h3>
                    <Globe size={18} className="text-[hsl(var(--primary))]" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-[hsl(var(--primary))] bg-opacity-10 flex items-center justify-center mr-2">
                          <span className="text-xs font-bold text-[hsl(var(--primary))]">1</span>
                        </div>
                        <span className="text-sm">United States</span>
                      </div>
                      <span className="text-sm font-medium">42%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-[hsl(var(--primary))] bg-opacity-10 flex items-center justify-center mr-2">
                          <span className="text-xs font-bold text-[hsl(var(--primary))]">2</span>
                        </div>
                        <span className="text-sm">United Kingdom</span>
                      </div>
                      <span className="text-sm font-medium">18%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-[hsl(var(--primary))] bg-opacity-10 flex items-center justify-center mr-2">
                          <span className="text-xs font-bold text-[hsl(var(--primary))]">3</span>
                        </div>
                        <span className="text-sm">Germany</span>
                      </div>
                      <span className="text-sm font-medium">12%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-[hsl(var(--primary))] bg-opacity-10 flex items-center justify-center mr-2">
                          <span className="text-xs font-bold text-[hsl(var(--primary))]">4</span>
                        </div>
                        <span className="text-sm">Canada</span>
                      </div>
                      <span className="text-sm font-medium">8%</span>
                    </div>
                  </div>
                  <button className="w-full mt-3 text-xs text-[hsl(var(--primary))] flex items-center justify-center">
                    View all locations <ArrowRight size={12} className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  )
}
