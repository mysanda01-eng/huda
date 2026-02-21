const VolumeControl = ({ isPlaying, onToggle, volume, onVolumeChange, musicTitle }) => {
  return (
    <div className="volume-control-container">
      <button 
        className={`audio-control ${isPlaying ? 'playing' : ''}`}
        onClick={onToggle}
        title={isPlaying ? 'Pause music' : 'Play music'}
      >
        <span>{isPlaying ? '⏸' : '▶'}</span>
      </button>

      <div className="volume-slider-group">
        <label htmlFor="volume-slider" className="volume-label">
          🔊
        </label>
        <input
          id="volume-slider"
          type="range"
          min="0"
          max="100"
          value={volume * 100}
          onChange={(e) => onVolumeChange(e.target.value / 100)}
          className="volume-slider"
          title="Adjust volume"
        />
        <span className="volume-percent">{Math.round(volume * 100)}%</span>
      </div>

      {musicTitle && isPlaying && (
        <div className="now-playing">
          🎵 {musicTitle}
        </div>
      )}
    </div>
  )
}

export default VolumeControl
