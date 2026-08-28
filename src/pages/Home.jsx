import { useEffect, useRef } from 'react';
import Terminal from '../components/Terminal';
import GithubProof from '../components/GithubProof';
import ProjectStack from '../components/ProjectStack';
import { PROJECTS, SKILLS } from '../data/portfolio';

const SMOOTH = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth' });
};

function HeroName() {
  const rowRef = useRef(null);
  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    row.querySelectorAll('.hl').forEach(e => e.remove());
    'DARSHAN'.split('').forEach((ch, i) => {
      const s = document.createElement('span');
      s.className = 'hl';
      s.textContent = ch;
      s.style.animationDelay = (.15 + i * .045) + 's';
      s.addEventListener('animationend', () => s.classList.add('risen'), { once: true });
      row.appendChild(s);
    });
  }, []);
  return (
    <h1 className="hero-name" aria-label="Darshan">
      <span className="hero-clip"><span className="hero-row" ref={rowRef} data-word="DARSHAN"></span></span>
    </h1>
  );
}

function Rotator() {
  const rotRef = useRef(null);
  const items = ['THINGS THAT MATTER', 'WEB EXPERIENCES', 'AI-POWERED TOOLS', 'FULL-STACK APPS', 'THINGS THAT MATTER'];
  useEffect(() => {
    const rot = rotRef.current;
    let ri = 0;
    const id = setInterval(() => {
      ri++;
      rot.style.transform = `translateY(${-ri * 1.55}em)`;
      if (ri === rot.children.length - 1) setTimeout(() => {
        rot.style.transition = 'none'; rot.style.transform = 'translateY(0)'; ri = 0;
        requestAnimationFrame(() => requestAnimationFrame(() => rot.style.transition = ''));
      }, 580);
    }, 2400);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="rot-box"><span className="rot-inner" ref={rotRef}>
      {items.map((s, i) => <span key={i}>{s}</span>)}
    </span></span>
  );
}

function useScroll() {
  useEffect(() => {
    const body = document.body;
    body.classList.add('hs');
    body.classList.remove('hdr-light');
    const track = document.getElementById('hs-track');
    if (!track) return;

    const apply = () => {
      const y = window.scrollY + window.innerHeight / 2;
      let cur = null;
      for (const el of track.children) {
        if (el.offsetTop <= y) cur = el;
      }
      if (cur && cur.hasAttribute('data-dark-section')) body.classList.add('hdr-light');
      else body.classList.remove('hdr-light');
    };
    apply();
    window.addEventListener('scroll', apply);
    window.addEventListener('resize', apply);
    return () => {
      body.classList.remove('hs');
      body.classList.remove('hdr-light');
      window.removeEventListener('scroll', apply);
      window.removeEventListener('resize', apply);
    };
  }, []);
}

const FACTS = [
  ['BASED', 'Bangalore, India'],
  ['STATUS', 'Open to freelance & collabs'],
  ['CURRENTLY', 'Building AI-powered tools'],
  ['OFF DUTY', 'Breaking Bad · biriyani · debugging 4 fun'],
];

const TIMELINE = [
  { when: 'THE ORIGIN', role: 'FIRST LINE OF CODE', org: 'Self-taught web development. Decided to ship before studying — a habit that never went away.', badge: '2023' },
  { when: '2024', role: 'FIRST SHIPS', org: 'DarkSphere and Sullia Auto go live — two real products with real communities, both on Vercel.', badge: 'PRODUCT' },
  { when: '2024 — PRESENT', role: 'FREELANCE WEB DEVELOPER', org: 'Helping clients across Bangalore establish their presence online with fast, responsive sites.', badge: 'FREELANCE' },
  { when: 'NOW', role: 'BUILDING WITH AI', org: 'Phish Guard, AI Tutor, Visora — turning the AI hype into tools people can actually click.', badge: '● ONGOING' },
];

export default function Home() {
  useScroll();

  return (
    <>
      <div id="hs-stage">
        <div id="hs-track">
          {/* ═══ 01 — HELLO ═══════════════════════════════════ */}
          <section id="hello" data-light-section>
            <div className="hero-top">
              <span>FULL-STACK DEVELOPER<br />WEB DESIGNER — BANGALORE</span>
              <span className="hero-top-r">BASED IN BANGALORE, IN<br /><b>OPEN TO WORK</b></span>
            </div>
            <HeroName />
            <div className="hero-sub">
              <span>I BUILD</span>
              <Rotator />
            </div>
            <div className="hero-status">
              <a className="pill solid" onClick={() => SMOOTH('work')}><span className="dot"></span>SEE THE WORK</a>
              <a className="pill" href="mailto:darshan99806@gmail.com">SAY HI →</a>
            </div>
          </section>

          {/* ═══ 02 — ABOUT ═══════════════════════════════════ */}
          <section id="about" data-dark-section>
            <div className="about-inner">
              <div className="sec-tag" data-reveal>02 — ABOUT</div>
              <div className="about-grid">
                <div data-reveal>
                  <h2 className="about-head">NICE TO<br />MEET <span>YOU.</span></h2>
                  <p className="about-lede">I'm Darshan — a self-taught developer based in Bangalore who would rather ship real tools than collect tutorials.</p>
                  <p className="about-lede">These days that means responsive web experiences, freelance work, and AI-powered tools that do something useful.</p>
                  <div className="fact-list">
                    {FACTS.map(([k, v]) => <div className="fact" key={k}><b>{k}</b>{v}</div>)}
                  </div>
                </div>
                <Terminal />
              </div>
              <div className="term-hint" data-reveal>REAL TERMINAL — TAB AUTOCOMPLETES</div>
            </div>
          </section>

          {/* ═══ 03 — PROOF ═══════════════════════════════════ */}
          <section id="proof" data-light-section>
            <div className="proof-inner">
              <div className="sec-tag" data-reveal>03 — PROOF</div>
              <h2 className="sec-giant" data-reveal>THE RECEIPTS.</h2>
              <GithubProof />
            </div>
          </section>

          {/* ═══ 04 — WORK ════════════════════════════════════ */}
          <section id="work" data-dark-section>
            <div className="work-inner">
              <div className="sec-tag" data-reveal>04 — WORK</div>
              <h2 className="sec-giant" data-reveal>SHIPPED.</h2>
              <ProjectStack projects={PROJECTS.filter(p => !p.small)} />
              <div className="gh-cta" data-reveal>
                <a className="pill solid" onClick={() => SMOOTH('talk')}>THAT'S ALL? →</a>
              </div>
            </div>
          </section>

          {/* ═══ 05 — STORY ═══════════════════════════════════ */}
          <section id="story" data-light-section>
            <div className="story-inner">
              <div className="sec-tag" data-reveal>05 — STORY</div>
              <h2 className="sec-giant" data-reveal>SO FAR.</h2>
              <div className="tline" data-reveal>
                {TIMELINE.map(t => (
                  <div className="titem" key={t.role}>
                    <span className="t-when">{t.when}</span>
                    <div>
                      <div className="t-role">{t.role}</div>
                      <div className="t-org">{t.org}</div>
                    </div>
                    <span className={`t-badge${t.badge === '● ONGOING' ? ' live' : ''}`}>{t.badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ═══ 06 — STACK ═══════════════════════════════════ */}
          <section id="stack" data-light-section>
            <div className="stack-inner">
              <div className="sec-tag" data-reveal>06 — STACK</div>
              <h2 className="sec-giant" data-reveal>THE<br />ARSENAL.</h2>
              <div className="stack-grid" data-reveal>
                {SKILLS.map(([n, c]) => <div className="skill" key={n}>{n}<small>{c}</small></div>)}
              </div>
            </div>
          </section>

          {/* ═══ 07 — TALK ════════════════════════════════════ */}
          <section id="talk" data-dark-section>
            <div className="talk-main">
              <div className="sec-tag" data-reveal>07 — TALK</div>
              <div className="talk-giant" data-reveal>
                <a href="mailto:darshan99806@gmail.com">SAY HI.</a>
              </div>
              <div className="talk-sub" data-reveal>OPEN TO FREELANCE · COLLABORATIONS · INTERESTING PROBLEMS</div>
              <div className="talk-actions" data-reveal>
                <a className="pill solid" href="mailto:darshan99806@gmail.com">DARSHAN99806@GMAIL.COM</a>
                <a className="pill ghost" href="https://discord.com/users/darshan_66" target="_blank" rel="noopener noreferrer">DISCORD — darshan_66</a>
                <a className="pill ghost" href="/Darshan-Resume.pdf" target="_blank">RESUME ↗</a>
              </div>
              <div className="talk-foot" data-reveal>DARSHAN — PORTFOLIO — 2026 · STAY FAR FROM TROUBLE</div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}