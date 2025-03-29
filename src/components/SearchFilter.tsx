import React from 'react'
import { SearchIcon, XIcon } from 'lucide-react'
interface SearchFilterProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  placeholder?: string
}
export const SearchFilter: React.FC<SearchFilterProps> = ({
  searchQuery,
  setSearchQuery,
  placeholder = 'Search...',
}) => {
  const clearSearch = () => {
    setSearchQuery('')
  }
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <SearchIcon size={18} className="text-gray-400" />
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
      />
      {searchQuery && (
        <button
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          onClick={clearSearch}
        >
          <XIcon size={18} className="text-gray-400 hover:text-gray-600" />
        </button>
      )}
    </div>
  )
}
