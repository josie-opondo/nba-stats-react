import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HeroSection } from '../components/HeroSection'
import { BarChart2Icon, UsersIcon, TrendingUpIcon } from 'lucide-react'
export const Home = () => {
  const features = [
    {
      icon: <UsersIcon size={24} />,
      title: 'Player Statistics',
      description:
        'Comprehensive player stats from across the league with advanced filtering and search capabilities.',
      link: '/player-stats',
    },
    {
      icon: <BarChart2Icon size={24} />,
      title: 'Team Analytics',
      description:
        'Dive deep into team performance metrics with interactive visualizations and comparison tools.',
      link: '/team-stats',
    },
    {
      icon: <TrendingUpIcon size={24} />,
      title: 'Performance Trends',
      description:
        'Track player and team performance over time with detailed trend analysis and projections.',
      link: '/player-stats',
    },
  ]
  return (
    <div className="w-full">
      <HeroSection />
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Powerful Statistics at Your Fingertips
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.2,
                }}
              >
                <div className="bg-gradient-to-r from-yellow-500 to-red-500 w-12 h-12 rounded-full flex items-center justify-center text-white mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <Link
                  to={feature.link}
                  className="text-red-600 font-medium hover:text-red-700 flex items-center"
                >
                  Explore
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Call to Action */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Dive Into NBA Stats?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Get started with our comprehensive NBA statistics platform and
            discover insights about your favorite players and teams.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/player-stats"
              className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-md font-medium hover:from-red-700 hover:to-red-800 transition-colors"
            >
              Explore Player Stats
            </Link>
            <Link
              to="/team-stats"
              className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-3 rounded-md font-medium hover:from-purple-700 hover:to-purple-800 transition-colors"
            >
              View Team Analytics
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
