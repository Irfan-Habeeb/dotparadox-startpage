import { useState, useEffect } from 'react'
import { ExternalLink, Calendar, User } from 'lucide-react'

const FeedSection = () => {
  const [feeds, setFeeds] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching feeds
    setTimeout(() => {
      setFeeds([
        {
          title: "The Art of Digital Poetry",
          excerpt: "Exploring how technology transforms the ancient art of poetry...",
          author: "Irfan Habeeb",
          date: "2024-01-15",
          url: "https://irfanhabeeb.com/",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop"
        },
        {
          title: "Modern Verse in the Digital Age",
          excerpt: "How contemporary poets are embracing digital platforms...",
          author: "Poetry Foundation",
          date: "2024-01-14",
          url: "https://www.poetryfoundation.org/",
          image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&h=200&fit=crop"
        },
        {
          title: "The Paris Review - Winter 2024",
          excerpt: "Latest collection of contemporary poetry and prose...",
          author: "The Paris Review",
          date: "2024-01-13",
          url: "https://theparisreview.org/",
          image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=200&fit=crop"
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  if (loading) {
    return (
      <div className="card p-6 animate-fade-in">
        <h2 className="text-2xl font-linertinas mb-4">Latest Poetry</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="feed-card animate-pulse">
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
      <h2 className="text-2xl font-linertinas mb-4">Latest Poetry</h2>
      <div className="space-y-4">
        {feeds.map((feed, index) => (
          <div key={index} className="feed-card">
            <div className="flex gap-4">
              <img 
                src={feed.image} 
                alt={feed.title}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-medium mb-2 text-gray-900 dark:text-gray-100">
                  {feed.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {feed.excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {feed.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(feed.date).toLocaleDateString()}
                  </div>
                  <a
                    href={feed.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-primary transition-colors duration-200"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Read
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FeedSection