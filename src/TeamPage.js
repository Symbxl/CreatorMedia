import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import './TeamPage.css';
import { CTA, Footer } from './App';

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
   ICONS
   ============================================ */
const Icons = {
  LinkedIn: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
    </svg>
  ),
  ArrowRight: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
    </svg>
  ),
  ArrowLeft: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>
    </svg>
  ),
  Upload: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/>
    </svg>
  ),
};

/* ============================================
   TEAM DATA
   ============================================ */
const teamMembers = [
  {
    name: 'Tristan Aurelio',
    role: 'Lead Content Creator | Video Editor',
    bio: 'Houston-based videographer and cinematographer specializing in cinematic storytelling. From fast-paced sports promos to emotionally grounded community pieces, Tristan blends precision, style, and soul.',
    image: `${process.env.PUBLIC_URL}/tristan-aurelio.avif`,
    slug: 'tristan-aurelio',
    fullBio: 'I\'m a Houston-based videographer and cinematographer specializing in cinematic storytelling with an edge. From fast-paced sports promos to emotionally grounded community pieces, my work blends precision, style, and soul. I got my start crafting narrative-driven hype videos for university organizations, and quickly built a reputation for turning simple concepts into cinematic experiences. In 2022, my work for the University of Houston\'s Filipino Student Association drew over 20,000 views in just three days, cementing my passion for telling stories that resonate on and off the screen. I direct, shoot, and edit with intention — obsessing over lighting, camera movement, pacing, and atmosphere to build visuals that hit hard and linger long after. Whether I\'m on set or in the studio, I approach every frame with the goal of elevating the people and stories in front of the lens.',
    email: 'contact@creatorterminal.com',
    phone: '813 815 0142',
  },
  {
    name: 'Anthony Marquez',
    role: 'President',
    bio: 'Founder and President of Creator Terminal. A former United States Marine and current Texas law enforcement officer, Anthony brings discipline, structure, and community service to every endeavor.',
    image: `${process.env.PUBLIC_URL}/anthony.avif`,
    slug: 'anthony-marquez',
    fullBio: 'Anthony A. Marquez is the Founder and President of Creator Terminal, a registered 501(c)(3) nonprofit organization based in Katy, Texas, dedicated to empowering people through creative and technological education. A former United States Marine and current Texas law enforcement officer, Anthony brings a deep sense of discipline, structure, and community service to every endeavor he leads. With a vision to make digital media education accessible to everyone, Anthony established Creator Terminal as a hub where individuals from all backgrounds can learn video production, audio engineering, graphic design, coding, and 3D development. Under his leadership, the organization is building a 150,000-square-foot creative facility that will serve as a training and innovation center for creators, small businesses, and students across Texas. Anthony\'s approach blends creative vision with operational precision. Through initiatives in digital learning access, scholarship programs, and community workshops, Creator Terminal helps people gain the tools, skills, and confidence to turn imagination into opportunity. Beyond his nonprofit work, Anthony also manages Mystic Media Film, a production company focused on storytelling, branding, and creative media development, and serves as the creator of MyShowBro, a YouTube-based creative network that showcases original entertainment and independent productions. His mission across all ventures is consistent to use creativity as a means to uplift, educate, and connect communities.',
    email: 'contact@creatorterminal.com',
    phone: '(813) 815-0142',
  },
  {
    name: 'Karla Fernández',
    role: 'Treasurer',
    bio: 'As Treasurer, Karla oversees financial stewardship, budgeting, and organizational accountability. She is deeply invested in making digital media education accessible.',
    image: `${process.env.PUBLIC_URL}/karla.avif`,
    slug: 'karla-fernandez',
    fullBio: 'Karla Fernández was born and raised in Mexico, where she earned her degree in veterinary medicine and practiced as a veterinarian before relocating to the United States. Her background in science, precision, and compassionate care shaped her strong attention to detail, problem solving abilities, and commitment to meaningful community work. As Treasurer of Creator Terminal, Karla oversees financial stewardship, budgeting, and organizational accountability. She is deeply invested in the nonprofit\'s mission to make digital media education accessible to everyday creators and small businesses. Karla also supports ongoing projects with Mystic Media Film, bringing her reliability, structure, and passion for service into each initiative. Karla is driven by a belief in building opportunities for others and strengthening the creative community that Creator Terminal serves. She continues to play an essential role in the development and long term vision of the organization.',
    email: 'contact@creatorterminal.com',
    phone: '(813) 815-0142',
  },
  {
    name: 'Daryl Joy Merencillo',
    role: 'Lead | Graphic Designer',
    bio: 'A graphic designer with more than six years of experience in logo and branding, product design, magazine layout, and more.',
    image: `${process.env.PUBLIC_URL}/Daryl.avif`,
    slug: 'daryl-joy-merencillo',
    fullBio: 'Hi! I am a graphic designer with more than six years of experience. I have experience in magazine layout, presentation design, logo and branding design, product design, and other areas. If you are interested in my skills and capabilities, please message me to discuss the details so that I can help you with your needs. - Logo and Branding - Product Design - Magazine Layout - Eyecatching Brochure/Flyer - Unique Greeting Card - Album Covers - Movie Posters - Tshirt Design - Business Card - Banner - Label - Package - Stationary - Menu - Pricelist',
    email: 'contact@creatorterminal.com',
    phone: '813 815 0142',
  },
];

/* ============================================
   TEAM SLIDER - Auto-scrolling marquee
   ============================================ */
function TeamSlider() {
  const trackRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const posRef = useRef(0);
  const dirRef = useRef(1); // 1 = moving left, -1 = moving right
  const rafRef = useRef(null);
  const speedRef = useRef(0.5); // pixels per frame

  // Duplicate cards for seamless scrolling feel
  const cards = [...teamMembers, ...teamMembers];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const animate = () => {
      if (!paused) {
        const singleSetWidth = track.scrollWidth / 2;
        posRef.current += speedRef.current * dirRef.current;

        // Bounce: when we've scrolled past the end of the first set, reverse
        if (posRef.current >= singleSetWidth - track.parentElement.offsetWidth) {
          dirRef.current = -1;
        }
        // Bounce back: when we've scrolled back to the start, reverse again
        if (posRef.current <= 0) {
          dirRef.current = 1;
        }

        track.style.transform = `translateX(-${posRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [paused]);

  return (
    <section className="team-cards-section">
      <div
        className="team-slider-viewport"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="team-slider-track" ref={trackRef}>
          {cards.map((member, index) => (
            <div className="team-slider-slide" key={index}>
              <a href={`/team/${member.slug}`} className="tp-card-link-wrap">
                <div className="tp-card">
                  <div className="tp-card-image">
                    <img src={member.image} alt={member.name} loading="lazy" />
                  </div>
                  <div className="tp-card-content">
                    <h3>{member.name}</h3>
                    <span className="tp-card-role">{member.role}</span>
                    <p>{member.bio}</p>
                    <span className="tp-card-view">View Profile <Icons.ArrowRight /></span>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   TEAM PAGE
   ============================================ */
function TeamPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    resume: null,
  });
  const [fileName, setFileName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, resume: file });
      setFileName(file.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Team Application - ${formData.firstName} ${formData.lastName}`);
    const body = encodeURIComponent(
      `First Name: ${formData.firstName}\nLast Name: ${formData.lastName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nResume: ${fileName || 'Not attached'}\n\n(Please attach your resume to this email before sending.)`
    );
    window.location.href = `mailto:inquirezach@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="team-page">
      <Helmet>
        <title>Our Team | Creator Terminal - Meet the People Behind the Vision</title>
        <meta name="description" content="Meet the dedicated team behind Creator Terminal. Our creators, educators, and innovators are committed to making digital media education accessible in Houston & Katy, TX." />
        <meta name="keywords" content="Creator Terminal team, Anthony Marquez, digital media educators Houston, nonprofit team Katy TX, creative education instructors" />
        <link rel="canonical" href="https://www.creatorterminal.com/team" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.creatorterminal.com/team" />
        <meta property="og:title" content="Our Team | Creator Terminal" />
        <meta property="og:description" content="Meet the dedicated team behind Creator Terminal - creators, educators, and innovators making digital media education accessible." />
        <meta property="og:image" content="https://www.creatorterminal.com/community.avif" />
        <meta property="og:site_name" content="Creator Terminal" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@CreatorTerminal" />
        <meta name="twitter:title" content="Our Team | Creator Terminal" />
        <meta name="twitter:description" content="Meet the dedicated team behind Creator Terminal - creators, educators, and innovators." />
        <meta name="twitter:image" content="https://www.creatorterminal.com/community.avif" />

        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "Creator Terminal Team",
          "description": "The team behind Creator Terminal nonprofit",
          "url": "https://www.creatorterminal.com/team",
          "mainEntity": {
            "@type": "Organization",
            "name": "Creator Terminal",
            "member": teamMembers.map(m => ({
              "@type": "Person",
              "name": m.name,
              "jobTitle": m.role,
              "description": m.bio,
              "image": m.image,
              "url": `https://www.creatorterminal.com/team/${m.slug}`
            }))
          }
        })}</script>
      </Helmet>
      {/* Navigation */}
      <nav className="team-nav">
        <div className="team-nav-inner">
          <a href="/" className="team-nav-back">
            <Icons.ArrowLeft />
            <span>Back to Home</span>
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="team-hero">
        <AnimatedSection>
          <div className="team-hero-label">Dedicated Team</div>
          <h1 className="team-hero-title">Meet the People Behind the Vision</h1>
          <p className="team-hero-description">
            Our team is made up of creators, educators, and innovators who believe in making
            creativity accessible to everyone. From teaching digital media skills to building
            programs that inspire collaboration and growth, each member brings a unique passion
            for empowering others. Together, we're shaping a future where creativity connects
            communities and opens doors to opportunity.
          </p>
        </AnimatedSection>
      </section>

      {/* Team Cards Slider */}
      <TeamSlider />

      {/* Community Image Section */}
      <section className="team-community-banner">
        <AnimatedSection>
          <div className="team-community-image">
            <img src={`${process.env.PUBLIC_URL}/community.avif`} alt="Our creative community" loading="lazy" />
            <div className="team-community-overlay" />
          </div>
        </AnimatedSection>
      </section>

      {/* Join Section */}
      <section className="team-join-section">
        <div className="team-join-inner">
          <AnimatedSection>
            <div className="team-join-content">
              <h2>Join Our Creative Community</h2>
              <p>
                Together, we can make creativity accessible to everyone. Whether you're teaching,
                mentoring, or helping us grow, your time and passion drive our mission forward.
                Every contribution big or small helps us empower new creators, support learning
                programs, and build a stronger creative future.
              </p>

              <form className="team-join-form" onSubmit={handleSubmit}>
                <div className="tj-form-row">
                  <div className="tj-form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      id="firstName"
                      type="text"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="tj-form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      id="lastName"
                      type="text"
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="tj-form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="tj-form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="(123) 456-7890"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>

                <div className="tj-form-group">
                  <label>Resume</label>
                  <div
                    className="tj-file-upload"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Icons.Upload />
                    <span>{fileName || 'Upload your resume'}</span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                    />
                  </div>
                </div>

                <button type="submit" className="tj-submit-btn">
                  {submitted ? 'Opening Email Client...' : 'Submit Application'}
                  {!submitted && <Icons.ArrowRight />}
                </button>
              </form>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Donate CTA & Footer */}
      <CTA />
      <Footer />
    </div>
  );
}

export { teamMembers };
export default TeamPage;
