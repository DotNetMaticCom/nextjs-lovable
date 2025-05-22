"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"

type TooltipProps = {
  children: React.ReactNode
  content: string
  position?: "top" | "right" | "bottom" | "left"
}

export function Tooltip({ children, content, position = "right" }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-1.5",
    right: "left-full top-1/2 -translate-y-1/2 ml-1.5",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-1.5",
    left: "right-full top-1/2 -translate-y-1/2 mr-1.5",
  }

  // Enhanced arrow classes with improved positioning
  const arrowClasses = {
    top: "bottom-[-4px] left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent rotate-180",
    right:
      "left-[-4px] top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent rotate-90",
    bottom: "top-[-4px] left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent",
    left: "right-[-4px] top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent -rotate-90",
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsVisible(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          ref={tooltipRef}
          className={`absolute z-50 px-2 py-1 text-xs font-medium text-white bg-gray-800 rounded shadow-sm whitespace-nowrap dark:bg-gray-700 ${positionClasses[position]}`}
          role="tooltip"
        >
          {content}
          <div
            className={`absolute w-0 h-0 border-[4px] border-solid border-gray-800 dark:border-gray-700 ${arrowClasses[position]}`}
          ></div>
        </div>
      )}
    </div>
  )
}
