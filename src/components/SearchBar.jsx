import { useState } from 'react'
import { Search, ChevronDown } from 'lucide-react'

const SearchBar = () => {
  const [searchEngine, setSearchEngine] = useState('google')
  const [query, setQuery] = useState('')

  const searchEngines = [
    { name: 'Google', value: 'google', url: 'https://www.google.com/search?q=' },
    { name: 'DuckDuckGo', value: 'duckduckgo', url: 'https://duckduckgo.com/?q=' },
    { name: 'Bing', value: 'bing', url: 'https://www.bing.com/search?q=' },
    { name: 'YouTube', value: 'youtube', url: 'https://www.youtube.com/results?search_query=' },
    { name: 'GitHub', value: 'github', url: 'https://github.com/search?q=' },
    { name: 'Stack Overflow', value: 'stackoverflow', url: 'https://stackoverflow.com/search?q=' },
    { name: 'Reddit', value: 'reddit', url: 'https://www.reddit.com/search/?q=' },
    { name: 'Wikipedia', value: 'wikipedia', url: 'https://en.wikipedia.org/wiki/Special:Search?search=' },
    { name: 'Amazon', value: 'amazon', url: 'https://www.amazon.com/s?k=' },
    { name: 'Twitter', value: 'twitter', url: 'https://twitter.com/search?q=' },
    { name: 'LinkedIn', value: 'linkedin', url: 'https://www.linkedin.com/search/results/?keywords=' },
    { name: 'Medium', value: 'medium', url: 'https://medium.com/search?q=' },
    { name: 'Dev.to', value: 'devto', url: 'https://dev.to/search?q=' },
    { name: 'Product Hunt', value: 'producthunt', url: 'https://www.producthunt.com/search?q=' },
    { name: 'Hacker News', value: 'hackernews', url: 'https://hn.algolia.com/?q=' },
    { name: 'Quora', value: 'quora', url: 'https://www.quora.com/search?q=' },
    { name: 'Pinterest', value: 'pinterest', url: 'https://www.pinterest.com/search/pins/?q=' },
    { name: 'Spotify', value: 'spotify', url: 'https://open.spotify.com/search/' },
    { name: 'Netflix', value: 'netflix', url: 'https://www.netflix.com/search?q=' },
    { name: 'IMDb', value: 'imdb', url: 'https://www.imdb.com/find?q=' }
  ]

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      const engine = searchEngines.find(se => se.value === searchEngine)
      window.open(engine.url + encodeURIComponent(query), '_blank')
    }
  }

  return (
    <div className="max-w-2xl mx-auto animate-slide-up">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the web..."
            className="search-input w-full pl-12 pr-20"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <select
              value={searchEngine}
              onChange={(e) => setSearchEngine(e.target.value)}
              className="bg-transparent text-sm text-gray-600 dark:text-gray-400 focus:outline-none"
            >
              {searchEngines.map(engine => (
                <option key={engine.value} value={engine.value}>
                  {engine.name}
                </option>
              ))}
            </select>
            <ChevronDown className="inline w-4 h-4 ml-1" />
          </div>
        </div>
      </form>
    </div>
  )
}

export default SearchBar