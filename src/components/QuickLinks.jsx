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

  const addLink = (categoryIndex) => {
    if (newLink.name && newLink.url) {
      const updatedCategories = [...categories]
      updatedCategories[categoryIndex].links.push({ ...newLink })
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
        <h2 className="text-2xl font-lora font-semibold text-blue-800 text-center">Quick Links</h2>
        <button
          onClick={() => setEditing(!editing)}
          className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
        >
          <Edit2 className="w-4 h-4" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((category, categoryIndex) => {
          const IconComponent = iconMap[category.icon]
          return (
            <div key={category.name} className="card p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <IconComponent className="w-5 h-5 text-blue-600" />
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">{category.name}</h3>
                </div>
                {editing && (
                  <button
                    onClick={() => removeCategory(categoryIndex)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              <div className="space-y-2">
                {category.links.map((link, linkIndex) => (
                  <div key={link.name} className="flex items-center justify-between">
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 flex-1"
                    >
                      {link.name}
                    </a>
                    {editing && (
                      <button
                        onClick={() => removeLink(categoryIndex, linkIndex)}
                        className="text-red-500 hover:text-red-700 ml-2"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ))}
                
                {editing && (
                  <div className="space-y-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                    <input
                      type="text"
                      placeholder="Link name"
                      value={newLink.name}
                      onChange={(e) => setNewLink({ ...newLink, name: e.target.value })}
                      className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white/80 dark:bg-gray-700/80"
                    />
                    <input
                      type="url"
                      placeholder="URL"
                      value={newLink.url}
                      onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                      className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white/80 dark:bg-gray-700/80"
                    />
                    <button
                      onClick={() => addLink(categoryIndex)}
                      className="w-full px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded"
                    >
                      <Plus className="w-3 h-3 inline mr-1" />
                      Add Link
                    </button>
                  </div>
                )}
              </div>
            </div>
          )
        })}
        
        {editing && (
          <div className="card p-4 border-dashed border-2 border-gray-300 dark:border-gray-600">
            <button
              onClick={addCategory}
              className="w-full h-full flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
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