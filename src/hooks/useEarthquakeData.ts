import { useEffect, useState } from 'react'

export interface EarthquakeFeature {
  id: string
  properties: {
    mag: number
    place: string
    time: number
  }
  geometry: {
    coordinates: [number, number, number] // [longitude, latitude, depth]
  }
}

export const useEarthquakeData = (
  minMagnitude: number,
  startDate?: string,
  endDate?: string
) => {
  const [data, setData] = useState<EarthquakeFeature[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEarthquakes = async () => {
      setLoading(true)
      setError(null)

      try {
        const baseUrl = 'https://earthquake.usgs.gov/fdsnws/event/1/query'
        const params = new URLSearchParams()

        params.set('format', 'geojson')
        params.set('limit', '100')
        params.set('minmagnitude', minMagnitude.toString())
        if (startDate) params.set('starttime', startDate)
        if (endDate) params.set('endtime', endDate)

        const response = await fetch(`${baseUrl}?${params.toString()}`)
        const json = await response.json()

        if (!json.features || !Array.isArray(json.features)) {
          throw new Error('Invalid data format')
        }

        setData(json.features)
      } catch (err) {
        console.error(err)
        setError('Failed to fetch earthquake data.')
      } finally {
        setLoading(false)
      }
    }

    fetchEarthquakes()
  }, [minMagnitude, startDate, endDate])

  return { data, loading, error }
}