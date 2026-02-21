export default function NineTeenReasons({ onBack }) {
  const reasons = [
    "Your smile lights up my entire world",
    "The way you laugh makes everything feel lighter",
    "Your kindness toward others inspires me daily",
    "You challenge me to be a better person",
    "Your authenticity is rare and beautiful",
    "The way you listen with your whole heart",
    "Your creativity and imagination amaze me",
    "You make me feel completely understood",
    "Your strength in difficult moments motivates me",
    "The little things you do show me love every day",
    "Your passion for what you believe in is contagious",
    "You celebrate my wins like they're your own",
    "Your presence calms me like nothing else can",
    "The way you dream big inspires my own dreams",
    "Your loyalty and devotion mean everything",
    "You make me laugh until my sides hurt",
    "Your beauty comes from within, shining outward",
    "The way you love unconditionally humbles me",
    "Because you are my forever, my always, my everything"
  ]

  return (
    <div className="nineteen-page">
      <button className="back-btn" onClick={onBack}>← Back to Home</button>
      
      <div className="nineteen-header">
        <h1>19 Reasons Why I Love You</h1>
        <p>As you turn 19, here are 19 reasons you mean everything to me</p>
      </div>

      <div className="reasons-grid">
        {reasons.map((reason, idx) => (
          <div key={idx} className="reason-card">
            <div className="reason-number">{idx + 1}</div>
            <p className="reason-text">{reason}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
