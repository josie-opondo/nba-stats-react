import { useContext } from 'react'
import { StatsContext, StatsContextType } from './StatsContext.tsx'

export const useStats = (): StatsContextType => {
  const context = useContext(StatsContext)
  if (context === undefined) {
    throw new Error('useStats must be used within a StatsProvider')
  }
  return context
}
