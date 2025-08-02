# dotparadox

A beautiful, modern, poetic personal start page where poetry meets the digital realm.

## ✨ Features

- **Animated Gradient Background** - Smooth moving gradient from blue to purple
- **Dark Mode Toggle** - Switch between light and dark themes with localStorage persistence
- **Multi-Search Engine** - Search across 20+ popular platforms (Google, YouTube, GitHub, etc.)
- **Real-time Clock & Date** - Always up-to-date time and date display
- **Categorized Quick Links** - Organized links for Writing, Reading, Tools, and Social
- **Poetry Feed** - Latest articles from poetry blogs and literary magazines
- **Responsive Design** - Mobile-first layout that works on all devices
- **Smooth Animations** - Elegant transitions and hover effects

## 🛠 Tech Stack

- **Vite + React** - Fast development and build tooling
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful, customizable icons
- **date-fns** - Modern date utility library
- **Google Fonts** - Figtree for body text with breathable letter-spacing

## 🎨 Design

- **Typography**: Figtree for body text, Linertinas Sans for headers
- **Colors**: Primary blue (#3c84e3), gradient from #3e51b5 to #9B51E0
- **Theme**: Soft, elegant, and modern with glassmorphism effects
- **Animations**: Smooth transitions, hover effects, and gradient animations

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd dotparadox
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📱 Features in Detail

### Search Bar
- Supports 20+ search engines including Google, YouTube, GitHub, Stack Overflow, Reddit, and more
- Dropdown selector to choose your preferred search engine
- Opens results in new tabs

### Quick Links
- **Writing**: Notion, Medium, Substack, WordPress
- **Reading**: Goodreads, Pocket, Instapaper, Feedly
- **Tools**: GitHub, Figma, Notion, Linear
- **Social**: Twitter, LinkedIn, Instagram, Discord

### Poetry Feed
- Fetches latest articles from poetry blogs
- Includes your personal blog at [irfanhabeeb.com](https://irfanhabeeb.com/)
- Features from Poetry Foundation and The Paris Review
- Beautiful cards with images, titles, and excerpts

### Dark Mode
- Toggle between light and dark themes
- Preferences saved in localStorage
- Smooth transitions between modes

## 🎯 Customization

### Adding New Search Engines
Edit `src/components/SearchBar.jsx` and add to the `searchEngines` array:

```javascript
{ name: 'Your Engine', value: 'yourengine', url: 'https://yourengine.com/search?q=' }
```

### Modifying Quick Links
Edit `src/components/QuickLinks.jsx` and update the `categories` array with your preferred links.

### Updating Feed Sources
Edit `src/components/FeedSection.jsx` and modify the `feeds` array or implement real RSS feed parsing.

### Changing Colors
Edit `tailwind.config.js` to modify the color scheme:

```javascript
colors: {
  primary: '#your-color',
  gradient: {
    from: '#your-start-color',
    to: '#your-end-color',
  },
}
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

### Other Platforms
The app is static and can be deployed to any hosting platform:
- Netlify
- GitHub Pages
- Firebase Hosting
- AWS S3 + CloudFront

## 📄 License

MIT License - feel free to use this project for your own personal start page!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or need help customizing your dotparadox start page, feel free to open an issue on GitHub.

---

**dotparadox** - Where poetry meets the digital realm ✨
