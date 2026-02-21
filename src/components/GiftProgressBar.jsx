const GiftProgressBar = ({ daysRemaining, totalDays }) => {
  const progress = ((totalDays - daysRemaining) / totalDays) * 100

  let progressColor = '#8b3a52'
  if (daysRemaining <= 3) progressColor = '#e74c3c' // Red when close
  if (daysRemaining > 10 && daysRemaining <= 15) progressColor = '#f39c12' // Orange approaching
  if (daysRemaining > 15) progressColor = '#27ae60' // Green when far

  return (
    <div className="gift-progress-section">
      <h3 className="progress-title">Your Gift is on the Way 🎁</h3>
      
      <div className="progress-bar-container">
        <div 
          className="progress-bar"
          style={{ 
            width: `${progress}%`,
            backgroundColor: progressColor
          }}
        >
          <span className="progress-text">{Math.round(progress)}%</span>
        </div>
      </div>

      <div className="progress-info">
        <span className="days-left">
          {daysRemaining} days remaining
        </span>
        <span className="progress-status">
          {daysRemaining <= 3 ? '🔥 Almost here!' : 'Coming soon...'}
        </span>
      </div>
    </div>
  )
}

export default GiftProgressBar
