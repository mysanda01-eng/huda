import { useState, useEffect, useRef } from 'react'

const FloatingHearts = () => {
  const [hearts, setHearts] = useState([])
  const scrollTimeoutRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      // Throttle heart creation - one every 500ms max
      if (scrollTimeoutRef.current) return
      
      scrollTimeoutRef.current = setTimeout(() => {
        scrollTimeoutRef.current = null
      }, 500)

      // Create a new heart at a random position
      const newHeart = {
        id: Date.now(),
        left: Math.random() * 100,
        delay: 0,
      }
      
      // Limit to 5 hearts max
      setHearts(prev => {
        const limited = prev.length >= 5 ? prev.slice(-4) : prev
        return [...limited, newHeart]
      })

      // Remove the heart after animation completes
      setTimeout(() => {
        setHearts(prev => prev.filter(h => h.id !== newHeart.id))
      }, 3000)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
    }
  }, [])

  return (
    <div className="floating-hearts-container">
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="floating-heart"
          style={{
            left: `${heart.left}%`,
            animation: 'floatHeart 3s ease-out forwards',
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  )
}

export default FloatingHearts
