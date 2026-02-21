import './Team.css'

const Team = () => {
  const teamMembers = [
    {
      name: 'Adaeze Okonkwo',
      role: 'Managing Director',
      description: 'Leading our vision for premium real estate in Abuja with over 12 years of industry experience.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
    },
    {
      name: 'Chukwuma Eze',
      role: 'Head of Sales',
      description: 'Expert in property acquisitions and client relations, dedicated to finding your perfect home.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    },
    {
      name: 'Ngozi Adeyemi',
      role: 'Legal & Documentation',
      description: 'Ensuring every transaction meets the highest standards of legality and transparency.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
    },
    {
      name: 'Ibrahim Musa',
      role: 'Property Development',
      description: 'Overseeing construction quality and smart home integrations across all our developments.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    },
    {
      name: 'Funke Balogun',
      role: 'Client Relations',
      description: 'Your dedicated point of contact for a smooth and personalized property journey.',
      image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=400&fit=crop',
    },
  ]

  return (
    <section id="team" className="section team">
      <h2 className="section-title">Meet the Team</h2>
      <p className="section-subtitle">
        The people behind Elite Cycle Homes—passionate about your investment
      </p>
      <div className="team__grid">
        {teamMembers.map((member, index) => (
          <article key={index} className="team__card">
            <div className="team__image-wrapper">
              <img
                src={member.image}
                alt={member.name}
                className="team__image"
                loading="lazy"
              />
            </div>
            <h3 className="team__name">{member.name}</h3>
            <p className="team__role">{member.role}</p>
            <p className="team__description">{member.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Team
