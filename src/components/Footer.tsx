export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold">NBA Stats Visualizer</h3>
            <p className="text-sm text-gray-400">
              Your source for NBA statistics and insights
            </p>
          </div>
          <div className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} NBA Stats Visualizer. All rights
            reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
