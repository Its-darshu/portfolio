import { showProject } from './ProjectOverlay';

export default function ProjectCard({ project }) {
  return (
    <article className={`pcard grid${project.wip ? ' wip' : ''}`}>
      <div className="pcard-top">
        <span>{project.num} / {project.name}</span>
        <span className="yr">{project.wip ? '● IN PROGRESS' : project.yr}</span>
      </div>
      <h3 className="pcard-name">{project.name}</h3>
      <p className="pcard-desc">{project.desc}</p>
      <div className="pcard-tags">{project.tags.map(t => <span className="wtag" key={t}>{t}</span>)}</div>
      <div className="pcard-foot">
        <button className="pill solid" onClick={() => showProject(project)}>DETAILS +</button>
        <a className="pill" href={project.link} target="_blank" rel="noopener noreferrer">GITHUB ↗</a>
        {project.demo && project.demo !== project.link && (
          <a className="pill" href={project.demo} target="_blank" rel="noopener noreferrer">LIVE ↗</a>
        )}
      </div>
    </article>
  );
}