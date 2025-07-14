import React from 'react'
import { Filter, TrendingUp, AlertTriangle, Calendar } from 'lucide-react'

interface FiltersProps {
  minMag: number
  setMinMag: React.Dispatch<React.SetStateAction<number>>
  maxMag: number
  setMaxMag: React.Dispatch<React.SetStateAction<number>>
  startDate: string
  setStartDate: React.Dispatch<React.SetStateAction<string>>
  endDate: string
  setEndDate: React.Dispatch<React.SetStateAction<string>>
}

const Filters = ({
  minMag,
  setMinMag,
  maxMag,
  setMaxMag,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: FiltersProps) => {
  return (
    <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-all duration-300">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
          <Filter className="h-6 w-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Filter Earthquakes
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
            <TrendingUp className="h-4 w-4 text-purple-500" />
            <span>Min Magnitude</span>
          </label>
          <input
            type="number"
            min="0"
            max="10"
            step="0.1"
            value={minMag}
            onChange={(e) => setMinMag(parseFloat(e.target.value))}
            className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 bg-white/50 backdrop-blur-sm"
          />
        </div>
        
        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
            <AlertTriangle className="h-4 w-4 text-red-500" />
            <span>Max Magnitude</span>
          </label>
          <input
            type="number"
            min="0"
            max="10"
            step="0.1"
            value={maxMag}
            onChange={(e) => setMaxMag(parseFloat(e.target.value))}
            className="w-full px-4 py-3 rounded-xl border-2 border-red-200 focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-200 bg-white/50 backdrop-blur-sm"
          />
        </div>
        
        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
            <Calendar className="h-4 w-4 text-blue-500" />
            <span>Start Date</span>
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-blue-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-white/50 backdrop-blur-sm"
          />
        </div>
        
        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
            <Calendar className="h-4 w-4 text-green-500" />
            <span>End Date</span>
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-green-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200 bg-white/50 backdrop-blur-sm"
          />
        </div>
      </div>
    </div>
  )
}

export default Filters