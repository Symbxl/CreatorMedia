import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { teamMembers } from './TeamPage';
import { CTA, Footer } from './App';
import './MemberPage.css';

/* ============================================
   ICONS
   ============================================ */
const Icons = {
  ArrowLeft: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>
    </svg>
  ),
  Mail: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  ),
  Phone: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  ),
};

/* ============================================
   MEMBER PAGE
   ============================================ */
function MemberPage() {
  const { slug } = useParams();
  const member = teamMembers.find((m) => m.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!member) {
    return (
      <div className="member-page">
        <nav className="member-nav">
          <div className="member-nav-inner">
            <Link to="/team" className="member-nav-back">
              <Icons.ArrowLeft />
              <span>Back to Team</span>
            </Link>
          </div>
        </nav>
        <div className="member-not-found">
          <h1>Team member not found</h1>
          <p>The person you're looking for doesn't exist.</p>
          <Link to="/team" className="mp-btn-primary">Back to Team</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="member-page">
      <Helmet>
        <title>{member.name} - {member.role} | Creator Terminal Team</title>
        <meta name="description" content={`${member.name} is ${member.role} at Creator Terminal. ${member.bio}`} />
        <meta name="keywords" content={`${member.name}, Creator Terminal, ${member.role}, digital media education Houston, nonprofit team`} />
        <link rel="canonical" href={`https://www.creatorterminal.com/team/${member.slug}`} />

        <meta property="og:type" content="profile" />
        <meta property="og:url" content={`https://www.creatorterminal.com/team/${member.slug}`} />
        <meta property="og:title" content={`${member.name} - ${member.role} | Creator Terminal`} />
        <meta property="og:description" content={member.bio} />
        <meta property="og:image" content={member.image} />
        <meta property="og:site_name" content="Creator Terminal" />
        <meta property="profile:first_name" content={member.name.split(' ')[0]} />
        <meta property="profile:last_name" content={member.name.split(' ').slice(1).join(' ')} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@CreatorTerminal" />
        <meta name="twitter:title" content={`${member.name} | Creator Terminal`} />
        <meta name="twitter:description" content={member.bio} />
        <meta name="twitter:image" content={member.image} />

        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          "mainEntity": {
            "@type": "Person",
            "name": member.name,
            "jobTitle": member.role,
            "description": member.fullBio,
            "image": member.image,
            "email": member.email,
            "telephone": member.phone,
            "worksFor": {
              "@type": "Organization",
              "name": "Creator Terminal",
              "url": "https://www.creatorterminal.com"
            }
          }
        })}</script>
      </Helmet>
      {/* Navigation */}
      <nav className="member-nav">
        <div className="member-nav-inner">
          <Link to="/team" className="member-nav-back">
            <Icons.ArrowLeft />
            <span>Back to Team</span>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="member-hero">
        <div className="member-hero-inner">
          <div className="member-hero-image">
            <img src={member.image} alt={member.name} />
          </div>
          <div className="member-hero-info">
            <span className="member-hero-role">{member.role}</span>
            <h1 className="member-hero-name">{member.name}</h1>
            <div className="member-hero-contact">
              {member.email && (
                <a href={`mailto:${member.email}`} className="member-contact-item">
                  <Icons.Mail />
                  <span>{member.email}</span>
                </a>
              )}
              {member.phone && (
                <a href={`tel:${member.phone.replace(/\D/g, '')}`} className="member-contact-item">
                  <Icons.Phone />
                  <span>{member.phone}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Bio */}
      <section className="member-bio-section">
        <div className="member-bio-inner">
          <h2>About {member.name.split(' ')[0]}</h2>
          <p>{member.fullBio}</p>
        </div>
      </section>

      {/* Donate CTA & Footer */}
      <CTA />
      <Footer />
    </div>
  );
}

export default MemberPage;
