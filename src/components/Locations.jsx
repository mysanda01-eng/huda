import './Locations.css'

const Locations = () => {
  const locations = [
    {
      name: 'Katampe Extension',
      tag: 'Primary Location',
      description: 'Our flagship development. Prime residential area with excellent connectivity, premium amenities, and a thriving community of professionals.',
    },
    {
      name: 'Coming Soon',
      tag: 'Future Expansion',
      description: 'We are actively scouting new premium locations to expand our portfolio. Stay tuned for exciting developments.',
    },
    {
      name: 'Coming Soon',
      tag: 'Future Expansion',
      description: 'Additional sites in strategic areas to serve our growing clientele. Your next investment opportunity awaits.',
    },
  ]

  return (
    <section id="locations" className="section locations">
      <h2 className="section-title">Our Site Locations</h2>
      <p className="section-subtitle">
        Strategic placements for modern living
      </p>
      <div className="locations__grid">
        {locations.map((location, index) => (
          <div
            key={index}
            className={`locations__card ${index === 0 ? 'locations__card--primary' : ''}`}
          >
            <div className="locations__placeholder">
              {index === 0 ? (
                <span className="locations__placeholder-text">Katampe Extension</span>
              ) : (
                <span className="locations__placeholder-text">Coming Soon</span>
              )}
            </div>
            <span className="locations__tag">{location.tag}</span>
            <h3 className="locations__name">{location.name}</h3>
            <p className="locations__description">{location.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Locations
