'use client'

import { ScrollArea } from "@/components/ui/scroll-area"
import { LiveChart } from "./LiveChart"
import { KanbanBoard } from "./KanbanBoard"
import React from "react"
import { useAppDispatch } from "@/hooks"
import { clearErrorMessage, setErrorMessage } from "@/store/store"

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
  const dispatch = useAppDispatch();
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
      items: [
      ]
    }
  })

  const handleChartDataFetchFailure = (coinId: string) => {
    const updatedColumns = { ...columns };
    const match = updatedColumns.watchlist.items.find(item => item.id === coinId);

    if (match) {
      updatedColumns.watchlist.items = updatedColumns.watchlist.items.filter(item => item.id !== coinId);
      updatedColumns.possibleCoins.items.push({ id: coinId, content: match.content });
    }
    setColumns(updatedColumns);
    dispatch(setErrorMessage(`Failed to fetch data for ${coinId}`));
    setTimeout(() => {
      dispatch(clearErrorMessage());
    }, 5000);
  }

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
                <LiveChart key={item.id} id={item.id} vsCurrency="usd" days="365" onError={handleChartDataFetchFailure} />
              ))
            }
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}