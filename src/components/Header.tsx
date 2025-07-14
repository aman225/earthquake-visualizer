import { Activity, MapPin } from 'lucide-react'

const Header = () => {
  return (
    <header className="relative bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-400 rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-20 w-24 h-24 bg-red-400 rounded-full animate-bounce"></div>
        <div className="absolute bottom-10 left-1/3 w-16 h-16 bg-green-400 rounded-full animate-ping"></div>
      </div>
      
      <div className="relative container mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/10 backdrop-blur-sm rounded-2xl">
              <Activity className="h-8 w-8 text-yellow-400 animate-pulse" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-red-400 bg-clip-text text-transparent">
                Earthquake Visualizer
              </h1>
              <p className="text-blue-200 mt-1">Real-time seismic activity monitoring</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span>Live Data</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>Global Coverage</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header