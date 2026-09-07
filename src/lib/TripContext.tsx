import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export interface TripItem {
  id: string
  name: string
  region: string
}

interface TripContextType {
  tripItems: TripItem[]
  addToTrip: (item: TripItem) => void
  removeFromTrip: (id: string) => void
  clearTrip: () => void
  moveStopUp: (id: string) => void
  moveStopDown: (id: string) => void
  reorderTrip: (fromIndex: number, toIndex: number) => void
  loadTrip: (items: TripItem[]) => void
}

const TripContext = createContext<TripContextType | undefined>(undefined)

export function TripProvider({ children }: { children: ReactNode }) {
  const [tripItems, setTripItems] = useState<TripItem[]>([])

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('up_waterfalls_trip')
    if (saved) {
      try {
        setTripItems(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to parse trip items', e)
      }
    }
  }, [])

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem('up_waterfalls_trip', JSON.stringify(tripItems))
  }, [tripItems])

  const addToTrip = (item: TripItem) => {
    if (!tripItems.find(i => i.id === item.id)) {
      setTripItems([...tripItems, item])
    }
  }

  const removeFromTrip = (id: string) => {
    setTripItems(tripItems.filter(i => i.id !== id))
  }

  const clearTrip = () => {
    setTripItems([])
  }

  const moveStopUp = (id: string) => {
    const index = tripItems.findIndex(i => i.id === id)
    if (index <= 0) return
    const newItems = [...tripItems]
    const temp = newItems[index - 1]
    newItems[index - 1] = newItems[index]
    newItems[index] = temp
    setTripItems(newItems)
  }

  const moveStopDown = (id: string) => {
    const index = tripItems.findIndex(i => i.id === id)
    if (index < 0 || index >= tripItems.length - 1) return
    const newItems = [...tripItems]
    const temp = newItems[index + 1]
    newItems[index + 1] = newItems[index]
    newItems[index] = temp
    setTripItems(newItems)
  }

  const reorderTrip = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex || fromIndex < 0 || toIndex < 0 || fromIndex >= tripItems.length || toIndex >= tripItems.length) return
    const newItems = [...tripItems]
    const [moved] = newItems.splice(fromIndex, 1)
    newItems.splice(toIndex, 0, moved)
    setTripItems(newItems)
  }

  const loadTrip = (items: TripItem[]) => {
    setTripItems(items)
  }

  return (
    <TripContext.Provider value={{
      tripItems,
      addToTrip,
      removeFromTrip,
      clearTrip,
      moveStopUp,
      moveStopDown,
      reorderTrip,
      loadTrip
    }}>
      {children}
    </TripContext.Provider>
  )
}

export function useTrip() {
  const context = useContext(TripContext)
  if (context === undefined) {
    throw new Error('useTrip must be used within a TripProvider')
  }
  return context
}
