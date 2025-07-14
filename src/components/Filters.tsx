import React from 'react'

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
    <div className="bg-white p-6 rounded-2xl shadow-lg space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Filter Earthquakes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-600">Min Magnitude</label>
          <input
            type="number"
            min="0"
            max="10"
            step="0.1"
            value={minMag}
            onChange={(e) => setMinMag(parseFloat(e.target.value))}
            className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Max Magnitude</label>
          <input
            type="number"
            min="0"
            max="10"
            step="0.1"
            value={maxMag}
            onChange={(e) => setMaxMag(parseFloat(e.target.value))}
            className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
      </div>
    </div>
  )
}

export default Filters