import SkillBlock from '../components/SkillBlock';

const SKILL_GROUPS = [
  { title: 'Languages', skills: [['TypeScript', 'JavaScript', 'Python', 'Lua', 'C', 'SQL']] },
  { title: 'Frameworks', skills: [['React', 'Vue', 'Flask', 'FastAPI', 'Tailwind']] },
  { title: 'Databases', skills: [['SQLite', 'PostgreSQL', 'Mongo', 'Firebase']] },
  { title: 'Cloud & DevOps', skills: [['AWS', 'Vercel', 'Netlify', 'Railway', 'GitHub Actions', 'Docker']] },
  { title: 'AI Tooling', skills: [['Gemini', 'Cohere AI', 'HF-Flux', 'Ollama', 'n8n']] },
  { title: 'Design & Tools', skills: [['Figma', 'Neovim', 'Cursor', 'Canva', 'Directus']] },
];

const FUN_FACTS = [
  'I like rainy days more than summer',
  'I love spending time with my dog',
  'I like biriyani and kababs',
  'I was in Egypt, Poland and Turkey',
  'My favorite series is Breaking Bad',
  'I am still in school',
  'My Nvidia RTX never leaves my side',
];

export default function About() {
  return (
    <>
      <section className="page-head" data-light-section>
        <div className="page-head-inner">
          <div className="sec-tag">ABOUT</div>
          <h2 className="sec-giant" style={{ marginBottom: '.4rem' }}>WHO.<br />AM I?</h2>
          <p style={{ fontSize: '.78rem', letterSpacing: '.14em', textTransform: 'uppercase', opacity: '.65', marginBottom: '2.4rem' }}>
            self-taught · based in Bangalore · shipping since 2024
          </p>
        </div>
      </section>

      <section className="page-head" style={{ paddingTop: '1rem' }} data-light-section>
        <div className="page-head-inner">
          <div className="about-grid" style={{ alignItems: 'start' }}>
            <div data-reveal>
              <p className="about-lede" style={{ maxWidth: '52ch' }}>Hello, I'm Darshan! A self-taught developer who can take a website from a blank page to a modern, user-friendly web experience.</p>
              <p className="about-lede" style={{ maxWidth: '52ch' }}>What started as a throwaway project turned into a freelance practice — I've been helping clients across Bangalore build their presence online, while quietly turning AI tools into things that actually do work.</p>
              <p className="about-lede" style={{ maxWidth: '52ch' }}>I'd rather ship something imperfect tonight than perfect next month.</p>
              <div className="gh-cta">
                <a className="pill solid" href="/Darshan-Resume.pdf" target="_blank">RESUME ↗</a>
                <a className="pill" href="mailto:darshan99806@gmail.com">SAY HI →</a>
              </div>
            </div>
            <div data-reveal style={{ transitionDelay: '.1s' }}>
              <div className="panel">
                <div className="panel-head"><span>FUN FACTS</span><span>✦</span></div>
                <div className="fact-list" style={{ borderTop: '2px solid var(--cream-dim)' }}>
                  {FUN_FACTS.map(f => <div className="fact" key={f}><b>✦</b><span style={{ textTransform: 'none', letterSpacing: '.02em' }}>{f}</span></div>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="stack" data-light-section>
        <div className="stack-inner">
          <div className="sec-tag" data-reveal>SKILLS</div>
          <h2 className="sec-giant" data-reveal>THE<br />ARSENAL.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-reveal>
            {SKILL_GROUPS.map(g => <SkillBlock key={g.title} title={g.title} skills={g.skills} />)}
          </div>
        </div>
      </section>

      <section id="talk" data-dark-section>
        <div className="talk-main">
          <div className="sec-tag" data-reveal>LET'S BUILD</div>
          <div className="talk-giant" data-reveal>
            <a href="mailto:darshan99806@gmail.com">SAY HI.</a>
          </div>
          <div className="talk-sub" data-reveal>FREELANCE · COLLABORATIONS · INTERESTING PROBLEMS</div>
          <div className="talk-actions" data-reveal>
            <a className="pill solid" href="mailto:darshan99806@gmail.com">DARSHAN99806@GMAIL.COM</a>
            <a className="pill ghost" href="https://discord.com/users/darshan_66" target="_blank" rel="noopener noreferrer">DISCORD — darshan_66</a>
          </div>
        </div>
      </section>
    </>
  );
}