import { useEffect, useRef } from 'react';

let openFn = null;
export function showProject(project) {
  if (openFn) openFn(project);
}

export default function ProjectOverlay() {
  const ovlRef = useRef(null);
  const innerRef = useRef(null);
  const crumbRef = useRef(null);
  const openRef = useRef(false);

  useEffect(() => {
    const ovl = ovlRef.current;
    const inner = innerRef.current;
    const crumb = crumbRef.current;

    function openOvl(p) {
      crumb.textContent = `WORK — ${p.num} — ${p.name}`;
      inner.innerHTML = `
        <h2 class="ovl-title">${p.name}</h2>
        <div class="ovl-meta">${p.tags.map(t => `<span class="wtag">${t}</span>`).join('')}</div>
        <p class="ovl-lede">${p.lede}</p>
        <h3 class="ovl-h">WHAT IT DOES</h3>
        <div class="feat-grid">${p.feats.map(([h, b]) => `<div class="feat"><b>${h}</b>${b}</div>`).join('')}</div>
        <h3 class="ovl-h">UNDER THE HOOD</h3>
        <p style="font-size:.82rem;letter-spacing:.06em;">${p.stack}</p>
        <div class="ovl-links">
          <a class="pill solid" href="${p.link}" target="_blank" rel="noopener noreferrer">VIEW ON GITHUB ↗</a>
          ${p.demo ? `<a class="pill" href="${p.demo}" target="_blank" rel="noopener noreferrer">LIVE DEMO ↗</a>` : ''}
        </div>`;
      ovl.scrollTop = 0;
      ovl.classList.add('open');
      ovl.setAttribute('aria-hidden', 'false');
      document.body.classList.add('locked');
      openRef.current = true;
    }
    function closeOvl() {
      ovl.classList.remove('open');
      ovl.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('locked');
      openRef.current = false;
    }

    openFn = openOvl;
    const onKey = e => { if (e.key === 'Escape' && openRef.current) closeOvl(); };
    document.addEventListener('keydown', onKey);
    return () => { openFn = null; document.removeEventListener('keydown', onKey); };
  }, []);

  return (
    <div id="ovl" ref={ovlRef} role="dialog" aria-modal="true" aria-hidden="true">
      <div className="ovl-bar">
        <span ref={crumbRef} id="ovl-crumb">WORK — 01</span>
        <button className="ovl-close" id="ovl-close" onClick={() => { const o = ovlRef.current; o.classList.remove('open'); o.setAttribute('aria-hidden', 'true'); document.body.classList.remove('locked'); openRef.current = false; }}>CLOSE ×</button>
      </div>
      <div className="ovl-inner" ref={innerRef} id="ovl-inner"></div>
    </div>
  );
}