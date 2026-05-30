 // ── THEME TOGGLE ──
  const themeBtn = document.getElementById('themeToggle');
  const html = document.documentElement;
  const saved = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', saved);
  themeBtn.textContent = saved === 'dark' ? '🌙' : '☀️';

  themeBtn.addEventListener('click', () => {
    const cur = html.getAttribute('data-theme');
    const next = cur === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    themeBtn.textContent = next === 'dark' ? '🌙' : '☀️';
    localStorage.setItem('theme', next);
  });

  // ── HAMBURGER ──
  const ham = document.getElementById('hamburger');
  const mob = document.getElementById('mobileMenu');
  ham.addEventListener('click', () => mob.classList.toggle('open'));
  mob.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mob.classList.remove('open')));

  // ── TYPING ANIMATION ──
  const phrases = ['BCA Graduate', 'Web Developer', 'PHP Developer', 'Frontend Developer', 'Problem Solver'];
  let pi = 0, ci = 0, del = false;
  const el = document.getElementById('typed');

  function type() {
    const word = phrases[pi];
    el.textContent = del ? word.slice(0, --ci) : word.slice(0, ++ci);
    if (!del && ci === word.length) { del = true; setTimeout(type, 1800); return; }
    if (del && ci === 0) { del = false; pi = (pi + 1) % phrases.length; }
    setTimeout(type, del ? 60 : 100);
  }
  type();

  // ── SCROLL REVEAL ──
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const delay = e.target.dataset.delay || 0;
        setTimeout(() => {
          e.target.classList.add('visible');
          // animate skill bars
          e.target.querySelectorAll && e.target.querySelectorAll('.skill-fill').forEach(bar => {
            bar.style.width = bar.dataset.width + '%';
          });
        }, delay);
        // also trigger timeline items
        if (e.target.classList.contains('tl-item')) {
          e.target.classList.add('visible');
        }
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal, .tl-item').forEach(el => obs.observe(el));

  // Trigger skill bars on skill cards
  const skillObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.skill-fill').forEach(bar => {
          bar.style.width = bar.dataset.width + '%';
        });
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.skill-card').forEach(c => skillObs.observe(c));

  // ── CONTACT FORM VALIDATION ──
  document.getElementById('submitBtn').addEventListener('click', () => {
    const fields = [
      { id: 'f-name', fg: 'fg-name', check: v => v.trim().length > 0 },
      { id: 'f-email', fg: 'fg-email', check: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
      { id: 'f-subject', fg: 'fg-subject', check: v => v.trim().length > 0 },
      { id: 'f-msg', fg: 'fg-msg', check: v => v.trim().length > 10 },
    ];
    let valid = true;
    fields.forEach(f => {
      const val = document.getElementById(f.id).value;
      const fg = document.getElementById(f.fg);
      if (!f.check(val)) { fg.classList.add('error'); valid = false; }
      else fg.classList.remove('error');
    });
    const msg = document.getElementById('formMsg');
    if (valid) {
      msg.className = 'form-msg success';
      msg.textContent = '✅ Message sent! I\'ll get back to you soon.';
      document.getElementById('contactForm').querySelectorAll('input, textarea').forEach(i => i.value = '');
      setTimeout(() => msg.className = 'form-msg', 4000);
    } else {
      msg.className = 'form-msg error-msg';
      msg.textContent = '⚠ Please fill in all required fields correctly.';
      setTimeout(() => msg.className = 'form-msg', 4000);
    }
  });