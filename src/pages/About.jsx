import SectionTitle from '../components/SectionTitle';
import SkillBlock from '../components/SkillBlock';
import Logo from '../components/Logo';
export default function About() {
  const funFacts = [
    'I like rainy days more than summer',
    'I love spending time with my dog',
    'I like biriyani and kababs',
    'I was in Egypt, Poland and Turkey',
    'My favorite series is Breaking Bad',
    'I am still in school',
    "Still single, but at least my Nvidia RTX never leaves me.",
  ];
  return (
    <div className="w-full min-h-screen bg-background">
      {/* Page Title */}
      <section className="max-w-[1024px] mx-auto px-4 py-8">
        <div className="flex items-start text-3xl font-semibold mb-4">
          <span className="text-primary">/</span>
          <span className="text-white">about-me</span>
        </div>
        <p className="text-white text-base">Who am i?</p>
      </section>
      {/* About Section */}
      <section className="max-w-[1024px] mx-auto px-4 py-16 relative">
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
          </div>
          <div className="relative flex justify-center items-center">
            {/* Image placeholder */}
            <div className="w-full max-w-[350px] aspect-[3/4] bg-gray/20 flex items-center justify-center">
              <Logo className="w-24 h-24 opacity-30" />
            </div>
          </div>
        </div>
        {/* Decorations */}
      </section>
      {/* Skills Section */}
      <section className="max-w-[1024px] mx-auto px-4 py-16 relative">
        <div className="mb-12">
          <h2 className="flex items-start font-medium text-3xl">
            <span className="text-primary">#</span>
            <span className="text-white">skills</span>
          </h2>
        </div>
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
      {/* Fun Facts Section */}
      <section className="max-w-[1024px] mx-auto px-4 py-16 relative">
        <div className="mb-12">
          <h2 className="flex items-start font-medium text-3xl">
            <span className="text-primary">#</span>
            <span className="text-white">my-fun-facts</span>
          </h2>
        </div>
        <div className="flex flex-col gap-4">
          {/* First row */}
          <div className="flex flex-wrap gap-4">
            <div className="border border-gray p-2 inline-block">
              <p className="text-gray text-base">{funFacts[0]}</p>
            </div>
            <div className="border border-gray p-2 inline-block">
              <p className="text-gray text-base">{funFacts[1]}</p>
            </div>
          </div>
          {/* Second row */}
          <div className="flex flex-wrap gap-4">
            <div className="border border-gray p-2 inline-block">
              <p className="text-gray text-base">
                I like <span className="text-white">biriyani</span> and{' '}
                <span className="text-white">kababs</span>
              </p>
            </div>
            <div className="border border-gray p-2 inline-block">
              <p className="text-gray text-base">
                I was in <span className="text-white">Egypt</span>,{' '}
                <span className="text-white">Poland</span> and{' '}
                <span className="text-white">Turkey</span>
              </p>
            </div>
          </div>
          {/* Third row */}
          <div className="flex flex-wrap gap-4">
            <div className="border border-gray p-2 inline-block">
              <p className="text-gray text-base">
                My favorite series is <span className="text-white">Breaking Bad</span>
              </p>
            </div>
            <div className="border border-gray p-2 inline-block">
              <p className="text-gray text-base">{funFacts[5]}</p>
            </div>
          </div>
          {/* Fourth row */}
          <div className="flex flex-wrap gap-4">
            <div className="border border-gray p-2 inline-block">
              <p className="text-gray text-base">{funFacts[6]}</p>
            </div>
          </div>
        </div>
        {/* Decorations */}
        <div className="absolute top-0 right-0 flex flex-col gap-4">
          <div className="w-28 h-28 relative">
            <Logo className="w-full h-full opacity-20" />
          </div>
        </div>
      </section>
    </div>
  );
}
