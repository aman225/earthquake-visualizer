import { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { Activity } from 'lucide-react'
import { type EarthquakeFeature } from '../hooks/useEarthquakeData'

interface D3ChartProps {
  data: EarthquakeFeature[]
  loading: boolean
}

type PlotPoint = {
  date: Date
  magnitude: number
  depth: number
  place: string
}

const D3Chart = ({ data, loading }: D3ChartProps) => {
  const [chartType, setChartType] = useState<'time' | 'scatter'>('time')
  const svgRef = useRef<SVGSVGElement | null>(null)
  const tooltipRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (loading || data.length === 0 || !svgRef.current || !tooltipRef.current) return

    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    const width = 900
    const height = 500
    const margin = { top: 40, right: 40, bottom: 80, left: 80 }

    svg.attr('viewBox', `0 0 ${width} ${height}`)

    const plotData: PlotPoint[] = data.map((d) => ({
      date: new Date(d.properties.time),
      magnitude: d.properties.mag,
      depth: d.geometry.coordinates[2],
      place: d.properties.place,
    }))

    const tooltip = d3.select(tooltipRef.current)

    const showTooltip = (event: MouseEvent, d: PlotPoint) => {
      tooltip
        .style('opacity', '1')
        .style('left', event.pageX + 10 + 'px')
        .style('top', event.pageY - 28 + 'px')
        .html(`
          <div class="font-bold text-white">${d.place}</div>
          <div class="text-sm text-gray-200">
            Magnitude: ${d.magnitude.toFixed(1)}<br/>
            ${chartType === 'time' ? `Time: ${d.date.toLocaleString()}` : `Depth: ${d.depth} km`}
          </div>
        `)
    }

    const hideTooltip = () => {
      tooltip.style('opacity', '0')
    }

    if (chartType === 'time') {
      const x = d3
        .scaleTime()
        .domain(d3.extent(plotData, (d) => d.date) as [Date, Date])
        .range([margin.left, width - margin.right])

      const y = d3
        .scaleLinear()
        .domain([0, d3.max(plotData, (d) => d.magnitude)!])
        .nice()
        .range([height - margin.bottom, margin.top])

      const line = d3
        .line<PlotPoint>()
        .x((d) => x(d.date))
        .y((d) => y(d.magnitude))
        .curve(d3.curveCardinal)

      // Add gradient
      const gradient = svg.append('defs')
        .append('linearGradient')
        .attr('id', 'gradient')
        .attr('gradientUnits', 'userSpaceOnUse')
        .attr('x1', 0).attr('y1', height)
        .attr('x2', 0).attr('y2', 0)

      gradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', '#3b82f6')

      gradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', '#8b5cf6')

      svg
        .append('path')
        .datum(plotData)
        .attr('fill', 'none')
        .attr('stroke', 'url(#gradient)')
        .attr('stroke-width', 3)
        .attr('d', line)
        .attr('opacity', 0)
        .transition()
        .duration(1000)
        .attr('opacity', 1)

      svg
        .selectAll('circle')
        .data(plotData)
        .enter()
        .append('circle')
        .attr('cx', (d) => x(d.date))
        .attr('cy', (d) => y(d.magnitude))
        .attr('r', 0)
        .attr('fill', (d) => d.magnitude > 5 ? '#ef4444' : '#3b82f6')
        .attr('stroke', '#ffffff')
        .attr('stroke-width', 2)
        .on('mouseenter', (event: MouseEvent, d: PlotPoint) => showTooltip(event, d))
        .on('mouseleave', hideTooltip)
        .transition()
        .duration(800)
        .delay((_, i) => i * 50)
        .attr('r', (d) => Math.max(4, d.magnitude))

      svg.append('g')
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).ticks(6))
        .selectAll('text')
        .style('fill', '#374151')
        .style('font-size', '12px')

      svg.append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))
        .selectAll('text')
        .style('fill', '#374151')
        .style('font-size', '12px')

    } else {
      const x = d3
        .scaleLinear()
        .domain([0, d3.max(plotData, (d) => d.magnitude)!])
        .nice()
        .range([margin.left, width - margin.right])

      const y = d3
        .scaleLinear()
        .domain(d3.extent(plotData, (d) => d.depth) as [number, number])
        .nice()
        .range([height - margin.bottom, margin.top])

      const colorScale = d3
        .scaleSequential(d3.interpolateViridis)
        .domain([0, d3.max(plotData, (d) => d.magnitude)!])

      svg
        .selectAll('circle')
        .data(plotData)
        .enter()
        .append('circle')
        .attr('cx', (d) => x(d.magnitude))
        .attr('cy', (d) => y(d.depth))
        .attr('r', 0)
        .attr('fill', (d) => colorScale(d.magnitude))
        .attr('stroke', '#ffffff')
        .attr('stroke-width', 1)
        .attr('opacity', 0.8)
        .on('mouseenter', (event: MouseEvent, d: PlotPoint) => showTooltip(event, d))
        .on('mouseleave', hideTooltip)
        .transition()
        .duration(800)
        .delay((_, i) => i * 30)
        .attr('r', (d) => Math.max(5, d.magnitude * 1.5))

      svg.append('g')
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x))
        .selectAll('text')
        .style('fill', '#374151')

      svg.append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))
        .selectAll('text')
        .style('fill', '#374151')
    }
  }, [data, chartType, loading])

  return (
    <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-all duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
            <Activity className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Earthquake Visualization
          </h2>
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={() => setChartType('time')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
              chartType === 'time' 
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-105' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Time Series
          </button>
          <button
            onClick={() => setChartType('scatter')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
              chartType === 'scatter' 
                ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg transform scale-105' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Scatter Plot
          </button>
        </div>
      </div>
      
      <div className="relative">
        <svg ref={svgRef} className="w-full h-[500px] rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50" />
        <div
          ref={tooltipRef}
          className="absolute pointer-events-none z-50 px-4 py-3 rounded-xl bg-gray-900/90 backdrop-blur-sm text-white text-sm shadow-2xl transition-opacity duration-200 border border-white/20"
          style={{ opacity: 0 }}
        />
      </div>
    </div>
  )
}

export default D3Chart