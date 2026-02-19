import { useState, useEffect, useRef } from 'react';
import { CTA, Footer } from './App';
import './DonatePage.css';

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
  ArrowLeft: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>
    </svg>
  ),
  ArrowRight: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
    </svg>
  ),
  Heart: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
    </svg>
  ),
  CreditCard: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>
    </svg>
  ),
  Shield: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
    </svg>
  ),
  Lightbulb: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>
    </svg>
  ),
  ArrowDown: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>
    </svg>
  ),
};

/* ============================================
   STRIPE DONATION AMOUNTS
   ============================================ */
const donationAmounts = [10, 25, 50, 100, 250, 500];

/* ============================================
   DONATE PAGE
   ============================================ */
function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState('');
  const [isCustom, setIsCustom] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAmountClick = (amount) => {
    setSelectedAmount(amount);
    setIsCustom(false);
    setCustomAmount('');
  };

  const handleCustomChange = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setCustomAmount(val);
    setIsCustom(true);
    if (val) setSelectedAmount(parseInt(val, 10));
  };

  const finalAmount = isCustom ? (parseInt(customAmount, 10) || 0) : selectedAmount;

  const handleStripeDonate = () => {
    // Stripe payment link - replace with actual Stripe payment link
    const stripeUrl = `https://donate.stripe.com/test_placeholder?amount=${finalAmount * 100}`;
    window.open(stripeUrl, '_blank');
  };

  return (
    <div className="donate-page">
      {/* Navigation */}
      <nav className="donate-nav">
        <div className="donate-nav-inner">
          <a href="/" className="donate-nav-back">
            <Icons.ArrowLeft />
            <span>Back to Home</span>
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="donate-hero">
        <AnimatedSection>
          <div className="donate-hero-label">Support Our Mission</div>
          <h1 className="donate-hero-title">Every Contribution Creates Opportunity.</h1>
          <p className="donate-hero-description">
            Your generosity helps Creator Terminal provide creative education, access to technology,
            and real world training for people who need it most. Every dollar fuels programs that teach
            film, design, coding, and 3D creation — empowering communities to learn, create, and build
            brighter futures through creativity.
          </p>
        </AnimatedSection>
      </section>

      {/* Stripe Donation Section */}
      <section className="donate-stripe-section">
        <div className="donate-stripe-inner">
          <AnimatedSection>
            <div className="donate-stripe-card">
              <div className="donate-stripe-header">
                <div className="donate-stripe-icon">
                  <Icons.CreditCard />
                </div>
                <div>
                  <h2>Donate via Stripe</h2>
                  <p className="donate-stripe-subtitle">Secure, fast, and easy — powered by Stripe</p>
                </div>
              </div>

              <div className="donate-amounts">
                {donationAmounts.map((amount) => (
                  <button
                    key={amount}
                    className={`donate-amount-btn ${!isCustom && selectedAmount === amount ? 'active' : ''}`}
                    onClick={() => handleAmountClick(amount)}
                  >
                    ${amount}
                  </button>
                ))}
                <div className={`donate-amount-custom ${isCustom ? 'active' : ''}`}>
                  <span className="donate-custom-dollar">$</span>
                  <input
                    type="text"
                    placeholder="Other"
                    value={customAmount}
                    onChange={handleCustomChange}
                    onFocus={() => setIsCustom(true)}
                  />
                </div>
              </div>

              <button
                className="donate-stripe-btn"
                onClick={handleStripeDonate}
                disabled={finalAmount <= 0}
              >
                <Icons.Heart />
                <span>Donate ${finalAmount > 0 ? finalAmount : '—'}</span>
                <Icons.ArrowRight />
              </button>

              <div className="donate-stripe-security">
                <Icons.Shield />
                <span>256-bit SSL encrypted &bull; Tax-deductible &bull; Secure payment via Stripe</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Zelle / QR Code Section */}
      <section className="donate-zelle-section">
        <div className="donate-zelle-inner">
          <AnimatedSection direction="left">
            <div className="donate-zelle-info">
              <div className="donate-zelle-label">Directly Support Creator Terminal</div>
              <h2 className="donate-zelle-title">Donate via Zelle</h2>
              <p className="donate-zelle-desc">
                Your contribution helps us build a community makerspace that gives people access to
                digital media education, creative tools, and opportunities for growth. Every donation
                makes a real impact. Help us evade payment processor fees by donating directly through Zelle.
              </p>
              <div className="donate-zelle-arrow">
                <span>Scan the QR code</span>
                <Icons.ArrowDown />
                <div className="donate-zelle-arrow-animated">
                  <Icons.ArrowDown />
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right" delay={0.15}>
            <div className="donate-qr-card">
              <div className="donate-qr-image">
                <img src={`${process.env.PUBLIC_URL}/donate.png`} alt="Zelle QR Code — scan to donate" />
              </div>
              <p className="donate-qr-caption">Scan with your banking app to donate via Zelle</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Impact Image Section */}
      <section className="donate-impact-section">
        <div className="donate-impact-inner">
          <AnimatedSection>
            <div className="donate-impact-card">
              <div className="donate-impact-image">
                <img src={`${process.env.PUBLIC_URL}/donate.jpg`} alt="Community impact" />
                <div className="donate-impact-overlay" />
              </div>
              <div className="donate-impact-content">
                <p>
                  Every contribution, no matter the size, helps us bring creative education and
                  technology to more people. Your support fuels workshops, training programs, and
                  opportunities for those who dream of creating but lack the resources. Together,
                  we're shaping a future where creativity is accessible to everyone — thank you
                  for being part of the mission.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Tax Note */}
      <section className="donate-tax-section">
        <div className="donate-tax-inner">
          <AnimatedSection>
            <div className="donate-tax-card">
              <Icons.Lightbulb />
              <p>
                Creator Terminal is a registered <strong>501(c)(3) nonprofit organization</strong> (EIN: 93-4865679).
                All donations are tax-deductible to the extent allowed by law.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA & Footer */}
      <CTA />
      <Footer />
    </div>
  );
}

export default DonatePage;
