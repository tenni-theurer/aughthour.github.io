// Smooth scrolling for in-page links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
  
  // Magnetic effect on buttons, but skip mailto
  if (window.matchMedia('(pointer: fine)').matches) {
    const strength = 0.06;
    document.querySelectorAll('.cta-button').forEach(btn => {
      const href = (btn.getAttribute('href') || '').toLowerCase();
      if (href.startsWith('mailto:')) return;
  
      btn.addEventListener('mousemove', e => {
        const r = btn.getBoundingClientRect();
        const dx = (e.clientX - r.left - r.width / 2) * strength;
        const dy = (e.clientY - r.top - r.height / 2) * strength;
        const x = Math.max(-8, Math.min(8, dx));
        const y = Math.max(-6, Math.min(6, dy));
        btn.style.transform = `translate(${x}px, ${y}px)`;
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = 'none'; });
    });
  }
  
  // Intersection Observer to play entrance animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.style.animationPlayState = 'running';
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  
  document.querySelectorAll('[class*="slide-in"]').forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
  });
  
  // Parallax for background elements on desktop only
  if (window.matchMedia('(min-width: 1025px)').matches) {
    const parallaxElements = document.querySelectorAll('.bg-element');
    window.addEventListener('scroll', () => {
      const y = window.pageYOffset * 0.5;
      parallaxElements.forEach(el => { el.style.transform = `translateY(${y}px)`; });
    });
  }
  
  // Active nav link on scroll
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 100;
      const h = section.clientHeight;
      if (scrollY >= top && scrollY < top + h) current = section.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href').substring(1) === current);
    });
  });
  
  // Progressive fallback for each contact-cta block
  document.querySelectorAll('.contact-cta').forEach(block => {
    const email = block.dataset.email || 'contact@aughthour.com';
    const btn = block.querySelector('.cta-email');
    const panel = block.querySelector('.contact-fallback');
    const gmail = block.querySelector('.gmail-link');
    const copyBtn = block.querySelector('.copy-email');
  
    if (gmail) {
      gmail.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;
    }
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(email).then(() => {
            const old = copyBtn.textContent;
            copyBtn.textContent = 'Copied';
            setTimeout(() => { copyBtn.textContent = old; }, 1500);
          });
        }
      });
    }
    if (btn && panel) {
      btn.addEventListener('click', () => {
        setTimeout(() => { if (document.hasFocus()) panel.hidden = false; }, 1200);
      });
    }
  });
  
  // Footer year
(function () {
    const el = document.getElementById('year');
    if (!el) return;
    const start = parseInt(el.dataset.start || '', 10);
    const now = new Date().getFullYear();
    el.textContent = Number.isInteger(start) && now > start ? `${start}-${now}` : String(now);
  })();
  