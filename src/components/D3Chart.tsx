import { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
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

    const width = 800
    const height = 400
    const margin = { top: 30, right: 30, bottom: 50, left: 60 }

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
          <div class="text-sm font-medium text-white">${d.place}</div>
          <div class="text-xs text-gray-200">Mag: ${d.magnitude.toFixed(1)}<br/>
          ${chartType === 'time' ? `Time: ${d.date.toLocaleString()}` : `Depth: ${d.depth} km`}</div>
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

      svg
        .append('path')
        .datum(plotData)
        .attr('fill', 'none')
        .attr('stroke', '#3b82f6')
        .attr('stroke-width', 2)
        .attr('d', line)
        .attr('opacity', 0)
        .transition()
        .duration(800)
        .attr('opacity', 1)

      svg
        .selectAll('circle')
        .data(plotData)
        .enter()
        .append('circle')
        .attr('cx', (d) => x(d.date))
        .attr('cy', (d) => y(d.magnitude))
        .attr('r', 0)
        .attr('fill', '#3b82f6')
        .on('mouseenter', (event: MouseEvent, d: PlotPoint) => showTooltip(event, d))
        .on('mouseleave', hideTooltip)
        .transition()
        .duration(600)
        .attr('r', 4)

      svg.append('g')
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(
          d3.axisBottom(x)
            .ticks(6)
            .tickFormat((d) => d3.timeFormat('%b %d')(d as Date))
        )

      svg.append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))

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

      svg
        .selectAll('circle')
        .data(plotData)
        .enter()
        .append('circle')
        .attr('cx', (d) => x(d.magnitude))
        .attr('cy', (d) => y(d.depth))
        .attr('r', 0)
        .attr('fill', '#10b981')
        .attr('opacity', 0.7)
        .on('mouseenter', (event: MouseEvent, d: PlotPoint) => showTooltip(event, d))
        .on('mouseleave', hideTooltip)
        .transition()
        .duration(600)
        .attr('r', 5)

      svg.append('g')
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x))

      svg.append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))
    }
  }, [data, chartType, loading])

  return (
    <div className="relative bg-white p-6 rounded-2xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Earthquake Chart</h2>
        <div className="space-x-2">
          <button
            onClick={() => setChartType('time')}
            className={`px-4 py-1 rounded-lg text-sm font-medium ${
              chartType === 'time' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Time Series
          </button>
          <button
            onClick={() => setChartType('scatter')}
            className={`px-4 py-1 rounded-lg text-sm font-medium ${
              chartType === 'scatter' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Scatter Plot
          </button>
        </div>
      </div>
      <svg ref={svgRef} className="w-full h-[400px]" />
      <div
        ref={tooltipRef}
        className="absolute pointer-events-none z-50 px-3 py-2 rounded-md bg-gray-800 text-white text-xs shadow-lg transition-opacity duration-200"
        style={{ opacity: 0, position: 'absolute' }}
      ></div>
    </div>
  )
}

export default D3Chart