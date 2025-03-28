import React from 'react'

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600">
      <h1 className="text-4xl font-bold text-white mb-4">Tailwind CSS Test</h1>
      <p className="text-lg text-white mb-6">
        If you can see this styled text and colorful background, Tailwind is
        working!
      </p>
      <button className="px-6 py-2 bg-white text-purple-600 font-semibold rounded shadow hover:bg-purple-100 transition-all">
        Test Button
      </button>
    </div>
  )
}

export default App
