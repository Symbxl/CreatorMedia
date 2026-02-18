import { useState, useEffect, useRef } from 'react';
import './App.css';

/* ============================================
   SCROLL ANIMATION HOOK
   ============================================ */
function useScrollAnimation() {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const current = ref.current;
    if (current) observer.observe(current);
    return () => { if (current) observer.unobserve(current); };
  }, []);

  return [ref, isVisible];
}

function AnimatedSection({ children, className = '', delay = 0, direction = 'up' }) {
  const [ref, isVisible] = useScrollAnimation();
  const dirClass = direction === 'left' ? 'fade-in-left' : direction === 'right' ? 'fade-in-right' : 'fade-in';

  return (
    <div
      ref={ref}
      className={`${dirClass} ${isVisible ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

/* ============================================
   SVG ICONS
   ============================================ */
/* ============================================
   CREATOR TERMINAL LOGO (from Brand Guidelines)
   Hexagonal C bracket (dark) + green arrow
   Colors: #18dc89 (green), #231f20 (dark), #ffffff (white)
   ============================================ */
function CTLogo({ size = 40, variant = 'dark' }) {
  const dark = variant === 'light' ? '#ffffff' : '#231f20';
  const green = '#18dc89';
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Hexagonal C bracket */}
      <path d="M38 12L18 24V48L28 54V34L42 26L56 34V42H68V24L48 12H38Z" fill={dark}/>
      <path d="M38 88L18 76V52L28 46V66L42 74L56 66V58H68V76L48 88H38Z" fill={dark}/>
      {/* Green arrow pointing right */}
      <path d="M50 30L82 50L50 70V56H36V44H50V30Z" fill={green}/>
    </svg>
  );
}

function CTLogoFull({ height = 32, variant = 'dark' }) {
  const textColor = variant === 'light' ? '#ffffff' : '#231f20';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
      <CTLogo size={height * 1.2} variant={variant} />
      <span style={{
        fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
        fontSize: `${height * 0.55}px`,
        fontWeight: 700,
        color: textColor,
        letterSpacing: '-0.02em',
        lineHeight: 1,
      }}>
        Creator<span style={{ color: textColor }}>Terminal</span>
      </span>
    </div>
  );
}

const Icons = {
  Mic: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/>
    </svg>
  ),
  Video: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/>
    </svg>
  ),
  Code: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  Box: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>
    </svg>
  ),
  Megaphone: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 11 18-5v12L3 13v-2z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>
    </svg>
  ),
  Briefcase: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/>
    </svg>
  ),
  Camera: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>
    </svg>
  ),
  Headphones: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>
    </svg>
  ),
  Printer3D: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="8" rx="1"/><path d="M18 14v7H6v-7"/><path d="M6 6V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v3"/>
    </svg>
  ),
  Monitor: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/>
    </svg>
  ),
  Users: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  Heart: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
    </svg>
  ),
  Rocket: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
    </svg>
  ),
  GraduationCap: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>
    </svg>
  ),
  Lightbulb: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>
    </svg>
  ),
  MapPin: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  Mail: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  ),
  ArrowRight: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
    </svg>
  ),
  Play: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3"/>
    </svg>
  ),
  ChevronDown: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6"/>
    </svg>
  ),
  Plus: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14"/><path d="M12 5v14"/>
    </svg>
  ),
  Menu: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>
    </svg>
  ),
  X: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
    </svg>
  ),
  LinkedIn: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
    </svg>
  ),
  Twitter: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  Instagram: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  ),
};

/* ============================================
   NAVIGATION COMPONENT
   ============================================ */
function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const scrollTo = (id) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="nav-inner">
          <div className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} role="button" tabIndex={0} aria-label="Go to top">
            <CTLogoFull height={32} variant="light" />
          </div>
          <ul className="nav-links">
            <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollTo('about'); }}>About</a></li>
            <li><a href="#programs" onClick={(e) => { e.preventDefault(); scrollTo('programs'); }}>Programs</a></li>
            <li><a href="#makerspace" onClick={(e) => { e.preventDefault(); scrollTo('makerspace'); }}>Makerspace</a></li>
            <li><a href="#community" onClick={(e) => { e.preventDefault(); scrollTo('community'); }}>Community</a></li>
            <li><a href="#faq" onClick={(e) => { e.preventDefault(); scrollTo('faq'); }}>FAQ</a></li>
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }} className="nav-cta">Get Started</a></li>
          </ul>
          <button className="mobile-menu-btn" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Icons.Menu />
          </button>
        </div>
      </nav>

      <div className={`mobile-nav ${mobileOpen ? 'open' : ''}`} role="dialog" aria-modal="true">
        <button className="mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close menu">
          <Icons.X />
        </button>
        <a href="#about" onClick={(e) => { e.preventDefault(); scrollTo('about'); }}>About</a>
        <a href="#programs" onClick={(e) => { e.preventDefault(); scrollTo('programs'); }}>Programs</a>
        <a href="#makerspace" onClick={(e) => { e.preventDefault(); scrollTo('makerspace'); }}>Makerspace</a>
        <a href="#community" onClick={(e) => { e.preventDefault(); scrollTo('community'); }}>Community</a>
        <a href="#faq" onClick={(e) => { e.preventDefault(); scrollTo('faq'); }}>FAQ</a>
        <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }} className="btn-primary" style={{ marginTop: '1rem' }}>Get Started</a>
      </div>
    </>
  );
}

/* ============================================
   HERO SECTION
   ============================================ */
function useMousePosition() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handler = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);
  return pos;
}

function Hero() {
  const mouse = useMousePosition();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="hero" role="banner">
      {/* Animated gradient orbs */}
      <div className="hero-orbs">
        <div
          className="hero-orb hero-orb-1"
          style={{ transform: `translate(${mouse.x * 0.02}px, ${mouse.y * 0.02}px)` }}
        />
        <div
          className="hero-orb hero-orb-2"
          style={{ transform: `translate(${mouse.x * -0.015}px, ${mouse.y * -0.015}px)` }}
        />
        <div
          className="hero-orb hero-orb-3"
          style={{ transform: `translate(${mouse.x * 0.01}px, ${mouse.y * -0.01}px)` }}
        />
      </div>

      {/* Subtle grid */}
      <div className="hero-grid-pattern" />

      {/* Animated scan line */}
      <div className="hero-scanline" />

      <div className={`hero-content ${loaded ? 'hero-loaded' : ''}`}>
        {/* Top badge */}
        <div className="hero-badge" style={{ animationDelay: '0.2s' }}>
          <span className="dot" />
          <span>501(c)(3) Nonprofit</span>
          <span className="badge-divider" />
          <span>Katy &bull; Houston, TX</span>
        </div>

        {/* Main heading with staggered reveal */}
        <h1 className="hero-title">
          <span className="hero-title-line" style={{ animationDelay: '0.3s' }}>
            <span className="hero-title-word">Build</span>
            <span className="hero-title-word dim">Your</span>
            <span className="hero-title-word dim">Future</span>
            <span className="hero-title-word dim">In</span>
          </span>
          <span className="hero-title-line" style={{ animationDelay: '0.5s' }}>
            <span className="hero-title-gradient">Digital Media</span>
          </span>
        </h1>

        {/* Subheading */}
        <p className="hero-description" style={{ animationDelay: '0.7s' }}>
          A nonprofit creative lab empowering the next generation through
          <span className="hero-highlight"> recording arts</span>,
          <span className="hero-highlight"> video production</span>,
          <span className="hero-highlight"> coding</span>, and
          <span className="hero-highlight"> design</span>.
        </p>

        {/* CTA Buttons */}
        <div className="hero-actions" style={{ animationDelay: '0.9s' }}>
          <a href="#programs" className="hero-btn-primary" onClick={(e) => { e.preventDefault(); document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' }); }}>
            <span>Explore Programs</span>
            <Icons.ArrowRight />
          </a>
          <a href="#about" className="hero-btn-ghost" onClick={(e) => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }}>
            <span className="hero-btn-ghost-icon"><Icons.Play /></span>
            <span>Our Story</span>
          </a>
        </div>

        {/* Stats bar */}
        <div className="hero-stats-bar" style={{ animationDelay: '1.1s' }}>
          <div className="hero-stat-item">
            <span className="hero-stat-number">6+</span>
            <span className="hero-stat-label">Creative<br/>Disciplines</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat-item">
            <span className="hero-stat-number">90</span>
            <span className="hero-stat-label">Day Path<br/>to Freelance</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat-item">
            <span className="hero-stat-number">3</span>
            <span className="hero-stat-label">Counties<br/>Served</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat-item">
            <span className="hero-stat-number hero-stat-free">Free</span>
            <span className="hero-stat-label">Community<br/>Access</span>
          </div>
        </div>
      </div>

      {/* Bottom fade + scroll indicator */}
      <div className="hero-bottom-fade" />
      <div className="scroll-indicator">
        <span>Scroll to explore</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}

/* ============================================
   ABOUT SECTION
   ============================================ */
function About() {
  return (
    <section className="section about" id="about">
      <div className="section-inner">
        <AnimatedSection>
          <div className="section-label"><span className="line" /> Our Mission</div>
          <h2 className="section-title">Democratizing Creative Education</h2>
          <p className="section-subtitle">
            We believe everyone deserves access to world-class creative tools and training.
          </p>
        </AnimatedSection>

        <div className="about-grid">
          <AnimatedSection direction="left">
            <div className="about-image">
              <img
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80"
                alt="Creator Terminal education session - students learning digital media production"
                loading="lazy"
              />
              <div className="about-image-overlay" />
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right">
            <div className="about-text">
              <h3>Empowering the Next Generation of Digital Creators</h3>
              <p>
                Creator Terminal is a nonprofit organization dedicated to empowering emerging digital
                media professionals and enthusiasts by providing accessible, high-quality resources
                and educational opportunities across disciplines including videography, coding,
                3D modeling, and audio production.
              </p>
              <p>
                Our vision is to be a cornerstone of the digital media community by democratizing
                access to technology and training, ultimately cultivating skilled professionals
                and thriving creative businesses across Katy, Houston, and the greater
                Harris and Fort Bend County areas.
              </p>
              <div className="about-motto">
                "NEVER BE AFRAID TO GROW, CREATE, & INSPIRE"
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   PROGRAMS SECTION
   ============================================ */
const programs = [
  {
    icon: <Icons.Mic />,
    iconClass: 'recording',
    title: 'Recording Arts',
    description: 'Launch your career in audio engineering and music production with hands-on training in professional studio environments.',
    tools: ['Pro Tools', 'Logic Pro', 'Ableton', 'Studio Hardware'],
  },
  {
    icon: <Icons.Video />,
    iconClass: 'video',
    title: 'Video Production',
    description: 'Master filmmaking and video production from pre-production to post, including cinematography, editing, and color grading.',
    tools: ['Adobe Premiere', 'DaVinci Resolve', 'After Effects', 'Cinema Cameras'],
  },
  {
    icon: <Icons.Code />,
    iconClass: 'web',
    title: 'Web & Graphic Design',
    description: 'Build stunning websites and visual identities using industry-standard design and development tools.',
    tools: ['Adobe Suite', 'Figma', 'HTML/CSS', 'JavaScript'],
  },
  {
    icon: <Icons.Box />,
    iconClass: 'threed',
    title: '3D Modeling',
    description: 'Create immersive 3D environments, characters, and assets using cutting-edge tools and game engines.',
    tools: ['Unreal Engine', 'Blender', '3D Printing', 'Maya'],
  },
  {
    icon: <Icons.Megaphone />,
    iconClass: 'marketing',
    title: 'Social Media Marketing',
    description: 'Learn to build and grow audiences across platforms with data-driven content strategies and engagement techniques.',
    tools: ['Content Strategy', 'Analytics', 'Brand Building', 'Paid Ads'],
  },
  {
    icon: <Icons.Briefcase />,
    iconClass: 'business',
    title: 'Business Administration',
    description: 'Turn your creative skills into a sustainable business with training in freelancing, contracts, and entrepreneurship.',
    tools: ['Freelancing', 'Contracts', 'Pricing', 'Client Management'],
  },
];

function Programs() {
  return (
    <section className="section programs" id="programs">
      <div className="section-inner">
        <AnimatedSection>
          <div className="section-label"><span className="line" /> What We Teach</div>
          <h2 className="section-title">Industry-Focused Programs</h2>
          <p className="section-subtitle">
            Comprehensive training across six creative disciplines, combining practical skills
            with the theoretical knowledge demanded by today's industry.
          </p>
        </AnimatedSection>

        <div className="programs-grid">
          {programs.map((program, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <div className="program-card">
                <div className={`program-icon ${program.iconClass}`}>
                  {program.icon}
                </div>
                <h3>{program.title}</h3>
                <p>{program.description}</p>
                <div className="program-tools">
                  {program.tools.map((tool, i) => (
                    <span key={i} className="program-tool-tag">{tool}</span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   MAKERSPACE SECTION
   ============================================ */
const features = [
  {
    icon: <Icons.Camera />,
    title: 'Studio Cameras & Lighting',
    description: 'Professional-grade cameras, studio lighting rigs, and green screen setups for film and photo production.',
  },
  {
    icon: <Icons.Headphones />,
    title: 'Audio Production Booths',
    description: 'Acoustically treated recording booths with industry-standard microphones, interfaces, and monitoring equipment.',
  },
  {
    icon: <Icons.Printer3D />,
    title: '3D Printers & Fabrication',
    description: 'Access to FDM and resin 3D printers for rapid prototyping, product design, and creative fabrication projects.',
  },
  {
    icon: <Icons.Monitor />,
    title: 'Coding & Editing Stations',
    description: 'High-performance workstations loaded with Adobe Suite, Unreal Engine, VS Code, and professional editing software.',
  },
];

function Makerspace() {
  return (
    <section className="section features" id="makerspace">
      <div className="section-inner">
        <AnimatedSection>
          <div className="section-label"><span className="line" /> Our Creative Lab</div>
          <h2 className="section-title">State-of-the-Art Makerspace</h2>
          <p className="section-subtitle">
            Our creative lab is equipped with everything you need to bring your ideas to life,
            from studio cameras to 3D printers and professional coding workstations.
          </p>
        </AnimatedSection>

        <div className="features-grid">
          {features.map((feature, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <div className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   PATHWAY SECTION
   ============================================ */
function Pathway() {
  return (
    <section className="section pathway" id="pathway">
      <div className="section-inner">
        <AnimatedSection>
          <div className="section-label"><span className="line" /> Your Journey</div>
          <h2 className="section-title">From Beginner to Professional in 90 Days</h2>
          <p className="section-subtitle">
            Our structured pathway takes you from learning fundamentals to landing your first paid freelance gig.
          </p>
        </AnimatedSection>

        <AnimatedSection>
          <div className="pathway-timeline">
            <div className="pathway-step">
              <div className="pathway-step-dot" />
              <div className="step-label">Days 1-30</div>
              <h4>Learn & Build</h4>
              <p>Master fundamentals through micro-lessons in your chosen discipline. Build your first projects with hands-on mentorship.</p>
            </div>
            <div className="pathway-step">
              <div className="pathway-step-dot" />
              <div className="step-label">Days 31-60</div>
              <h4>Create & Portfolio</h4>
              <p>Develop a professional portfolio with real-world projects. Refine your skills through advanced techniques and peer collaboration.</p>
            </div>
            <div className="pathway-step">
              <div className="pathway-step-dot" />
              <div className="step-label">Days 61-90</div>
              <h4>Launch & Earn</h4>
              <p>Connect with local employers and clients. Land your first paid freelance work with our business training and community network.</p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ============================================
   COMMUNITY SECTION
   ============================================ */
function Community() {
  return (
    <section className="section community" id="community">
      <div className="section-inner">
        <AnimatedSection>
          <div className="section-label"><span className="line" /> Why Join Us</div>
          <h2 className="section-title">More Than Education</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Community is key to success in the creative industry. Join our network of like-minded
            individuals passionate about digital media.
          </p>
        </AnimatedSection>

        <div className="community-cards">
          <AnimatedSection delay={0.1}>
            <div className="community-card">
              <div className="community-card-icon" style={{ color: '#18dc89' }}>
                <Icons.GraduationCap />
              </div>
              <h3>Expert Mentorship</h3>
              <p>Learn directly from industry professionals who guide you through hands-on projects and provide personalized feedback on your growth.</p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="community-card">
              <div className="community-card-icon" style={{ color: '#12b06e' }}>
                <Icons.Users />
              </div>
              <h3>Creative Collaboration</h3>
              <p>Work alongside fellow creators on real projects. Build connections that turn into creative partnerships and professional opportunities.</p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div className="community-card">
              <div className="community-card-icon" style={{ color: '#0fa968' }}>
                <Icons.Rocket />
              </div>
              <h3>Career Launchpad</h3>
              <p>Gain connections to local employers and businesses. Our 90-day pathway is designed to get you from learning to earning quickly.</p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   FAQ SECTION
   ============================================ */
const faqData = [
  {
    q: 'What programs does Creator Terminal offer?',
    a: 'We offer comprehensive training in six creative disciplines: Recording Arts, Video Production, Web & Graphic Design, 3D Modeling, Social Media Marketing, and Business Administration. Each program combines practical, hands-on training with the theoretical knowledge demanded by today\'s industry.',
  },
  {
    q: 'Do I need prior experience to join?',
    a: 'Not at all! Our programs are designed for beginners through professionals. Whether you\'re just starting your creative journey or looking to advance your skills, we have a pathway for you. Our micro-lessons and mentorship model ensures everyone can learn at their own pace.',
  },
  {
    q: 'Where is Creator Terminal located?',
    a: 'We\'re located in Katy, Texas, serving the greater Houston area including Fulshear, Harris County, and Fort Bend County. Our creative lab and makerspace is equipped with state-of-the-art equipment for all our programs.',
  },
  {
    q: 'How long do the programs take?',
    a: 'Our signature 90-day pathway takes you from learning fundamentals to landing paid freelance work. We also offer ongoing micro-lessons and workshops for continued learning and skill development.',
  },
  {
    q: 'Is Creator Terminal a nonprofit?',
    a: 'Yes! Creator Terminal is a registered 501(c)(3) nonprofit organization. Our mission is to democratize access to digital media education and technology, making high-quality creative training accessible to everyone in our community.',
  },
  {
    q: 'What equipment do you provide?',
    a: 'Our makerspace features professional-grade studio cameras, lighting equipment, audio production booths, 3D printers, coding stations, and video editing suites. All equipment and software are included in your program access.',
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="section faq" id="faq">
      <div className="section-inner">
        <AnimatedSection>
          <div className="section-label"><span className="line" /> Common Questions</div>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Everything you need to know about Creator Terminal and our programs.
          </p>
        </AnimatedSection>

        <div className="faq-list">
          {faqData.map((item, index) => (
            <AnimatedSection key={index} delay={index * 0.05}>
              <div className={`faq-item ${openIndex === index ? 'open' : ''}`}>
                <button
                  className="faq-question"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  aria-expanded={openIndex === index}
                >
                  {item.q}
                  <span className="faq-icon"><Icons.Plus /></span>
                </button>
                <div className="faq-answer">
                  <p>{item.a}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   CTA SECTION
   ============================================ */
function CTA() {
  return (
    <section className="cta-section" id="contact">
      <div className="cta-glow" />
      <div className="section-inner">
        <AnimatedSection>
          <h2>
            Ready to <span className="gradient-text">Create?</span>
          </h2>
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <p>
            Join our community of aspiring creators and start your journey in digital media today.
            No experience necessary.
          </p>
        </AnimatedSection>
        <AnimatedSection delay={0.2}>
          <div className="hero-buttons">
            <a href="https://www.creatorterminal.com" className="btn-primary" target="_blank" rel="noopener noreferrer">
              Apply Now <Icons.ArrowRight />
            </a>
            <a href="mailto:info@creatorterminal.com" className="btn-secondary">
              <Icons.Mail /> Contact Us
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ============================================
   FOOTER
   ============================================ */
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="nav-logo">
              <CTLogoFull height={30} variant="light" />
            </div>
            <p>
              Empowering emerging digital media professionals through accessible,
              high-quality education in Katy, Houston, and the greater Texas community.
            </p>
            <div className="footer-social">
              <a href="https://www.linkedin.com/company/creatorterminal" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Icons.LinkedIn />
              </a>
              <a href="https://x.com/CreatorTerminal" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X">
                <Icons.Twitter />
              </a>
              <a href="https://www.instagram.com/creatorterminal" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Icons.Instagram />
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Programs</h4>
            <ul>
              <li><a href="#programs">Recording Arts</a></li>
              <li><a href="#programs">Video Production</a></li>
              <li><a href="#programs">Web & Graphic Design</a></li>
              <li><a href="#programs">3D Modeling</a></li>
              <li><a href="#programs">Marketing</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Organization</h4>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#makerspace">Makerspace</a></li>
              <li><a href="#community">Community</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Location</h4>
            <ul>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'var(--color-text-secondary)' }}>
                <Icons.MapPin />
                <span>3803 Pottharst Park Ct,<br />Katy, TX 77494</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-secondary)' }}>
                <Icons.Mail />
                <a href="mailto:info@creatorterminal.com">info@creatorterminal.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Creator Terminal. All rights reserved. 501(c)(3) Nonprofit Organization.</p>
          <div className="footer-bottom-links">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ============================================
   MAIN APP
   ============================================ */
function App() {
  return (
    <div className="App">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Programs />
        <Makerspace />
        <Pathway />
        <Community />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
