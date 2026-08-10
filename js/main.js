// VL Study Abroad Consultants — shared interactions
(function () {
  // sticky header shadow
  const header = document.querySelector('.site-header');
  const onScroll = () => header && header.classList.toggle('scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // mobile menu
  const burger = document.querySelector('.hamburger');
  const links = document.querySelector('.nav-links');
  if (burger && links) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      links.classList.toggle('show');
    });
    links.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        burger.classList.remove('open');
        links.classList.remove('show');
      })
    );
  }

  // reveal on scroll (with graceful fallback)
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    reveals.forEach((el, i) => {
      el.style.transitionDelay = (i % 4) * 0.08 + 's';
      io.observe(el);
    });
  } else {
    reveals.forEach(el => el.classList.add('in'));
  }

  // count-up for stats
  const animate = (el) => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const dur = 1400; let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      const val = target * (1 - Math.pow(1 - p, 3));
      el.textContent = (target % 1 === 0 ? Math.round(val) : val.toFixed(1)) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const statIO = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) { animate(e.target); statIO.unobserve(e.target); } }),
    { threshold: 0.5 }
  );
  document.querySelectorAll('[data-count]').forEach(el => statIO.observe(el));

  // contact form (front-end demo — opens mail/WhatsApp)
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const d = new FormData(form);
      const msg =
        `New enquiry from VL website%0A%0AName: ${encodeURIComponent(d.get('name') || '')}` +
        `%0AEmail: ${encodeURIComponent(d.get('email') || '')}` +
        `%0APhone: ${encodeURIComponent(d.get('phone') || '')}` +
        `%0ADestination: ${encodeURIComponent(d.get('destination') || '')}` +
        `%0AMessage: ${encodeURIComponent(d.get('message') || '')}`;
      window.open(`https://wa.me/923215208625?text=${msg}`, '_blank');
      const ok = document.getElementById('formOk');
      if (ok) ok.style.display = 'block';
      form.reset();
    });
  }

  // footer year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
