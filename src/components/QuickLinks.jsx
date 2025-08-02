import { BookOpen, PenTool, Settings, Globe, Music, Camera, Code, Heart } from 'lucide-react'

const QuickLinks = () => {
  const categories = [
    {
      name: 'Writing',
      icon: PenTool,
      links: [
        { name: 'Notion', url: 'https://notion.so' },
        { name: 'Medium', url: 'https://medium.com' },
        { name: 'Substack', url: 'https://substack.com' },
        { name: 'WordPress', url: 'https://wordpress.com' }
      ]
    },
    {
      name: 'Reading',
      icon: BookOpen,
      links: [
        { name: 'Goodreads', url: 'https://goodreads.com' },
        { name: 'Pocket', url: 'https://getpocket.com' },
        { name: 'Instapaper', url: 'https://instapaper.com' },
        { name: 'Feedly', url: 'https://feedly.com' }
      ]
    },
    {
      name: 'Tools',
      icon: Settings,
      links: [
        { name: 'GitHub', url: 'https://github.com' },
        { name: 'Figma', url: 'https://figma.com' },
        { name: 'Notion', url: 'https://notion.so' },
        { name: 'Linear', url: 'https://linear.app' }
      ]
    },
    {
      name: 'Social',
      icon: Globe,
      links: [
        { name: 'Twitter', url: 'https://twitter.com' },
        { name: 'LinkedIn', url: 'https://linkedin.com' },
        { name: 'Instagram', url: 'https://instagram.com' },
        { name: 'Discord', url: 'https://discord.com' }
      ]
    }
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-linertinas text-white text-center">Quick Links</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <div key={category.name} className="card p-4">
            <div className="flex items-center gap-2 mb-3">
              <category.icon className="w-5 h-5 text-primary" />
              <h3 className="font-medium">{category.name}</h3>
            </div>
            <div className="space-y-2">
              {category.links.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default QuickLinks