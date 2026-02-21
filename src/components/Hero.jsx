import './Hero.css'

const Hero = () => {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="hero">
      <div className="hero__content">
        <h1 className="hero__title">Elite Cycle Homes</h1>
        <p className="hero__motto">Invest Smart, Live Elite</p>
        <p className="hero__intro">
          Premium smart homes in the heart of Katampe Extension. Designed for ambitious, 
          business-focused individuals who demand quality, reliability, and secure documentation. 
          Your path to elite living starts here.
        </p>
        <button
          className="hero__cta"
          onClick={() => scrollToSection('what-we-do')}
        >
          Explore Listings
        </button>
      </div>
      <div className="hero__visual">
        <div className="hero__placeholder"></div>
      </div>
    </section>
  )
}

export default Hero
