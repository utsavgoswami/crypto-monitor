'use client'

import { ScrollArea } from "@/components/ui/scroll-area"
import { LiveChart } from "./LiveChart"
import { KanbanBoard } from "./kanban-board"

export function SplitLayout() {
  return (
    <div className="flex h-screen">
      {/* Left Sidebar (30%) */}
      <div className="w-[45%] border-r">
        <ScrollArea className="h-full">
            <KanbanBoard />
        </ScrollArea>
      </div>

      {/* Main Content (70%) */}
      <div className="flex-1">
        <ScrollArea className="p-3">
          <div className="grid grid-cols-2 gap-2">
            {/* Add your main content here */}
            <LiveChart id="bitcoin" vsCurrency="usd" days="365" />
            <LiveChart id="ethereum" vsCurrency="usd" days="365" />
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}