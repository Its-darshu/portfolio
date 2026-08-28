import { useEffect, useRef } from 'react';
import { showProject } from './ProjectOverlay';

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

export default function ProjectStack({ projects = [], prefix = '' }) {
  const stackRef = useRef(null);

  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;
    const cards = [...stack.querySelectorAll('.pcard')];
    cards.forEach((c, i) => c.style.transform = `rotate(${c.dataset.rot}deg)`);

    function depth() {
      const pin = innerHeight * .12;
      cards.forEach((c, i) => {
        const next = cards[i + 1];
        if (!next) return;
        const p = clamp(1 - (next.getBoundingClientRect().top - pin) / (innerHeight * .8), 0, 1);
        c.style.transform = `rotate(${c.dataset.rot * (1 - p * .5)}deg) scale(${1 - p * .06}) translateY(${-p * 16}px)`;
      });
    }
    window.addEventListener('scroll', depth, { passive: true });
    depth();
    return () => window.removeEventListener('scroll', depth);
  }, [projects]);

  return (
    <div ref={stackRef} id="work-stack">
      {projects.map((p, i) => (
        <article className={`pcard${p.wip ? ' wip' : ''}`} data-rot={i % 2 ? .7 : -.7} key={p.num}>
          <div className="pcard-num">{p.num}</div>
          <div className="pcard-top">
            <span>{`${p.num} / ${String(projects.length).padStart(2, '0')}`}</span>
            <span className="yr">{p.wip ? '● IN PROGRESS' : p.yr}</span>
          </div>
          <h3 className="pcard-name">{p.name}</h3>
          <p className="pcard-desc">{p.desc}</p>
          <div className="pcard-tags">{p.tags.map(t => <span className="wtag" key={t}>{t}</span>)}</div>
          <div className="pcard-foot">
            <button className="pill solid" onClick={() => showProject(p)}>DETAILS +</button>
            <a className="pill" href={p.link} target="_blank" rel="noopener noreferrer">GITHUB ↗</a>
            {p.demo && <a className="pill" href={p.demo} target="_blank" rel="noopener noreferrer">LIVE ↗</a>}
          </div>
        </article>
      ))}
    </div>
  );
}