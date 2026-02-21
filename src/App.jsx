import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import FloatingHearts from './components/FloatingHearts'
import FullscreenGallery from './components/FullscreenGallery'
import Confetti from './components/Confetti'
import VolumeControl from './components/VolumeControl'
import GiftProgressBar from './components/GiftProgressBar'
import './App.css'

const config = {
  mainPassword: 'huda',
  hiddenPassword: 'huda',
  giftUnlockDate: '2026-03-05',
  nextBirthdayDate: '2027-02-27',
  backgroundMusicPath: '/audio/WhatsApp Audio 2026-02-20 at 10.43.22 PM.mpeg',
  specialAudioPath: '/audio/WhatsApp Video 2026-02-20 at 9.53.31 PM.mp4',
  backgroundMusicVolume: 0.2,
  specialAudioVolume: 0.7,
}

const IMAGES = [
  { src: '/images/1.jpeg', caption: 'Every moment with you is a masterpiece' },
  { src: '/images/2.jpeg', caption: 'Your smile is my favorite view' },
  { src: '/images/3.jpeg', caption: 'Forever starts with you' },
  { src: '/images/4.jpeg', caption: 'In your eyes, I find my home' },
  { src: '/images/5.jpeg', caption: 'A love story written in moments' },
  { src: '/images/6.jpeg', caption: 'You complete me' },
  { src: '/images/WhatsApp Image.jpeg', caption: 'My greatest blessing' },
]

const VIDEOS = [
  { src: '/video/5.mp4', title: 'Moments with you' },
  { src: '/video/6.mp4', title: 'Your laugh is my favorite' },
  { src: '/video/7.mp4', title: 'Us against the world' },
  { src: '/video/8.mp4', title: 'Dancing in your eyes' },
  { src: '/video/9.mp4', title: 'Forever with you' },
  { src: '/video/10.mp4', title: 'My greatest joy' },
  { src: '/video/11.mp4', title: 'Love in motion' },
  { src: '/video/WhatsApp Video 2026-02-20 at 9.48.04 PM.mp4', title: 'You are my everything' },
]

const GIFTS = [
  { emoji: '🍽️', name: 'Private Birthday Dinner' },
  { emoji: '📸', name: 'Professional Couple Photoshoot' },
  { emoji: '🌅', name: 'A Full Surprise Day' },
  { emoji: '🎁', name: 'Mystery Gift' },
]

const LOVE_PARAGRAPHS = [
  'From the moment you walked into my life, everything changed. You brought color to my world and made every day feel like an adventure worth taking.',
  'Your smile lights up rooms, but more importantly, it lights up my heart. The way you care, the way you laugh, the way you love—it all makes me believe in magic.',
  'You are my greatest blessing. In you, I found not just a partner, but my home, my peace, and my forever.',
  'Every moment with you is a moment I never want to end. You make me want to be better, dream bigger, and love deeper.',
  'Happy birthday to the person who makes my heart skip a beat every single day. You are my always.',
]

export default function App() {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [showHiddenGate, setShowHiddenGate] = useState(false)
  const [hiddenPassword, setHiddenPassword] = useState('')
  const [hiddenPasswordError, setHiddenPasswordError] = useState('')
  const [showHiddenPage, setShowHiddenPage] = useState(false)
  const [selectedGift, setSelectedGift] = useState(null)
  const [giftMessage, setGiftMessage] = useState('')
  const [countdown, setCountdown] = useState({
    gift: { days: 0, hours: 0, minutes: 0, seconds: 0 },
    birthday: { days: 0 }
  })
  const [isBackgroundMusicPlaying, setIsBackgroundMusicPlaying] = useState(true)
  const [backgroundMusicVolume, setBackgroundMusicVolume] = useState(config.backgroundMusicVolume)
  const [isSpecialAudioPlaying, setIsSpecialAudioPlaying] = useState(false)
  const [showFullscreenGallery, setShowFullscreenGallery] = useState(false)
  const [fullscreenGalleryIndex, setFullscreenGalleryIndex] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const autoPlayedVideos = useRef(new Set())
  const bgMusicRef = useRef(null)
  const specialAudioRef = useRef(null)
  const videoRefs = useRef({})
  const [unlockNextBirthdayLetter, setUnlockNextBirthdayLetter] = useState(false)

  // Load saved gift selection
  useEffect(() => {
    const saved = localStorage.getItem('selectedGift')
    if (saved !== null) {
      const index = parseInt(saved)
      setSelectedGift(index)
      setGiftMessage("I'm looking forward to that day.")
    }
  }, [])

  // Initialize audio with better error handling
  useEffect(() => {
    if (bgMusicRef.current) {
      bgMusicRef.current.src = config.backgroundMusicPath
      bgMusicRef.current.volume = backgroundMusicVolume
      bgMusicRef.current.loop = true
      bgMusicRef.current.onerror = (e) => console.log('Background music error:', e)
    }
    if (specialAudioRef.current) {
      specialAudioRef.current.src = config.specialAudioPath
      specialAudioRef.current.volume = config.specialAudioVolume
      specialAudioRef.current.onerror = (e) => console.log('Special audio error:', e)
    }
  }, [backgroundMusicVolume])

  // Start background music when authenticated
  useEffect(() => {
    if (authenticated && bgMusicRef.current) {
      const playAttempt = bgMusicRef.current.play()
      if (playAttempt !== undefined) {
        playAttempt.catch(() => {
          console.log('Autoplay prevented, click to play')
        })
      }
    }
  }, [authenticated])

  // Handle user interaction to enable audio
  useEffect(() => {
    const enableAudio = () => {
      if (authenticated && bgMusicRef.current && isBackgroundMusicPlaying) {
        bgMusicRef.current.play().catch(() => {})
      }
    }

    if (authenticated) {
      document.addEventListener('click', enableAudio, { once: true })
      return () => document.removeEventListener('click', enableAudio)
    }
  }, [authenticated, isBackgroundMusicPlaying])

  // Update countdowns - optimized to single state update
  useEffect(() => {
    const interval = setInterval(() => {
      const giftDate = new Date(config.giftUnlockDate).getTime()
      const birthdayDate = new Date(config.nextBirthdayDate).getTime()
      const now = new Date().getTime()

      const giftDistance = giftDate - now
      const birthdayDistance = birthdayDate - now

      setCountdown({
        gift: giftDistance > 0 ? {
          days: Math.floor(giftDistance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((giftDistance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((giftDistance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((giftDistance % (1000 * 60)) / 1000),
        } : { days: 0, hours: 0, minutes: 0, seconds: 0 },
        birthday: {
          days: Math.floor(Math.max(0, birthdayDistance) / (1000 * 60 * 60 * 24))
        }
      })

      if (birthdayDistance <= 0) {
        setUnlockNextBirthdayLetter(true)
        setShowConfetti(true)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'm' || e.key === 'M') {
        e.preventDefault()
        setIsBackgroundMusicPlaying(!isBackgroundMusicPlaying)
      }
      if (e.key === '?') {
        e.preventDefault()
        alert('Keyboard Shortcuts:\nM - Mute/unmute music\n↓ - Scroll down\n↑ - Scroll up\n? - Show this help')
      }
    }

    if (authenticated) {
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [authenticated, isBackgroundMusicPlaying])

  // Video auto-play on scroll - optimized
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const videoId = entry.target.dataset.videoId
        if (entry.isIntersecting && !autoPlayedVideos.current.has(videoId)) {
          entry.target.play().catch(() => {})
          autoPlayedVideos.current.add(videoId)
        } else if (!entry.isIntersecting) {
          entry.target.pause()
        }
      })
    }, { threshold: 0.5 })

    Object.values(videoRefs.current).forEach((video) => {
      if (video) observer.observe(video)
    })

    return () => observer.disconnect()
  }, [])

  // Fade audio
  const fadeAudio = (audio, startVol, endVol, duration) => {
    const steps = 30
    let currentStep = 0
    const stepDuration = duration / steps

    const interval = setInterval(() => {
      currentStep++
      const progress = currentStep / steps
      const currentVol = startVol + (endVol - startVol) * progress
      audio.volume = Math.max(0, Math.min(1, currentVol))

      if (currentStep >= steps) {
        clearInterval(interval)
        audio.volume = endVol
      }
    }, stepDuration)
  }

  const handleMainPassword = useCallback((e) => {
    e.preventDefault()
    if (password === config.mainPassword) {
      setAuthenticated(true)
      setPassword('')
      setPasswordError('')
    } else {
      setPasswordError('Not quite.')
      setPassword('')
    }
  }, [password])

  const handleHiddenPassword = useCallback((e) => {
    e.preventDefault()
    if (hiddenPassword.toLowerCase() === config.hiddenPassword.toLowerCase()) {
      setShowHiddenGate(false)
      setShowHiddenPage(true)
      setHiddenPassword('')
      setHiddenPasswordError('')
    } else {
      setHiddenPasswordError('Not quite. Try again.')
      setHiddenPassword('')
    }
  }, [hiddenPassword])

  const selectGift = useCallback((index) => {
    setSelectedGift(index)
    setGiftMessage("I'm looking forward to that day.")
    localStorage.setItem('selectedGift', index)
  }, [])

  const toggleBackgroundMusic = () => {
    if (bgMusicRef.current) {
      if (isBackgroundMusicPlaying) {
        fadeAudio(bgMusicRef.current, backgroundMusicVolume, 0, 500)
        setTimeout(() => {
          bgMusicRef.current.pause()
        }, 500)
      } else {
        bgMusicRef.current.currentTime = 0
        bgMusicRef.current.play().catch((error) => {
          console.log('Play error:', error)
        })
        fadeAudio(bgMusicRef.current, 0, backgroundMusicVolume, 500)
      }
      setIsBackgroundMusicPlaying(!isBackgroundMusicPlaying)
    }
  }

  const handleVolumeChange = (newVolume) => {
    setBackgroundMusicVolume(newVolume)
    if (bgMusicRef.current) {
      bgMusicRef.current.volume = newVolume
    }
  }

  const playSpecialAudio = () => {
    if (!isSpecialAudioPlaying) {
      fadeAudio(bgMusicRef.current, config.backgroundMusicVolume, 0, 300)
      setTimeout(() => {
        bgMusicRef.current.pause()
        specialAudioRef.current.currentTime = 0
        specialAudioRef.current.play().catch(() => console.log('Could not play special audio'))
        setIsSpecialAudioPlaying(true)
      }, 300)

      specialAudioRef.current.onended = () => {
        setIsSpecialAudioPlaying(false)
        bgMusicRef.current.currentTime = 0
        bgMusicRef.current.play()
        fadeAudio(bgMusicRef.current, 0, config.backgroundMusicVolume, 500)
        setIsBackgroundMusicPlaying(true)
      }
    }
  }

  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  if (!authenticated) {
    return (
      <div className="password-gate">
        <div className="gate-container">
          <form onSubmit={handleMainPassword}>
            <h1>For You</h1>
            <p>A message from the heart</p>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            {passwordError && <p className="error">{passwordError}</p>}
            <button type="submit">Enter</button>
          </form>
        </div>
      </div>
    )
  }

  if (showHiddenPage) {
    return (
      <div className="hidden-page">
        <button className="back-btn" onClick={() => {
          setShowHiddenPage(false)
          scrollToSection('main')
        }}>← Back</button>
        <div className="hidden-letter-content">
          <p><strong>A Letter Just for You</strong></p>
          <p><br /></p>
          <p><strong>These are the words my heart has been waiting to tell you. Read slowly, feel deeply, and know that every word is true.</strong></p>
          <p><br /></p>
          <p>There's something sacred about moments like this—when I can tell you exactly what you mean to me, without the world watching, without any distractions. Just us. Just these words.</p>
          <p><br /></p>
          <p>You are extraordinary. Not because you're perfect, but because you're perfectly you. The way you move through the world with such grace, such kindness, such genuine care for others—it's inspiring.</p>
          <p><br /></p>
          <p>When I'm with you, I feel seen. Truly seen. You don't just look at me; you understand me. You anticipate my needs, you celebrate my wins as if they were your own, and you hold me steady when I'm falling.</p>
          <p><br /></p>
          <p>I want you to know that loving you is the easiest and most natural thing I've ever done. It's not a choice, it's a certainty. Like breathing. Like the sun rising.</p>
          <p><br /></p>
          <p>I cannot wait for all the moments ahead of us. The quiet mornings, the loud laughter, the hard times we'll get through together, the dreams we'll chase. Every single second with you is a gift I never take for granted.</p>
          <p><br /></p>
          <p>Happy birthday to the love of my life. To the person who completes me. To you.</p>
          <p><br /></p>
          <p>Forever yours,<br />💕</p>
        </div>
      </div>
    )
  }

  return (
    <div id="main" className="app">
      <FloatingHearts />

      <audio ref={bgMusicRef} crossOrigin="anonymous" preload="metadata" />
      <audio ref={specialAudioRef} crossOrigin="anonymous" preload="metadata" />

      {/* Landing Section with Picture 3 Background */}
      <section id="landing" className="landing" style={{backgroundImage: 'url(/images/3.jpeg)'}}>
        <div className="landing-overlay">
          <h1 className="landing-title">Happy Birthday</h1>
          <p className="landing-subtitle">To someone extraordinary</p>
          <p className="landing-text">March feels closer with every passing day</p>
          <button onClick={() => scrollToSection('gallery')} className="landing-btn">
            Enter ↓
          </button>
        </div>
      </section>

      {/* Floating Controls */}
      <VolumeControl 
        isPlaying={isBackgroundMusicPlaying}
        onToggle={toggleBackgroundMusic}
        volume={backgroundMusicVolume}
        onVolumeChange={handleVolumeChange}
        musicTitle="Something Special"
      />

      {/* Confetti Effect */}
      <Confetti trigger={showConfetti} />

      {/* Fullscreen Gallery Modal */}
      {showFullscreenGallery && (
        <FullscreenGallery 
          images={IMAGES.map(img => img.src)}
          initialIndex={fullscreenGalleryIndex}
          onClose={() => setShowFullscreenGallery(false)}
        />
      )}

      {/* Gallery Section */}
      <section id="gallery" className="gallery-section">
        <div className="section-title">The Way I See You</div>
        <div className="gallery-grid">
          {IMAGES.map((img, idx) => (
            <div 
              key={idx} 
              className={`gallery-item ${idx % 5 === 3 ? 'tall' : ''} ${idx % 7 === 2 ? 'wide' : ''}`}
              style={{animationDelay: `${idx * 100}ms`}}
              onClick={() => {
                setFullscreenGalleryIndex(idx)
                setShowFullscreenGallery(true)
              }}
              role="button"
              tabIndex={0}
              aria-label={`Open image ${idx + 1} in fullscreen`}
            >
              <img src={img.src} alt={img.caption} loading="lazy" />
              <div className="gallery-overlay">
                <p className="gallery-caption">{img.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why I Love You Section */}
      <section id="why-love" className="why-love-section">
        <div className="section-title">Why I Love You</div>
        <div className="love-paragraphs">
          {LOVE_PARAGRAPHS.map((para, idx) => (
            <p key={idx} className="love-paragraph" style={{animationDelay: `${idx * 200}ms`}}>
              {para}
            </p>
          ))}
        </div>
      </section>

      {/* Gift Section */}
      <section id="gift" className="gift-section">
        <div className="section-title">Choose Your Gift</div>
        <div className="gift-cards">
          {GIFTS.map((gift, idx) => (
            <div
              key={idx}
              className={`gift-card ${selectedGift === idx ? 'selected' : ''}`}
              onClick={() => selectGift(idx)}
            >
              <span className="gift-emoji">{gift.emoji}</span>
              <p>{gift.name}</p>
            </div>
          ))}
        </div>
        {giftMessage && <p className="gift-message">{giftMessage}</p>}

        <GiftProgressBar 
          daysRemaining={countdown.gift.days} 
          totalDays={12}
        />

        <div className="countdown-timer">
          <div className="countdown-label">Until Your Gift</div>
          <div className="countdown">
            <div className="countdown-item">
              <span className="countdown-value">{String(countdown.gift.days).padStart(2, '0')}</span>
              <span className="countdown-label">Days</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-value">{String(countdown.gift.hours).padStart(2, '0')}</span>
              <span className="countdown-label">Hours</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-value">{String(countdown.gift.minutes).padStart(2, '0')}</span>
              <span className="countdown-label">Minutes</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-value">{String(countdown.gift.seconds).padStart(2, '0')}</span>
              <span className="countdown-label">Seconds</span>
            </div>
          </div>
        </div>
      </section>

      {/* Video Gallery Section */}
      <section id="videos" className="video-gallery-section">
        <div className="section-title">For You</div>
        <div className="video-gallery-grid">
          {VIDEOS.map((video, idx) => (
            <div
              key={idx}
              className="video-item"
            >
              <video
                controls
                preload="metadata"
                width="100%"
                height="100%"
                className="video-player"
                ref={(el) => videoRefs.current[idx] = el}
                data-video-id={idx}
                aria-label={`Video ${idx + 1}`}
              >
                <source src={video.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="video-overlay">
                <div className="video-title">{video.title}</div>
                <div className="play-icon">▶</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Special Audio Button */}
      <section className="special-audio-section">
        <button onClick={playSpecialAudio} className="special-audio-btn">
          {isSpecialAudioPlaying ? '⏸ Stop' : '▶ Play something special'}
        </button>
      </section>

      {/* Hidden Page Link */}
      <section className="hidden-link-section">
        <p onClick={() => setShowHiddenGate(true)} className="hidden-link" style={{display: 'none'}}>
          something is not for display
        </p>
        {showHiddenGate && (
          <div className="hidden-gate-overlay">
            <div className="hidden-gate">
              <button className="close-btn" onClick={() => setShowHiddenGate(false)}>✕</button>
              <form onSubmit={handleHiddenPassword}>
                <h2>Secret</h2>
                <input
                  type="password"
                  placeholder="Enter password"
                  value={hiddenPassword}
                  onChange={(e) => setHiddenPassword(e.target.value)}
                  autoFocus
                />
                {hiddenPasswordError && <p className="error">{hiddenPasswordError}</p>}
                <button type="submit">Unlock</button>
              </form>
            </div>
          </div>
        )}
      </section>

      {/* Next Birthday Locked Section */}
      <section id="birthday-letter" className="birthday-letter-section">
        <div className="section-title">For Your Next Birthday</div>
        {!unlockNextBirthdayLetter ? (
          <div id="nextBirthdayContent" className="locked-content">
            <p className="lock-icon">🔒</p>
            <p className="lock-text">A letter awaits you</p>
            <p className="lock-countdown">364 days until next unlock because i plan to be here then and forever</p>
          </div>
        ) : (
          <div id="nextBirthdayLetter" className="birthday-letter">
            <p><strong>For Your Next Birthday.</strong></p>
            <p><br /></p>
            <p><strong>A letter for you, written in advance, waiting for the day to arrive.</strong></p>
            <p><br /></p>
            <p>My love, when you read this, another year will have passed. Another year of moments with you, memories we've created, and love that grows deeper every single day.</p>
            <p><br /></p>
            <p>I want you to know that on this day, like every day, my heart belongs entirely to you. Thank you for being you, for choosing me, and for making every birthday—and every day in between—absolutely magical.</p>
          </div>
        )}
      </section>
    </div>
  )
}
