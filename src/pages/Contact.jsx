const LINKS = [
  { label: 'EMAIL', value: 'darshan99806@gmail.com', href: 'mailto:darshan99806@gmail.com', solid: true },
  { label: 'GITHUB', value: 'github.com/Its-darshu', href: 'https://github.com/Its-darshu' },
  { label: 'X / TWITTER', value: '@cookmithick', href: 'https://x.com/cookmithick' },
  { label: 'DISCORD', value: 'darshan_66', href: 'https://discord.com/users/darshan_66' },
  { label: 'RESUME', value: 'Darshan-Resume.pdf', href: '/Darshan-Resume.pdf' },
];

export default function Contact() {
  return (
    <>
      <section className="page-head" data-light-section style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="page-head-inner">
          <div className="sec-tag" data-reveal>CONTACT</div>
          <h2 className="sec-giant" style={{ fontFamily: 'var(--ff-fat)', fontSize: 'clamp(3.4rem, 12vw, 11.5rem)', lineHeight: '.88', marginTop: '1.5rem' }} data-reveal>
            LET'S<br />TALK.
          </h2>
          <p className="talk-sub" data-reveal style={{ color: 'var(--ink)', opacity: '.7' }}>
            FREELANCE · COLLABORATIONS · OR JUST SAYING SOMETHING WEIRD
          </p>
        </div>
      </section>

      <section id="stack" data-light-section>
        <div className="stack-inner">
          <div className="sec-tag" data-reveal>WHERE TO FIND ME</div>
          <h2 className="sec-giant" data-reveal>REACH<br />OUT.</h2>
          <div className="stack-grid" data-reveal style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}>
            {LINKS.map(l => (
              <a className="skill" href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" key={l.label} style={{ padding: '2rem 1.4rem', textDecoration: 'none' }}>
                <span style={{ fontFamily: 'var(--ff-fat)', fontSize: '1.9rem' }}>{l.solid ? '❯ ' : '↗ '}{l.label}</span>
                <small>{l.value}</small>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="talk" data-dark-section>
        <div className="talk-main">
          <div className="sec-tag" data-reveal>07 — FINAL WORD</div>
          <div className="talk-giant" data-reveal>
            <a href="mailto:darshan99806@gmail.com">SAY HI.</a>
          </div>
          <div className="talk-sub" data-reveal>RESPONSES FAST · JOKES FASTER</div>
          <div className="talk-actions" data-reveal>
            <a className="pill solid" href="mailto:darshan99806@gmail.com">DARSHAN99806@GMAIL.COM</a>
            <span className="pill ghost" style={{ cursor: 'default' }}>BANGALORE, INDIA</span>
          </div>
        </div>
      </section>
    </>
  );
}