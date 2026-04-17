/**
 * script.js — Akhilesh Pingle Portfolio
 *
 * Modules:
 *  1. Loading Screen
 *  2. Navbar (scroll + hamburger + active link)
 *  3. Hero Canvas (animated dot grid)
 *  4. Typing Effect
 *  5. Scroll Reveal
 *  6. Back to Top
 *  7. Contact Form Validation
 *  8. Footer Year
 */

/* ============================================================
   1. LOADING SCREEN
   ============================================================ */
(function initLoadingScreen() {
  const screen = document.getElementById('loading-screen');
  if (!screen) return;

  document.body.classList.add('loading');

  window.addEventListener('load', () => {
    setTimeout(() => {
      screen.classList.add('hidden');
      document.body.classList.remove('loading');
    }, 500);
  });
})();

/* ============================================================
   2. NAVBAR
   ============================================================ */
(function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  const links     = navLinks ? navLinks.querySelectorAll('.nav-link') : [];

  // Scroll: add .scrolled class
  function onScroll() {
    if (!navbar) return;
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveLink();
    toggleBackToTop();
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // Hamburger toggle
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when a link is clicked
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Active link tracking via IntersectionObserver
  const sections = document.querySelectorAll('section[id], div[id="home"]');

  function updateActiveLink() {
    let currentId = '';
    const scrollY = window.scrollY;

    sections.forEach(section => {
      const top    = section.offsetTop - 100;
      const bottom = top + section.offsetHeight;
      if (scrollY >= top && scrollY < bottom) {
        currentId = section.getAttribute('id');
      }
    });

    links.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${currentId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // Initial call
  onScroll();
})();

/* ============================================================
   3. HERO CANVAS — subtle animated dot grid
   ============================================================ */
(function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx    = canvas.getContext('2d');
  let width, height, dots, animId;

  const DOT_SPACING = 38;
  const DOT_RADIUS  = 1.2;
  const DOT_COLOR   = 'rgba(99, 179, 237, 0.18)';
  const WAVE_SPEED  = 0.0008;
  const WAVE_AMP    = 0.8;      // multiplier on radius
  const MOUSE_RADIUS= 120;

  let mouse = { x: -9999, y: -9999 };
  let t = 0;

  function resize() {
    width  = canvas.width  = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
    buildDots();
  }

  function buildDots() {
    dots = [];
    const cols = Math.ceil(width  / DOT_SPACING) + 1;
    const rows = Math.ceil(height / DOT_SPACING) + 1;
    for (let r = 0; r <= rows; r++) {
      for (let c = 0; c <= cols; c++) {
        dots.push({ x: c * DOT_SPACING, y: r * DOT_SPACING });
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    t += WAVE_SPEED;

    dots.forEach(dot => {
      // Wave pulse
      const wave  = Math.sin(dot.x * 0.018 + t * 4) * Math.cos(dot.y * 0.018 + t * 3);
      const pulse = DOT_RADIUS + wave * WAVE_AMP * 0.5;

      // Mouse proximity brightening
      const dx   = dot.x - mouse.x;
      const dy   = dot.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const glow = Math.max(0, 1 - dist / MOUSE_RADIUS);

      const r = Math.max(DOT_RADIUS * 0.4, pulse + glow * 2.5);

      ctx.beginPath();
      ctx.arc(dot.x, dot.y, r, 0, Math.PI * 2);
      const alpha = 0.12 + glow * 0.5 + (wave + 1) * 0.03;
      ctx.fillStyle = `rgba(99, 179, 237, ${Math.min(alpha, 0.7)})`;
      ctx.fill();
    });

    animId = requestAnimationFrame(draw);
  }

  // Track mouse over canvas
  const hero = document.getElementById('home');
  if (hero) {
    hero.addEventListener('mousemove', e => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
    hero.addEventListener('mouseleave', () => {
      mouse.x = -9999;
      mouse.y = -9999;
    });
  }

  const ro = new ResizeObserver(() => {
    cancelAnimationFrame(animId);
    resize();
    draw();
  });
  ro.observe(canvas);

  resize();
  draw();
})();

/* ============================================================
   4. TYPING EFFECT
   ============================================================ */
(function initTypingEffect() {
  const el = document.getElementById('typed-text');
  if (!el) return;

  const phrases = [
    'Full-Stack Software Engineer',
    'React & Frontend Developer',
    'Backend API Engineer',
    'Cloud & DevOps Practitioner',
    'Software Engineer',
  ];

  let phraseIdx = 0;
  let charIdx   = 0;
  let isDeleting = false;
  let timeout;

  const TYPE_SPEED   = 60;   // ms per char
  const DELETE_SPEED = 35;   // ms per char (delete is faster)
  const PAUSE_END    = 2000; // ms after finishing a phrase
  const PAUSE_START  = 400;  // ms before starting next phrase

  function tick() {
    const current = phrases[phraseIdx];

    if (isDeleting) {
      charIdx--;
    } else {
      charIdx++;
    }

    el.textContent = current.slice(0, charIdx);

    let delay = isDeleting ? DELETE_SPEED : TYPE_SPEED;

    if (!isDeleting && charIdx === current.length) {
      // Finished typing — pause then start deleting
      isDeleting = true;
      delay = PAUSE_END;
    } else if (isDeleting && charIdx === 0) {
      // Finished deleting — move to next phrase
      isDeleting = false;
      phraseIdx  = (phraseIdx + 1) % phrases.length;
      delay = PAUSE_START;
    }

    timeout = setTimeout(tick, delay);
  }

  // Start after a short initial delay
  timeout = setTimeout(tick, 800);
})();

/* ============================================================
   5. SCROLL REVEAL
   ============================================================ */
(function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Stagger siblings slightly
          const siblings = entry.target.parentElement
            ? Array.from(entry.target.parentElement.querySelectorAll('.reveal:not(.visible)'))
            : [];
          const idx = siblings.indexOf(entry.target);
          const delay = Math.min(idx * 80, 400); // cap at 400ms

          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(el => observer.observe(el));
})();

/* ============================================================
   6. BACK TO TOP
   ============================================================ */
function toggleBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  if (window.scrollY > 400) {
    btn.classList.add('visible');
  } else {
    btn.classList.remove('visible');
  }
}

(function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ============================================================
   7. CONTACT FORM VALIDATION
   ============================================================ */
(function initContactForm() {
  const form     = document.getElementById('contact-form');
  if (!form) return;

  const fields = {
    name:    { el: document.getElementById('contact-name'),    errEl: document.getElementById('name-error') },
    email:   { el: document.getElementById('contact-email'),   errEl: document.getElementById('email-error') },
    subject: { el: document.getElementById('contact-subject'), errEl: document.getElementById('subject-error') },
    message: { el: document.getElementById('contact-message'), errEl: document.getElementById('message-error') },
  };

  const feedback = document.getElementById('form-feedback');
  const submitBtn = document.getElementById('form-submit');

  // Validators
  const validators = {
    name:    v => v.trim().length >= 2      ? ''  : 'Please enter your name (at least 2 characters).',
    email:   v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Please enter a valid email address.',
    subject: v => v.trim().length >= 3      ? ''  : 'Please enter a subject (at least 3 characters).',
    message: v => v.trim().length >= 10     ? ''  : 'Please enter a message (at least 10 characters).',
  };

  function showError(key, msg) {
    const { el, errEl } = fields[key];
    if (msg) {
      el.classList.add('error');
      errEl.textContent = msg;
    } else {
      el.classList.remove('error');
      errEl.textContent = '';
    }
    return !msg;
  }

  // Live validation on blur
  Object.keys(fields).forEach(key => {
    const { el } = fields[key];
    if (!el) return;
    el.addEventListener('blur', () => {
      const msg = validators[key](el.value);
      showError(key, msg);
    });
    el.addEventListener('input', () => {
      // Clear error on typing after an error
      if (el.classList.contains('error')) {
        const msg = validators[key](el.value);
        if (!msg) showError(key, '');
      }
    });
  });

  function showFeedback(type, msg) {
    if (!feedback) return;
    feedback.className = 'form-feedback ' + type;
    feedback.textContent = msg;
    // Auto-clear after 6s
    setTimeout(() => {
      feedback.className = 'form-feedback';
      feedback.textContent = '';
    }, 6000);
  }

  function setSubmitState(loading) {
    if (!submitBtn) return;
    const btnText = submitBtn.querySelector('.btn-text');
    if (loading) {
      submitBtn.disabled = true;
      if (btnText) btnText.textContent = 'Sending…';
    } else {
      submitBtn.disabled = false;
      if (btnText) btnText.textContent = 'Send Message';
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate all fields
    let valid = true;
    Object.keys(fields).forEach(key => {
      const { el } = fields[key];
      if (!el) return;
      const msg = validators[key](el.value);
      if (!showError(key, msg)) valid = false;
    });

    if (!valid) {
      // Focus first errored field
      const firstError = form.querySelector('.error');
      if (firstError) firstError.focus();
      return;
    }

    // Simulate submission (replace with real API call)
    setSubmitState(true);

    setTimeout(() => {
      setSubmitState(false);
      showFeedback(
        'success',
        '✓ Message sent! I\'ll get back to you as soon as possible.'
      );
      form.reset();
      Object.keys(fields).forEach(key => showError(key, ''));
    }, 1200);
  });
})();

/* ============================================================
   8. FOOTER YEAR
   ============================================================ */
(function setFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
})();
