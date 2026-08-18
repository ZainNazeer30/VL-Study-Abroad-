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

  // Forms -> email via Web3Forms (no server needed). Handles the enquiry form
  // and the review form. Submissions are emailed to your inbox.
  document.querySelectorAll('.js-web3form').forEach((form) => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const okEl = form.querySelector('[data-ok]');
      const errEl = form.querySelector('[data-err]');
      const btn = form.querySelector('button[type="submit"]');
      if (okEl) okEl.style.display = 'none';
      if (errEl) errEl.style.display = 'none';

      const key = form.querySelector('input[name="access_key"]');
      if (!key || key.value.indexOf('YOUR_WEB3FORMS') === 0) {
        if (errEl) { errEl.textContent = 'Form not configured yet: add your Web3Forms access key (see README).'; errEl.style.display = 'block'; }
        return;
      }

      const original = btn ? btn.innerHTML : '';
      if (btn) { btn.disabled = true; btn.innerHTML = 'Sending…'; }
      try {
        const data = Object.fromEntries(new FormData(form).entries());
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(data)
        });
        const json = await res.json();
        if (json.success) {
          if (okEl) { okEl.style.display = 'block'; okEl.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
          form.reset();
        } else if (errEl) {
          errEl.textContent = json.message || 'Something went wrong. Please try again.';
          errEl.style.display = 'block';
        }
      } catch (err) {
        if (errEl) errEl.style.display = 'block';
      } finally {
        if (btn) { btn.disabled = false; btn.innerHTML = original; }
      }
    });
  });

  // footer year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // ---- Advanced UI: preloader, scroll progress, back-to-top ----
  const loader = document.getElementById('vlLoader');
  if (loader) {
    const hideLoader = () => { loader.classList.add('hide'); setTimeout(() => loader.remove(), 700); };
    window.addEventListener('load', hideLoader);
    setTimeout(hideLoader, 3500); // safety net
  }

  const bar = document.createElement('div');
  bar.id = 'vlProgress';
  document.body.appendChild(bar);

  const toTop = document.createElement('button');
  toTop.id = 'vlTop';
  toTop.setAttribute('aria-label', 'Back to top');
  toTop.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
  document.body.appendChild(toTop);
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  const onScrollUI = () => {
    const st = window.scrollY || document.documentElement.scrollTop;
    const h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    bar.style.width = (h > 0 ? (st / h) * 100 : 0) + '%';
    toTop.classList.toggle('show', st > 500);
  };
  onScrollUI();
  window.addEventListener('scroll', onScrollUI, { passive: true });
})();
