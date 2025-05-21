"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, LineChart, PieChart } from "recharts"
import { Bar, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Pie, Cell } from "recharts"
import { Info, MoreHorizontal } from "lucide-react"

type ChartCardProps = {
  title: string
  description?: string
  type: "line" | "bar" | "pie"
  data: any[]
  config: Record<string, { label: string; color: string }>
  className?: string
  height?: number
  showLegend?: boolean
  dataKey?: string
}

export function ChartCard({
  title,
  description,
  type,
  data,
  config,
  className = "",
  height = 300,
  showLegend = true,
  dataKey = "name",
}: ChartCardProps) {
  const renderChart = () => {
    switch (type) {
      case "line":
        return (
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey={dataKey}
              tick={{ fill: "hsl(var(--foreground))" }}
              axisLine={{ stroke: "hsl(var(--border))" }}
            />
            <YAxis tick={{ fill: "hsl(var(--foreground))" }} axisLine={{ stroke: "hsl(var(--border))" }} />
            <ChartTooltip content={<ChartTooltipContent />} />
            {showLegend && <Legend />}
            {Object.entries(config).map(([key, { color }]) => (
              <Line key={key} type="monotone" dataKey={key} stroke={color} activeDot={{ r: 8 }} strokeWidth={2} />
            ))}
          </LineChart>
        )
      case "bar":
        return (
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey={dataKey}
              tick={{ fill: "hsl(var(--foreground))" }}
              axisLine={{ stroke: "hsl(var(--border))" }}
            />
            <YAxis tick={{ fill: "hsl(var(--foreground))" }} axisLine={{ stroke: "hsl(var(--border))" }} />
            <ChartTooltip content={<ChartTooltipContent />} />
            {showLegend && <Legend />}
            {Object.entries(config).map(([key, { color }]) => (
              <Bar key={key} dataKey={key} fill={color} radius={[4, 4, 0, 0]} />
            ))}
          </BarChart>
        )
      case "pie":
        const COLORS = Object.values(config).map((c) => c.color)
        return (
          <PieChart margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <ChartTooltip content={<ChartTooltipContent />} />
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey={Object.keys(config)[0]}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            {showLegend && <Legend />}
          </PieChart>
        )
      default:
        // Return an empty LineChart instead of null to satisfy TypeScript
        return (
          <LineChart data={[]} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" />
            <YAxis />
          </LineChart>
        )
    }
  }

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-base font-medium">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        <div className="flex items-center space-x-1">
          <button className="p-1 rounded-md hover:bg-[hsl(var(--secondary))] transition-colors">
            <Info size={16} className="text-[hsl(var(--muted-foreground))]" />
          </button>
          <button className="p-1 rounded-md hover:bg-[hsl(var(--secondary))] transition-colors">
            <MoreHorizontal size={16} className="text-[hsl(var(--muted-foreground))]" />
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className={`h-[${height}px]`}>
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
