'use client'

import { ScrollArea } from "@/components/ui/scroll-area"
import { LiveChart } from "./LiveChart"
import { KanbanBoard } from "./kanban-board"
import React from "react"

interface CoinItem {
  id: string
  content: string
}

export interface ColumnData {
  [key: string]: {
    name: string
    items: CoinItem[]
  }
}

export function SplitLayout() {
  const [columns, setColumns] = React.useState<ColumnData>({
    possibleCoins: {
      name: "Possible Coins",
      items: [
        { id: "bitcoin", content: "Bitcoin" },
        { id: "ethereum", content: "Ethereum" },
        { id: "cardano", content: "Cardano" },
      ]
    },
    watchlist: {
      name: "Watchlist",
      items: []
    }
  })
  return (
    <div className="flex h-screen">
      {/* Left Sidebar (30%) */}
      <div className="w-[45%] border-r">
        <ScrollArea className="h-full">
            <KanbanBoard columns={columns} setColumns={setColumns} />
        </ScrollArea>
      </div>

      {/* Main Content (70%) */}
      <div className="flex-1">
        <ScrollArea className="p-3">
          <div className="grid grid-cols-2 gap-2">
            {/* Add your main content here */}
            {
              columns.watchlist.items.map((item) => (
                <LiveChart id={item.id} vsCurrency="usd" days="365" />
              ))
            }
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}