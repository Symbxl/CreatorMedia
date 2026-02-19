import { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

/* ============================================
   KNOWLEDGE BASE
   ============================================ */
const knowledgeBase = [
  {
    keywords: ['program', 'programs', 'offer', 'course', 'courses', 'class', 'classes', 'training', 'teach', 'learn', 'discipline'],
    answer: 'We offer comprehensive training in six creative disciplines:\n\n• Recording Arts & Audio Engineering\n• Video Production & Filmmaking\n• Web & Graphic Design\n• 3D Modeling & Digital Animation\n• Social Media Marketing\n• Business Administration\n\nEach program combines hands-on training with real-world knowledge. No prior experience needed!',
  },
  {
    keywords: ['experience', 'beginner', 'beginners', 'start', 'new', 'skill', 'level', 'prerequisite', 'requirement'],
    answer: "Not at all! Our programs are designed for beginners through professionals. Whether you're just starting your creative journey or looking to advance your skills, we have a pathway for you. Our micro-lessons and mentorship model ensures everyone can learn at their own pace.",
  },
  {
    keywords: ['location', 'address', 'where', 'katy', 'houston', 'directions', 'find', 'visit', 'located'],
    answer: "We're located at 3803 Pottharst Park Ct, Katy, TX 77494. We serve the greater Houston area including Katy, Fulshear, Harris County, and Fort Bend County.",
  },
  {
    keywords: ['donate', 'donation', 'support', 'give', 'money', 'contribute', 'fund', 'fundraise', 'sponsor', 'patreon', 'paypal', 'stripe', 'zelle'],
    answer: "Thank you for your generosity! You can support us in several ways:\n\n• Stripe — One-time secure donation on our Donate page\n• Zelle — Scan the QR code on our Donate page\n• Patreon — Become a monthly supporter at patreon.com/creatorterminal\n• PayPal — One-time tax-deductible contribution\n• Corporate Sponsorship — Email contact@creatorterminal.com\n\nAll donations are tax-deductible. Visit our /donate page to get started!",
  },
  {
    keywords: ['team', 'staff', 'who', 'founder', 'president', 'anthony', 'marquez', 'member', 'people', 'behind'],
    answer: "Our team includes:\n\n• Anthony Marquez — President & Founder (Marine veteran, law enforcement officer, creative professional)\n• Tristan Aurelio — Lead Content Creator & Video Editor\n• Karla Fernández — Treasurer\n• Daryl Joy Merencillo — Lead Graphic Designer\n\nVisit our /team page to learn more about each team member!",
  },
  {
    keywords: ['contact', 'email', 'phone', 'reach', 'touch', 'message', 'talk'],
    answer: "You can reach us at:\n\n📧 Email: contact@creatorterminal.com\n📍 Address: 3803 Pottharst Park Ct, Katy, TX 77494\n\nYou can also fill out the contact form on our homepage or connect with us on Discord, LinkedIn, X/Twitter, YouTube, Facebook, TikTok, or Patreon!",
  },
  {
    keywords: ['volunteer', 'volunteering', 'community service', 'service hours', 'help out', 'get involved', 'join'],
    answer: "We welcome volunteers! Whether you're looking to fulfill community service hours, gain experience, or simply give back, we have opportunities in:\n\n• Video & Audio Production\n• Graphic & Web Design\n• Coding & Technology\n• Event Management\n• Administrative Support\n\nFlexible scheduling available. Visit our contact section or email contact@creatorterminal.com to get started!",
  },
  {
    keywords: ['nonprofit', '501c3', '501', 'tax', 'deductible', 'ein', 'charity', 'organization', 'registered'],
    answer: "Yes! Creator Terminal is a registered 501(c)(3) nonprofit organization (EIN: 93-4865679). All donations are tax-deductible to the extent allowed by law. You can verify our status on GuideStar.",
  },
  {
    keywords: ['makerspace', 'equipment', 'studio', 'camera', 'printer', '3d', 'software', 'computer', 'workstation', 'lab', 'tools'],
    answer: "Our creative makerspace features professional-grade equipment including:\n\n• Studio cameras & lighting rigs\n• Acoustically treated audio recording booths\n• 3D printers (FDM & resin)\n• High-performance coding & editing workstations\n• Adobe Suite, Unreal Engine, VS Code, and more\n\nAll equipment and software are included in your program access!",
  },
  {
    keywords: ['how long', 'duration', 'time', '90 day', 'pathway', 'schedule', 'length'],
    answer: "Our signature 90-day pathway takes you from learning fundamentals to landing paid freelance work. We also offer ongoing micro-lessons and workshops for continued learning and skill development.",
  },
  {
    keywords: ['facility', 'building', 'space', 'square', 'feet', 'future', 'vision', 'plan'],
    answer: "Creator Terminal is developing one of the region's most ambitious creative-education facilities — a 150,000 sq. ft. digital media center that will feature:\n\n• Video production studios\n• Audio recording labs & podcast suites\n• Photography studios & editing bays\n• Computer labs for coding, design, and animation\n• Business classrooms\n• Youth creative programs\n• Community event spaces",
  },
  {
    keywords: ['blog', 'article', 'story', 'stories', 'read', 'news', 'impact'],
    answer: "Check out our blog for inspiring stories and resources! We cover topics like nonprofit resources, community impact, volunteering opportunities, and our mission. Visit /blog to explore all our articles.",
  },
  {
    keywords: ['discord', 'community', 'connect', 'social', 'network'],
    answer: "Join our Discord community to connect with fellow creators, share your work, get feedback, and stay updated on events and opportunities!\n\nJoin here: discord.gg/JXQaukyVaa\n\nYou can also follow us on X/Twitter, YouTube, Facebook, TikTok, LinkedIn, and Patreon!",
  },
  {
    keywords: ['scholarship', 'scholarships', 'financial', 'aid', 'free', 'cost', 'price', 'tuition', 'fee', 'afford'],
    answer: "Creator Terminal is committed to removing financial barriers. As a nonprofit, we strive to make creative education accessible to everyone. We offer:\n\n• Creator Scholarships for students pursuing digital arts\n• Free and low-cost workshops\n• No financial prerequisites\n\nVisit our /donate page to learn about our scholarship programs or email us for more info!",
  },
  {
    keywords: ['hello', 'hi', 'hey', 'sup', 'what\'s up', 'greetings', 'good morning', 'good afternoon', 'good evening'],
    answer: "Hey there! 👋 Welcome to Creator Terminal! I'm here to help answer your questions about our programs, location, donations, volunteering, and more. What would you like to know?",
  },
  {
    keywords: ['thank', 'thanks', 'appreciate', 'awesome', 'great', 'cool', 'perfect'],
    answer: "You're welcome! 😊 Is there anything else I can help you with? Feel free to ask about our programs, location, donation options, or anything else!",
  },
];

/* ============================================
   KEYWORD MATCHER
   ============================================ */
function findBestMatch(input) {
  const words = input.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/);
  let bestMatch = null;
  let bestScore = 0;

  for (const entry of knowledgeBase) {
    let score = 0;
    for (const word of words) {
      for (const keyword of entry.keywords) {
        if (word === keyword) {
          score += 3; // exact match
        } else if (keyword.includes(word) || word.includes(keyword)) {
          score += 1; // partial match
        }
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  if (bestScore >= 2) {
    return bestMatch.answer;
  }

  return null;
}

/* ============================================
   ICONS
   ============================================ */
const ChatIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18" /><path d="m6 6 12 12" />
  </svg>
);

const SendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m22 2-7 20-4-9-9-4z" /><path d="M22 2 11 13" />
  </svg>
);

/* ============================================
   QUICK REPLIES
   ============================================ */
const quickReplies = [
  'What programs do you offer?',
  'Where are you located?',
  'How can I donate?',
  'How do I volunteer?',
];

/* ============================================
   CHATBOT COMPONENT
   ============================================ */
function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const toggleChat = () => {
    if (!isOpen && !hasOpened) {
      setHasOpened(true);
      setMessages([
        {
          from: 'bot',
          text: "Hi! 👋 I'm the Creator Terminal assistant. Ask me anything about our programs, location, donations, volunteering, and more!",
        },
      ]);
    }
    setIsOpen(!isOpen);
  };

  const sendMessage = (text) => {
    if (!text.trim()) return;

    const userMsg = { from: 'user', text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const response = findBestMatch(text);
      const botMsg = {
        from: 'bot',
        text: response || "I'm not sure about that one! For more detailed help, you can:\n\n• Check our FAQ section on the homepage\n• Email us at contact@creatorterminal.com\n• Join our Discord community\n\nIs there something else I can help with?",
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600 + Math.random() * 400);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleQuickReply = (text) => {
    sendMessage(text);
  };

  const showQuickReplies = messages.length <= 1;

  return (
    <>
      {/* Chat Window */}
      <div className={`chatbot-window ${isOpen ? 'chatbot-open' : ''}`}>
        {/* Header */}
        <div className="chatbot-header">
          <div className="chatbot-header-info">
            <div className="chatbot-avatar">
              <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Creator Terminal" />
            </div>
            <div>
              <h4>Creator Terminal</h4>
              <span className="chatbot-status">
                <span className="chatbot-status-dot" />
                Online
              </span>
            </div>
          </div>
          <button className="chatbot-close" onClick={toggleChat} aria-label="Close chat">
            <CloseIcon />
          </button>
        </div>

        {/* Messages */}
        <div className="chatbot-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`chatbot-msg chatbot-msg-${msg.from}`}>
              {msg.from === 'bot' && (
                <div className="chatbot-msg-avatar">
                  <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Bot" />
                </div>
              )}
              <div className="chatbot-msg-bubble">
                {msg.text.split('\n').map((line, j) => (
                  <span key={j}>
                    {line}
                    {j < msg.text.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="chatbot-msg chatbot-msg-bot">
              <div className="chatbot-msg-avatar">
                <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Bot" />
              </div>
              <div className="chatbot-msg-bubble chatbot-typing">
                <span className="chatbot-typing-dot" />
                <span className="chatbot-typing-dot" />
                <span className="chatbot-typing-dot" />
              </div>
            </div>
          )}

          {showQuickReplies && !isTyping && (
            <div className="chatbot-quick-replies">
              {quickReplies.map((text, i) => (
                <button key={i} className="chatbot-quick-btn" onClick={() => handleQuickReply(text)}>
                  {text}
                </button>
              ))}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form className="chatbot-input-area" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="chatbot-input"
          />
          <button type="submit" className="chatbot-send" disabled={!input.trim()} aria-label="Send message">
            <SendIcon />
          </button>
        </form>
      </div>

      {/* Floating Button */}
      <button
        className={`chatbot-fab ${isOpen ? 'chatbot-fab-active' : ''} ${!hasOpened ? 'chatbot-fab-pulse' : ''}`}
        onClick={toggleChat}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? <CloseIcon /> : <ChatIcon />}
      </button>
    </>
  );
}

export default Chatbot;
