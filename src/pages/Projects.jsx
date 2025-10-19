import SectionTitle from '../components/SectionTitle';
import ProjectCard from '../components/ProjectCard';
export default function Projects() {
  const completeProjects = [
    {
      title: 'Phish Guard',
      description: 'Detect Email phishing using AI',
      technologies: ['React', 'JavaScript', 'cohereAi'],
      liveUrl: '#',
      githubUrl: '#',
      image: '/11.svg',
    },
  ];
  const smallProjects = [
    {
      title: 'Bot boilerplate',
      description: 'Start creating scalable discord.js bot with typescript in seconds',
      technologies: ['Discord.js', 'TS', 'JS'],
      githubUrl: '#',
    },
    {
      title: 'My blog',
      description: 'Front-end of my future blog website written in vue',
      technologies: ['VUE', 'CSS', 'JS'],
      githubUrl: '#',
    },
    {
      title: 'Chess pro',
      description: 'Figma landing page about service for viewing chess tournaments',
      technologies: ['Figma'],
      figmaUrl: '#',
    },
    {
      title: 'Crash protect website',
      description: 'Figma template for website about anti-raid, anti-crash discord bot',
      technologies: ['Figma'],
      figmaUrl: '#',
    },
    {
      title: 'CSS experiments',
      description: 'Collection of my different little projects in css',
      technologies: ['HTML', 'CSS'],
      liveUrl: '#',
    },
    {
      title: 'Web Dev nvim config',
      description: 'Config for neovim perfect for web developer',
      technologies: ['Lua', 'NeoVim'],
      githubUrl: '#',
    },
    {
      title: 'Ooku',
      description: 'Simple link shortener with auth',
      technologies: ['Python', 'Quart', 'HTML'],
      liveUrl: '#',
    },
    {
      title: 'School website',
      description: 'Figma template website for my school',
      technologies: ['Figma'],
      figmaUrl: '#',
    },
  ];
  return (
    <div className="w-full min-h-screen bg-background">
      {/* Page Title */}
      <section className="max-w-[1024px] mx-auto px-4 py-8">
        <div className="flex items-start text-3xl font-semibold mb-4">
          <span className="text-primary">/</span>
          <span className="text-white">projects</span>
        </div>
        <p className="text-white text-base">List of my projects</p>
      </section>
      {/* Complete Apps */}
      <section className="max-w-[1024px] mx-auto px-4 py-16 relative">
        <div className="mb-12">
          <h2 className="flex items-start font-medium text-3xl">
            <span className="text-primary">#</span>
            <span className="text-white">complete-apps</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {completeProjects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
        {/* Decorations */}
      </section>
      {/* Small Projects */}
      <section className="max-w-[1024px] mx-auto px-4 py-16 relative">
        <div className="mb-12">
          <h2 className="flex items-start font-medium text-3xl">
            <span className="text-primary">#</span>
            <span className="text-white">small-projects</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {smallProjects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
        {/* Decorations */}
      </section>
    </div>
  );
}
