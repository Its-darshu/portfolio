import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Effects() {
  const location = useLocation();
  const navigate = useNavigate();
  const palState = useRef({ open: false, items: [], filtered: [], sel: 0 });

  /* ── LOADER (once per mount) ───────────────────────── */
  useEffect(() => {
    const root = document.getElementById('root');
    const loader = document.createElement('div');
    loader.id = 'loader';
    loader.setAttribute('aria-hidden', 'true');
    loader.innerHTML = `
      <div class="ldr-name"></div>
      <div class="ldr-count">0</div>
      <span class="ldr-tag">PORTFOLIO — V3 — 2026</span>`;
    document.body.appendChild(loader);
    document.body.classList.add('locked');

    const nameEl = loader.querySelector('.ldr-name');
    const countEl = loader.querySelector('.ldr-count');
    'DARSHAN'.split('').forEach((ch, i) => {
      const s = document.createElement('span');
      s.className = 'ldr-l'; s.textContent = ch;
      s.style.animationDelay = (90 + i * 60) + 'ms';
      nameEl.appendChild(s);
    });

    const T = 1500, t0 = performance.now();
    (function tick(t) {
      const p = Math.max(0, Math.min((t - t0) / T, 1));
      countEl.textContent = Math.floor(p * 100);
      if (p < 1) requestAnimationFrame(tick);
      else setTimeout(exit, 280);
    })(t0);

    function exit() {
      loader.classList.add('gone');
      document.body.classList.remove('locked');
      document.body.classList.add('ready');
      setTimeout(() => loader.remove(), 950);
    }
    setTimeout(() => { if (document.body.contains(loader)) exit(); }, 5000);

    return () => { if (document.body.contains(loader)) loader.remove(); };
  }, []);

  /* ── PROGRESS BAR + DARK-HEADER FLIP ──────────────── */
  useEffect(() => {
    const prog = document.createElement('div');
    prog.id = 'prog';
    document.body.appendChild(prog);
    document.body.classList.remove('hdr-light');

    const onScroll = () => {
      const h = document.documentElement;
      prog.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100 || 0) + '%';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const darkSections = document.querySelectorAll('[data-dark-section]');
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        if (document.body.classList.contains('hs')) return;
        document.body.classList.toggle('hdr-light', true);
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    const lightSections = document.querySelectorAll('[data-light-section]');
    const ioLight = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        if (document.body.classList.contains('hs')) return;
        document.body.classList.toggle('hdr-light', false);
      });
    }, { rootMargin: '-40% 0px -55% 0px' });

    darkSections.forEach(el => io.observe(el));
    lightSections.forEach(el => ioLight.observe(el));

    return () => {
      window.removeEventListener('scroll', onScroll);
      io.disconnect(); ioLight.disconnect();
      prog.remove();
    };
  }, [location.pathname]);

  /* ── REVEALS ───────────────────────────────────────── */
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]');
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: .12 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [location.pathname]);

  /* ── SCROLL RESTORATION ───────────────────────────── */
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, [location.pathname]);

  /* ── COMMAND PALETTE ───────────────────────────────── */
  useEffect(() => {
    const ITEMS = [
      { num: '01', name: 'HOME', route: '/' },
      { num: '02', name: 'PROJECTS', route: '/projects' },
      { num: '03', name: 'ABOUT', route: '/about' },
      { num: '04', name: 'BLOG', route: '/blog' },
      { num: '05', name: 'CONTACT', route: '/contact' },
      { num: '↗', name: 'GITHUB', href: 'https://github.com/Its-darshu' },
      { num: '↗', name: 'DISCORD', href: 'https://discord.com/users/darshan_66' },
      { num: '↗', name: 'RESUME', href: '/Darshan-Resume.pdf' },
      { num: '@', name: 'EMAIL', href: 'mailto:darshan99806@gmail.com' },
      { num: '↗', name: 'X / TWITTER', href: 'https://x.com/cookmithick' },
    ];

    const pal = document.createElement('div');
    pal.id = 'pal';
    pal.setAttribute('role', 'dialog');
    pal.setAttribute('aria-modal', 'true');
    pal.setAttribute('aria-hidden', 'true');
    pal.innerHTML = `
      <div id="pal-bd"></div>
      <div id="pal-box">
        <div id="pal-head"><span class="pr">❯</span><input id="pal-input" placeholder="go to…" autocomplete="off" spellcheck="false" aria-label="Navigate"></div>
        <div id="pal-list"></div>
        <div id="pal-foot"><span>↑↓ MOVE</span><span>↵ GO</span><span>ESC CLOSE</span></div>
      </div>`;
    document.body.appendChild(pal);

    const fab = document.createElement('button');
    fab.id = 'nav-fab';
    fab.setAttribute('aria-label', 'Open navigation');
    fab.innerHTML = '<span class="fk">❯</span>NAVIGATE<span class="caret"></span><span class="key">/</span>';
    document.body.appendChild(fab);

    const state = palState.current;
    state.items = ITEMS;
    state.filtered = ITEMS;
    const input = pal.querySelector('#pal-input');
    const list = pal.querySelector('#pal-list');
    const bd = pal.querySelector('#pal-bd');

    function render() {
      if (!state.filtered.length) {
        list.innerHTML = `<div class="pal-empty">nothing called "${input.value}" here — try 'blog'</div>`;
        return;
      }
      list.innerHTML = state.filtered.map((it, i) => `
        <div class="pal-item${i === state.sel ? ' sel' : ''}" data-i="${i}">
          <span class="pn">${it.num}</span>
          <span class="pt">${it.name}</span>
          <span class="pa">${it.route ? 'GO ↵' : 'OPEN ↵'}</span>
        </div>`).join('');
      const s = list.querySelector('.sel');
      if (s) s.scrollIntoView({ block: 'nearest' });
    }
    function filter() {
      const q = input.value.trim().toLowerCase();
      state.filtered = q ? state.items.filter(it => it.name.toLowerCase().includes(q)) : state.items;
      state.sel = 0;
      render();
    }
    function setPal(v) {
      state.open = v;
      pal.classList.toggle('open', v);
      pal.setAttribute('aria-hidden', String(!v));
      document.body.classList.toggle('locked', v);
      if (v) { input.value = ''; filter(); if (window.matchMedia('(hover: hover)').matches) setTimeout(() => input.focus(), 80); }
      else input.blur();
    }
    function exec(it) {
      if (!it) return;
      setPal(false);
      if (it.route) { setTimeout(() => { if (location.pathname === it.route) window.scrollTo({ top: 0, behavior: 'smooth' }); else navigate(it.route); }, 60); }
      else if (it.href.startsWith('mailto:')) location.href = it.href;
      else if (it.href.startsWith('/')) window.open(it.href, '_blank', 'noopener');
      else window.open(it.href, '_blank', 'noopener');
    }

    fab.addEventListener('click', () => setPal(!state.open));
    bd.addEventListener('click', () => setPal(false));
    list.addEventListener('click', e => {
      const row = e.target.closest('.pal-item');
      if (row) exec(state.filtered[+row.dataset.i]);
    });
    list.addEventListener('mousemove', e => {
      const row = e.target.closest('.pal-item');
      if (row && +row.dataset.i !== state.sel) { state.sel = +row.dataset.i; render(); }
    });
    input.addEventListener('input', filter);

    const onKey = e => {
      const el = e.target instanceof Element ? e.target : null;
      if (!state.open) {
        if (e.key === '/' && (!el || !el.closest('input, textarea'))) { e.preventDefault(); setPal(true); }
        return;
      }
      if (e.key === 'Escape') setPal(false);
      else if (e.key === 'ArrowDown') { e.preventDefault(); state.sel = Math.min(state.sel + 1, state.filtered.length - 1); render(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); state.sel = Math.max(state.sel - 1, 0); render(); }
      else if (e.key === 'Enter') { e.preventDefault(); exec(state.filtered[state.sel]); }
    };
    document.addEventListener('keydown', onKey);

    return () => {
      document.removeEventListener('keydown', onKey);
      pal.remove(); fab.remove();
      document.body.classList.remove('locked');
    };
  }, [navigate, location.pathname]);

  return null;
}