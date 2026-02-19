import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { blogPosts } from './BlogPage';
import { CTA, Footer } from './App';
import './BlogPostPage.css';

/* ============================================
   ICONS
   ============================================ */
const Icons = {
  ArrowLeft: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>
    </svg>
  ),
  Clock: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
};

/* ============================================
   CONTENT RENDERER
   ============================================ */
function renderInline(text) {
  const parts = text.split(/(\*\*.*?\*\*|__.*?__)/g);
  return parts.map((part, j) => {
    if ((part.startsWith('**') && part.endsWith('**')) || (part.startsWith('__') && part.endsWith('__'))) {
      return <strong key={j}>{part.replace(/\*\*|__/g, '')}</strong>;
    }
    return part;
  });
}

function renderContent(content) {
  const lines = content.split('\n');
  const elements = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Skip empty lines
    if (line.trim() === '') {
      i++;
      continue;
    }

    // Bullet list: collect consecutive lines starting with "* "
    if (line.trim().startsWith('* ')) {
      const items = [];
      while (i < lines.length && lines[i].trim().startsWith('* ')) {
        items.push(lines[i].trim().substring(2));
        i++;
      }
      elements.push(
        <ul key={key++} className="blogpost-list">
          {items.map((item, idx) => (
            <li key={idx}>{renderInline(item)}</li>
          ))}
        </ul>
      );
      continue;
    }

    // Numbered list: collect consecutive lines starting with "N. "
    if (/^\d+\.\s/.test(line.trim())) {
      const items = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s/, ''));
        i++;
      }
      elements.push(
        <ol key={key++} className="blogpost-list blogpost-list-ordered">
          {items.map((item, idx) => (
            <li key={idx}>{renderInline(item)}</li>
          ))}
        </ol>
      );
      continue;
    }

    // Heading: entire line is bold
    if (line.trim().startsWith('**') && line.trim().endsWith('**')) {
      elements.push(<h3 key={key++}>{line.trim().replace(/\*\*/g, '')}</h3>);
      i++;
      continue;
    }

    // Quote line (starts with ")
    if (line.trim().startsWith('"') || line.trim().startsWith('\u201C')) {
      elements.push(
        <blockquote key={key++} className="blogpost-quote">
          {renderInline(line.trim())}
        </blockquote>
      );
      i++;
      continue;
    }

    // Regular paragraph: collect lines until empty line or special line
    const paraLines = [];
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !lines[i].trim().startsWith('* ') &&
      !/^\d+\.\s/.test(lines[i].trim()) &&
      !(lines[i].trim().startsWith('**') && lines[i].trim().endsWith('**'))
    ) {
      paraLines.push(lines[i].trim());
      i++;
    }
    if (paraLines.length > 0) {
      elements.push(<p key={key++}>{renderInline(paraLines.join(' '))}</p>);
    }
  }

  return elements;
}

/* ============================================
   BLOG POST PAGE
   ============================================ */
function BlogPostPage() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!post) {
    return (
      <div className="blogpost-page">
        <nav className="blogpost-nav">
          <div className="blogpost-nav-inner">
            <a href="/blog" className="blogpost-nav-back">
              <Icons.ArrowLeft />
              <span>Back to Blog</span>
            </a>
          </div>
        </nav>
        <div className="blogpost-not-found">
          <h1>Article not found</h1>
          <p>The article you're looking for doesn't exist.</p>
          <a href="/blog" className="blogpost-btn-back">Back to Blog</a>
        </div>
      </div>
    );
  }

  return (
    <div className="blogpost-page">
      <Helmet>
        <title>{post.title} | Creator Terminal Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={`Creator Terminal, ${post.category}, Houston nonprofit, digital media education, ${post.title.split(' ').slice(0, 5).join(', ')}`} />
        <link rel="canonical" href={`https://www.creatorterminal.com/blog/${post.slug}`} />

        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://www.creatorterminal.com/blog/${post.slug}`} />
        <meta property="og:title" content={`${post.title} | Creator Terminal`} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta property="og:site_name" content="Creator Terminal" />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content="Creator Terminal" />
        <meta property="article:section" content={post.category} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@CreatorTerminal" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={post.image} />

        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": post.title,
          "description": post.excerpt,
          "image": post.image,
          "datePublished": post.date,
          "dateModified": post.date,
          "author": { "@type": "Organization", "name": "Creator Terminal" },
          "publisher": {
            "@type": "Organization",
            "name": "Creator Terminal",
            "logo": { "@type": "ImageObject", "url": "https://www.creatorterminal.com/logo512.png" }
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://www.creatorterminal.com/blog/${post.slug}`
          },
          "articleSection": post.category,
          "wordCount": post.content.split(' ').length
        })}</script>
      </Helmet>
      {/* Navigation */}
      <nav className="blogpost-nav">
        <div className="blogpost-nav-inner">
          <a href="/blog" className="blogpost-nav-back">
            <Icons.ArrowLeft />
            <span>Back to Blog</span>
          </a>
        </div>
      </nav>

      {/* Hero Image */}
      <section className="blogpost-hero">
        <div className="blogpost-hero-image">
          <img src={post.image} alt={post.title} />
          <div className="blogpost-hero-overlay" />
        </div>
      </section>

      {/* Article Content */}
      <article className="blogpost-article">
        <div className="blogpost-article-inner">
          <div className="blogpost-meta">
            <span className="blogpost-category">{post.category}</span>
            <span className="blogpost-dot">&bull;</span>
            <span className="blogpost-date">{post.date}</span>
            <span className="blogpost-dot">&bull;</span>
            <span className="blogpost-read">
              <Icons.Clock />
              {post.readTime}
            </span>
          </div>

          <h1 className="blogpost-title">{post.title}</h1>

          <p className="blogpost-excerpt">{post.excerpt}</p>

          <div className="blogpost-divider" />

          <div className="blogpost-body">
            {renderContent(post.content)}
          </div>
        </div>
      </article>

      {/* CTA & Footer */}
      <CTA />
      <Footer />
    </div>
  );
}

export default BlogPostPage;
