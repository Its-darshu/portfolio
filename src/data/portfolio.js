export const GITHUB_USER = 'Its-darshu';

export const PROJECTS = [
  {
    num: '01', yr: '2025', name: 'PHISH GUARD', wip: false,
    desc: 'Detect email phishing using AI — a standalone detector that scores suspicious messages before they trick anyone.',
    tags: ['REACT', 'JAVASCRIPT', 'COHERE AI'],
    link: 'https://github.com/Its-darshu/phishing-detector',
    demo: 'https://github.com/Its-darshu/phishing-detector',
    lede: 'Phishing in boxes is bigger and better-worded than ever. <b>Phish Guard</b> runs suspicious emails through an AI detector and tells you — fast, and plain — whether that invoice is a trap.',
    feats: [
      ['AI SENTIMENT','Cohere-powered text analysis flags phishing patterns in the message body.'],
      ['QUICK SCAN','Paste an email and get an instant verdict with a confidence read.'],
      ['REACT FRONTEND','A clean, fast interface built with React.'],
      ['FOCUSED SCOPE','Built to solve one problem properly: catching the scam before the click.'],
    ],
    stack: 'React · JavaScript · Cohere AI · Vite'
  },
  {
    num: '02', yr: '2024', name: 'DARKSPHERE', wip: false,
    desc: 'A place to share your dark-humor memes anonymously — no accounts, no judgement, just memes.',
    tags: ['REACT'],
    link: 'https://github.com/Its-darshu/DarkSphere',
    demo: 'https://darksphere.vercel.app/',
    lede: 'The web lost its <b>uncensored corners</b>. DarkSphere brings one back: anonymous dark-humor memes, zero sign-up, comment freely. What happens in the sphere stays in the sphere.',
    feats: [
      ['FULLY ANONYMOUS','No accounts, no handles — just post and vibe.'],
      ['MEME FEED','A frictionless feed for uploading and browsing dark humor.'],
      ['ONE-CLICK SHARE','Sends a meme to anyone with a copied link.'],
      ['DEPLOYED','Live on Vercel and battle-tested with a real community.'],
    ],
    stack: 'React · Vite · Vercel · Cloud Firestore'
  },
  {
    num: '03', yr: '2024', name: 'SULLIA AUTO', wip: false,
    desc: 'A platform service to call an auto in Sullia in one tap — connecting riders with nearby auto drivers.',
    tags: ['REACT'],
    link: 'https://github.com/Its-darshu/auto-rickshaw',
    demo: 'https://sulliaauto.vercel.app/',
    lede: 'In Sullia, you used to wait on a corner and hope. Now you <b>request a ride in one tap</b> — a simple, local-first platform that matches riders with nearby autos.',
    feats: [
      ['ONE-TAP REQUEST','Full route from request to rumble — no app-store friction.'],
      ['LOCAL FIRST','Purpose-built for Sullia and its drivers.'],
      ['RIDER UX','Minimal interface that anyone can drive (literally and figuratively).'],
    ],
    stack: 'React · Vite · Vercel'
  },
  {
    num: '04', yr: '2024', name: 'SMARTQ', wip: false,
    desc: 'A platform service to manage hospital queues effectively — patients wait digitally, staff stay organized.',
    tags: ['REACT', 'FLASK', 'FIREBASE'],
    link: 'https://github.com/dayanandaks4/HACTHON_SIT',
    demo: 'https://smartq-patient.onrender.com/',
    lede: 'Nobody wants to sit in a hospital corridor for two hours. <b>SmartQ</b> digitizes the queue — patients book, staff manage, and everyone knows exactly where the line stands.',
    feats: [
      ['DIGITAL QUEUE','Live queue position that patients can see on their phone.'],
      ['SMARTPHONE-FIRST','Patient app built for a front-desk world.'],
      ['HACKATHON-DRIVEN','Built fast for SIT Hackathon with Firebase backing.'],
    ],
    stack: 'React · Flask · Firebase · Render'
  },
  {
    num: '05', yr: '2025', name: 'AI TUTOR', wip: false,
    desc: 'An AI tutor that generates text, voice, and images at the same time — one answer, in every format.',
    tags: ['TYPESCRIPT', 'FLASK', 'GEMINI', 'HF-FLUX'],
    link: 'https://github.com/Its-darshu/Personal-Tutor',
    lede: 'You ask a question and get <b>the complete package</b>: a full explanation, a voice read-out, and a visual — all generated in one shot. A tutor that answers the way you actually learn.',
    feats: [
      ['MULTI-MODAL ANSWERS','Text + voice + image from a single prompt.'],
      ['GEMINI-POWERED','LLM brain driving clear, structured explanations.'],
      ['HF-FLUX IMAGES','Visuals generated on the fly to support the answer.'],
      ['TWO-LAYER STACK','TypeScript frontend talking to a Python Flask backend.'],
    ],
    stack: 'TypeScript · Flask · Gemini · Hugging Face (Flux)'
  },
  {
    num: '06', yr: '2025', name: 'VISORA', wip: false,
    desc: 'Powerful AI tools for text, image, voice, and audio processing — one toolkit, every medium.',
    tags: ['TYPESCRIPT', 'FLASK', 'GEMINI', 'HF-FLUX'],
    link: 'https://github.com/Its-darshu/Visora',
    lede: 'A growing suite of <b>AI tools under one roof</b> — process text, generate images, work with voice and audio, all from one clean interface.',
    feats: [
      ['MULTI-MEDIUM SUITE','Text, image, voice, and audio tools in one place.'],
      ['PRO-GRADE MODELS','Gemini Pro + HF Flux driving the heavy lifting.'],
      ['UNIFIED INTERFACE','One design language across every tool.'],
      ['SHIPPING FAST','New capabilities landing periodically.'],
    ],
    stack: 'TypeScript · Flask · Gemini Pro · Hugging Face (Flux)'
  },
  {
    num: '07', yr: '2025', name: 'DISCORD QUEST', wip: false, small: true,
    desc: 'A JavaScript script that auto-completes Discord quests — simulates game activity, video watching, or streaming.',
    tags: ['JAVASCRIPT', 'NODE.JS'],
    link: 'https://github.com/Its-darshu/discord-quest',
    lede: 'A tiny but satisfying utility: a <b>JavaScript script</b> that simulates activity so your Discord quests complete themselves while you do literally anything else.',
    feats: [
      ['AUTO-ACTIVITY','Simulates playing, watching, or streaming to clear quests.'],
      ['ZERO FRICTION','Run-and-forget script, no UI needed.'],
      ['GREAT FIRST SCRIPT','Proof that even small tools are worth shipping.'],
    ],
    stack: 'JavaScript · Node.js'
  },
];

export const SKILLS = [
  ['JAVASCRIPT', 'LANGUAGE'], ['TYPESCRIPT', 'LANGUAGE'], ['PYTHON', 'LANGUAGE'], ['LUA', 'LANGUAGE'], ['C', 'LANGUAGE'], ['SQL', 'LANGUAGE'],
  ['REACT', 'FRONTEND'], ['VUE', 'FRONTEND'], ['TAILWIND', 'FRONTEND'], ['MATERIAL UI', 'FRONTEND'],
  ['FLASK', 'BACKEND'], ['FASTAPI', 'BACKEND'], ['JINJA', 'BACKEND'], ['REST', 'BACKEND'],
  ['SQLITE', 'DATA'], ['POSTGRESQL', 'DATA'], ['MONGO', 'DATA'], ['FIREBASE', 'DATA'],
  ['GEMINI', 'AI'], ['COHERE AI', 'AI'], ['OLLAMA', 'AI'], ['HF-FLUX', 'AI'],
  ['GIT', 'TOOLS'], ['DOCKER', 'TOOLS'], ['VERCEL', 'TOOLS'], ['NETLIFY', 'TOOLS'], ['AWS', 'TOOLS'], ['FIGMA', 'TOOLS'], ['N8N', 'TOOLS'],
];

export const TERMINAL_COMMANDS = {
  whoami: () => [
    { type: 'key', text: 'DARSHAN' },
    { type: 'out', text: 'Web Designer · Full-Stack Developer · Bangalore, IN' },
    { type: 'out', text: 'Currently open to freelance & collabs' },
  ],
  skills: () => [
    { type: 'key', text: 'LANGUAGES    JavaScript · TypeScript · Python · Lua · C · SQL' },
    { type: 'out', text: 'FRONTEND     React · Vue · Tailwind CSS · Material UI' },
    { type: 'out', text: 'BACKEND      Flask · FastAPI · Jinja · REST' },
    { type: 'out', text: 'DATA         SQLite · PostgreSQL · MongoDB · Firebase' },
    { type: 'out', text: 'TOOLS        Git · Docker · Vercel · Netlify · Figma · n8n' },
  ],
  projects: () => [
    { type: 'key', text: '[1] Phish Guard — AI email phishing detector' },
    { type: 'key', text: '[2] DarkSphere — anonymous dark-humor memes' },
    { type: 'key', text: '[3] Sullia Auto — one-tap auto booking for Sullia' },
    { type: 'key', text: '[4] SmartQ — hospital queue manager' },
    { type: 'key', text: '[5] AI Tutor — text + voice + image answers' },
    { type: 'key', text: '[6] Visora — multi-medium AI toolkit' },
    { type: 'dim', text: "goto /projects, or type 'work' to jump" },
  ],
  education: () => [
    { type: 'key', text: 'SELF-TAUGHT' },
    { type: 'out', text: 'Web development · full-stack · AI tooling' },
    { type: 'out', text: 'Learning by shipping, mostly' },
    { type: 'gap' },
    { type: 'key', text: 'STILL IN SCHOOL' },
    { type: 'out', text: 'Balancing classes with freelance and side projects' },
  ],
  experience: () => [
    { type: 'key', text: 'Freelance Web Developer · 2024 – present' },
    { type: 'out', text: 'Helping clients establish their presence online with responsive sites' },
    { type: 'gap' },
    { type: 'key', text: 'Indie Builder · DarkSphere / Sullia Auto / SmartQ' },
    { type: 'out', text: 'Shipped live products with real communities' },
  ],
  contact: () => [
    { type: 'key', text: 'Email    darshan99806@gmail.com' },
    { type: 'out', text: 'GitHub   github.com/Its-darshu' },
    { type: 'out', text: 'Discord  darshan_66' },
    { type: 'out', text: 'X        @cookmithick' },
  ],
  interests: () => [
    { type: 'out', text: 'Web design · AI-powered tools · UI/UX' },
    { type: 'out', text: 'Building in public · automating the boring stuff' },
    { type: 'out', text: 'Breaking Bad · biriyani · debugging at 2am' },
  ],
  work: () => window.location.assign('/projects'),
  resume: () => window.open('/Darshan-Resume.pdf', '_blank'),
  sudo: () => [{ type: 'dim', text: 'nice try. this terminal runs on trust.' }],
  clear: () => null,
  help: () => [
    { type: 'dim', text: 'available commands' },
    { type: 'gap' },
    { type: 'out', text: '  whoami      —  who am I?' },
    { type: 'out', text: '  skills      —  technical skills by category' },
    { type: 'out', text: '  projects    —  the shipped pile' },
    { type: 'out', text: '  education   —  how I learned this' },
    { type: 'out', text: '  experience  —  freelance + indie' },
    { type: 'out', text: '  contact     —  get in touch' },
    { type: 'out', text: '  interests   —  what I\'m into' },
    { type: 'out', text: '  work        —  jump to the work section' },
    { type: 'out', text: '  resume      —  open my resume' },
    { type: 'out', text: '  clear       —  clear the terminal' },
  ],
};