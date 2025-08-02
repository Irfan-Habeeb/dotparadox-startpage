import { useState, useEffect } from 'react'
import { Clock, Calendar } from 'lucide-react'

const ClockDisplay = () => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="text-center text-white/90 animate-fade-in">
      <div className="flex items-center justify-center gap-2 mb-2">
        <Clock className="w-5 h-5" />
        <div className="text-2xl md:text-3xl font-figtree">
          {time.toLocaleTimeString()}
        </div>
      </div>
      <div className="flex items-center justify-center gap-2">
        <Calendar className="w-5 h-5" />
        <div className="text-lg md:text-xl font-figtree">
          {time.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>
    </div>
  )
}

export default ClockDisplay