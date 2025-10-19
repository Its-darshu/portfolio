export default function ProjectCard({ project }) {
  return (
    <div className="border border-gray flex flex-col max-w-[331px] group cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/50 hover:-translate-y-2">
      {/* Project Image */}
      {project.image && (
        <div className="border-b border-gray h-[201px] overflow-hidden bg-gray/5 flex items-center justify-center">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            onError={(e) => {
              console.log('Image failed to load:', project.image);
              e.target.style.display = 'none';
              e.target.parentNode.innerHTML = `<div class="flex items-center justify-center w-full h-full text-gray">Image not found: ${project.image}</div>`;
            }}
          />
        </div>
      )}

      {/* Technologies */}
      <div className="p-2 border-b border-gray flex flex-wrap gap-2">
        {project.technologies.map((tech, index) => (
          <span key={index} className="text-gray text-base">
            {tech}
          </span>
        ))}
      </div>

      {/* Project Details */}
      <div className="p-4 flex flex-col gap-4 transition-colors duration-300 group-hover:bg-background/50">
        <h3 className="text-white text-2xl font-medium transition-colors duration-300 group-hover:text-primary">{project.title}</h3>
        <p className="text-gray text-base transition-colors duration-300 group-hover:text-white">{project.description}</p>

        {/* Action Buttons */}
        <div className="flex gap-4 transform transition-transform duration-300 group-hover:translate-y-1">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-primary px-4 py-2 text-white text-base font-medium hover:bg-primary hover:scale-105 transition-all duration-200 hover:shadow-lg hover:shadow-primary/30"
            >
              Live {'<~'}&gt;
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gray px-4 py-2 text-gray text-base font-medium hover:bg-gray hover:text-background hover:scale-105 transition-all duration-200 hover:shadow-lg hover:shadow-gray/30"
            >
              Cached &gt;=
            </a>
          )}
          {project.figmaUrl && (
            <a
              href={project.figmaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-primary px-4 py-2 text-white text-base font-medium hover:bg-primary hover:scale-105 transition-all duration-200 hover:shadow-lg hover:shadow-primary/30"
            >
              Figma &lt;~&gt;
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
