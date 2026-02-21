import { useEffect } from 'react'

const Confetti = ({ trigger }) => {
  useEffect(() => {
    if (!trigger) return

    const createConfetti = () => {
      const confettiPieces = []
      const colors = ['❤️', '💕', '✨', '🎀', '💐']

      for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div')
        confetti.className = 'confetti'
        confetti.textContent = colors[Math.floor(Math.random() * colors.length)]
        confetti.style.left = Math.random() * 100 + '%'
        confetti.style.animationDelay = Math.random() * 0.5 + 's'
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's'
        document.body.appendChild(confetti)

        setTimeout(() => confetti.remove(), 5000)
      }
    }

    createConfetti()
  }, [trigger])

  return null
}

export default Confetti
