import { motion } from 'framer-motion'

const About = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-lg rounded-2xl p-8 max-w-2xl text-center"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-4">About Us</h1>
        <p className="text-gray-600 leading-relaxed">
          Welcome to our NBA Stats Visualizer! Our platform helps you explore,
          compare, and analyze team and player statistics with intuitive charts
          and filters. Whether you're a basketball enthusiast or an analyst,
          we've got the insights you need.
        </p>
        <div className="mt-6">
          <a
            href="/"
            className="px-4 py-2 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition"
          >
            Go Home
          </a>
        </div>
      </motion.div>
    </div>
  )
}

export default About
