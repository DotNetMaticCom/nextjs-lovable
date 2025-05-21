import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown, ArrowUp, MoreHorizontal } from "lucide-react"

type StatsCardProps = {
  title: string
  value: string | number
  description?: string
  icon?: React.ReactNode
  trend?: {
    value: number
    isPositive: boolean
    text: string
  }
  className?: string
}

export function StatsCard({ title, value, description, icon, trend, className = "" }: StatsCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-[hsl(var(--muted-foreground))]">{title}</CardTitle>
        <div className="flex items-center space-x-1">
          {icon}
          <button className="p-1 rounded-md hover:bg-[hsl(var(--secondary))] transition-colors">
            <MoreHorizontal size={16} className="text-[hsl(var(--muted-foreground))]" />
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <div className="flex items-center mt-1">
            <div className={`flex items-center text-xs ${trend.isPositive ? "text-green-500" : "text-red-500"}`}>
              {trend.isPositive ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
              <span className="ml-1">{trend.value}%</span>
            </div>
            <span className="text-xs text-[hsl(var(--muted-foreground))] ml-2">{trend.text}</span>
          </div>
        )}
        {description && <CardDescription className="mt-2">{description}</CardDescription>}
      </CardContent>
    </Card>
  )
}
