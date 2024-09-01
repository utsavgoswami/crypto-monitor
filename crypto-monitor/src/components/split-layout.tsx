'use client'

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { LiveChart } from "./LiveChart"

export function SplitLayout() {
  return (
    <div className="flex h-screen">
      {/* Left Sidebar (30%) */}
      <div className="w-[30%] border-r">
        <ScrollArea className="h-full">
          <div className="p-4">
            <h2 className="mb-4 text-lg font-semibold">Sidebar Content</h2>
            <p className="mb-4 text-sm text-muted-foreground">
              This sidebar takes up approximately 30% of the screen width.
            </p>
            {/* Add more sidebar content here */}
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="mb-4">
                <h3 className="text-sm font-medium">Item {i + 1}</h3>
                <p className="text-sm text-muted-foreground">
                  Description for item {i + 1}
                </p>
                {i < 19 && <Separator className="mt-4" />}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Content (70%) */}
      <div className="flex-1">
        <ScrollArea className="p-3 h-full">
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