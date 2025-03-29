import { motion } from 'framer-motion'
import { SearchFilter } from '../components/SearchFilter'
import { ChartContainer } from '../components/ChartContainer'
import { XIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

export const PlayerStats = () => {
  const [players] = useState([])
  const [selectedPlayers, setSelectedPlayers] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filteredPlayers, setFilteredPlayers] = useState([])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [statCategory, setStatCategory] = useState('ppg')
  const [positions, setPositions] = useState([])
  const [selectedPositions, setSelectedPositions] = useState([])

  useEffect(() => {
    if (!players.length) return

    const uniquePositions = Array.from(
      new Set(players.map((player) => player.position))
    )
    setPositions(uniquePositions)

    const filtered = players.filter((player) => {
      const matchesSearch =
        player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        player.team.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesPosition =
        selectedPositions.length === 0 ||
        selectedPositions.includes(player.position)
      return matchesSearch && matchesPosition
    })
    setFilteredPlayers(filtered) // ✅ Fixed dependency issue
  }, [players, searchQuery, selectedPositions, setFilteredPlayers]) // ✅ Added to dependencies

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const addSelectedPlayer = (player) => {
    if (!selectedPlayers.some((p) => p.id === player.id)) {
      setSelectedPlayers([...selectedPlayers, player])
    }
  }

  const removeSelectedPlayer = (playerId) => {
    setSelectedPlayers(selectedPlayers.filter((p) => p.id !== playerId))
  }

  const handlePositionChange = (position) => {
    setSelectedPositions((prev) =>
      prev.includes(position)
        ? prev.filter((p) => p !== position)
        : [...prev, position]
    )
  }

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-2">Player Statistics</h1>
          <p className="text-gray-600 mb-8">
            Explore and compare NBA player statistics
          </p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
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
          </div>
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
              <ChartContainer
                data={selectedPlayers}
                statCategory={statCategory}
                type="player"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
