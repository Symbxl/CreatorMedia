import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import Chatbot from './Chatbot';
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
const Icons = {
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
  YouTube: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
  Facebook: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
  TikTok: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  ),
  Discord: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/>
    </svg>
  ),
  Patreon: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M14.82 2.41c3.96 0 7.18 3.24 7.18 7.21 0 3.96-3.22 7.18-7.18 7.18-3.97 0-7.21-3.22-7.21-7.18 0-3.97 3.24-7.21 7.21-7.21M2 21.6h3.5V2.41H2V21.6z"/>
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'var(--color-brand-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
                <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Creator Terminal" style={{ height: '34px', width: '34px', objectFit: 'contain' }} />
              </div>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-brand-dark)', letterSpacing: '-0.02em' }}>Creator<span>Terminal</span></span>
            </div>
          </div>
          <ul className="nav-links">
            <li><a href="#hero" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Home</a></li>
            <li><a href="/team">Team</a></li>
            <li><a href="/donate">Donate</a></li>
            <li><a href="/blog">Impact Stories</a></li>
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>Contact</a></li>
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
        <a href="#hero" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); setMobileOpen(false); }}>Home</a>
        <a href="/team" onClick={() => setMobileOpen(false)}>Team</a>
        <a href="/donate" onClick={() => setMobileOpen(false)}>Donate</a>
        <a href="/blog" onClick={() => setMobileOpen(false)}>Impact Stories</a>
        <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>Contact</a>
      </div>
    </>
  );
}

/* ============================================
   HERO SECTION
   ============================================ */
const DiscordIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/>
  </svg>
);

function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="hero" role="banner">
      <div className={`hero-inner ${loaded ? 'hero-loaded' : ''}`}>
        {/* Left: Text content */}
        <div className="hero-text">
          {/* Top badge */}
          <div className="hero-badge" style={{ animationDelay: '0.2s' }}>
            <span className="dot" />
            <span>Nonprofit</span>
            <span className="badge-divider" />
            <span>Katy &bull; Houston, TX</span>
          </div>

          {/* Main heading */}
          <h1 className="hero-title" style={{ animationDelay: '0.3s' }}>
            Inspire Through <span className="hero-title-gradient">Creation</span>
          </h1>

          {/* Tagline */}
          <p className="hero-tagline" style={{ animationDelay: '0.5s' }}>
            Where together, we create more than just art, <strong>We create futures</strong>
          </p>
        </div>
      </div>

      {/* Video */}
      <div className={`hero-video-section ${loaded ? 'hero-loaded' : ''}`}>
        <div className="hero-video-container" style={{ animationDelay: '0.7s' }}>
          <video
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            poster={`${process.env.PUBLIC_URL}/hero-bg.avif`}
          >
            <source src={`${process.env.PUBLIC_URL}/hero.mp4`} type="video/mp4" />
          </video>
          <a href="/donate" className="hero-video-cta">
            <span>Donate Today</span>
            <Icons.ArrowRight />
          </a>
        </div>
      </div>

      {/* Mission statement strip */}
      <div className={`hero-mission-strip ${loaded ? 'hero-loaded' : ''}`}>
        <div className="hero-mission-inner" style={{ animationDelay: '0.9s' }}>
          <div className="hero-mission-accent" />
          <p className="hero-mission-text">
            We're building a space where creativity has no limits. From video and audio production
            to design, coding, and 3D creation, our goal is to give people the <strong>tools</strong>,{' '}
            <strong>knowledge</strong>, and <strong>confidence</strong> to bring their ideas to life
            and build lasting futures through creativity.
          </p>
        </div>
      </div>

      {/* Stat cards */}
      <div className={`hero-cards-wrap ${loaded ? 'hero-loaded' : ''}`}>
        <div className="hero-cards" style={{ animationDelay: '1.0s' }}>
          <div className="hero-card">
            <span className="hero-card-number">500</span>
            <span className="hero-card-label">Students & Creators Impacted</span>
          </div>
          <div className="hero-card">
            <span className="hero-card-number">150</span>
            <span className="hero-card-label">Creative Projects Supported</span>
          </div>
          <div className="hero-card">
            <span className="hero-card-number">12</span>
            <span className="hero-card-label">Active Training Programs</span>
          </div>
          <div className="hero-card hero-card-vision">
            <span className="hero-card-number">1 Vision</span>
            <span className="hero-card-label">A 150,000 Sq. Ft. Creative Facility</span>
          </div>
        </div>
      </div>

      {/* Discord Card */}
      <div className={`hero-discord-wrap ${loaded ? 'hero-loaded' : ''}`}>
        <a
          href="https://discord.gg/JXQaukyVaa"
          className="hero-discord-card"
          target="_blank"
          rel="noopener noreferrer"
          style={{ animationDelay: '1.2s' }}
        >
          <div className="hero-discord-icon-wrap">
            <DiscordIcon />
          </div>
          <div className="hero-discord-info">
            <span className="hero-discord-label">Join Our Community</span>
            <h3 className="hero-discord-title">Creator Terminal Discord</h3>
            <p className="hero-discord-desc">
              Connect with fellow creators, share your work, get feedback, and stay updated on events and opportunities.
            </p>
          </div>
          <div className="hero-discord-action">
            <span>Join Server</span>
            <Icons.ArrowRight />
          </div>
        </a>
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
   DONATE SECTION
   ============================================ */
function Donate() {
  return (
    <section className="section donate" id="donate">
      <div className="section-inner">
        <AnimatedSection>
          <div className="section-label"><span className="line" /> Support Our Mission</div>
          <h2 className="section-title">Help Us Empower Creators</h2>
          <p className="section-subtitle">
            As a 501(c)(3) nonprofit, Creator Terminal relies on the generosity of donors and
            supporters to provide free and accessible digital media education to our community.
            Every contribution makes a direct impact.
          </p>
        </AnimatedSection>

        <div className="donate-grid">
          <AnimatedSection delay={0.1}>
            <div className="donate-card donate-card-featured">
              <div className="donate-card-badge">Most Popular</div>
              <div className="donate-card-icon" style={{ color: '#10b981' }}>
                <Icons.Heart />
              </div>
              <h3>Monthly Supporter</h3>
              <p>
                Become a recurring donor through Patreon and help sustain our programs year-round.
                Monthly supporters get exclusive updates, behind-the-scenes content, and recognition
                on our website.
              </p>
              <a href="https://www.patreon.com/creatorterminal" target="_blank" rel="noopener noreferrer" className="btn-primary donate-btn">
                Support on Patreon <Icons.ArrowRight />
              </a>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="donate-card">
              <div className="donate-card-icon" style={{ color: '#059669' }}>
                <Icons.Rocket />
              </div>
              <h3>One-Time Donation</h3>
              <p>
                Make a tax-deductible one-time contribution via PayPal. Whether it's $10 or $10,000,
                every dollar goes directly toward equipment, facilities, and educational programs
                for our community.
              </p>
              <a href="https://www.paypal.com/donate/?hosted_button_id=creatorterminal" target="_blank" rel="noopener noreferrer" className="btn-primary donate-btn">
                Donate via PayPal <Icons.ArrowRight />
              </a>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div className="donate-card">
              <div className="donate-card-icon" style={{ color: '#34d399' }}>
                <Icons.Briefcase />
              </div>
              <h3>Corporate Sponsorship</h3>
              <p>
                Partner with Creator Terminal to invest in the future of digital media in Houston.
                Corporate sponsors receive branding opportunities, event access, and the ability
                to shape the next generation of creative talent.
              </p>
              <a href="mailto:contact@creatorterminal.com?subject=Corporate Sponsorship Inquiry" className="btn-primary donate-btn">
                Get in Touch <Icons.ArrowRight />
              </a>
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={0.2}>
          <div className="donate-tax-note">
            <Icons.Lightbulb />
            <p>
              Creator Terminal is a registered <strong>501(c)(3) nonprofit organization</strong> (EIN: 93-4865679).
              All donations are tax-deductible to the extent allowed by law.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}


/* ============================================
   CONTACT SECTION
   ============================================ */
function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Open mailto link with form data
    const mailtoLink = `mailto:contact@creatorterminal.com?subject=${encodeURIComponent(formData.subject || 'Website Inquiry')}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
    window.location.href = mailtoLink;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section className="section contact-section" id="contact">
      <div className="section-inner">
        <AnimatedSection>
          <div className="section-label"><span className="line" /> Get In Touch</div>
          <h2 className="section-title">Contact Us</h2>
          <p className="section-subtitle">
            Have questions about our programs, want to volunteer, or interested in partnering with us?
            We'd love to hear from you.
          </p>
        </AnimatedSection>

        <div className="contact-grid">
          <AnimatedSection direction="left">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="contact-name">Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-email">Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="contact-subject">Subject</label>
                <input
                  id="contact-subject"
                  type="text"
                  placeholder="What's this about?"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  placeholder="Tell us how we can help..."
                  rows="5"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>
              <button type="submit" className="btn-primary contact-submit">
                {submitted ? 'Opening Email Client...' : 'Send Message'} {!submitted && <Icons.ArrowRight />}
              </button>
            </form>
          </AnimatedSection>

          <AnimatedSection direction="right">
            <div className="contact-info">
              <div className="contact-info-card">
                <div className="contact-info-icon">
                  <Icons.MapPin />
                </div>
                <div>
                  <h4>Visit Us</h4>
                  <p>3803 Pottharst Park Ct<br />Katy, TX 77494</p>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="contact-info-icon">
                  <Icons.Mail />
                </div>
                <div>
                  <h4>Email Us</h4>
                  <p><a href="mailto:contact@creatorterminal.com">contact@creatorterminal.com</a></p>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="contact-info-icon">
                  <Icons.Users />
                </div>
                <div>
                  <h4>Follow Us</h4>
                  <div className="contact-social-links">
                    <a href="https://www.linkedin.com/company/creatorterminal" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    <a href="https://x.com/CreatorTerminal" target="_blank" rel="noopener noreferrer">X / Twitter</a>
                    <a href="https://www.instagram.com/creatorterminal" target="_blank" rel="noopener noreferrer">Instagram</a>
                  </div>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="contact-info-icon">
                  <Icons.Lightbulb />
                </div>
                <div>
                  <h4>Areas We Serve</h4>
                  <p>Katy, TX &bull; Houston, TX &bull; Fulshear, TX<br />Harris County &bull; Fort Bend County</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   INVEST IN CREATORS SECTION (Photos + Donation Cards)
   ============================================ */
function InvestInCreators() {
  return (
    <section className="section invest-section" id="invest">
      <div className="section-inner">
        <AnimatedSection>
          <div className="section-label"><span className="line" /> Invest in Creators</div>
          <h2 className="section-title">Empowering Creators for Generations to Come</h2>
          <p className="section-subtitle invest-subtitle">
            Creativity shapes the world, and access to it changes lives. Our mission is to provide the tools, education, and community that help people explore their creative potential whether through film, design, coding, or 3D creation. Together, we're building a generation of creators who think boldly and create fearlessly.
          </p>
          <p className="section-subtitle invest-subtitle invest-spark">
            Every story begins with a spark, yours could inspire the next.
          </p>
          <a href="#team" className="btn-primary invest-team-btn" onClick={(e) => { e.preventDefault(); document.getElementById('team')?.scrollIntoView({ behavior: 'smooth' }); }}>
            Meet the Team <Icons.ArrowRight />
          </a>
        </AnimatedSection>

        {/* Photo row */}
        <div className="invest-photos">
          <AnimatedSection direction="left">
            <div className="invest-photo">
              <img src={`${process.env.PUBLIC_URL}/sec1.avif`} alt="Creator Terminal students collaborating" loading="lazy" />
            </div>
          </AnimatedSection>
          <AnimatedSection direction="right">
            <div className="invest-photo">
              <img src={`${process.env.PUBLIC_URL}/sec2.avif`} alt="Creator Terminal creative workspace" loading="lazy" />
            </div>
          </AnimatedSection>
        </div>

        {/* Stat card */}
        <AnimatedSection>
          <div className="invest-stat-card">
            <span className="invest-stat-number">8M+</span>
            <span className="invest-stat-label">Creators Empowered Through Media</span>
          </div>
        </AnimatedSection>

        {/* Featured Programs header */}
        <AnimatedSection>
          <div className="invest-featured-header">
            <div className="section-label"><span className="line" /> Featured Programs</div>
            <h3 className="invest-featured-title">Empowering Communities One Creator at a Time</h3>
            <p className="section-subtitle invest-subtitle">
              Our initiatives empower creators, students, and small businesses to explore digital media and technology. Through education, mentorship, and hands-on learning, we're helping communities build creative skills that open doors to new careers, opportunities, and possibilities.
            </p>
          </div>
        </AnimatedSection>

        {/* Donation cards */}
        <div className="invest-cards">
          <AnimatedSection delay={0.1}>
            <div className="invest-card">
              <div className="invest-card-image">
                <img src={`${process.env.PUBLIC_URL}/creatorScholarships.avif`} alt="Creator Scholarships" loading="lazy" />
              </div>
              <div className="invest-card-content">
                <h3>Creator Scholarship</h3>
                <p className="invest-card-tagline">Investing in Emerging Talent</p>
                <p>Helps fund scholarships and training for students pursuing digital arts, media production, and technology programs at Creator Terminal.</p>
                <div className="invest-card-goal">
                  <Icons.Rocket />
                  <span>Target Goal: <strong>$5,750,000</strong></span>
                </div>
                <a href="/donate" className="btn-primary invest-donate-btn">
                  Donate <Icons.ArrowRight />
                </a>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="invest-card">
              <div className="invest-card-image">
                <img src={`${process.env.PUBLIC_URL}/DigitalLearningAccess.webp`} alt="Digital Learning Access" loading="lazy" />
              </div>
              <div className="invest-card-content">
                <h3>Digital Learning Access</h3>
                <p className="invest-card-tagline">Expanding Creative Education</p>
                <p>Funds provide computers, cameras, and software for individuals without access to creative tools ensuring anyone can learn, create, and grow in digital media.</p>
                <div className="invest-card-goal">
                  <Icons.Rocket />
                  <span>Target Goal: <strong>$8,250,000</strong></span>
                </div>
                <a href="/donate" className="btn-primary invest-donate-btn">
                  Donate <Icons.ArrowRight />
                </a>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div className="invest-card">
              <div className="invest-card-image">
                <img src={`${process.env.PUBLIC_URL}/CreatorTerminalFacility.webp`} alt="Creator Terminal Facility" loading="lazy" />
              </div>
              <div className="invest-card-content">
                <h3>Creator Terminal Facility</h3>
                <p className="invest-card-tagline">Building the Future of Creativity</p>
                <p>A 150,000 sq. ft. hub designed to provide studios, classrooms, and labs for film, design, coding, and 3D education built to empower creators and strengthen communities.</p>
                <div className="invest-card-goal">
                  <Icons.Rocket />
                  <span>Target Goal: <strong>$46,500,000</strong></span>
                </div>
                <a href="/donate" className="btn-primary invest-donate-btn">
                  Donate <Icons.ArrowRight />
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   EMPOWERING GROWTH SECTION
   ============================================ */
function EmpoweringGrowth() {
  return (
    <section className="section empowering-section" id="empowering">
      <div className="section-inner">
        <AnimatedSection>
          <div className="section-label"><span className="line" /> Our Impact</div>
          <h2 className="section-title">Empowering Growth Through Creativity and Access</h2>
        </AnimatedSection>

        <div className="empowering-grid">
          <AnimatedSection delay={0.1}>
            <div className="empowering-card">
              <div className="empowering-card-icon">
                <Icons.Rocket />
              </div>
              <h3>Expand Opportunity</h3>
              <p>Bridging the gap between talent and technology by providing access to creative tools, training, and real-world experience.</p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="empowering-card">
              <div className="empowering-card-icon">
                <Icons.Users />
              </div>
              <h3>Inspire Collaboration</h3>
              <p>Bringing people together through mentorship, workshops, and community projects that spark innovation and shared learning.</p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div className="empowering-card">
              <div className="empowering-card-icon">
                <Icons.Lightbulb />
              </div>
              <h3>Build Sustainable Futures</h3>
              <p>Equipping creators with the skills and confidence to turn imagination into careers creating lasting impact for themselves and their communities.</p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   JOIN CREATOR TERMINAL SECTION
   ============================================ */
function JoinSection() {
  return (
    <section className="section join-section" id="join">
      <div className="section-inner">
        <div className="join-layout">
          <AnimatedSection direction="left">
            <div className="join-image">
              <img src={`${process.env.PUBLIC_URL}/Join.avif`} alt="Join Creator Terminal" loading="lazy" />
              <div className="join-image-overlay" />
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right">
            <div className="join-content">
              <h2 className="section-title">Join Creator Terminal Today!</h2>
              <p>Together, we can open doors for creators, expand access to technology, and build a future where creativity empowers communities. Every contribution helps us provide the tools, training, and opportunities that turn imagination into possibility.</p>
              <a href="#contact" className="btn-primary join-btn" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
                Get Involved <Icons.ArrowRight />
              </a>
              <p className="join-footnote">Creator Terminal is a nonprofit organization dedicated to making creative education accessible, fostering collaboration, and empowering the next generation of digital creators.</p>
            </div>
          </AnimatedSection>
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
    <section className="cta-section">
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
            <a href="mailto:contact@creatorterminal.com" className="btn-secondary">
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'var(--color-brand-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
                  <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Creator Terminal" style={{ height: '30px', width: '30px', objectFit: 'contain' }} />
                </div>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: '1rem', color: 'var(--color-brand-dark)', letterSpacing: '-0.02em' }}>Creator<span>Terminal</span></span>
              </div>
            </div>
            <p>
              Empowering emerging digital media professionals through accessible,
              high-quality education in Katy, Houston, and the greater Texas community.
            </p>
            <div className="footer-social">
              <a href="https://www.patreon.com/profile/creators?u=45426276" target="_blank" rel="noopener noreferrer" aria-label="Patreon">
                <Icons.Patreon />
              </a>
              <a href="https://x.com/CreatorTerminal" target="_blank" rel="noopener noreferrer" aria-label="X / Twitter">
                <Icons.Twitter />
              </a>
              <a href="https://www.youtube.com/@CreatorTerminal" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <Icons.YouTube />
              </a>
              <a href="https://www.facebook.com/CreatorTerminal" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Icons.Facebook />
              </a>
              <a href="https://www.tiktok.com/@creatorterminal" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                <Icons.TikTok />
              </a>
              <a href="https://www.linkedin.com/company/CreatorTerminal/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Icons.LinkedIn />
              </a>
              <a href="https://discord.com/invite/a9XGNEDBrT" target="_blank" rel="noopener noreferrer" aria-label="Discord">
                <Icons.Discord />
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
              <li><a href="#team">Our Team</a></li>
              <li><a href="/donate">Donate</a></li>
              <li><a href="/blog">Impact Stories</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#faq">FAQ</a></li>
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
                <a href="mailto:contact@creatorterminal.com">contact@creatorterminal.com</a>
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
          <a href="https://www.guidestar.org/profile/15908022" target="_blank" rel="noopener noreferrer" aria-label="GuideStar Transparency Seal">
            <img src="https://widgets.guidestar.org/prod/v1/pdp/transparency-seal/15908022/svg" alt="GuideStar Transparency Seal" style={{ height: '80px', marginTop: '1rem' }} />
          </a>
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
      <Helmet>
        <title>Creator Terminal | Digital Media Education Nonprofit - Houston & Katy, TX</title>
        <meta name="description" content="Creator Terminal is a 501(c)(3) nonprofit empowering individuals through digital media education in audio, video, coding, design, marketing & business. Located in Katy & Houston, TX." />
        <meta name="keywords" content="Creator Terminal, digital media education, Houston nonprofit, Katy TX, recording arts, video production, web design, audio engineering, music production, creative education, makerspace, coding bootcamp, 3D modeling, nonprofit organization Houston" />
        <link rel="canonical" href="https://www.creatorterminal.com/" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.creatorterminal.com/" />
        <meta property="og:title" content="Creator Terminal | Digital Media Education Nonprofit - Houston & Katy, TX" />
        <meta property="og:description" content="Empowering emerging digital media professionals through accessible, high-quality education in videography, coding, 3D modeling, audio production and more. 501(c)(3) nonprofit in Katy, TX." />
        <meta property="og:image" content="https://www.creatorterminal.com/logo512.png" />
        <meta property="og:site_name" content="Creator Terminal" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@CreatorTerminal" />
        <meta name="twitter:title" content="Creator Terminal | Digital Media Education Nonprofit" />
        <meta name="twitter:description" content="Empowering emerging digital media professionals through accessible, high-quality education in videography, coding, 3D modeling, audio production and more." />
        <meta name="twitter:image" content="https://www.creatorterminal.com/logo512.png" />

        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          "name": "Creator Terminal",
          "alternateName": "CreatorTerminal",
          "description": "501(c)(3) nonprofit organization empowering emerging digital media professionals through accessible, high-quality resources and educational opportunities in videography, coding, 3D modeling, and audio production.",
          "url": "https://www.creatorterminal.com",
          "logo": "https://www.creatorterminal.com/logo512.png",
          "image": "https://www.creatorterminal.com/hero-bg.avif",
          "foundingDate": "2024",
          "email": "contact@creatorterminal.com",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "3803 Pottharst Park Ct",
            "addressLocality": "Katy",
            "addressRegion": "TX",
            "postalCode": "77494",
            "addressCountry": "US"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 29.7604,
            "longitude": -95.3698
          },
          "areaServed": [
            { "@type": "City", "name": "Katy, TX" },
            { "@type": "City", "name": "Houston, TX" },
            { "@type": "City", "name": "Fulshear, TX" },
            { "@type": "AdministrativeArea", "name": "Harris County, TX" },
            { "@type": "AdministrativeArea", "name": "Fort Bend County, TX" }
          ],
          "nonprofitStatus": "Nonprofit501c3",
          "taxID": "93-4865679",
          "slogan": "Never Be Afraid To Grow, Create, & Inspire",
          "knowsAbout": ["Recording Arts", "Video Production", "Web Design", "Graphic Design", "Audio Engineering", "Music Production", "Coding", "3D Modeling", "Social Media Marketing", "Business Administration"],
          "sameAs": [
            "https://www.linkedin.com/company/creatorterminal",
            "https://x.com/CreatorTerminal",
            "https://www.youtube.com/@CreatorTerminal",
            "https://www.facebook.com/CreatorTerminal",
            "https://www.tiktok.com/@creatorterminal",
            "https://discord.com/invite/a9XGNEDBrT",
            "https://www.patreon.com/creatorterminal"
          ],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Creative Education Programs",
            "itemListElement": [
              { "@type": "Course", "name": "Recording Arts", "description": "Professional audio engineering and music production training" },
              { "@type": "Course", "name": "Video Production", "description": "Film, cinematography, and video editing training" },
              { "@type": "Course", "name": "Web & Graphic Design", "description": "Web development, UI/UX design, and graphic design training" },
              { "@type": "Course", "name": "3D Modeling", "description": "3D modeling, Unreal Engine, and digital animation" },
              { "@type": "Course", "name": "Social Media Marketing", "description": "Digital marketing and social media strategy training" },
              { "@type": "Course", "name": "Business Administration", "description": "Business fundamentals, branding, and entrepreneurship" }
            ]
          }
        })}</script>
      </Helmet>
      <Navigation />
      <main>
        <Hero />
        <EmpoweringGrowth />
        <InvestInCreators />
        <Makerspace />
        <JoinSection />
        <Donate />
        <Contact />
        <CTA />
        <FAQ />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}

export { CTA, Footer };
export default App;
