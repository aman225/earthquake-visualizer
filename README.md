# 🌍 Earthquake Visualizer

A modern, interactive web application that visualizes real-time earthquake data from the USGS (United States Geological Survey) API. Built with React, TypeScript, and D3.js for stunning data visualizations.

## ✨ Features

- **Real-time Data**: Fetches live earthquake data from the USGS Earthquake API
- **Interactive Visualizations**: 
  - Time series charts showing earthquake magnitude over time
  - Scatter plots displaying magnitude vs depth relationships
- **Advanced Filtering**: Filter earthquakes by magnitude range and date range
- **Responsive Design**: Fully responsive interface that works on desktop and mobile
- **Modern UI**: Glassmorphism design with smooth animations and transitions
- **Interactive Tooltips**: Hover over data points to see detailed information
- **Live Data Indicators**: Visual indicators showing real-time data status

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS for responsive design
- **Data Visualization**: D3.js for interactive charts
- **Icons**: Lucide React for modern icons
- **Build Tool**: Vite for fast development and building
- **Data Source**: USGS Earthquake API

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd earthquake-visualizer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📊 Data Visualization Features

### Time Series Chart
- Displays earthquake magnitude over time
- Gradient line with smooth curves
- Interactive data points with hover tooltips
- Color-coded points (red for major earthquakes, blue for smaller ones)
- Animated entrance effects

### Scatter Plot
- Shows relationship between earthquake magnitude and depth
- Color-coded points using viridis color scale
- Point size corresponds to earthquake magnitude
- Interactive tooltips with location and details

## 🎯 Usage

1. **Filter Data**: Use the filter panel to set:
   - Minimum and maximum magnitude
   - Start and end dates for the time range

2. **View Visualizations**: 
   - Switch between time series and scatter plot views
   - Hover over data points to see detailed information

3. **Browse Earthquake List**: 
   - Scroll through the list of recent earthquakes
   - Each card shows magnitude, location, time, and depth

## 🔧 Configuration

The application fetches data from the USGS Earthquake API with the following default settings:
- Maximum 100 earthquakes per request
- Minimum magnitude filter (adjustable)
- Date range filter (optional)
- GeoJSON format for geographic data

## 🌟 Key Components

- **Header**: Dynamic header with animated background elements
- **Filters**: Interactive filter controls for data customization
- **D3Chart**: Advanced data visualization with D3.js
- **EarthquakeList**: Grid layout of earthquake cards
- **Footer**: Simple footer with attribution

## 🎨 Design Features

- **Glassmorphism**: Modern glass-like UI elements with blur effects
- **Gradient Backgrounds**: Beautiful gradient overlays and backgrounds
- **Smooth Animations**: CSS transitions and D3.js animations
- **Responsive Layout**: Works seamlessly on all device sizes
- **Interactive Elements**: Hover effects and smooth transitions

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop computers (1280px and above)
- Tablets (768px to 1279px)
- Mobile devices (below 768px)

## 🔄 Real-time Updates

The application automatically fetches new data when:
- Filter parameters are changed
- Date range is modified
- Magnitude thresholds are adjusted

## 🚨 Error Handling

- Network error handling with user-friendly messages
- Loading states with animated spinners
- Graceful fallbacks for missing data
- Input validation for filter parameters

## 📈 Performance Optimizations

- Efficient D3.js rendering with proper cleanup
- Debounced API calls to prevent excessive requests
- Optimized re-renders with React hooks
- Lazy loading and code splitting ready

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
