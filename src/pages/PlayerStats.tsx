import { useState } from 'react'
import { motion } from 'framer-motion'
import { SearchFilter } from '../components/SearchFilter'
import { ChartContainer } from '../components/ChartContainer'
import { XIcon } from 'lucide-react'

// Define a TypeScript interface for Player that matches ChartContainer's expectations
interface Player {
  id: number
  name: string
  stats: Record<string, number> // Ensuring it has stats
}

export const PlayerStats = () => {
  // State for selected players and search query
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([])
  const [searchQuery, setSearchQuery] = useState<string>('')

  // Function to remove a player from the selected list
  const removeSelectedPlayer = (playerId: number) => {
    setSelectedPlayers((prev) =>
      prev.filter((player) => player.id !== playerId)
    )
  }

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-2">Player Statistics</h1>
          <p className="text-gray-600 mb-8">
            Analyze and compare NBA player statistics
          </p>
        </motion.div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Search Filter */}
          <div className="lg:col-span-1">
            <SearchFilter
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              placeholder="Search players..."
            />
          </div>

          {/* Selected Players & Chart Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
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

              {/* Chart Container */}
              <ChartContainer
                data={selectedPlayers}
                statCategory="ppg"
                type="player"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
