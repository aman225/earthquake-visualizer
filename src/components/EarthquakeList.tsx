import { Activity, AlertTriangle, Clock, Zap } from 'lucide-react'
import { type EarthquakeFeature } from '../hooks/useEarthquakeData'

interface EarthquakeListProps {
  data: EarthquakeFeature[]
  loading: boolean
  error: string | null
}

const EarthquakeList = ({ data, loading, error }: EarthquakeListProps) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mb-4"></div>
        <p className="text-gray-600">Loading earthquake data...</p>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
        <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <p className="text-red-600 font-medium">{error}</p>
      </div>
    )
  }
  
  if (data.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-12 text-center">
        <Activity className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">No earthquakes found for the selected filters.</p>
      </div>
    )
  }

  const getMagnitudeColor = (mag: number) => {
    if (mag >= 7) return 'from-red-500 to-red-600'
    if (mag >= 5) return 'from-orange-500 to-red-500'
    if (mag >= 3) return 'from-yellow-500 to-orange-500'
    return 'from-green-500 to-yellow-500'
  }

  const getMagnitudeIcon = (mag: number) => {
    if (mag >= 5) return <AlertTriangle className="h-5 w-5" />
    return <Zap className="h-5 w-5" />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl">
          <Activity className="h-6 w-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Recent Earthquakes ({data.length})
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((eq, index) => (
          <div
            key={eq.id}
            className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-r ${getMagnitudeColor(eq.properties.mag)} text-white`}>
                {getMagnitudeIcon(eq.properties.mag)}
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-800">
                  M{eq.properties.mag.toFixed(1)}
                </div>
                <div className="text-sm text-gray-500">Magnitude</div>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
              {eq.properties.place}
            </h3>
            
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>{new Date(eq.properties.time).toLocaleString()}</span>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Depth</span>
                <span className="font-medium">{eq.geometry.coordinates[2]} km</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EarthquakeList