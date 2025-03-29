import React from 'react'
import { motion } from 'framer-motion'
import { PlusIcon, CheckIcon } from 'lucide-react'

interface PlayerCardProps {
  player: {
    id: number
    name: string
    team: string
    position: string
    jerseyNumber: number
    stats: {
      ppg: number
      rpg: number
      apg: number
    }
  }
  isSelected: boolean
  onSelect: () => void
}

export const PlayerCard: React.FC<PlayerCardProps> = ({
  player,
  isSelected,
  onSelect,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`bg-white border rounded-lg overflow-hidden shadow-sm transition-shadow ${
        isSelected
          ? 'border-red-500 shadow-md'
          : 'border-gray-200 hover:shadow-md'
      }`}
    >
      <div className="p-4 flex justify-between items-center">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="font-medium text-gray-900">{player.name}</h3>
            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
              #{player.jerseyNumber}
            </span>
          </div>
          <p className="text-sm text-gray-500">
            {player.team} • {player.position}
          </p>
          <div className="flex mt-2 text-xs text-gray-500 space-x-3">
            <span>{player.stats.ppg} PPG</span>
            <span>{player.stats.rpg} RPG</span>
            <span>{player.stats.apg} APG</span>
          </div>
        </div>

        <motion.button
          onClick={onSelect}
          whileTap={{ scale: 0.9 }}
          className={`p-2 rounded-full transition-colors ${
            isSelected
              ? 'bg-red-100 text-red-500 cursor-default'
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
          }`}
          aria-label={isSelected ? 'Player selected' : 'Select player'}
          aria-pressed={isSelected}
          disabled={isSelected}
        >
          {isSelected ? <CheckIcon size={18} /> : <PlusIcon size={18} />}
        </motion.button>
      </div>
    </motion.div>
  )
}
