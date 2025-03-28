import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
export const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-24 overflow-hidden">
      {/* Basketball icons background */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          >
            <div size={Math.random() * 40 + 20} />
          </motion.div>
        ))}
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
            }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              NBA Stats Visualizer
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300">
              Dive into comprehensive NBA statistics with interactive
              visualizations and in-depth analysis
            </p>
          </motion.div>
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.3,
            }}
          >
            <Link
              to="/player-stats"
              className="bg-gradient-to-r from-yellow-500 to-red-500 text-white px-8 py-3 rounded-md font-medium hover:from-yellow-600 hover:to-red-600 transition-colors"
            >
              Player Statistics
            </Link>
            <Link
              to="/team-stats"
              className="bg-gradient-to-r from-red-500 to-purple-600 text-white px-8 py-3 rounded-md font-medium hover:from-red-600 hover:to-purple-700 transition-colors"
            >
              Team Analytics
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
