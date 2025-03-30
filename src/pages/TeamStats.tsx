import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useStats } from '../context/UseStats.tsx'
import { SearchFilter } from '../components/SearchFilter'
import { TeamCard } from '../components/TeamCard'
import { ChartContainer } from '../components/ChartContainer'
import { XIcon } from 'lucide-react'
export const TeamStats = () => {
  const {
    teams,
    selectedTeams,
    addSelectedTeam,
    removeSelectedTeam,
    searchQuery,
    setSearchQuery,
  } = useStats()
  const [filteredTeams, setFilteredTeams] = useState(teams)
  const [statCategory, setStatCategory] = useState('ppg')
  const [conferences, setConferences] = useState<string[]>([])
  const [selectedConferences, setSelectedConferences] = useState<string[]>([])
  useEffect(() => {
    // Extract unique conferences
    const uniqueConferences = Array.from(
      new Set(teams.map((team) => team.conference))
    )
    setConferences(uniqueConferences)
    // Filter teams based on search query and conference filters
    const filtered = teams.filter((team) => {
      const matchesSearch =
        team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        team.abbreviation.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesConference =
        selectedConferences.length === 0 ||
        selectedConferences.includes(team.conference)
      return matchesSearch && matchesConference
    })
    setFilteredTeams(filtered)
  }, [teams, searchQuery, selectedConferences])
  const handleConferenceChange = (conference: string) => {
    setSelectedConferences((prev) =>
      prev.includes(conference)
        ? prev.filter((c) => c !== conference)
        : [...prev, conference]
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
          <h1 className="text-3xl font-bold mb-2">Team Statistics</h1>
          <p className="text-gray-600 mb-8">
            Explore and compare NBA team statistics
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
                placeholder="Search teams..."
              />
              <div className="mt-4">
                <h3 className="font-medium mb-2">Filter by Conference:</h3>
                <div className="flex flex-wrap gap-2">
                  {conferences.map((conference) => (
                    <button
                      key={conference}
                      onClick={() => handleConferenceChange(conference)}
                      className={`px-3 py-1 rounded-full text-sm ${selectedConferences.includes(conference) ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    >
                      {conference}
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
                  <option value="oppg">Opponent Points Per Game</option>
                  <option value="rpg">Rebounds Per Game</option>
                  <option value="apg">Assists Per Game</option>
                  <option value="spg">Steals Per Game</option>
                  <option value="bpg">Blocks Per Game</option>
                  <option value="wins">Wins</option>
                  <option value="losses">Losses</option>
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
                <h2 className="text-xl font-bold">Team Results</h2>
                <span className="text-sm text-gray-500">
                  {filteredTeams.length} teams
                </span>
              </div>
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {filteredTeams.length > 0 ? (
                  filteredTeams.map((team) => (
                    <TeamCard
                      key={team.id}
                      team={team}
                      isSelected={selectedTeams.some((t) => t.id === team.id)}
                      onSelect={() => addSelectedTeam(team)}
                    />
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    No teams match your search criteria
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
                statCategory={statCategory}
                type="team"
              />
            </div>
            {selectedTeams.length > 0 && (
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
                        <th className="p-3 text-left">Team</th>
                        <th className="p-3 text-right">W</th>
                        <th className="p-3 text-right">L</th>
                        <th className="p-3 text-right">PPG</th>
                        <th className="p-3 text-right">OPPG</th>
                        <th className="p-3 text-right">RPG</th>
                        <th className="p-3 text-right">APG</th>
                        <th className="p-3 text-right">SPG</th>
                        <th className="p-3 text-right">BPG</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedTeams.map((team) => (
                        <tr key={team.id} className="border-t border-gray-200">
                          <td className="p-3 font-medium">{team.name}</td>
                          <td className="p-3 text-right">{team.stats.wins}</td>
                          <td className="p-3 text-right">
                            {team.stats.losses}
                          </td>
                          <td className="p-3 text-right">{team.stats.ppg}</td>
                          <td className="p-3 text-right">{team.stats.oppg}</td>
                          <td className="p-3 text-right">{team.stats.rpg}</td>
                          <td className="p-3 text-right">{team.stats.apg}</td>
                          <td className="p-3 text-right">{team.stats.spg}</td>
                          <td className="p-3 text-right">{team.stats.bpg}</td>
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
