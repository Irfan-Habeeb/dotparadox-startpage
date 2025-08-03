import { useState, useEffect } from 'react'
import { 
  BookOpen, PenTool, Settings, Globe, Music, Camera, Code, Heart, Plus, Edit2, X,
  Github, Twitter, Linkedin, Instagram, MessageCircle, FileText, Calendar, Mail, Home,
  Coffee, Zap, Palette, Image, Video, Download, Upload, Share2, Star,
  Search, User, Users, Lock, Unlock, Eye, EyeOff, Bell, Phone, Rss
} from 'lucide-react'

const QuickLinks = () => {
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('quickLinks')
    return saved ? JSON.parse(saved) : [
      {
        name: 'Writing',
        icon: 'PenTool',
        links: [
          { name: 'Notion', url: 'https://notion.so' },
          { name: 'Medium', url: 'https://medium.com' },
          { name: 'Substack', url: 'https://substack.com' },
          { name: 'WordPress', url: 'https://wordpress.com' }
        ]
      },
      {
        name: 'Reading',
        icon: 'BookOpen',
        links: [
          { name: 'Goodreads', url: 'https://goodreads.com' },
          { name: 'Pocket', url: 'https://getpocket.com' },
          { name: 'Instapaper', url: 'https://instapaper.com' },
          { name: 'Feedly', url: 'https://feedly.com' }
        ]
      },
      {
        name: 'Tools',
        icon: 'Settings',
        links: [
          { name: 'GitHub', url: 'https://github.com' },
          { name: 'Figma', url: 'https://figma.com' },
          { name: 'Notion', url: 'https://notion.so' },
          { name: 'Linear', url: 'https://linear.app' }
        ]
      },
      {
        name: 'Social',
        icon: 'Globe',
        links: [
          { name: 'Twitter', url: 'https://twitter.com' },
          { name: 'LinkedIn', url: 'https://linkedin.com' },
          { name: 'Instagram', url: 'https://instagram.com' },
          { name: 'Discord', url: 'https://discord.com' }
        ]
      }
    ]
  })
  const [editing, setEditing] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [newLink, setNewLink] = useState({ name: '', url: '' })
  const [editingCategoryName, setEditingCategoryName] = useState('')
  const [editingCategoryIcon, setEditingCategoryIcon] = useState('')

  const iconMap = {
    // Category icons
    PenTool, BookOpen, Settings, Globe, Music, Camera, Code, Heart,
    // Link icons
    Github, Twitter, Linkedin, Instagram, MessageCircle, FileText, Calendar, Mail, Home,
    Coffee, Zap, Palette, Image, Video, Download, Upload, Share2, Star,
    Search, User, Users, Lock, Unlock, Eye, EyeOff, Bell, Phone, Rss
  }

  const availableIcons = [
    'Github', 'Twitter', 'Linkedin', 'Instagram', 'MessageCircle', 'FileText', 'Calendar', 'Mail', 'Home',
    'Coffee', 'Zap', 'Palette', 'Image', 'Video', 'Download', 'Upload', 'Share2', 'Star',
    'Search', 'User', 'Users', 'Lock', 'Unlock', 'Eye', 'EyeOff', 'Bell', 'Phone',
    'Globe', 'BookOpen', 'PenTool', 'Settings', 'Music', 'Camera', 'Code', 'Heart', 'Rss'
  ]

  useEffect(() => {
    localStorage.setItem('quickLinks', JSON.stringify(categories))
  }, [categories])

  const getFaviconUrl = (url) => {
    try {
      const domain = new URL(url).hostname
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`
    } catch (error) {
      return null
    }
  }

  const addLink = async (categoryIndex) => {
    if (newLink.name && newLink.url) {
      let url = newLink.url
      if (!url.startsWith('http')) {
        url = `https://${url}`
      }
      
      const updatedCategories = [...categories]
      updatedCategories[categoryIndex].links.push({ 
        name: newLink.name, 
        url: url
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

  const startEditCategory = (categoryIndex) => {
    const category = categories[categoryIndex]
    setEditingCategory(categoryIndex)
    setEditingCategoryName(category.name)
    setEditingCategoryIcon(category.icon)
  }

  const saveCategoryEdit = () => {
    if (editingCategory !== null) {
      const updatedCategories = [...categories]
      updatedCategories[editingCategory].name = editingCategoryName
      updatedCategories[editingCategory].icon = editingCategoryIcon
      setCategories(updatedCategories)
      setEditingCategory(null)
      setEditingCategoryName('')
      setEditingCategoryIcon('')
    }
  }

  const cancelCategoryEdit = () => {
    setEditingCategory(null)
    setEditingCategoryName('')
    setEditingCategoryIcon('')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-lora font-semibold text-white/95 text-center">Quick Links</h2>
        <button
          onClick={() => setEditing(!editing)}
          className="p-2 bg-white/15 hover:bg-white/25 text-white/90 rounded-lg"
        >
          <Edit2 className="w-4 h-4" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((category, categoryIndex) => {
          const CategoryIconComponent = iconMap[category.icon]
          return (
                                <div key={category.name} className="bg-white/10 dark:bg-gray-800/10 rounded-xl border border-white/20 dark:border-gray-700/20 p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                                          <CategoryIconComponent className="w-5 h-5 text-white/90" />
                  {editingCategory === categoryIndex ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={editingCategoryName}
                        onChange={(e) => setEditingCategoryName(e.target.value)}
                        className="px-2 py-1 text-sm bg-white/20 text-white border border-white/30 rounded"
                      />
                      <select
                        value={editingCategoryIcon}
                        onChange={(e) => setEditingCategoryIcon(e.target.value)}
                        className="px-2 py-1 text-sm bg-white/20 text-white border border-white/30 rounded"
                      >
                        {availableIcons.map(icon => (
                          <option key={icon} value={icon}>{icon}</option>
                        ))}
                      </select>
                      <button
                        onClick={saveCategoryEdit}
                        className="text-green-400 hover:text-green-300"
                      >
                        ✓
                      </button>
                      <button
                        onClick={cancelCategoryEdit}
                        className="text-red-400 hover:text-red-300"
                      >
                        ✗
                      </button>
                    </div>
                  ) : (
                    <h3 className="font-medium text-white/90">{category.name}</h3>
                  )}
                </div>
                {editing && (
                  <div className="flex items-center gap-1">
                    {editingCategory !== categoryIndex && (
                      <button
                        onClick={() => startEditCategory(categoryIndex)}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <Edit2 className="w-3 h-3" />
                      </button>
                    )}
                    <button
                      onClick={() => removeCategory(categoryIndex)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {category.links.map((link, linkIndex) => {
                  const faviconUrl = getFaviconUrl(link.url)
                  return (
                    <div key={link.name} className="relative group">
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-3 bg-white/15 hover:bg-white/25 rounded-lg text-center"
                      >
                        <div className="w-8 h-8 mx-auto mb-2 flex items-center justify-center">
                          {faviconUrl ? (
                            <img 
                              src={faviconUrl} 
                              alt={link.name}
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                // Fallback to a simple globe icon if favicon fails
                                e.target.style.display = 'none'
                                e.target.nextSibling.style.display = 'flex'
                              }}
                            />
                          ) : null}
                          <div className={`w-full h-full ${faviconUrl ? 'hidden' : 'flex'} items-center justify-center`}>
                            <Globe className="w-full h-full text-white/90" />
                          </div>
                        </div>
                        <span className="text-xs text-white/90 font-medium">{link.name}</span>
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
                  )
                })}
                
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
          <div className="bg-white/10 dark:bg-gray-800/10 rounded-xl border-2 border-dashed border-white/20 dark:border-gray-700/20 p-4">
            <button
              onClick={addCategory}
              className="w-full h-full flex flex-col items-center justify-center text-white/70 hover:text-white/90"
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