import { motion } from 'framer-motion'

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-6xl font-bold text-purple-600">404</h1>
        <p className="text-lg text-gray-600 mt-2">Oops! Page not found.</p>
        <motion.a
          href="/"
          className="mt-6 px-4 py-2 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition"
          whileHover={{ scale: 1.05 }}
        >
          Go Back Home
        </motion.a>
      </motion.div>
    </div>
  )
}

export default NotFound
