// ===== 3D TILT EFFECT ON CARDS =====
document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(1000px) rotateY(${x * 15}deg) rotateX(${-y * 15}deg) translateZ(10px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) translateZ(0)';
  });
});

// ===== ANIMATED STAT COUNTERS =====
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  let current = 0;
  const step = Math.max(1, Math.ceil(target / 60));
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current.toLocaleString('en-IN');
    if (current >= target) clearInterval(timer);
  }, 30);
}
const statsSection = document.getElementById('stats');
if (statsSection) {
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.stat-num').forEach(el => animateCounter(el));
        statsObserver.disconnect();
      }
    });
  }, { threshold: 0.3 });
  statsObserver.observe(statsSection);
}

// ===== TAB SWITCHER (Contact / Dharamshala) =====
function showTab(tab) {
  document.getElementById('panel-contact').style.display = tab === 'contact' ? 'block' : 'none';
  document.getElementById('panel-dharamshala').style.display = tab === 'dharamshala' ? 'block' : 'none';
  document.getElementById('tab-contact').style.background = tab === 'contact' ? 'var(--maroon)' : 'var(--offwhite)';
  document.getElementById('tab-contact').style.color = tab === 'contact' ? '#fff' : 'var(--maroon)';
  document.getElementById('tab-dharamshala').style.background = tab === 'dharamshala' ? 'var(--maroon)' : 'var(--offwhite)';
  document.getElementById('tab-dharamshala').style.color = tab === 'dharamshala' ? '#fff' : 'var(--maroon)';
}

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
});
// Close nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
function updateActiveNav() {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navAnchors.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + current) {
      a.classList.add('active');
    }
  });
}
window.addEventListener('scroll', updateActiveNav, { passive: true });

// ===== SCROLL-TRIGGERED FADE-IN (Intersection Observer) =====
const fadeEls = document.querySelectorAll('.fade-in');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
fadeEls.forEach(el => fadeObserver.observe(el));

// ===== BACK TO TOP =====
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
}, { passive: true });
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== BOOKING FORM SUBMIT =====
document.getElementById('booking-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = this.querySelector('#b-name').value.trim();
  if (!name) {
    alert('Please enter your full name.');
    return;
  }
  const checkin = this.querySelector('#b-checkin').value;
  const checkout = this.querySelector('#b-checkout').value;
  if (checkin && checkout && new Date(checkout) <= new Date(checkin)) {
    alert('Check-out date must be after check-in date.');
    return;
  }
  // Show success message
  const btn = this.querySelector('.btn-form');
  const original = btn.textContent;
  btn.textContent = '✓ Request Sent! We will contact you soon.';
  btn.style.background = 'linear-gradient(135deg, #3A8A3A, #2A6A2A)';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = original;
    btn.style.background = '';
    btn.disabled = false;
    this.reset();
  }, 5000);
});

// ===== CONTACT FORM SUBMIT =====
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = this.querySelector('#c-name').value.trim();
  const message = this.querySelector('#c-message').value.trim();
  if (!name || !message) {
    alert('Please fill in your name and message.');
    return;
  }
  const btn = this.querySelector('.btn-form');
  const original = btn.textContent;
  btn.textContent = '✓ Message Sent! Jai Jinendra 🙏';
  btn.style.background = 'linear-gradient(135deg, #3A8A3A, #2A6A2A)';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = original;
    btn.style.background = '';
    btn.disabled = false;
    this.reset();
  }, 5000);
});

// ===== NAVBAR SCROLL SHADOW + SCROLLED CLASS =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ===== SET MIN DATE FOR BOOKING FORM =====
(function() {
  const today = new Date().toISOString().split('T')[0];
  const checkin = document.getElementById('b-checkin');
  const checkout = document.getElementById('b-checkout');
  if (checkin) checkin.setAttribute('min', today);
  if (checkout) checkout.setAttribute('min', today);
  if (checkin) {
    checkin.addEventListener('change', function() {
      if (checkout) checkout.setAttribute('min', this.value);
    });
  }
})();
