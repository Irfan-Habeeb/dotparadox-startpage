import { useState, useEffect } from 'react'
import { Clock, Calendar, MapPin } from 'lucide-react'

const ClockDisplay = () => {
  const [time, setTime] = useState(new Date())
  const [timezone, setTimezone] = useState('')
  const [location, setLocation] = useState('')

  useEffect(() => {
    // Get user's timezone
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    setTimezone(userTimezone)

    // Try to get user's location if they allow it
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          // Reverse geocoding to get city name
          fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
            .then(response => response.json())
            .then(data => {
              if (data.city) {
                setLocation(data.city)
              }
            })
            .catch(() => {
              // Fallback to timezone name
              setLocation(userTimezone.split('/').pop()?.replace('_', ' ') || userTimezone)
            })
        },
        () => {
          // Fallback to timezone name if location access denied
          setLocation(userTimezone.split('/').pop()?.replace('_', ' ') || userTimezone)
        }
      )
    } else {
      // Fallback to timezone name
      setLocation(userTimezone.split('/').pop()?.replace('_', ' ') || userTimezone)
    }

    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="text-center text-white/90">
      <div className="flex items-center justify-center gap-2 mb-2">
        <Clock className="w-5 h-5" />
        <div className="text-2xl md:text-3xl font-figtree">
          {time.toLocaleTimeString('en-US', {
            hour12: true,
            hour: 'numeric',
            minute: '2-digit',
            second: '2-digit',
            timeZone: timezone
          })}
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 mb-2">
        <Calendar className="w-5 h-5" />
        <div className="text-lg md:text-xl font-figtree">
          {time.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            timeZone: timezone
          })}
        </div>
      </div>
      {location && (
        <div className="flex items-center justify-center gap-2">
          <MapPin className="w-4 h-4" />
          <div className="text-sm font-figtree opacity-80">
            {location}
          </div>
        </div>
      )}
    </div>
  )
}

export default ClockDisplay