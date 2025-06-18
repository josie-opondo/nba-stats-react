import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MenuIcon, XIcon } from 'lucide-react'

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  const closeMenu = () => {
    setIsMenuOpen(false)
  }
  const headerClasses = `
    sticky top-0 z-50 w-full transition-all duration-300
    ${scrolled ? 'py-2 shadow-md' : 'py-4'}
    bg-gradient-to-r from-yellow-500 via-red-500 to-purple-600
  `
  const linkClasses = (isActive: boolean) => `
    relative px-4 py-2 font-medium text-white hover:text-white/90 transition-all
    ${isActive ? 'font-bold' : ''}
    after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white
    after:transform after:scale-x-0 after:origin-left after:transition-transform
    ${isActive ? 'after:scale-x-100' : ''}
  `
  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <NavLink to="/" className="flex items-center space-x-2 text-white">
            <motion.img
              src="./src/assets/logo.png" // Adjust the path if needed
              alt="NBA Stats Visualizer Logo"
              className="w-20 h-20"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
            <span className="text-xl font-bold">NBA Stats Visualizer</span>
          </NavLink>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            <NavLink
              to="/"
              className={({ isActive }) => linkClasses(isActive)}
              end
            >
              Home
            </NavLink>
            <NavLink
              to="/player-stats"
              className={({ isActive }) => linkClasses(isActive)}
            >
              Player Stats
            </NavLink>
            <NavLink
              to="/team-stats"
              className={({ isActive }) => linkClasses(isActive)}
            >
              Team Stats
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) => linkClasses(isActive)}
            >
              About
            </NavLink>
          </nav>
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.nav
            className="md:hidden py-4 flex flex-col space-y-2"
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.3,
            }}
          >
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block py-2 px-4 text-white ${isActive ? 'font-bold border-b-2 border-white' : ''}`
              }
              onClick={closeMenu}
              end
            >
              Home
            </NavLink>
            <NavLink
              to="/player-stats"
              className={({ isActive }) =>
                `block py-2 px-4 text-white ${isActive ? 'font-bold border-b-2 border-white' : ''}`
              }
              onClick={closeMenu}
            >
              Player Stats
            </NavLink>
            <NavLink
              to="/team-stats"
              className={({ isActive }) =>
                `block py-2 px-4 text-white ${isActive ? 'font-bold border-b-2 border-white' : ''}`
              }
              onClick={closeMenu}
            >
              Team Stats
            </NavLink>
          </motion.nav>
        )}
      </div>
    </header>
  )
}
