import { useState, useEffect } from 'react'
import { BookOpen, PenTool, Settings, Globe, Music, Camera, Code, Heart, Plus, Edit2, X } from 'lucide-react'

const QuickLinks = () => {
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('quickLinks')
    return saved ? JSON.parse(saved) : [
      {
        name: 'Writing',
        icon: 'PenTool',
        links: [
          { name: 'Notion', url: 'https://notion.so', favicon: 'https://notion.so/favicon.ico' },
          { name: 'Medium', url: 'https://medium.com', favicon: 'https://medium.com/favicon.ico' },
          { name: 'Substack', url: 'https://substack.com', favicon: 'https://substack.com/favicon.ico' },
          { name: 'WordPress', url: 'https://wordpress.com', favicon: 'https://wordpress.com/favicon.ico' }
        ]
      },
      {
        name: 'Reading',
        icon: 'BookOpen',
        links: [
          { name: 'Goodreads', url: 'https://goodreads.com', favicon: 'https://goodreads.com/favicon.ico' },
          { name: 'Pocket', url: 'https://getpocket.com', favicon: 'https://getpocket.com/favicon.ico' },
          { name: 'Instapaper', url: 'https://instapaper.com', favicon: 'https://instapaper.com/favicon.ico' },
          { name: 'Feedly', url: 'https://feedly.com', favicon: 'https://feedly.com/favicon.ico' }
        ]
      },
      {
        name: 'Tools',
        icon: 'Settings',
        links: [
          { name: 'GitHub', url: 'https://github.com', favicon: 'https://github.com/favicon.ico' },
          { name: 'Figma', url: 'https://figma.com', favicon: 'https://figma.com/favicon.ico' },
          { name: 'Notion', url: 'https://notion.so', favicon: 'https://notion.so/favicon.ico' },
          { name: 'Linear', url: 'https://linear.app', favicon: 'https://linear.app/favicon.ico' }
        ]
      },
      {
        name: 'Social',
        icon: 'Globe',
        links: [
          { name: 'Twitter', url: 'https://twitter.com', favicon: 'https://twitter.com/favicon.ico' },
          { name: 'LinkedIn', url: 'https://linkedin.com', favicon: 'https://linkedin.com/favicon.ico' },
          { name: 'Instagram', url: 'https://instagram.com', favicon: 'https://instagram.com/favicon.ico' },
          { name: 'Discord', url: 'https://discord.com', favicon: 'https://discord.com/favicon.ico' }
        ]
      }
    ]
  })
  const [editing, setEditing] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [newLink, setNewLink] = useState({ name: '', url: '' })

  const iconMap = {
    PenTool,
    BookOpen,
    Settings,
    Globe,
    Music,
    Camera,
    Code,
    Heart
  }

  useEffect(() => {
    localStorage.setItem('quickLinks', JSON.stringify(categories))
  }, [categories])

  // Fetch favicons for existing links that don't have them
  useEffect(() => {
    const fetchMissingFavicons = async () => {
      const updatedCategories = [...categories]
      let hasChanges = false

      for (let categoryIndex = 0; categoryIndex < updatedCategories.length; categoryIndex++) {
        const category = updatedCategories[categoryIndex]
        for (let linkIndex = 0; linkIndex < category.links.length; linkIndex++) {
          const link = category.links[linkIndex]
          if (!link.favicon) {
            const favicon = await getFavicon(link.url)
            if (favicon) {
              updatedCategories[categoryIndex].links[linkIndex].favicon = favicon
              hasChanges = true
            }
          }
        }
      }

      if (hasChanges) {
        setCategories(updatedCategories)
      }
    }

    fetchMissingFavicons()
  }, [])

  const getFavicon = async (url) => {
    try {
      const domain = new URL(url.startsWith('http') ? url : `https://${url}`).hostname
      // Try multiple favicon URLs for better compatibility
      const faviconUrls = [
        `https://${domain}/favicon.ico`,
        `https://${domain}/favicon.png`,
        `https://www.${domain}/favicon.ico`,
        `https://www.${domain}/favicon.png`
      ]
      
      // Test if favicon exists
      for (const faviconUrl of faviconUrls) {
        try {
          const response = await fetch(faviconUrl, { method: 'HEAD' })
          if (response.ok) {
            return faviconUrl
          }
        } catch {
          continue
        }
      }
      return null
    } catch {
      return null
    }
  }

  const addLink = async (categoryIndex) => {
    if (newLink.name && newLink.url) {
      let url = newLink.url
      if (!url.startsWith('http')) {
        url = `https://${url}`
      }
      
      const favicon = await getFavicon(url)
      
      const updatedCategories = [...categories]
      updatedCategories[categoryIndex].links.push({ 
        name: newLink.name, 
        url: url, 
        favicon: favicon 
      })
      setCategories(updatedCategories)
      setNewLink({ name: '', url: '' })
    }
  }

  const removeLink = (categoryIndex, linkIndex) => {
    const updatedCategories = [...categories]
    updatedCategories[categoryIndex].links.splice(linkIndex, 1)
    setCategories(updatedCategories)
  }

  const addCategory = () => {
    const newCategory = {
      name: 'New Category',
      icon: 'Globe',
      links: []
    }
    setCategories([...categories, newCategory])
  }

  const removeCategory = (categoryIndex) => {
    const updatedCategories = categories.filter((_, index) => index !== categoryIndex)
    setCategories(updatedCategories)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-lora font-semibold text-white text-center">Quick Links</h2>
        <button
          onClick={() => setEditing(!editing)}
          className="p-2 bg-white/20 hover:bg-white/30 text-white rounded-lg"
        >
          <Edit2 className="w-4 h-4" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((category, categoryIndex) => {
          const IconComponent = iconMap[category.icon]
          return (
            <div key={category.name} className="card p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <IconComponent className="w-5 h-5 text-white" />
                  <h3 className="font-medium text-white">{category.name}</h3>
                </div>
                {editing && (
                  <button
                    onClick={() => removeCategory(categoryIndex)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {category.links.map((link, linkIndex) => (
                  <div key={link.name} className="relative group">
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-3 bg-white/20 hover:bg-white/30 rounded-lg text-center transition-all"
                    >
                      <div className="w-8 h-8 mx-auto mb-2 flex items-center justify-center">
                        {link.favicon ? (
                          <img 
                            src={link.favicon} 
                            alt={link.name}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.target.style.display = 'none'
                              e.target.nextSibling.style.display = 'block'
                            }}
                          />
                        ) : null}
                        <Globe className="w-full h-full text-white" style={{ display: link.favicon ? 'none' : 'block' }} />
                      </div>
                      <span className="text-xs text-white font-medium">{link.name}</span>
                    </a>
                    {editing && (
                      <button
                        onClick={() => removeLink(categoryIndex, linkIndex)}
                        className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ))}
                
                {editing && (
                  <div className="p-3 bg-white/10 hover:bg-white/20 rounded-lg text-center cursor-pointer border-2 border-dashed border-white/30">
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="Name"
                        value={newLink.name}
                        onChange={(e) => setNewLink({ ...newLink, name: e.target.value })}
                        className="w-full px-2 py-1 text-xs border border-white/30 rounded bg-white/20 text-white placeholder-white/50"
                      />
                      <input
                        type="text"
                        placeholder="URL (auto-adds https://)"
                        value={newLink.url}
                        onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                        className="w-full px-2 py-1 text-xs border border-white/30 rounded bg-white/20 text-white placeholder-white/50"
                      />
                      <button
                        onClick={() => addLink(categoryIndex)}
                        className="w-full px-2 py-1 bg-white/20 hover:bg-white/30 text-white text-xs rounded"
                      >
                        <Plus className="w-3 h-3 inline mr-1" />
                        Add
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
        
        {editing && (
          <div className="card p-4 border-dashed border-2 border-white/30">
            <button
              onClick={addCategory}
              className="w-full h-full flex flex-col items-center justify-center text-white/70 hover:text-white"
            >
              <Plus className="w-8 h-8 mb-2" />
              <span className="text-sm">Add Category</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default QuickLinks