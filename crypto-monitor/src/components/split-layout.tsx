'use client'

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

export function SplitLayout() {
  return (
    <div className="flex h-screen">
      {/* Left Sidebar (30%) */}
      <div className="w-[30%] border-r">
        <ScrollArea className="h-full">
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Sidebar Content</h2>
            <p className="text-sm text-muted-foreground mb-4">
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
        <ScrollArea className="h-full">
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Main Content</h1>
            <p className="text-muted-foreground mb-4">
              This main content area takes up approximately 70% of the screen width.
            </p>
            {/* Add your main content here */}
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Section {i + 1}</h2>
                <p className="text-muted-foreground mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                  ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat.
                </p>
                {i < 4 && <Separator className="mt-8" />}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}