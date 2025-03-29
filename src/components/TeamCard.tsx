import React from 'react'
import { motion } from 'framer-motion'
import { PlusIcon, CheckIcon } from 'lucide-react'
interface TeamCardProps {
  team: {
    id: number
    name: string
    abbreviation: string
    conference: string
    division: string
    stats: {
      wins: number
      losses: number
    }
  }
  isSelected: boolean
  onSelect: () => void
}
export const TeamCard: React.FC<TeamCardProps> = ({
  team,
  isSelected,
  onSelect,
}) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.02,
      }}
      className={`bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow ${isSelected ? 'border-purple-500' : 'border-gray-200'}`}
    >
      <div className="p-4 flex justify-between items-center">
        <div>
          <div className="flex items-center">
            <h3 className="font-medium text-gray-900">{team.name}</h3>
            <span className="ml-2 bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
              {team.abbreviation}
            </span>
          </div>
          <p className="text-sm text-gray-500">
            {team.conference} • {team.division}
          </p>
          <div className="flex mt-2 text-xs text-gray-500">
            <span>
              {team.stats.wins}W - {team.stats.losses}L
            </span>
          </div>
        </div>
        <button
          onClick={onSelect}
          className={`p-2 rounded-full ${isSelected ? 'bg-purple-100 text-purple-500' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
          disabled={isSelected}
          aria-label={isSelected ? 'Team selected' : 'Select team'}
        >
          {isSelected ? <CheckIcon size={18} /> : <PlusIcon size={18} />}
        </button>
      </div>
    </motion.div>
  )
}
