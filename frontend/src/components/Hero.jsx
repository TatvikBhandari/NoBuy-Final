import React from 'react';

const STEPS = [
  { number: '01', title: 'Find it nearby', text: 'Browse useful things from local owners.' },
  { number: '02', title: 'Rent or bargain', text: 'Choose your dates or make an offer.' },
  { number: '03', title: 'Pick up and enjoy', text: 'Use it well, then return it with care.' },
];

export const Hero = ({ searchValue = '', onSearchChange = () => {} }) => (
  <>
    <section className="hero-section" id="hero-banner">
      <div className="container">
        <div className="hero-editorial">
          <div className="hero-copy">
            <div className="hero-pill">
              <span className="hero-pill-dot" /> A neighbourhood rental marketplace
            </div>
            <h1 className="hero-brand-title">NO-BUY</h1>
            <h2 className="hero-title">Good things are closer <em>than you think.</em></h2>
            <p className="hero-subtitle">Find what you need. Rent what you don't need to own.</p>
            <div className="hero-search" role="search">
              <span aria-hidden="true">⌕</span>
              <input
                aria-label="Search items or locations"
                type="search"
                placeholder="What are you looking for? Try camera, tools…"
                value={searchValue}
                onChange={(event) => onSearchChange(event.target.value)}
              />
              <a href="#product-catalog-section" className="hero-search-button">Explore items <span aria-hidden="true">→</span></a>
            </div>
            <p className="hero-note">Cameras, tools, outdoor gear and more — shared close to home.</p>
          </div>

          <figure className="hero-image-wrap">
            <img
              className="hero-image"
              src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1500&q=85"
              alt="A camera ready for a day of exploring"
              fetchPriority="high"
            />
            <figcaption><span>Made for the moment</span><span>Borrow a little more possibility.</span></figcaption>
            <div className="hero-image-index" aria-hidden="true">01 / 03</div>
          </figure>
        </div>

        <div className="hero-steps" id="how-it-works" aria-label="How it works">
          {STEPS.map((step) => (
            <div className="hero-step" key={step.number}>
              <span className="hero-step-number">{step.number}</span>
              <div>
                <div className="hero-step-title">{step.title}</div>
                <div className="hero-step-text">{step.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);
