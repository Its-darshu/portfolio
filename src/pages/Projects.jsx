import SectionTitle from '../components/SectionTitle';
import ProjectCard from '../components/ProjectCard';
export default function Projects() {
  const completeProjects = [
    {
      title: 'Phish Guard',
      description: 'Detect Email phishing using AI',
      technologies: ['React', 'JavaScript', 'cohereAi'],
      liveUrl: '#',
      githubUrl: 'https://github.com/Its-darshu/phishing-detector',
      image: '/11.svg',
    },

    {
      title: 'DarkSphere',
      description: 'A place to share your darkhumor memes anonymously',
      technologies: ['React'],
      liveUrl: 'https://darksphere.vercel.app/',
      githubUrl: 'https://github.com/Its-darshu/DarkSphere',
      image: '/darksphere.svg',
    },

    {
      title: 'Sullia auto',
      description: 'A platform service to call immediate auto in sullia',
      technologies: ['React'],
      liveUrl: 'https://sulliaauto.vercel.app/',
      githubUrl: 'https://github.com/Its-darshu/auto-rickshaw',
      image: '/sullia-auto.svg',
    },

    {
      title: 'SmartQ',
      description: 'A platform service to manage hospital queues effectively',
      technologies: ['React', 'Flask', 'Firebase'],
      liveUrl: 'https://smartq-patient.onrender.com/',
      githubUrl: 'https://github.com/dayanandaks4/HACTHON_SIT',
      image: '/smartq.svg',
    },

    {
      title: 'AI tutor',
      description: 'Ai powered tutor with generates text, voice, image at same time',
      technologies: ['React', 'Flask', 'Firebase', 'unsplashApi',],
      liveUrl: '',
      githubUrl: 'https://github.com/Its-darshu/AiTutor',
      image: '/aitutor.svg',
    },

  ];
  const smallProjects = [
    {
      title: 'Discord quest',
      description: 'A JavaScript script to automatically complete Discord quests by simulating game activity, video watching, or streaming.',
      technologies: ['JS'],
      githubUrl: 'https://github.com/Its-darshu/discord-quest',
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
