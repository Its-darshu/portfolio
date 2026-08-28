export default function Footer() {
  return (
    <footer className="site-foot" data-dark-section>
      <span>DARSHAN — © 2026 — BUILT WITH INTENT</span>
      <div className="links">
        <a href="https://github.com/Its-darshu" target="_blank" rel="noopener noreferrer">GITHUB</a>
        <a href="https://x.com/cookmithick" target="_blank" rel="noopener noreferrer">X</a>
        <a href="https://discord.com/users/darshan_66" target="_blank" rel="noopener noreferrer">DISCORD</a>
        <a href="mailto:darshan99806@gmail.com">EMAIL</a>
      </div>
      <button className="top-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>BACK TO TOP ↑</button>
    </footer>
  );
}