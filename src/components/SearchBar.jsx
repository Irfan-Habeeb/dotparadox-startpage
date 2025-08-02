import { useState, useRef, useEffect } from 'react'
import { Search, ChevronDown, Globe, Youtube, Github, Twitter, Linkedin, BookOpen, ShoppingCart, Film, Music, Code, MessageSquare, Calendar, MapPin, Heart, Zap, Coffee, Camera, Gamepad2, Palette } from 'lucide-react'

const SearchBar = () => {
  const [searchEngine, setSearchEngine] = useState('google')
  const [query, setQuery] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const searchEngines = [
    { 
      name: 'Google', 
      value: 'google', 
      url: 'https://www.google.com/search?q=',
      icon: Globe,
      color: 'text-blue-500'
    },
    { 
      name: 'YouTube', 
      value: 'youtube', 
      url: 'https://www.youtube.com/results?search_query=',
      icon: Youtube,
      color: 'text-red-500'
    },
    { 
      name: 'GitHub', 
      value: 'github', 
      url: 'https://github.com/search?q=',
      icon: Github,
      color: 'text-gray-800 dark:text-gray-200'
    },
    { 
      name: 'Twitter', 
      value: 'twitter', 
      url: 'https://twitter.com/search?q=',
      icon: Twitter,
      color: 'text-blue-400'
    },
    { 
      name: 'LinkedIn', 
      value: 'linkedin', 
      url: 'https://www.linkedin.com/search/results/?keywords=',
      icon: Linkedin,
      color: 'text-blue-600'
    },
    { 
      name: 'Stack Overflow', 
      value: 'stackoverflow', 
      url: 'https://stackoverflow.com/search?q=',
      icon: Code,
      color: 'text-orange-500'
    },
    { 
      name: 'Reddit', 
      value: 'reddit', 
      url: 'https://www.reddit.com/search/?q=',
      icon: MessageSquare,
      color: 'text-orange-600'
    },
    { 
      name: 'Wikipedia', 
      value: 'wikipedia', 
      url: 'https://en.wikipedia.org/wiki/Special:Search?search=',
      icon: BookOpen,
      color: 'text-gray-600 dark:text-gray-400'
    },
    { 
      name: 'Amazon', 
      value: 'amazon', 
      url: 'https://www.amazon.com/s?k=',
      icon: ShoppingCart,
      color: 'text-orange-500'
    },
    { 
      name: 'Medium', 
      value: 'medium', 
      url: 'https://medium.com/search?q=',
      icon: Coffee,
      color: 'text-green-600'
    },
    { 
      name: 'Dev.to', 
      value: 'devto', 
      url: 'https://dev.to/search?q=',
      icon: Code,
      color: 'text-black dark:text-white'
    },
    { 
      name: 'Product Hunt', 
      value: 'producthunt', 
      url: 'https://www.producthunt.com/search?q=',
      icon: Zap,
      color: 'text-red-500'
    },
    { 
      name: 'Hacker News', 
      value: 'hackernews', 
      url: 'https://hn.algolia.com/?q=',
      icon: Code,
      color: 'text-orange-500'
    },
    { 
      name: 'Quora', 
      value: 'quora', 
      url: 'https://www.quora.com/search?q=',
      icon: MessageSquare,
      color: 'text-red-500'
    },
    { 
      name: 'Pinterest', 
      value: 'pinterest', 
      url: 'https://www.pinterest.com/search/pins/?q=',
      icon: Heart,
      color: 'text-red-600'
    },
    { 
      name: 'Spotify', 
      value: 'spotify', 
      url: 'https://open.spotify.com/search/',
      icon: Music,
      color: 'text-green-500'
    },
    { 
      name: 'Netflix', 
      value: 'netflix', 
      url: 'https://www.netflix.com/search?q=',
      icon: Film,
      color: 'text-red-600'
    },
    { 
      name: 'IMDb', 
      value: 'imdb', 
      url: 'https://www.imdb.com/find?q=',
      icon: Camera,
      color: 'text-yellow-500'
    },
    { 
      name: 'DuckDuckGo', 
      value: 'duckduckgo', 
      url: 'https://duckduckgo.com/?q=',
      icon: Globe,
      color: 'text-yellow-500'
    },
    { 
      name: 'Bing', 
      value: 'bing', 
      url: 'https://www.bing.com/search?q=',
      icon: Globe,
      color: 'text-blue-600'
    }
  ]

  const currentEngine = searchEngines.find(se => se.value === searchEngine)

  const performSearch = () => {
    if (query.trim() && currentEngine) {
      const searchUrl = currentEngine.url + encodeURIComponent(query.trim())
      window.open(searchUrl, '_blank')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    performSearch()
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      performSearch()
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search the web..."
            className="search-input w-full pl-12 pr-20"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          
          {/* Search Engine Dropdown */}
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 bg-white/90 dark:bg-gray-800/90 rounded-lg px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-700 transition-colors"
            >
              {currentEngine && (
                <>
                  <currentEngine.icon className={`w-4 h-4 ${currentEngine.color}`} />
                  <span className="hidden sm:inline">{currentEngine.name}</span>
                </>
              )}
              <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-xl shadow-xl border border-gray-200/30 dark:border-gray-700/30 z-50 max-h-80 overflow-y-auto">
                <div className="p-2">
                  {searchEngines.map((engine) => {
                    const IconComponent = engine.icon
                    return (
                      <button
                        key={engine.value}
                        type="button"
                        onClick={() => {
                          setSearchEngine(engine.value)
                          setIsDropdownOpen(false)
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                          searchEngine === engine.value ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                        }`}
                      >
                        <IconComponent className={`w-4 h-4 ${engine.color}`} />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {engine.name}
                        </span>
                        {searchEngine === engine.value && (
                          <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}

export default SearchBar