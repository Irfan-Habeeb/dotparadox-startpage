import React from 'react'
import { useState, useEffect } from 'react'
import { Moon, Sun, Menu } from 'lucide-react'
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
  const [showSettings, setShowSettings] = useState(false)
  const [backgroundType, setBackgroundType] = useState(() => {
    const saved = localStorage.getItem('backgroundType')
    return saved || 'gradient'
  })
  const [gradientColors, setGradientColors] = useState(() => {
    const saved = localStorage.getItem('gradientColors')
    return saved ? JSON.parse(saved) : ['#1a1a2e', '#16213e']
  })
  const [staticColor, setStaticColor] = useState(() => {
    const saved = localStorage.getItem('staticColor')
    return saved || '#3e51b5'
  })

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  useEffect(() => {
    localStorage.setItem('backgroundType', backgroundType)
  }, [backgroundType])

  useEffect(() => {
    localStorage.setItem('gradientColors', JSON.stringify(gradientColors))
  }, [gradientColors])

  useEffect(() => {
    localStorage.setItem('staticColor', staticColor)
  }, [staticColor])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const toggleSettings = () => {
    setShowSettings(!showSettings)
  }

  const updateGradientColor = (index, color) => {
    const newColors = [...gradientColors]
    newColors[index] = color
    setGradientColors(newColors)
  }

  const getBackgroundStyle = () => {
    if (backgroundType === 'static') {
      return { background: staticColor }
    } else {
      return {
        background: `linear-gradient(135deg, ${gradientColors[0]} 0%, ${gradientColors[1]} 100%)`,
        backgroundSize: '400% 400%',
        animation: 'gradientShift 15s ease-in-out infinite'
      }
    }
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen relative overflow-hidden" style={getBackgroundStyle()}>
        {/* Menu button */}
        <button
          onClick={toggleSettings}
          className="fixed top-6 left-6 z-50 p-3 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-lg border border-gray-200/30 dark:border-gray-700/30 hover:bg-white/95 dark:hover:bg-gray-800/95"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Dark mode toggle */}
        <button
          onClick={toggleDarkMode}
          className="fixed top-6 right-6 z-50 p-3 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-lg border border-gray-200/30 dark:border-gray-700/30 hover:bg-white/95 dark:hover:bg-gray-800/95"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Settings Modal */}
        {showSettings && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={toggleSettings}></div>
            <div className="relative bg-white/95 dark:bg-gray-800/95 rounded-xl shadow-xl border border-white/30 dark:border-gray-700/30 p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-lora font-semibold text-blue-800 mb-4">Settings</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">Background Type</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="background" 
                        value="gradient" 
                        checked={backgroundType === 'gradient'}
                        onChange={(e) => setBackgroundType(e.target.value)}
                        className="mr-2" 
                      />
                      <span className="text-gray-700 dark:text-gray-300">Gradient (Moving)</span>
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="radio" 
                        name="background" 
                        value="static" 
                        checked={backgroundType === 'static'}
                        onChange={(e) => setBackgroundType(e.target.value)}
                        className="mr-2" 
                      />
                      <span className="text-gray-700 dark:text-gray-300">Static</span>
                    </label>
                  </div>
                </div>

                {backgroundType === 'gradient' && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">Gradient Colors</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Color 1</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={gradientColors[0]}
                            onChange={(e) => updateGradientColor(0, e.target.value)}
                            className="w-12 h-8 rounded border"
                          />
                          <input
                            type="text"
                            value={gradientColors[0]}
                            onChange={(e) => updateGradientColor(0, e.target.value)}
                            className="flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white/80 dark:bg-gray-700/80"
                            placeholder="#3e51b5"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Color 2</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={gradientColors[1]}
                            onChange={(e) => updateGradientColor(1, e.target.value)}
                            className="w-12 h-8 rounded border"
                          />
                          <input
                            type="text"
                            value={gradientColors[1]}
                            onChange={(e) => updateGradientColor(1, e.target.value)}
                            className="flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white/80 dark:bg-gray-700/80"
                            placeholder="#9B51E0"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {backgroundType === 'static' && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">Static Color</h3>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={staticColor}
                        onChange={(e) => setStaticColor(e.target.value)}
                        className="w-12 h-8 rounded border"
                      />
                      <input
                        type="text"
                        value={staticColor}
                        onChange={(e) => setStaticColor(e.target.value)}
                        className="flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white/80 dark:bg-gray-700/80"
                        placeholder="#3e51b5"
                      />
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={toggleSettings}
                    className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

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
