"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SheetProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

interface SheetContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: "top" | "right" | "bottom" | "left"
  children: React.ReactNode
}

const Sheet: React.FC<SheetProps> & {
  Content: React.FC<SheetContentProps>
} = ({ open, onOpenChange, children }) => {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => onOpenChange?.(false)}
      />
      {children}
    </div>
  )
}

const SheetContent: React.FC<SheetContentProps> = ({ 
  side = "right", 
  className, 
  children, 
  ...props 
}) => {
  const sideClasses = {
    top: "inset-x-0 top-0 border-b",
    bottom: "inset-x-0 bottom-0 border-t",
    left: "inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
    right: "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm"
  }

  return (
    <div
      className={cn(
        "fixed z-50 bg-white dark:bg-gray-900 p-6 shadow-lg transition-all duration-300",
        sideClasses[side],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

Sheet.Content = SheetContent

export { Sheet, SheetContent }
