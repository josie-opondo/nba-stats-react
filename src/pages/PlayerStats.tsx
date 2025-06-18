import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useStats } from '../context/UseStats.tsx'
import { SearchFilter } from '../components/SearchFilter'
import { PlayerCard } from '../components/PlayerCard'
import { ChartContainer } from '../components/ChartContainer'
import { XIcon } from 'lucide-react'
export const PlayerStats = () => {
  const {
    players,
    selectedPlayers,
    addSelectedPlayer,
    removeSelectedPlayer,
    searchQuery,
    setSearchQuery,
  } = useStats()
  const [filteredPlayers, setFilteredPlayers] = useState(players)
  const [statCategory, setStatCategory] = useState('ppg')
  const [positions, setPositions] = useState<string[]>([])
  const [selectedPositions, setSelectedPositions] = useState<string[]>([])
  useEffect(() => {
    // Extract unique positions
    const uniquePositions = Array.from(
      new Set(players.map((player) => player.position))
    )
    setPositions(uniquePositions)
    // Filter players based on search query and position filters
    const filtered = players.filter((player) => {
      const matchesSearch =
        player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        player.team.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesPosition =
        selectedPositions.length === 0 ||
        selectedPositions.includes(player.position)
      return matchesSearch && matchesPosition
    })
    setFilteredPlayers(filtered)
  }, [players, searchQuery, selectedPositions])
  const handlePositionChange = (position: string) => {
    setSelectedPositions((prev) =>
      prev.includes(position)
        ? prev.filter((p) => p !== position)
        : [...prev, position]
    )
  }
  const handleStatCategoryChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setStatCategory(e.target.value)
  }
  return (
    <div className="w-full bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
        >
          <h1 className="text-3xl font-bold mb-2">Player Statistics</h1>
          <p className="text-gray-600 mb-8">
            Explore and compare NBA player statistics
          </p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <motion.div
              initial={{
                opacity: 0,
                x: -20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.5,
                delay: 0.2,
              }}
              className="bg-white rounded-lg shadow-md p-6 mb-8"
            >
              <h2 className="text-xl font-bold mb-4">Search & Filter</h2>
              <SearchFilter
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                placeholder="Search players or teams..."
              />
              <div className="mt-4">
                <h3 className="font-medium mb-2">Filter by Position:</h3>
                <div className="flex flex-wrap gap-2">
                  {positions.map((position) => (
                    <button
                      key={position}
                      onClick={() => handlePositionChange(position)}
                      className={`px-3 py-1 rounded-full text-sm ${selectedPositions.includes(position) ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    >
                      {position}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-6">
                <h3 className="font-medium mb-2">Compare Stat Category:</h3>
                <select
                  value={statCategory}
                  onChange={handleStatCategoryChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="ppg">Points Per Game</option>
                  <option value="rpg">Rebounds Per Game</option>
                  <option value="apg">Assists Per Game</option>
                  <option value="spg">Steals Per Game</option>
                  <option value="bpg">Blocks Per Game</option>
                  <option value="fg">Field Goal %</option>
                  <option value="threePt">3-Point %</option>
                  <option value="ft">Free Throw %</option>
                </select>
              </div>
            </motion.div>
            <motion.div
              initial={{
                opacity: 0,
                x: -20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.5,
                delay: 0.3,
              }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Player Results</h2>
                <span className="text-sm text-gray-500">
                  {filteredPlayers.length} players
                </span>
              </div>
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {filteredPlayers.length > 0 ? (
                  filteredPlayers.map((player) => (
                    <PlayerCard
                      key={player.id}
                      player={player}
                      isSelected={selectedPlayers.some(
                        (p) => p.id === player.id
                      )}
                      onSelect={() => addSelectedPlayer(player)}
                    />
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    No players match your search criteria
                  </p>
                )}
              </div>
            </motion.div>
          </div>
          <motion.div
            initial={{
              opacity: 0,
              x: 20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.5,
              delay: 0.4,
            }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">Selected Players</h2>
              {selectedPlayers.length > 0 ? (
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedPlayers.map((player) => (
                    <div
                      key={player.id}
                      className="bg-gray-100 rounded-full px-3 py-1 flex items-center gap-2"
                    >
                      <span>{player.name}</span>
                      <button
                        onClick={() => removeSelectedPlayer(player.id)}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <XIcon size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 mb-4">
                  Select players from the list to compare their statistics
                </p>
              )}
              <ChartContainer
                data={selectedPlayers}
                statCategory={statCategory}
                type="player"
              />
            </div>
            {selectedPlayers.length > 0 && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.5,
                }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <h2 className="text-xl font-bold mb-4">Detailed Comparison</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="p-3 text-left">Player</th>
                        <th className="p-3 text-right">PPG</th>
                        <th className="p-3 text-right">RPG</th>
                        <th className="p-3 text-right">APG</th>
                        <th className="p-3 text-right">SPG</th>
                        <th className="p-3 text-right">BPG</th>
                        <th className="p-3 text-right">FG%</th>
                        <th className="p-3 text-right">3P%</th>
                        <th className="p-3 text-right">FT%</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedPlayers.map((player) => (
                        <tr
                          key={player.id}
                          className="border-t border-gray-200"
                        >
                          <td className="p-3 font-medium">{player.name}</td>
                          <td className="p-3 text-right">{player.stats.ppg}</td>
                          <td className="p-3 text-right">{player.stats.rpg}</td>
                          <td className="p-3 text-right">{player.stats.apg}</td>
                          <td className="p-3 text-right">{player.stats.spg}</td>
                          <td className="p-3 text-right">{player.stats.bpg}</td>
                          <td className="p-3 text-right">{player.stats.fg}%</td>
                          <td className="p-3 text-right">
                            {player.stats.threePt}%
                          </td>
                          <td className="p-3 text-right">{player.stats.ft}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
