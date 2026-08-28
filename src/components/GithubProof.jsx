import { useEffect, useRef, useState } from 'react';
import { GITHUB_USER } from '../data/portfolio';

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

export default function GithubProof() {
  const gridRef = useRef(null);
  const langRef = useRef(null);
  const hmStatusRef = useRef(null);
  const ghJoinedRef = useRef(null);
  const [counters, setCounters] = useState({ total: 0, repos: 0, active: 0, best: 0 });

  useEffect(() => {
    let alive = true;
    let days = null;
    const data = { total: 0, repos: 0, active: 0, best: 0, langs: {} };

    async function load() {
      try {
        const [cRes, uRes, rRes] = await Promise.all([
          fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`),
          fetch(`https://api.github.com/users/${GITHUB_USER}`),
          fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100`),
        ]);
        if (cRes.ok && alive) {
          const c = await cRes.json();
          if (Array.isArray(c.contributions)) {
            days = c.contributions;
            data.total = c.total?.lastYear ?? Object.values(c.total || {})[0] ?? 0;
            data.active = days.filter(d => d.count > 0).length;
            data.best = Math.max(...days.map(d => d.count));
          }
        }
        if (uRes.ok && alive) {
          const u = await uRes.json();
          data.repos = u.public_repos;
          const joined = new Date(u.created_at);
          if (ghJoinedRef.current) ghJoinedRef.current.textContent = 'SHIPPING SINCE ' + joined.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }).toUpperCase();
        }
        if (rRes.ok && alive) {
          const repos = await rRes.json();
          const langs = {};
          repos.forEach(r => { if (r.language) langs[r.language.toUpperCase()] = (langs[r.language.toUpperCase()] || 0) + 1; });
          if (Object.keys(langs).length) data.langs = langs;
        }
      } catch (e) {
        if (hmStatusRef.current) hmStatusRef.current.textContent = 'CACHED';
      }
      if (!alive) return;
      setCounters({ ...data });
      renderHeatmap(days);
      renderLanguages(data.langs);
    }

    function renderHeatmap(d) {
      const grid = gridRef.current;
      if (!grid) return;
      grid.innerHTML = '';
      if (d) {
        const offset = new Date(d[0].date + 'T00:00:00').getDay();
        for (let i = 0; i < offset; i++) {
          const pad = document.createElement('span');
          pad.className = 'hm-cell'; pad.style.visibility = 'hidden';
          grid.appendChild(pad);
        }
        d.forEach(day => {
          const c = document.createElement('span');
          c.className = 'hm-cell' + (day.level ? ' l' + day.level : '');
          c.title = `${day.date} — ${day.count} contribution${day.count === 1 ? '' : 's'}`;
          grid.appendChild(c);
        });
        const f = new Date(d[0].date), l = new Date(d[d.length - 1].date);
        const fmt = x => x.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }).toUpperCase();
        const rangeEl = grid.closest('.hm-card')?.querySelector('#hm-range');
        if (rangeEl) rangeEl.textContent = fmt(f) + ' — ' + fmt(l);
        const hio = new IntersectionObserver(es => {
          if (!es[0].isIntersecting) return;
          hio.disconnect();
          grid.querySelectorAll('.hm-cell.l1,.hm-cell.l2,.hm-cell.l3,.hm-cell.l4').forEach((c, i) =>
            setTimeout(() => c.classList.add('pop'), i * 30));
        }, { threshold: .3 });
        hio.observe(grid);
        const sc = grid.closest('.hm-scroll');
        if (sc) requestAnimationFrame(() => { sc.scrollLeft = sc.scrollWidth; });
      } else {
        grid.outerHTML = '<div style="padding:1.5rem;font-size:.7rem;letter-spacing:.2em;text-transform:uppercase;opacity:.6;">GITHUB UNREACHABLE — THE SQUARES ARE STILL ORANGE, PROMISE.</div>';
        if (hmStatusRef.current) hmStatusRef.current.textContent = 'OFFLINE';
      }
    }

    function renderLanguages(langs) {
      const lb = langRef.current;
      if (!lb) return;
      const entries = Object.entries(langs).sort((a, b) => b[1] - a[1]).slice(0, 5);
      const totalRepos = entries.reduce((s, [, n]) => s + n, 0);
      lb.innerHTML = entries.map(([lang, n]) => {
        const pct = Math.round(n / totalRepos * 100);
        return `<div class="lang-row">
          <div class="lang-top"><span>${lang}</span><span>${pct}% — ${n} REPO${n > 1 ? 'S' : ''}</span></div>
          <div class="lang-bar"><div class="lang-fill" data-w="${pct}"></div></div>
        </div>`;
      }).join('');
      if (!entries.length) lb.innerHTML = '<div class="lang-row">no languages yet</div>';
      const lio = new IntersectionObserver(es => {
        if (!es[0].isIntersecting) return;
        lio.disconnect();
        lb.querySelectorAll('.lang-fill').forEach((f, i) => setTimeout(() => f.style.width = f.dataset.w + '%', 150 + i * 120));
      }, { threshold: .4 });
      lio.observe(lb);
    }

    load();
    return () => { alive = false; };
  }, []);

  /* count-up */
  useEffect(() => {
    const els = document.querySelectorAll('[data-count]');
    if (!els.length) return;
    let last = 0;
    const cio = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;
      cio.disconnect();
      const el = entries[0].target;
      const target = parseInt(el.dataset.target, 10) || 0;
      const t0 = performance.now(), D = 1300;
      (function f(t) {
        const p = clamp((t - t0) / D, 0, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(f);
      })(t0);
    }, { threshold: .5 });
    els.forEach(el => { el.dataset._k = ++last; cio.observe(el); });
    return () => cio.disconnect();
  }, [counters]);

  return (
    <>
      <div className="stat-grid" data-reveal>
        <div className="stat-cell"><div className="stat-num" data-count data-target={counters.total} id="st-contrib">0</div><div className="stat-lbl">CONTRIBUTIONS — PAST YEAR</div></div>
        <div className="stat-cell"><div className="stat-num" data-count data-target={counters.repos} id="st-repos">0</div><div className="stat-lbl">PUBLIC REPOS</div></div>
        <div className="stat-cell"><div className="stat-num" data-count data-target={counters.active} id="st-active">0</div><div className="stat-lbl">ACTIVE DAYS</div></div>
        <div className="stat-cell"><div className="stat-num" data-count data-target={counters.best} id="st-best">0</div><div className="stat-lbl">BEST DAY — COMMITS</div></div>
      </div>

      <div className="proof-cols">
        <div className="hm-card" data-reveal>
          <div className="hm-head">
            <span>CONTRIBUTION GRAPH — @{GITHUB_USER.toUpperCase()}</span>
            <span className="hm-live"><span className="dot"></span><span ref={hmStatusRef} id="hm-status">LIVE</span></span>
          </div>
          <div className="hm-scroll"><div className="hm-grid" ref={gridRef} id="hm-grid"></div></div>
          <div className="hm-foot">
            <span id="hm-range">PAST 12 MONTHS</span>
            <span className="hm-legend">LESS
              <span className="hm-cell"></span><span className="hm-cell l1"></span><span className="hm-cell l2"></span><span className="hm-cell l3"></span><span className="hm-cell l4"></span>
            MORE</span>
          </div>
        </div>
        <div className="lang-card" data-reveal>
          <div className="hm-head"><span>LANGUAGES — BY REPO</span></div>
          <div className="lang-body" ref={langRef} id="lang-body"></div>
        </div>
      </div>

      <div className="gh-cta" data-reveal>
        <a className="pill solid" href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noopener noreferrer">FULL PROFILE ON GITHUB ↗</a>
        <span className="pill" style={{ cursor: 'default' }} ref={ghJoinedRef} id="gh-joined">SHIPPING SINCE 2024</span>
      </div>
    </>
  );
}