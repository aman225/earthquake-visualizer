import { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Filters from './components/Filters'
import EarthquakeList from './components/EarthquakeList'
import D3Chart from './components/D3Chart'
import { useEarthquakeData } from './hooks/useEarthquakeData'

function App() {
  const [minMag, setMinMag] = useState(2.5)
  const [maxMag, setMaxMag] = useState(10)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const { data, loading, error } = useEarthquakeData(minMag, startDate, endDate)

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-6 space-y-8">
<Filters
  minMag={minMag}
  setMinMag={setMinMag}
  maxMag={maxMag}
  setMaxMag={setMaxMag}
  startDate={startDate}
  setStartDate={setStartDate}
  endDate={endDate}
  setEndDate={setEndDate}
/>››

        <D3Chart data={data} loading={loading} />

        <EarthquakeList data={data} loading={loading} error={error} /> 
      </main>

      <Footer />
    </div>
  )
}

export default App