import { useState, useEffect } from 'react'
import { ExternalLink, Calendar, User, BookOpen } from 'lucide-react'

const FeedSection = () => {
  const [feeds, setFeeds] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        // Fetch RSS feeds using a CORS proxy
        const proxyUrl = 'https://api.allorigins.win/raw?url='
        
        const feedUrls = [
          'https://irfanhabeeb.com/feed/', // Your WordPress blog
          'https://www.poetryfoundation.org/rss/poetry.rss',
          'https://theparisreview.org/feed/',
          'https://www.newyorker.com/feed/everything',
          'https://www.theatlantic.com/feed/all/'
        ]

        const feedPromises = feedUrls.map(async (url, index) => {
          try {
            const response = await fetch(proxyUrl + encodeURIComponent(url))
            const text = await response.text()
            
            // Simple RSS parser
            const parser = new DOMParser()
            const xmlDoc = parser.parseFromString(text, 'text/xml')
            
            const items = xmlDoc.querySelectorAll('item')
            const articles = []
            
            items.forEach((item, itemIndex) => {
              if (itemIndex < 3) { // Get first 3 articles from each feed
                const title = item.querySelector('title')?.textContent || 'Untitled'
                const link = item.querySelector('link')?.textContent || '#'
                const description = item.querySelector('description')?.textContent || 
                                 item.querySelector('content\\:encoded')?.textContent || 
                                 'No description available'
                const pubDate = item.querySelector('pubDate')?.textContent || new Date().toISOString()
                const author = item.querySelector('dc\\:creator')?.textContent || 
                             item.querySelector('author')?.textContent || 
                             'Unknown Author'
                
                // Extract image from description or use default
                const imgMatch = description.match(/<img[^>]+src="([^"]+)"/)
                const image = imgMatch ? imgMatch[1] : `https://images.unsplash.com/photo-${1500000000000 + index * 1000000 + itemIndex}?w=400&h=200&fit=crop`
                
                articles.push({
                  title: title.replace(/<[^>]*>/g, ''), // Remove HTML tags
                  excerpt: description.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
                  author,
                  date: new Date(pubDate).toLocaleDateString(),
                  url: link,
                  image,
                  source: getSourceName(url)
                })
              }
            })
            
            return articles
          } catch (error) {
            console.error(`Error fetching ${url}:`, error)
            return []
          }
        })

        const allFeeds = await Promise.all(feedPromises)
        const flattenedFeeds = allFeeds.flat().slice(0, 12) // Get top 12 articles
        setFeeds(flattenedFeeds)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching feeds:', error)
        // Fallback to sample data
        setFeeds([
          {
            title: "Latest from Irfan Habeeb's Blog",
            excerpt: "Exploring the intersection of technology and poetry in the digital age...",
            author: "Irfan Habeeb",
            date: new Date().toLocaleDateString(),
            url: "https://irfanhabeeb.com/",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop",
            source: "irfanhabeeb.com"
          },
          {
            title: "Poetry Foundation - Featured Works",
            excerpt: "Discover contemporary poetry and literary insights from the Poetry Foundation...",
            author: "Poetry Foundation",
            date: new Date().toLocaleDateString(),
            url: "https://www.poetryfoundation.org/",
            image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&h=200&fit=crop",
            source: "poetryfoundation.org"
          },
          {
            title: "The Paris Review - Literary Excellence",
            excerpt: "Latest essays, poetry, and fiction from The Paris Review...",
            author: "The Paris Review",
            date: new Date().toLocaleDateString(),
            url: "https://theparisreview.org/",
            image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=200&fit=crop",
            source: "theparisreview.org"
          }
        ])
        setLoading(false)
      }
    }

    fetchFeeds()
  }, [])

  const getSourceName = (url) => {
    if (url.includes('irfanhabeeb.com')) return 'irfanhabeeb.com'
    if (url.includes('poetryfoundation.org')) return 'poetryfoundation.org'
    if (url.includes('theparisreview.org')) return 'theparisreview.org'
    if (url.includes('newyorker.com')) return 'newyorker.com'
    if (url.includes('theatlantic.com')) return 'theatlantic.com'
    return 'Unknown Source'
  }

  if (loading) {
    return (
      <div className="card p-6 animate-fade-in">
        <div className="flex items-center gap-2 mb-6">
          <BookOpen className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-linertinas">Latest Poetry & Literature</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="feed-card animate-pulse">
              <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
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
    <div className="card p-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-linertinas">Latest Poetry & Literature</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {feeds.map((feed, index) => (
          <div key={index} className="feed-card group">
            <div className="relative overflow-hidden rounded-lg mb-4">
              <img 
                src={feed.image} 
                alt={feed.title}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  e.target.src = `https://images.unsplash.com/photo-${1500000000000 + index * 1000000}?w=400&h=200&fit=crop`
                }}
              />
              <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                {feed.source}
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-primary transition-colors duration-200">
                {feed.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                {feed.excerpt}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
                <div className="flex items-center gap-2">
                  <User className="w-3 h-3" />
                  <span className="truncate">{feed.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-3 h-3" />
                  <span>{feed.date}</span>
                </div>
              </div>
              <a
                href={feed.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors duration-200"
              >
                <ExternalLink className="w-3 h-3" />
                Read Article
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FeedSection