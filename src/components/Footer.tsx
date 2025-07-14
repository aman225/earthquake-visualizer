const Footer = () => {
  return (
    <footer className="bg-white border-t mt-12 shadow-inner py-4">
      <div className="container mx-auto text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Earthquake Visualizer · Data from USGS API
      </div>
    </footer>
  )
}

export default Footer