'use strict';

// ============================================================
// SITE PRELOADER
// ============================================================
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.classList.add('hidden');
    document.body.classList.add('loaded');
  }
});

// Safety timeout for preloader
setTimeout(() => {
  const preloader = document.getElementById('preloader');
  if (preloader && !preloader.classList.contains('hidden')) {
    preloader.classList.add('hidden');
    document.body.classList.add('loaded');
  }
}, 3000);

// ============================================================
// NAVBAR SCROLL BEHAVIOUR
// ============================================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  // Scroll-to-top button
  const st = document.getElementById('scrollTop');
  if (window.scrollY > 400) st.classList.add('visible');
  else st.classList.remove('visible');
});

// ============================================================
// MOBILE MENU
// ============================================================
function toggleMenu() {
  const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  hamburger.classList.toggle('open');
  menu.classList.toggle('open');
}

// ============================================================
// HERO SLIDER
// ============================================================
let currentSlide = 0;
let slideTimer;

function goToSlide(index) {
  const slides = document.querySelectorAll('.hero-slide');
  const dots   = document.querySelectorAll('.slider-dot');
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  currentSlide = index;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
  resetSlideTimer();
}

function nextSlide() {
  const total = document.querySelectorAll('.hero-slide').length;
  goToSlide((currentSlide + 1) % total);
}

function resetSlideTimer() {
  clearInterval(slideTimer);
  slideTimer = setInterval(nextSlide, 5000);
}

resetSlideTimer();

// ============================================================
// HERO CANVAS PARTICLE ANIMATION
// ============================================================
(function initCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function createParticles() {
    particles = [];
    const count = Math.floor((W * H) / 14000);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(212,160,23,${0.08 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    // Draw particles
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(212,160,23,${p.alpha * 0.5})`;
      ctx.fill();
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
    });
    requestAnimationFrame(draw);
  }

  resize();
  createParticles();
  draw();
  window.addEventListener('resize', () => { resize(); createParticles(); });
})();

// ============================================================
// LIVE PRICE ANIMATION (simulated)
// ============================================================
function animatePrices() {
  const priceEls = document.querySelectorAll('.live-price');
  priceEls.forEach(el => {
    const base = parseFloat(el.textContent);
    const delta = (Math.random() - 0.5) * 0.002;
    const newPrice = (base + delta).toFixed(4);
    el.textContent = newPrice;
    el.style.color = delta >= 0 ? '#22c55e' : '#ef4444';
    setTimeout(() => { el.style.color = '#e0b535'; }, 600);
  });
}
setInterval(animatePrices, 2000);

// ============================================================
// MARKET TICKER DATA & TABS
// ============================================================
const tickerData = {
  popular: [
    { pair: 'EUR/USD', full: 'Euro / US Dollar',       bid: '1.0842', ask: '1.0844', spread: '0.2', change: '+0.23%', dir: 'pos' },
    { pair: 'GBP/USD', full: 'British Pound / US Dollar', bid: '1.2534', ask: '1.2537', spread: '0.3', change: '+0.18%', dir: 'pos' },
    { pair: 'XAU/USD', full: 'Gold / US Dollar',       bid: '3224.50', ask: '3225.10', spread: '0.6', change: '+0.42%', dir: 'pos' },
    { pair: 'NAS100',  full: 'NASDAQ 100 Index',        bid: '21250.0', ask: '21252.5', spread: '2.5', change: '-0.31%', dir: 'neg' },
    { pair: 'BTC/USD', full: 'Bitcoin / US Dollar',    bid: '83450.00', ask: '83490.00', spread: '40.0', change: '+1.12%', dir: 'pos' },
  ],
  forex: [
    { pair: 'EUR/USD', full: 'Euro / US Dollar',       bid: '1.0842', ask: '1.0844', spread: '0.2', change: '+0.23%', dir: 'pos' },
    { pair: 'GBP/USD', full: 'British Pound / US Dollar', bid: '1.2534', ask: '1.2537', spread: '0.3', change: '+0.18%', dir: 'pos' },
    { pair: 'USD/JPY', full: 'US Dollar / Japanese Yen',  bid: '142.30', ask: '142.33', spread: '0.3', change: '-0.12%', dir: 'neg' },
    { pair: 'AUD/USD', full: 'Australian Dollar / US Dollar', bid: '0.6285', ask: '0.6287', spread: '0.2', change: '+0.09%', dir: 'pos' },
    { pair: 'USD/CHF', full: 'US Dollar / Swiss Franc', bid: '0.8941', ask: '0.8944', spread: '0.3', change: '-0.05%', dir: 'neg' },
  ],
  metals: [
    { pair: 'XAU/USD', full: 'Gold / US Dollar',       bid: '3224.50', ask: '3225.10', spread: '0.6', change: '+0.42%', dir: 'pos' },
    { pair: 'XAG/USD', full: 'Silver / US Dollar',     bid: '32.15',   ask: '32.17',   spread: '0.2', change: '+0.55%', dir: 'pos' },
    { pair: 'XPT/USD', full: 'Platinum / US Dollar',   bid: '981.20',  ask: '982.00',  spread: '0.8', change: '-0.22%', dir: 'neg' },
    { pair: 'XPD/USD', full: 'Palladium / US Dollar',  bid: '1042.00', ask: '1043.50', spread: '1.5', change: '+0.61%', dir: 'pos' },
  ],
  indices: [
    { pair: 'NAS100', full: 'NASDAQ 100',  bid: '21250.0', ask: '21252.5', spread: '2.5', change: '-0.31%', dir: 'neg' },
    { pair: 'US500',  full: 'S&P 500',     bid: '5825.5',  ask: '5826.0',  spread: '0.5', change: '+0.14%', dir: 'pos' },
    { pair: 'US30',   full: 'Dow Jones',   bid: '42310.0', ask: '42315.0', spread: '5.0', change: '+0.21%', dir: 'pos' },
    { pair: 'UK100',  full: 'FTSE 100',    bid: '8245.5',  ask: '8246.5',  spread: '1.0', change: '-0.08%', dir: 'neg' },
    { pair: 'GER40',  full: 'DAX 40',      bid: '21890.0', ask: '21892.5', spread: '2.5', change: '+0.38%', dir: 'pos' },
  ],
  futures: [
    { pair: 'OIL',    full: 'Crude Oil WTI',            bid: '60.45', ask: '60.50', spread: '0.05', change: '-0.87%', dir: 'neg' },
    { pair: 'NGAS',   full: 'Natural Gas',              bid: '3.284', ask: '3.291', spread: '0.007', change: '+1.24%', dir: 'pos' },
    { pair: 'BRENT',  full: 'Brent Crude Oil',          bid: '64.12', ask: '64.18', spread: '0.06', change: '-0.63%', dir: 'neg' },
    { pair: 'WHEAT',  full: 'Chicago Wheat',            bid: '568.5', ask: '569.0', spread: '0.5', change: '+0.44%', dir: 'pos' },
  ],
  etfs: [
    { pair: 'SPY',    full: 'SPDR S&P 500 ETF Trust',  bid: '582.40', ask: '582.55', spread: '0.15', change: '+0.16%', dir: 'pos' },
    { pair: 'QQQ',    full: 'Invesco QQQ Trust',        bid: '492.30', ask: '492.50', spread: '0.20', change: '-0.28%', dir: 'neg' },
    { pair: 'GLD',    full: 'SPDR Gold Shares',         bid: '306.75', ask: '306.90', spread: '0.15', change: '+0.38%', dir: 'pos' },
    { pair: 'XLE',    full: 'Energy Select SPDR',       bid: '86.20',  ask: '86.30',  spread: '0.10', change: '-1.12%', dir: 'neg' },
  ],
};

function setTickerTab(el, category) {
  document.querySelectorAll('.ticker-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  renderTicker(category);
}

function renderTicker(category) {
  const tbody = document.getElementById('tickerBody');
  const data  = tickerData[category] || tickerData.popular;
  tbody.innerHTML = data.map(row => `
    <tr>
      <td>
        <div class="pair-name">${row.pair}</div>
        <div class="pair-full">${row.full}</div>
      </td>
      <td><span class="price-val">${row.bid}</span></td>
      <td><span class="price-val">${row.ask}</span></td>
      <td><span class="spread-val">${row.spread}</span></td>
      <td><span class="${row.dir === 'pos' ? 'change-pos' : 'change-neg'}">${row.change}</span></td>
      <td><button class="trade-btn" onclick="window.location.href='#'">Trade</button></td>
    </tr>
  `).join('');
}

renderTicker('popular');

// Simulate live price updates in ticker
setInterval(() => {
  const rows = document.querySelectorAll('#tickerBody tr');
  rows.forEach(row => {
    const priceEl = row.querySelectorAll('.price-val');
    if (priceEl.length < 2) return;
    const bid = parseFloat(priceEl[0].textContent);
    const delta = (Math.random() - 0.5) * 0.003 * bid;
    const newBid = (bid + delta).toFixed(bid > 1000 ? 1 : bid > 10 ? 2 : 4);
    const newAsk = (parseFloat(newBid) + Math.random() * 0.005 * bid).toFixed(bid > 1000 ? 1 : bid > 10 ? 2 : 4);
    priceEl[0].textContent = newBid;
    priceEl[1].textContent = newAsk;
    const changeEl = row.querySelector('.change-pos, .change-neg');
    if (changeEl) {
      changeEl.style.opacity = '0.5';
      setTimeout(() => { changeEl.style.opacity = '1'; }, 300);
    }
  });
}, 2500);

// ============================================================
// PLATFORM TABS
// ============================================================
function setPlatform(index) {
  document.querySelectorAll('.platform-tab').forEach((t, i) => {
    t.classList.toggle('active', i === index);
  });
  document.querySelectorAll('.platform-content').forEach((c, i) => {
    c.classList.toggle('active', i === index);
  });
}

// ============================================================
// STATS COUNTER ANIMATION
// ============================================================
function animateCounter(el) {
  const target  = parseFloat(el.dataset.count);
  const suffix  = el.dataset.suffix || '';
  const prefix  = el.dataset.prefix || '';
  const duration = 2000;
  const start = performance.now();
  const isFloat = target % 1 !== 0;

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4);
    const current = isFloat
      ? (eased * target).toFixed(2)
      : Math.floor(eased * target).toLocaleString();
    el.textContent = prefix + current + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// ============================================================
// SCROLL ANIMATIONS (IntersectionObserver)
// ============================================================
const animObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      animObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('[data-anim]').forEach(el => animObserver.observe(el));

// Stats bar observer
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Animate bars
      entry.target.querySelectorAll('.stat-bar-fill').forEach(bar => {
        const w = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => { bar.style.width = w; }, 100);
      });
      // Animate counters
      entry.target.querySelectorAll('.stat-value[data-count]').forEach(el => {
        animateCounter(el);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

const statsSection = document.getElementById('statsSection');
if (statsSection) statsObserver.observe(statsSection);

// ============================================================
// INFINITE TESTIMONIALS MARQUEE
// ============================================================
(function initTestimonials() {
  const track = document.getElementById('testimonialsTrack');
  if (!track) return;
  
  // Duplicate cards for seamless CSS marquee loop
  const cards = track.innerHTML;
  track.innerHTML = cards + cards + cards;
})();

// Testimonial prev/next controls (offset the section scroll)
function slideTestimonial(dir) {
  const slider = document.getElementById('testimonialsSlider');
  if (slider) slider.scrollBy({ left: dir * 380, behavior: 'smooth' });
}

// ============================================================
// COOKIE BANNER
// ============================================================
function acceptCookie() {
  localStorage.setItem('xelans_cookie', '1');
  document.getElementById('cookieBanner').classList.remove('show');
}

window.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem('xelans_cookie')) {
    setTimeout(() => {
      const banner = document.getElementById('cookieBanner');
      if (banner) banner.classList.add('show');
    }, 1500);
  }
});

// ============================================================
// SMOOTH REVEAL ON LOAD
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.body.style.opacity = '1';
    });
  });
});

// ============================================================
// CLOSE MOBILE MENU ON LINK CLICK
// ============================================================
document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('hamburger').classList.remove('open');
    document.getElementById('mobileMenu').classList.remove('open');
  });
});

// ============================================================
// PARALLAX SUBTLE EFFECT ON HERO
// ============================================================
window.addEventListener('scroll', () => {
  const heroCanvas = document.getElementById('heroCanvas');
  if (heroCanvas && window.scrollY < window.innerHeight) {
    heroCanvas.style.transform = `translateY(${window.scrollY * 0.2}px)`;
  }
});

// ============================================================
// ACTIVE NAV HIGHLIGHTING ON SCROLL
// ============================================================
const sections = ['hero', 'howToStart', 'features', 'statsSection', 'platforms', 'marketsSection', 'testimonials'];
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Could highlight nav here if needed
    }
  });
}, { threshold: 0.3 });
sections.forEach(id => {
  const el = document.getElementById(id);
  if (el) sectionObserver.observe(el);
});

// ============================================================
// COOKIE BANNER LOGIC
// ============================================================
const cookieBanner = document.getElementById('cookieBanner');
function showCookieBanner() {
  if (!localStorage.getItem('xelans_cookies_accepted')) {
    setTimeout(() => {
      if (cookieBanner) cookieBanner.classList.add('show');
    }, 2000);
  }
}

function acceptCookie() {
  if (cookieBanner) {
    cookieBanner.classList.remove('show');
    localStorage.setItem('xelans_cookies_accepted', 'true');
  }
}

// Initialize
showCookieBanner();


// ============================================================
// COMET TRAIL CURSOR (4)
// ============================================================
(function initCometTrail() {
  document.addEventListener('mousemove', (e) => {
    // Only spawn particles occasionally for performance
    if (Math.random() > 0.4) return;

    const particle = document.createElement('div');
    particle.className = 'comet-particle';
    
    // Slight random offset
    const ox = (Math.random() - 0.5) * 15;
    const oy = (Math.random() - 0.5) * 15;
    
    particle.style.left = (e.clientX + ox) + 'px';
    particle.style.top = (e.clientY + oy) + 'px';
    
    document.body.appendChild(particle);
    
    // Remove after animation
    setTimeout(() => {
      particle.remove();
    }, 800);
  });
})();
