import ProjectCard from '../components/ProjectCard';
import { PROJECTS } from '../data/portfolio';

export default function Projects() {
  const main = PROJECTS.filter(p => !p.small);
  const small = PROJECTS.filter(p => p.small);
  return (
    <>
      <section className="page-head" data-light-section>
        <div className="page-head-inner">
          <div className="sec-tag">WORK</div>
          <h2 className="sec-giant" style={{ marginBottom: '.4rem' }}>SHIPPED.</h2>
          <p style={{ fontSize: '.78rem', letterSpacing: '.14em', textTransform: 'uppercase', opacity: '.65', marginBottom: '2.4rem' }}>
            Six products live · one tool brewing
          </p>
        </div>
      </section>

      <section id="work" style={{ paddingTop: '2.5rem' }}>
        <div className="work-inner">
          <div className="sec-tag" data-reveal>The Main Pile</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ rowGap: '2.6rem' }}>
            {main.map(p => <ProjectCard key={p.num} project={p} />)}
          </div>

          {small.length > 0 && (
            <>
              <div className="sec-tag" data-reveal style={{ marginTop: '6rem' }}>Small Things</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ rowGap: '2.6rem' }}>
                {small.map(p => <ProjectCard key={p.num} project={p} />)}
              </div>
            </>
          )}

          <div className="gh-cta" data-reveal>
            <a className="pill solid" href="https://github.com/Its-darshu" target="_blank" rel="noopener noreferrer">MORE ON GITHUB ↗</a>
            <a className="pill" href="mailto:darshan99806@gmail.com">WANT ONE LIKE THIS? →</a>
          </div>
        </div>
      </section>
    </>
  );
}