import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { SearchFilter } from '../components/SearchFilter'
import { ChartContainer } from '../components/ChartContainer'
import { XIcon } from 'lucide-react'

export const TeamStats = () => {
  const [teams, setTeams] = useState([]) // Placeholder for actual teams data
  const [selectedTeams, setSelectedTeams] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [, setFilteredTeams] = useState([])
  const [statCategory, setStatCategory] = useState('ppg')
  const [conferences, setConferences] = useState([])
  const [selectedConferences, setSelectedConferences] = useState([])

  useEffect(() => {
    // Fetch or initialize teams data when ready
    setTeams([]) // Replace with actual API call

    if (teams.length > 0) {
      const uniqueConferences = Array.from(
        new Set(teams.map((team) => team.conference))
      )
      setConferences(uniqueConferences)

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
    }
  }, [teams, searchQuery, selectedConferences])

  const addSelectedTeam = (team) => {
    if (!selectedTeams.some((t) => t.id === team.id)) {
      setSelectedTeams([...selectedTeams, team])
    }
  }

  const removeSelectedTeam = (teamId) => {
    setSelectedTeams((prev) => prev.filter((team) => team.id !== teamId))
  }

  const handleConferenceChange = (conference) => {
    setSelectedConferences((prev) =>
      prev.includes(conference)
        ? prev.filter((c) => c !== conference)
        : [...prev, conference]
    )
  }

  const handleStatCategoryChange = (e) => {
    setStatCategory(e.target.value)
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
            <div className="mt-4">
              <h3 className="font-medium mb-2">Filter by Conference:</h3>
              <div className="flex flex-wrap gap-2">
                {conferences.map((conference) => (
                  <button
                    key={conference}
                    onClick={() => handleConferenceChange(conference)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedConferences.includes(conference)
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {conference}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <h3 className="font-medium mb-2">Stat Category:</h3>
              <select
                value={statCategory}
                onChange={handleStatCategoryChange}
                className="p-2 border rounded"
              >
                <option value="ppg">Points Per Game</option>
                <option value="rpg">Rebounds Per Game</option>
                <option value="apg">Assists Per Game</option>
                <option value="spg">Steals Per Game</option>
              </select>
            </div>
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
                statCategory={statCategory}
                type="team"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
