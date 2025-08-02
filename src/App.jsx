import { useState, useEffect } from 'react'
import { Moon, Sun } from 'lucide-react'
import SearchBar from './components/SearchBar'
import ClockDisplay from './components/ClockDisplay'
import QuickLinks from './components/QuickLinks'
import FeedSection from './components/FeedSection'
import WelcomeMessage from './components/WelcomeMessage'

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    return saved ? JSON.parse(saved) : false
  })

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/5 dark:bg-black/20"></div>
      
      {/* Dark mode toggle */}
      <button
        onClick={toggleDarkMode}
        className="fixed top-6 right-6 z-50 p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-300 hover:scale-110"
      >
        {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <WelcomeMessage />
          <SearchBar />
          <ClockDisplay />
          <QuickLinks />
          <FeedSection />
        </div>
      </div>
    </div>
  )
}

export default App
