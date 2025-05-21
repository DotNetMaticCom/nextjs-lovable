"use client"

import type React from "react"

import { useState } from "react"
import {
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  Download,
  Filter,
  MoreHorizontal,
  Search,
  SlidersHorizontal,
} from "lucide-react"

type DataTableProps<T> = {
  data: T[]
  columns: {
    key: keyof T
    header: string
    sortable?: boolean
    render?: (value: any, row: T) => React.ReactNode
  }[]
  onRowClick?: (row: T) => void
  className?: string
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  onRowClick,
  className = "",
}: DataTableProps<T>) {
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [searchTerm, setSearchTerm] = useState("")

  const handleSort = (column: keyof T) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const getSortIcon = (column: keyof T) => {
    if (sortColumn !== column) return <ChevronsUpDown size={16} className="ml-1 opacity-50" />
    return sortDirection === "asc" ? (
      <ChevronUp size={16} className="ml-1" />
    ) : (
      <ChevronDown size={16} className="ml-1" />
    )
  }

  // Filter data based on search term
  const filteredData = data.filter((row) =>
    Object.values(row).some((value) => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())),
  )

  // Sort data based on sort column and direction
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortColumn) return 0

    const aValue = a[sortColumn]
    const bValue = b[sortColumn]

    if (aValue === bValue) return 0
    if (aValue === null || aValue === undefined) return 1
    if (bValue === null || bValue === undefined) return -1

    const comparison = aValue > bValue ? 1 : -1
    return sortDirection === "asc" ? comparison : -comparison
  })

  return (
    <div className={`bg-[hsl(var(--card-bg))] rounded-lg border border-[hsl(var(--card-border))] ${className}`}>
      <div className="flex items-center justify-between p-4 border-b border-[hsl(var(--card-border))]">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-4 py-2 text-sm rounded-md border border-[hsl(var(--input))] bg-[hsl(var(--background))] w-64 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[hsl(var(--muted-foreground))]"
            size={16}
          />
        </div>
        <div className="flex items-center space-x-2">
          <button className="flex items-center px-3 py-2 text-sm rounded-md border border-[hsl(var(--input))] bg-[hsl(var(--background))] hover:bg-[hsl(var(--secondary))] transition-colors">
            <Filter size={16} className="mr-2" />
            <span>Filter</span>
          </button>
          <button className="flex items-center px-3 py-2 text-sm rounded-md border border-[hsl(var(--input))] bg-[hsl(var(--background))] hover:bg-[hsl(var(--secondary))] transition-colors">
            <SlidersHorizontal size={16} className="mr-2" />
            <span>View</span>
          </button>
          <button className="flex items-center px-3 py-2 text-sm rounded-md border border-[hsl(var(--input))] bg-[hsl(var(--background))] hover:bg-[hsl(var(--secondary))] transition-colors">
            <Download size={16} className="mr-2" />
            <span>Export</span>
          </button>
          <button className="p-2 rounded-md border border-[hsl(var(--input))] bg-[hsl(var(--background))] hover:bg-[hsl(var(--secondary))] transition-colors">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[hsl(var(--card-border))] bg-[hsl(var(--secondary))]">
              {columns.map((column) => (
                <th
                  key={column.key.toString()}
                  className={`px-4 py-3 text-left text-sm font-medium text-[hsl(var(--foreground))] ${
                    column.sortable ? "cursor-pointer select-none" : ""
                  }`}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center">
                    {column.header}
                    {column.sortable && getSortIcon(column.key)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.length > 0 ? (
              sortedData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`border-b border-[hsl(var(--card-border))] ${
                    onRowClick ? "cursor-pointer hover:bg-[hsl(var(--secondary))]" : ""
                  }`}
                  onClick={() => onRowClick && onRowClick(row)}
                >
                  {columns.map((column) => (
                    <td key={column.key.toString()} className="px-4 py-3 text-sm">
                      {column.render ? column.render(row[column.key], row) : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-4 py-6 text-center text-[hsl(var(--muted-foreground))]">
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between px-4 py-3 border-t border-[hsl(var(--card-border))]">
        <div className="text-sm text-[hsl(var(--muted-foreground))]">
          Showing <span className="font-medium text-[hsl(var(--foreground))]">{sortedData.length}</span> of{" "}
          <span className="font-medium text-[hsl(var(--foreground))]">{data.length}</span> results
        </div>
        <div className="flex items-center space-x-2">
          <button
            className="px-3 py-1 text-sm rounded-md border border-[hsl(var(--input))] bg-[hsl(var(--background))] hover:bg-[hsl(var(--secondary))] transition-colors"
            disabled
          >
            Previous
          </button>
          <button className="px-3 py-1 text-sm rounded-md border border-[hsl(var(--input))] bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary))] hover:opacity-90 transition-colors">
            1
          </button>
          <button className="px-3 py-1 text-sm rounded-md border border-[hsl(var(--input))] bg-[hsl(var(--background))] hover:bg-[hsl(var(--secondary))] transition-colors">
            2
          </button>
          <button className="px-3 py-1 text-sm rounded-md border border-[hsl(var(--input))] bg-[hsl(var(--background))] hover:bg-[hsl(var(--secondary))] transition-colors">
            3
          </button>
          <button className="px-3 py-1 text-sm rounded-md border border-[hsl(var(--input))] bg-[hsl(var(--background))] hover:bg-[hsl(var(--secondary))] transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
