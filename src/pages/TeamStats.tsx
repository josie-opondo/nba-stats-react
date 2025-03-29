import { useState } from 'react'
import { motion } from 'framer-motion'
import { SearchFilter } from '../components/SearchFilter'
import { ChartContainer } from '../components/ChartContainer'
import { XIcon } from 'lucide-react'

// Define a type that matches ChartContainer's expectations
interface Team {
  id: number
  name: string
  abbreviation?: string
  stats: Record<string, number> // Ensuring stats exist
}

export const TeamStats = () => {
  const [selectedTeams, setSelectedTeams] = useState<Team[]>([])
  const [searchQuery, setSearchQuery] = useState<string>('')

  const removeSelectedTeam = (teamId: number) => {
    setSelectedTeams((prev) => prev.filter((team) => team.id !== teamId))
  }

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-2">Team Statistics</h1>
          <p className="text-gray-600 mb-8">
            Explore and compare NBA team statistics
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <SearchFilter
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              placeholder="Search teams..."
            />
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">Selected Teams</h2>
              {selectedTeams.length > 0 ? (
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedTeams.map((team) => (
                    <div
                      key={team.id}
                      className="bg-gray-100 rounded-full px-3 py-1 flex items-center gap-2"
                    >
                      <span>{team.name}</span>
                      <button
                        onClick={() => removeSelectedTeam(team.id)}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <XIcon size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 mb-4">
                  Select teams from the list to compare their statistics
                </p>
              )}
              <ChartContainer
                data={selectedTeams}
                statCategory="ppg"
                type="team"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
