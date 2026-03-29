/* ===================================
   NEXT-GEN JAIN MANDIR WEBSITE SCRIPT
   =================================== */

// ===== PRELOADER =====
window.addEventListener('load', () => {
  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) preloader.classList.add('hidden');
  }, 1800);
});

// ===== CUSTOM CURSOR =====
const cursorDot = document.getElementById('cursor-dot');
const cursorRing = document.getElementById('cursor-ring');
let cursorX = 0, cursorY = 0;
let ringX = 0, ringY = 0;

if (cursorDot && cursorRing && window.matchMedia('(pointer:fine)').matches) {
  document.addEventListener('mousemove', e => {
    cursorX = e.clientX; cursorY = e.clientY;
    cursorDot.style.left = cursorX + 'px';
    cursorDot.style.top = cursorY + 'px';
  });
  function animateCursorRing() {
    ringX += (cursorX - ringX) * 0.12;
    ringY += (cursorY - ringY) * 0.12;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    requestAnimationFrame(animateCursorRing);
  }
  animateCursorRing();

  document.querySelectorAll('a, button, .gallery-item, .deity-card-3d, .tilt-card, .mantra-card').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}

// ===== SCROLL PROGRESS BAR =====
const progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = (scrollTop / docHeight) * 100;
  if (progressBar) progressBar.style.width = pct + '%';
}, { passive: true });

// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar?.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
});
navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger?.classList.remove('open');
    hamburger?.setAttribute('aria-expanded', 'false');
  });
});

// ===== ACTIVE NAV ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + id);
      });
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });
sections.forEach(s => sectionObserver.observe(s));

// ===== HERO AURORA (mouse-reactive) =====
const heroAurora = document.getElementById('hero-aurora');
const hero = document.getElementById('hero');
if (heroAurora && hero) {
  hero.addEventListener('mousemove', e => {
    const rect = hero.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
    const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1);
    heroAurora.style.background = `
      radial-gradient(ellipse 60% 50% at ${x}% ${y}%, rgba(139,26,26,0.4) 0%, transparent 70%),
      radial-gradient(ellipse 40% 40% at 80% 80%, rgba(197,160,40,0.15) 0%, transparent 60%),
      radial-gradient(ellipse 30% 30% at 20% 20%, rgba(232,115,42,0.1) 0%, transparent 60%)
    `;
  });
}

// ===== DEITY CARDS: TAP TO FLIP ON TOUCH DEVICES =====
if (window.matchMedia('(hover: none)').matches) {
  document.querySelectorAll('.deity-card-3d').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });
  });
}

// ===== 3D TILT EFFECT (desktop only) =====
document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(1000px) rotateY(${x * 15}deg) rotateX(${-y * 15}deg) translateZ(10px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ===== MAGNETIC BUTTONS (desktop only) =====
if (window.matchMedia('(hover: hover)').matches)
document.querySelectorAll('.hero-cta .btn, .btn-form, .map-cta .btn').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px) scale(1.04)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

// ===== SCROLL REVEAL ANIMATIONS =====
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
document.querySelectorAll('.fade-in, .reveal, .reveal-left, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});

// ===== STAT COUNTERS =====
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  let current = 0;
  const step = Math.max(1, Math.ceil(target / 60));
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current.toLocaleString('en-IN');
    if (current >= target) clearInterval(timer);
  }, 25);
}
const statsSection = document.getElementById('stats');
if (statsSection) {
  const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.stat-num').forEach(animateCounter);
        statsObserver.disconnect();
      }
    });
  }, { threshold: 0.3 });
  statsObserver.observe(statsSection);
}

// ===== GALLERY LIGHTBOX =====
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
const lbCaption = document.getElementById('lb-caption');
const lbClose = document.getElementById('lb-close');
const lbPrev = document.getElementById('lb-prev');
const lbNext = document.getElementById('lb-next');
let currentLbIndex = 0;
const galleryData = [];

galleryItems.forEach((item, i) => {
  const tile = item.querySelector('.gallery-tile');
  if (!tile) return;
  const src = tile.dataset.lbSrc || tile.style.backgroundImage.replace(/url\(['"]?|['"]?\)/g, '');
  const caption = tile.dataset.lbCaption || item.querySelector('.gallery-overlay span')?.textContent || '';
  galleryData.push({ src, caption });
  item.addEventListener('click', () => openLightbox(i));
});

function openLightbox(index) {
  if (!lightbox || !galleryData[index]) return;
  currentLbIndex = index;
  lbImg.src = galleryData[index].src;
  lbImg.alt = galleryData[index].caption;
  lbCaption.textContent = galleryData[index].caption;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  lightbox?.classList.remove('open');
  document.body.style.overflow = '';
}
lbClose?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
lbPrev?.addEventListener('click', e => {
  e.stopPropagation();
  currentLbIndex = (currentLbIndex - 1 + galleryData.length) % galleryData.length;
  openLightbox(currentLbIndex);
});
lbNext?.addEventListener('click', e => {
  e.stopPropagation();
  currentLbIndex = (currentLbIndex + 1) % galleryData.length;
  openLightbox(currentLbIndex);
});
document.addEventListener('keydown', e => {
  if (!lightbox?.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') lbPrev?.click();
  if (e.key === 'ArrowRight') lbNext?.click();
});

// ===== TAB SWITCHER =====
function showTab(tab) {
  const panelContact = document.getElementById('panel-contact');
  const panelDharamshala = document.getElementById('panel-dharamshala');
  const tabContact = document.getElementById('tab-contact');
  const tabDharamshala = document.getElementById('tab-dharamshala');

  if (panelContact) panelContact.style.display = tab === 'contact' ? 'block' : 'none';
  if (panelDharamshala) panelDharamshala.style.display = tab === 'dharamshala' ? 'block' : 'none';

  if (tabContact) {
    tabContact.style.background = tab === 'contact' ? 'var(--maroon)' : 'var(--offwhite)';
    tabContact.style.color = tab === 'contact' ? '#fff' : 'var(--maroon)';
  }
  if (tabDharamshala) {
    tabDharamshala.style.background = tab === 'dharamshala' ? 'var(--maroon)' : 'var(--offwhite)';
    tabDharamshala.style.color = tab === 'dharamshala' ? '#fff' : 'var(--maroon)';
  }
}

// ===== BACK TO TOP =====
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  backToTop?.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });
backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));


// ===== WHATSAPP NUMBER =====
const WA_NUMBER = '919415464894';

// ===== CONTACT FORM =====
document.getElementById('contact-form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const phone = document.getElementById('c-phone')?.value.trim();
  const message = document.getElementById('c-message')?.value.trim();
  if (!message) { alert('कृपया संदेश लिखें।'); return; }
  const text = `🙏 नमस्ते, मैं श्री 1008 भगवान महावीर दिगम्बर जैन मंदिर से संपर्क करना चाहता/चाहती हूँ।\n\n📞 मेरा नंबर: ${phone || 'उपलब्ध नहीं'}\n\n💬 संदेश:\n${message}`;
  window.open('https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(text), '_blank');
  this.reset();
});

// ===== BOOKING FORM =====
document.getElementById('booking-form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const phone = document.getElementById('b-phone')?.value.trim();
  const notes = document.getElementById('b-notes')?.value.trim();
  if (!notes) { alert('कृपया बुकिंग विवरण लिखें।'); return; }
  const text = `🏨 धर्मशाला बुकिंग अनुरोध\nश्री 1008 भगवान महावीर दिगम्बर जैन मंदिर\n\n📞 फ़ोन: ${phone || 'उपलब्ध नहीं'}\n\n📋 विवरण:\n${notes}`;
  window.open('https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(text), '_blank');
  this.reset();
});
