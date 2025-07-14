import { type EarthquakeFeature } from '../hooks/useEarthquakeData'

interface EarthquakeListProps {
  data: EarthquakeFeature[]
  loading: boolean
  error: string | null
}

const EarthquakeList = ({ data, loading, error }: EarthquakeListProps) => {
  if (loading) return <p>Loading earthquake data...</p>
  if (error) return <p className="text-red-500">{error}</p>
  if (data.length === 0) return <p>No earthquakes found for the selected filters.</p>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((eq) => (
        <div
          key={eq.id}
          className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition"
        >
          <h3 className="text-lg font-semibold text-blue-600">
            M{eq.properties.mag.toFixed(1)} - {eq.properties.place}
          </h3>
          <p className="text-sm text-gray-600">
            {new Date(eq.properties.time).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  )
}

export default EarthquakeList