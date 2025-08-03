import { useState, useEffect, useMemo, useCallback } from 'react'
import { ExternalLink, Calendar, BookOpen, Loader2, ArrowRight } from 'lucide-react'

const FeedSection = () => {
  const [feeds, setFeeds] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [displayCount, setDisplayCount] = useState(6)
  const [allFeeds, setAllFeeds] = useState([])
  const [error, setError] = useState(null)

  const getSourceName = useCallback((url) => {
    const sourceMap = {
      'bbci.co.uk': 'BBC News',
      'cnn.com': 'CNN',
      'npr.org': 'NPR',
      'reuters.com': 'Reuters',
      'feedburner.com/TechCrunch': 'TechCrunch',
      'wired.com': 'Wired',
      'arstechnica.com': 'Ars Technica',
      'poetryfoundation.org': 'Poetry Foundation',
      'theparisreview.org': 'The Paris Review',
      'newyorker.com': 'The New Yorker',
      'theatlantic.com': 'The Atlantic',
      'lrb.co.uk': 'London Review of Books',
      'nature.com': 'Nature',
      'sciencedaily.com': 'Science Daily',
      'sciencealert-latestnews': 'Science Alert',
      'bloomberg.com': 'Bloomberg',
      'feedburner.com/artsjournal': 'Arts Journal',
      'artsy.net': 'Artsy',
      'aeon.co': 'Aeon',
      'brainpickings.org': 'Brain Pickings'
    }
    for (const [key, value] of Object.entries(sourceMap)) {
      if (url.includes(key)) return value
    }
    return 'Unknown Source'
  }, [])

  const getCategory = useCallback((url) => {
    if (url.includes('bbci.co.uk') || url.includes('cnn.com') || url.includes('npr.org') || url.includes('reuters.com')) return 'news'
    if (url.includes('TechCrunch') || url.includes('wired.com') || url.includes('arstechnica.com')) return 'tech'
    if (url.includes('poetryfoundation.org') || url.includes('theparisreview.org') || url.includes('newyorker.com') || url.includes('theatlantic.com') || url.includes('lrb.co.uk')) return 'literature'
    if (url.includes('nature.com') || url.includes('sciencedaily.com') || url.includes('sciencealert')) return 'science'
    if (url.includes('bloomberg.com')) return 'business'
    if (url.includes('artsjournal') || url.includes('artsy.net')) return 'arts'
    if (url.includes('aeon.co') || url.includes('brainpickings.org')) return 'philosophy'
    return 'general'
  }, [])

  const getCategoryColor = useCallback((category) => {
    const colors = {
      news: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
      tech: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      literature: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
      science: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      business: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      arts: 'bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-400',
      philosophy: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400',
      general: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
    return colors[category] || colors.general
  }, [])

  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        const proxyUrl = 'https://api.allorigins.win/raw?url='
        const feedUrls = [
          'https://feeds.bbci.co.uk/news/rss.xml',
          'https://rss.cnn.com/rss/edition.rss',
          'https://feeds.npr.org/1001/rss.xml',
          'https://feeds.feedburner.com/TechCrunch/',
          'https://www.wired.com/feed/rss',
          'https://www.poetryfoundation.org/rss/poetry.rss',
          'https://theparisreview.org/feed/',
          'https://www.newyorker.com/feed/everything',
          'https://feeds.nature.com/nature/rss/current',
          'https://feeds.bloomberg.com/markets/news.rss',
          'https://aeon.co/feed.rss'
        ]
        
        const feedPromises = feedUrls.map(async (url, index) => {
          try {
            const controller = new AbortController()
            const timeoutId = setTimeout(() => controller.abort(), 5000)
            
            const response = await fetch(proxyUrl + encodeURIComponent(url), {
              signal: controller.signal
            })
            clearTimeout(timeoutId)
            
            const text = await response.text()
            const parser = new DOMParser()
            const xmlDoc = parser.parseFromString(text, 'text/xml')
            const items = xmlDoc.querySelectorAll('item')
            const articles = []
            
            items.forEach((item, itemIndex) => {
              if (itemIndex < 3) {
                const title = item.querySelector('title')?.textContent || 'Untitled'
                const link = item.querySelector('link')?.textContent || '#'
                const description = item.querySelector('description')?.textContent || item.querySelector('content\\:encoded')?.textContent || 'No description available'
                const pubDate = item.querySelector('pubDate')?.textContent || new Date().toISOString()
                const imgMatch = description.match(/<img[^>]+src="([^"]+)"/)
                const image = imgMatch ? imgMatch[1] : null
                
                articles.push({
                  title: title.replace(/<[^>]*>/g, ''),
                  excerpt: description.replace(/<[^>]*>/g, '').substring(0, 120) + '...',
                  date: new Date(pubDate).toLocaleDateString(),
                  url: link,
                  image,
                  source: getSourceName(url),
                  category: getCategory(url)
                })
              }
            })
            return articles
          } catch (error) {
            return []
          }
        })

        const allFeeds = await Promise.all(feedPromises)
        const flattenedFeeds = allFeeds.flat()
        setAllFeeds(flattenedFeeds)
        setFeeds(flattenedFeeds.slice(0, displayCount))
        setLoading(false)
      } catch (error) {
        setError('Failed to load feeds. Please try again later.')
        setLoading(false)
      }
    }
    fetchFeeds()
  }, [displayCount, getSourceName, getCategory])

  const loadMore = useCallback(async () => {
    setLoadingMore(true)
    await new Promise(resolve => setTimeout(resolve, 300))
    const newCount = displayCount + 6
    setDisplayCount(newCount)
    setFeeds(allFeeds.slice(0, newCount))
    setLoadingMore(false)
  }, [displayCount, allFeeds])

  const displayedFeeds = useMemo(() => feeds.slice(0, displayCount), [feeds, displayCount])

  if (error) {
    return (
      <div className="text-center text-red-600 dark:text-red-400">
        <BookOpen className="w-6 h-6 text-white mx-auto mb-4" />
        <h2 className="text-2xl font-lora font-semibold mb-2 text-white/95">Recommended Articles</h2>
        <p>{error}</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div>
        <div className="flex items-center gap-2 mb-6">
          <BookOpen className="w-6 h-6 text-white/90" />
          <h2 className="text-2xl font-lora font-semibold text-white/95">Recommended Articles</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="feed-card">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="w-6 h-6 text-white/90" />
        <h2 className="text-2xl font-lora font-semibold text-white/95">Recommended Articles</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedFeeds.map((feed, index) => (
          <div key={index} className="group feed-card">
            {feed.image && (
              <div className="relative overflow-hidden rounded-t-xl">
                <img 
                  src={feed.image} 
                  alt={feed.title}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(feed.category)}`}>
                    {feed.category}
                  </span>
                </div>
                <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                  {feed.source}
                </div>
              </div>
            )}
            <div className={`p-4 ${!feed.image ? 'pt-4' : ''}`}>
              <div className="flex items-center gap-2 mb-3">
                {!feed.image && (
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(feed.category)}`}>
                    {feed.category}
                  </span>
                )}
                <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                  {feed.source}
                </span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 mb-3 group-hover:text-blue-600">
                {feed.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">
                {feed.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                  <Calendar className="w-3 h-3" />
                  <span>{feed.date}</span>
                </div>
                <a
                  href={feed.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                >
                  <span>Read</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      {feeds.length < allFeeds.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMore}
            disabled={loadingMore}
            className="px-6 py-3 bg-white/90 hover:bg-white text-gray-900 rounded-xl font-medium flex items-center gap-2"
          >
            {loadingMore ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading...
              </>
            ) : (
              <>
                Load More Articles
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  )
}

export default FeedSection