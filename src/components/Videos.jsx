import { useState, useRef } from 'react'

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

export default function Videos({ onBack }) {
  const videoRefs = useRef({})

  return (
    <div className="videos-page">
      <button className="back-btn" onClick={onBack}>← Back</button>
      
      <div className="videos-page-title">For You</div>
      
      <div className="videos-simple-grid">
        {VIDEOS.map((video, idx) => (
          <div key={idx} className="video-simple-item">
            <video
              controls
              width="100%"
              height="100%"
              preload="metadata"
              crossOrigin="anonymous"
              ref={(el) => videoRefs.current[idx] = el}
            >
              <source src={video.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p className="video-simple-title">{video.title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
