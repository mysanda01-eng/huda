import { useState, useEffect } from 'react'

const FullscreenGallery = ({ images, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prevImage()
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex])

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="fullscreen-gallery-overlay" onClick={onClose}>
      <div className="fullscreen-gallery" onClick={(e) => e.stopPropagation()}>
        <button className="gallery-close-btn" onClick={onClose}>✕</button>
        
        <div className="gallery-main">
          <img src={images[currentIndex]} alt={`Full ${currentIndex + 1}`} />
        </div>

        <div className="gallery-nav">
          <button className="gallery-nav-btn prev" onClick={prevImage}>
            ← Previous
          </button>
          <span className="gallery-counter">
            {currentIndex + 1} / {images.length}
          </span>
          <button className="gallery-nav-btn next" onClick={nextImage}>
            Next →
          </button>
        </div>

        <div className="gallery-thumbnails">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Thumb ${idx + 1}`}
              className={`thumbnail ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default FullscreenGallery
