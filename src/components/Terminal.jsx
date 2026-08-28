import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { TERMINAL_COMMANDS } from '../data/portfolio';

export default function Terminal() {
  const navigate = useNavigate();
  const bodyRef = useRef(null);
  const inputRef = useRef(null);
  const ghostRef = useRef(null);
  const inputRowRef = useRef(null);
  const busyRef = useRef(false);

  useEffect(() => {
    const body = bodyRef.current;
    if (!body) return;
    let alive = true;

    const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    function line(cls, text) {
      const d = document.createElement('div'); d.className = 'tl';
      d.innerHTML = `<span class="${cls}">${esc(text)}</span>`;
      body.appendChild(d); body.scrollTop = body.scrollHeight;
    }
    function gap() { const d = document.createElement('div'); d.className = 't-gap'; body.appendChild(d); }
    function promptLine(cmd) {
      const d = document.createElement('div'); d.className = 'tl';
      d.innerHTML = `<span class="t-pr">❯</span><span class="t-cmd">${esc(cmd)}</span>`;
      body.appendChild(d); body.scrollTop = body.scrollHeight;
    }
    function typeCmd(cmd) {
      return new Promise(res => {
        const d = document.createElement('div'); d.className = 'tl';
        d.innerHTML = '<span class="t-pr">❯</span><span class="t-cmd"></span>';
        body.appendChild(d);
        const span = d.lastChild; let i = 0;
        (function t() {
          span.textContent = cmd.slice(0, ++i);
          body.scrollTop = body.scrollHeight;
          if (i < cmd.length) setTimeout(t, 50 + Math.random() * 34); else setTimeout(res, 160);
        })();
      });
    }
    function print(lines) {
      return new Promise(res => {
        let i = 0;
        (function n() {
          if (i >= lines.length) { setTimeout(res, 100); return; }
          const l = lines[i++];
          l.type === 'gap' ? gap() : line('t-' + l.type, l.text);
          setTimeout(n, 26);
        })();
      });
    }

    const C = {
      ...TERMINAL_COMMANDS,
      work: () => { setTimeout(() => navigate('/projects'), 350); return [{ type: 'dim', text: 'jumping to /projects ↓' }]; },
      resume: () => { setTimeout(() => window.open('/Darshan-Resume.pdf', '_blank'), 300); return [{ type: 'dim', text: 'opening resume.pdf ↗' }]; },
    };

    async function run(raw, typed) {
      const cmd = raw.trim().toLowerCase();
      if (!cmd) return;
      typed ? await typeCmd(cmd) : promptLine(cmd);
      const h = C[cmd];
      if (!h) await print([{ type: 'dim', text: `command not found: ${cmd}  (try 'help')` }]);
      else { const out = h(); if (out) await print(out); }
      gap();
    }

    let autoStarted = false;
    const tio = new IntersectionObserver(async entries => {
      if (!entries[0].isIntersecting || autoStarted) return;
      autoStarted = true; tio.disconnect();
      if (!alive) return;
      busyRef.current = true;
      for (const c of ['whoami']) { await new Promise(r => setTimeout(r, 350)); await run(c, true); }
      busyRef.current = false;
      if (alive && inputRowRef.current) inputRowRef.current.style.display = 'flex';
    }, { threshold: 0 });
    tio.observe(document.getElementById('about'));

    const inputEl = inputRef.current;
    const ghostEl = ghostRef.current;
    const names = Object.keys(C);
    function measure(str) {
      const s = document.createElement('span');
      s.style.cssText = 'position:fixed;left:-9999px;font-family:"DM Mono",monospace;font-size:.84rem;white-space:pre;visibility:hidden;';
      s.textContent = str; document.body.appendChild(s);
      const w = s.getBoundingClientRect().width; s.remove(); return w;
    }
    const onInput = () => {
      const v = inputEl.value;
      if (!v) { ghostEl.textContent = ''; return; }
      const m = names.find(c => c.startsWith(v.toLowerCase()) && c.length > v.length);
      if (m) { ghostEl.textContent = m.slice(v.length); ghostEl.style.left = measure(v) + 'px'; }
      else ghostEl.textContent = '';
    };
    const onKey = async e => {
      if (e.key === 'Tab') {
        e.preventDefault();
        if (ghostEl.textContent) { inputEl.value += ghostEl.textContent; ghostEl.textContent = ''; }
        return;
      }
      if (e.key !== 'Enter') return;
      ghostEl.textContent = '';
      const v = inputEl.value.trim(); inputEl.value = '';
      if (!v || busyRef.current) return;
      busyRef.current = true; await run(v, false); busyRef.current = false;
    };
    inputEl.addEventListener('input', onInput);
    inputEl.addEventListener('keydown', onKey);

    return () => { alive = false; tio.disconnect(); inputEl.removeEventListener('input', onInput); inputEl.removeEventListener('keydown', onKey); body.innerHTML = ''; };
  }, [navigate]);

  return (
    <div className="term" data-reveal style={{ transitionDelay: '.1s' }}>
      <div className="term-bar">
        <span className="term-dot"></span><span className="term-dot"></span><span className="term-dot g"></span>
        <span className="term-title">darshan@portfolio — zsh</span>
      </div>
      <div className="term-body" ref={bodyRef}></div>
      <div className="term-input-row" ref={inputRowRef} style={{ display: 'none' }}>
        <span className="t-pr">❯</span>
        <div className="term-input-wrap">
          <span className="term-ghost" ref={ghostRef}></span>
          <input type="text" className="term-input" ref={inputRef} placeholder="type a command — try 'help'" autoComplete="off" spellCheck="false" aria-label="Terminal input" />
        </div>
      </div>
    </div>
  );
}