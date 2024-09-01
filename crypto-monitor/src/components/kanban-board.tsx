import * as React from "react"
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CoinItem {
  id: string
  content: string
}

interface ColumnData {
  [key: string]: {
    name: string
    items: CoinItem[]
  }
}

export function KanbanBoard() {
  const [columns, setColumns] = React.useState<ColumnData>({
    possibleCoins: {
      name: "Possible Coins",
      items: [
        { id: "coin1", content: "Bitcoin" },
        { id: "coin2", content: "Ethereum" },
        { id: "coin3", content: "Cardano" },
      ]
    },
    watchlist: {
      name: "Watchlist",
      items: [
        { id: "coin4", content: "Polkadot" },
        { id: "coin5", content: "Solana" },
      ]
    }
  })

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return
    const { source, destination } = result

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId]
      const destColumn = columns[destination.droppableId]
      const sourceItems = [...sourceColumn.items]
      const destItems = [...destColumn.items]
      const [removed] = sourceItems.splice(source.index, 1)
      destItems.splice(destination.index, 0, removed)
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      })
    } else {
      const column = columns[source.droppableId]
      const copiedItems = [...column.items]
      const [removed] = copiedItems.splice(source.index, 1)
      copiedItems.splice(destination.index, 0, removed)
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      })
    }
  }

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-row gap-2 m-2">
          {Object.entries(columns).map(([columnId, column]) => (
            <div key={columnId} className="flex-1 h-screen min-w-[250px]">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>{column.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Droppable key={columnId} droppableId={columnId}>
                    {(provided) => (
                      <ul
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="space-y-2 min-h-[200px]"
                      >
                        {column.items.map((item, index) => (
                          <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(provided) => (
                              <li
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="p-2 rounded-md bg-secondary"
                              >
                                {item.content}
                              </li>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </ul>
                    )}
                  </Droppable>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  )
}