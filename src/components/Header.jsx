import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <header id="hdr">
      <Link to="/" className="hdr-logo" onClick={() => window.scrollTo(0, 0)}>DARSHAN*</Link>
      <div className="hdr-links">
        <Link to="/" onClick={() => window.scrollTo(0, 0)} style={isActive('/') ? { opacity: 1 } : undefined}>HOME</Link>
        <Link to="/projects" onClick={() => window.scrollTo(0, 0)}>WORK</Link>
        <Link to="/about" onClick={() => window.scrollTo(0, 0)}>ABOUT</Link>
        <Link to="/blog" onClick={() => window.scrollTo(0, 0)}>BLOG</Link>
        <Link to="/contact" onClick={() => window.scrollTo(0, 0)}>CONTACT</Link>
        <a href="https://github.com/Its-darshu" target="_blank" rel="noopener noreferrer">GITHUB ↗</a>
      </div>
    </header>
  );
}