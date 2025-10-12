import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import ProjectCard from '../components/ProjectCard';
import SkillBlock from '../components/SkillBlock';
import Logo from '../components/Logo';
export default function Home() {
  const featuredProject = {
    title: 'Phish Guard',
    description: 'Detect Email phishing using AI',
    technologies: ['React', 'JavaScript', 'cohereAi'],
    liveUrl: '#',
    githubUrl: '#',
    image: '/project-placeholder.png',
  };
  return (
    <div className="w-full min-h-screen bg-background">
      {/* Hero Section */}
      <section className="px-4 py-8 md:max-w-[1024px] md:mx-auto md:py-24 relative">
        {/* Mobile Layout */}
        <div className="md:hidden">
          <h1 className="text-[32px] font-semibold leading-tight mb-8 font-mono">
            Darshan is a <span className="text-primary">web designer</span> and <span className="text-primary">front-end developer</span>
          </h1>
          <p className="text-gray text-base leading-relaxed mb-8 w-full max-w-[328px]">
            He crafts responsive websites where technologies meet creativity
          </p>
          
          {/* Decorative Logo */}
          <div className="absolute left-[22px] top-[397.6px] w-[104px] h-[104px] z-0">
            <Logo className="w-full h-full opacity-20" />
          </div>
          
          {/* Profile Image */}
          <div className="flex justify-center mb-8 relative z-20">
            <div className="w-[198px] h-[297px] relative">
              <img 
                src="/prosvg.svg" 
                alt="Darshan - Web Designer and Full-Stack Developer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Status Badge */}
          <div className="bg-background border border-gray p-2 flex items-center gap-2 w-full max-w-[320px] mx-auto mb-8">
            <div className="w-4 h-4 bg-primary border border-primary"></div>
            <p className="text-gray text-base font-medium">
              Currently working on <span className="font-bold">Freelance</span>
            </p>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:grid md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-8">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight">
              <span className="whitespace-nowrap">Darshan is a <span className="text-primary">web designer</span> and</span>
              <br />
              <span className="text-primary">full-stack developer</span>
            </h1>
            <p className="text-gray text-base leading-relaxed">
              He crafts responsive websites where technologies meet creativity
            </p>
            <Link
              to="/contact"
              className="border border-primary px-4 py-2 text-white text-base font-medium hover:bg-primary/10 transition-colors w-fit"
            >
              Contact me!!
            </Link>
          </div>
          <div className="relative flex justify-center items-center">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-24 h-24">
              <Logo className="w-full h-full opacity-20" />
            </div>
            {/* Profile image - positioned to overlap through status bar */}
            <div className="relative w-full max-w-[400px] aspect-square flex items-center justify-center z-20">
              <img 
                src="/prosvg.svg" 
                alt="Darshan - Web Designer and Full-Stack Developer"
                className="w-full h-full object-contain"
                onError={(e) => {
                  // Fallback to placeholder if image fails to load
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              {/* Fallback placeholder */}
              <div className="w-full h-full bg-gray/20 flex items-center justify-center" style={{display: 'none'}}>
                <Logo className="w-32 h-32 opacity-30" />
                <span className="absolute text-gray text-sm">Add profile.jpg</span>
              </div>
            </div>
            {/* Status badge - positioned to be overlapped by image */}
            <div className="absolute bottom-5 left-0 right-0 mx-auto max-w-[350px] bg-background border border-gray p-2 flex items-center gap-2 z-10">
              <div className="w-4 h-4 bg-primary border border-primary"></div> 
              <p className="text-gray text-sm">
                Currently working on <span className="font-bold">Freelance</span>
              </p>
            </div>
          </div>
        </div>
        {/* Background decorations */}
      </section>
      {/* Projects Section */}
      <section className="px-4 py-8 md:max-w-[1024px] md:mx-auto md:py-16 relative">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0 mb-8 md:mb-12">
          <SectionTitle title="Projects" />
          <Link to="/projects" className="text-white text-sm md:text-base font-medium hover:text-primary transition-colors whitespace-nowrap">
            View all ~~~&gt;
          </Link>
        </div>
        <div className="flex justify-start">
          <ProjectCard project={featuredProject} />
        </div>
      </section>
      {/* Skills Section */}
      <section className="px-4 py-8 md:max-w-[1024px] md:mx-auto md:py-16 relative">
        <div className="mb-8 md:mb-12">
          <SectionTitle title="Skills" />
        </div>
        {/* Mobile: Single Column, Desktop: Asymmetrical Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <SkillBlock
            title="Languages"
            skills={[['TypeScript', 'Lua', 'Python', 'JavaScript', 'C']]}
            className="lg:col-span-1"
          />
          <SkillBlock
            title="Databases"
            skills={[['SQLite', 'PostgreSQL', 'Mongo']]}
            className="lg:col-span-1"
          />
          <SkillBlock
            title="Tools"
            skills={[['VSCode', 'Neovim', 'cursor', 'Figma', 'firebase studio', 'cloudflare', 'Cohere', 'Devin', 'Docker', 'flowith', 'Genspark', 'Google AI Studio', 'Canva', 'locofy', 'Lovable', 'Perplexity', 'Phase', 'Phind', 'bolt.new', 'Phase', 'PostHog', 'replit', 'Rocket', 'stackblitz', 'webcontainers', 'Ollama', 'n8n', 'Automa', 'GitLab', 'Directus']]}
            className="md:col-span-2 lg:col-span-2 lg:row-span-2"
          />
          <SkillBlock
            title="Frameworks"
            skills={[['React', 'Vue', 'flask', 'FastAPI']]}
            className="lg:col-span-1"
          />
          <SkillBlock
            title="Other"
            skills={[['HTML', 'CSS', 'REST', 'Jinja']]}
            className="lg:col-span-1"
          />
          <SkillBlock
            title="Cloud & DevOps"
            skills={[['AWS', 'Vercel', 'Netlify', 'Railway', 'Heroku', 'GitHub Actions', 'CI/CD', 'Docker']]}
            className="lg:col-span-1 -mt-6" // see add mt to is align with other blocks
          />
          <SkillBlock
            title="Design & UI/UX"
            skills={[['Figma', 'Tailwind CSS', 'Material-UI', 'Responsive Design', 'Adobe XD', 'Canva']]}
            className="lg:col-span-1 -mt-6"
          />
        </div>
        {/* Decorations */}
      </section>
      {/* About Section */}
      <section className="max-w-[1024px] mx-auto px-4 py-16 relative">
        <div className="mb-12">
          <SectionTitle title="about-me" />
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="flex flex-col gap-6">
            <p className="text-gray text-base leading-relaxed">
              Hello, i'm Darshan!
            </p>
            <p className="text-gray text-base leading-relaxed">
              I'm a self-taught front-end developer based in Banglore, India. I can develop responsive
              websites from scratch and raise them into modern user-friendly web experiences.
            </p>
            <p className="text-gray text-base leading-relaxed">
              Transforming my creativity and knowledge into websites has been my passion for over a year.
              I have been helping various clients to establish their presence online. I always strive to
              learn about the newest technologies and frameworks.
            </p>
            <Link
              to="/about"
              className="border border-primary px-4 py-2 text-white text-base font-medium hover:bg-primary/10 transition-colors w-fit"
            >
              Read more -&gt;
            </Link>
          </div>
          <div className="relative flex justify-center items-center">
            {/* Image placeholder */}
            <div className="w-full max-w-[300px] aspect-square bg-gray/20 flex items-center justify-center">
              <Logo className="w-24 h-24 opacity-30" />
            </div>
          </div>
        </div>
        {/* Decorations */}
      </section>
      {/* Contact Section */}
      <section className="max-w-[1024px] mx-auto px-4 py-16 relative">
        <div className="mb-12">
          <SectionTitle title="contacts" />
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-gray text-base leading-relaxed">
              I'm interested in freelance opportunities. However, if you have other request or question,
              don't hesitate to contact me
            </p>
          </div>
          <div className="border border-gray p-4 flex flex-col gap-4">
            <h3 className="text-white text-base font-semibold">Message me here</h3>
            <div className="flex flex-col gap-2">
              <a
                href="https://discord.com/users/darshan_66"
                className="flex items-center gap-2 text-gray hover:text-white transition-colors"
              >
                <svg
                  viewBox="0 0 32 32"
                  fill="currentColor"
                  className="w-8 h-8"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M25.12 7.945C23.55 7.22 21.875 6.69 20.125 6.395C19.89 6.81 19.615 7.36 19.425 7.795C17.55 7.52 15.695 7.52 13.845 7.795C13.655 7.36 13.375 6.81 13.135 6.395C11.385 6.69 9.705 7.225 8.135 7.95C5.065 12.52 4.24 16.985 4.64 21.385C6.755 22.965 8.81 23.92 10.835 24.545C11.34 23.86 11.79 23.13 12.18 22.36C11.44 22.08 10.73 21.74 10.055 21.345C10.23 21.215 10.4 21.08 10.565 20.94C14.365 22.645 18.5 22.645 22.25 20.94C22.42 21.08 22.59 21.215 22.76 21.345C22.08 21.745 21.37 22.08 20.63 22.365C21.02 23.13 21.465 23.86 21.975 24.55C24.005 23.925 26.06 22.97 28.17 21.385C28.635 16.34 27.355 11.92 25.12 7.945ZM12.24 18.79C11.095 18.79 10.145 17.71 10.145 16.385C10.145 15.06 11.07 13.975 12.24 13.975C13.41 13.975 14.36 15.055 14.335 16.385C14.335 17.71 13.41 18.79 12.24 18.79ZM20.57 18.79C19.425 18.79 18.475 17.71 18.475 16.385C18.475 15.06 19.4 13.975 20.57 13.975C21.74 13.975 22.69 15.055 22.665 16.385C22.665 17.71 21.745 18.79 20.57 18.79Z" />
                </svg>
                <span>darshan_66</span>
              </a>
              <a
                href="mailto:darshan99806@gmail.com"
                className="flex items-center gap-2 text-gray hover:text-white transition-colors"
              >
                <svg
                  viewBox="0 0 32 32"
                  fill="currentColor"
                  className="w-8 h-8"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M26 6H6C4.895 6 4.01 6.895 4.01 8L4 24C4 25.105 4.895 26 6 26H26C27.105 26 28 25.105 28 24V8C28 6.895 27.105 6 26 6ZM26 10L16 16L6 10V8L16 14L26 8V10Z" />
                </svg>
                <span>darshan99806@gmail.com</span>
              </a>
            </div>
          </div>
        </div>
        {/* Decorations */}
      </section>
    </div>
  );
}
