import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Icon } from 'lucide-react'
import { basketball } from '@lucide/lab'

export const HeroSection = () => {
  // Predefined positions for background icons
  const iconPositions = [
    { top: '10%', left: '5%' },
    { top: '20%', left: '80%' },
    { top: '50%', left: '40%' },
    { top: '70%', left: '15%' },
    { top: '80%', left: '75%' },
  ]

  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-24 overflow-hidden">
      {/* basketball icons background */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {iconPositions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ top: pos.top, left: pos.left }}
            animate={{ rotate: [0, 360] }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <Icon iconNode={basketball} size={40} color="white" />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Animated title and subtitle */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              NBA Stats Visualizer
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300">
              Dive into comprehensive NBA statistics with interactive
              visualizations and in-depth analysis
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Link
              to="/player-stats"
              aria-label="Explore Player Statistics"
              className="bg-gradient-to-r from-yellow-500 to-red-500 text-white px-10 py-4 rounded-lg font-medium text-lg hover:from-yellow-600 hover:to-red-600 transition-all transform hover:scale-105"
            >
              Player Statistics
            </Link>
            <Link
              to="/team-stats"
              aria-label="Explore Team Analytics"
              className="bg-gradient-to-r from-red-500 to-purple-600 text-white px-10 py-4 rounded-lg font-medium text-lg hover:from-red-600 hover:to-purple-700 transition-all transform hover:scale-105"
            >
              Team Analytics
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-gray-400"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-sm">Scroll Down</span>
        <div className="w-4 h-4 mx-auto mt-1 border-2 border-gray-400 rounded-full animate-bounce"></div>
      </motion.div>
    </section>
  )
}
