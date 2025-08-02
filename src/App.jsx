import { useState, useEffect } from 'react'
import { Moon, Sun } from 'lucide-react'
import SearchBar from './components/SearchBar'
import ClockDisplay from './components/ClockDisplay'
import QuickLinks from './components/QuickLinks'
import FeedSection from './components/FeedSection'
import WelcomeMessage from './components/WelcomeMessage'
import { useState as useErrorState } from 'react'

function ErrorBoundary({ children }) {
  const [error, setError] = useErrorState(null)

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-red-400">
        <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
        <pre className="bg-gray-900 p-4 rounded-xl text-sm max-w-xl overflow-x-auto">{error.message || String(error)}</pre>
      </div>
    )
  }

  return (
    <ErrorCatcher setError={setError}>{children}</ErrorCatcher>
  )
}

class ErrorCatcher extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }
  componentDidCatch(error, errorInfo) {
    if (this.props.setError) this.props.setError(error)
  }
  render() {
    if (this.state.hasError) return null
    return this.props.children
  }
}

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
    <ErrorBoundary>
      <div className="min-h-screen blur-bg relative overflow-hidden">
        {/* Dark mode toggle */}
        <button
          onClick={toggleDarkMode}
          className="fixed top-6 right-6 z-50 p-3 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-lg border border-gray-200/30 dark:border-gray-700/30 hover:bg-white/95 dark:hover:bg-gray-800/95"
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
    </ErrorBoundary>
  )
}

export default App
