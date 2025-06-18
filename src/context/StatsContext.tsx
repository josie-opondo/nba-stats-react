import React, { useState, createContext, ReactNode } from 'react'
import { mockPlayers, mockTeams } from '../data/mockData.ts'

interface Player {
  id: number
  name: string
  team: string
  position: string
  jerseyNumber: number
  stats: {
    ppg: number
    rpg: number
    apg: number
    spg: number
    bpg: number
    fg: number
    threePt: number
    ft: number
  }
}
interface Team {
  id: number
  name: string
  abbreviation: string
  conference: string
  division: string
  stats: {
    wins: number
    losses: number
    ppg: number
    oppg: number
    rpg: number
    apg: number
    spg: number
    bpg: number
  }
}
export interface StatsContextType {
  players: Player[]
  teams: Team[]
  selectedPlayers: Player[]
  selectedTeams: Team[]
  searchQuery: string
  loading: boolean
  error: string | null
  setSearchQuery: (query: string) => void
  addSelectedPlayer: (player: Player) => void
  removeSelectedPlayer: (playerId: number) => void
  addSelectedTeam: (team: Team) => void
  removeSelectedTeam: (teamId: number) => void
  clearSelections: () => void
}
export const StatsContext = createContext<StatsContextType | undefined>(
  undefined
)
export const StatsProvider: React.FC<{
  children: ReactNode
}> = ({ children }) => {
  const [players] = useState<Player[]>(mockPlayers)
  const [teams] = useState<Team[]>(mockTeams)
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([])
  const [selectedTeams, setSelectedTeams] = useState<Team[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading] = useState(false)
  const [error] = useState<string | null>(null)

  const addSelectedPlayer = (player: Player) => {
    if (!selectedPlayers.some((p) => p.id === player.id)) {
      setSelectedPlayers([...selectedPlayers, player])
    }
  }

  const removeSelectedPlayer = (playerId: number) => {
    setSelectedPlayers(selectedPlayers.filter((p) => p.id !== playerId))
  }

  const addSelectedTeam = (team: Team) => {
    if (!selectedTeams.some((t) => t.id === team.id)) {
      setSelectedTeams([...selectedTeams, team])
    }
  }

  const removeSelectedTeam = (teamId: number) => {
    setSelectedTeams(selectedTeams.filter((t) => t.id !== teamId))
  }

  const clearSelections = () => {
    setSelectedPlayers([])
    setSelectedTeams([])
  }

  return (
    <StatsContext.Provider
      value={{
        players,
        teams,
        selectedPlayers,
        selectedTeams,
        searchQuery,
        loading,
        error,
        setSearchQuery,
        addSelectedPlayer,
        removeSelectedPlayer,
        addSelectedTeam,
        removeSelectedTeam,
        clearSelections,
      }}
    >
      {children}
    </StatsContext.Provider>
  )
}
