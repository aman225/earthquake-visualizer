import { Activity } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white mt-16">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-3">
            <Activity className="h-6 w-6 text-yellow-400" />
            <span className="text-lg font-semibold">Earthquake Visualizer</span>
          </div>
          <div className="text-sm text-gray-400">
            © {new Date().getFullYear()} · Data from USGS Earthquake API
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer