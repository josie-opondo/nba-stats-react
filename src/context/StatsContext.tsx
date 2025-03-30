import React, { useState, createContext, ReactNode } from 'react'

const mockPlayers: Player[] = [
  {
    id: 1,
    name: 'LeBron James',
    team: 'Los Angeles Lakers',
    position: 'SF',
    jerseyNumber: 23,
    stats: {
      ppg: 27.1,
      rpg: 7.4,
      apg: 7.4,
      spg: 1.6,
      bpg: 0.8,
      fg: 50.4,
      threePt: 34.5,
      ft: 73.4,
    },
  },
  {
    id: 2,
    name: 'Stephen Curry',
    team: 'Golden State Warriors',
    position: 'PG',
    jerseyNumber: 30,
    stats: {
      ppg: 24.6,
      rpg: 4.6,
      apg: 6.5,
      spg: 1.7,
      bpg: 0.2,
      fg: 47.6,
      threePt: 42.8,
      ft: 90.6,
    },
  },
]

const mockTeams: Team[] = [
  {
    id: 1,
    name: 'Los Angeles Lakers',
    abbreviation: 'LAL',
    conference: 'Western',
    division: 'Pacific',
    stats: {
      wins: 45,
      losses: 30,
      ppg: 112.1,
      oppg: 109.5,
      rpg: 44.2,
      apg: 25.5,
      spg: 7.6,
      bpg: 5.1,
    },
  },
  {
    id: 2,
    name: 'Golden State Warriors',
    abbreviation: 'GSW',
    conference: 'Western',
    division: 'Pacific',
    stats: {
      wins: 50,
      losses: 25,
      ppg: 118.5,
      oppg: 110.2,
      rpg: 46.8,
      apg: 27.4,
      spg: 8.2,
      bpg: 4.5,
    },
  },
]
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
