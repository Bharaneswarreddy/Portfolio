import React, { useState, useEffect, lazy, Suspense } from 'react';
import {
  Github, Linkedin, Mail, ExternalLink, Brain, Database, Code, ChevronDown,
  Sparkles, Sprout, Shield, Cpu, Terminal, ArrowUpRight
} from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';

/* 3D hero is lazy-loaded so the initial page paints fast; Suspense fallback is
   the static gradient behind it, and the component itself no-ops if WebGL is
   unavailable. */
const HeroCanvas = lazy(() => import('./HeroCanvas'));

/* ------------------------------ motion bits ------------------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 44 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] },
  }),
};

function Reveal({ children, i = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      custom={i}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-70px' }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({ eyebrow, title, accent }) {
  return (
    <Reveal className="text-center mb-14">
      <p className="font-display text-xs tracking-[0.35em] uppercase text-cyan-400 mb-4">{eyebrow}</p>
      <h3 className="font-display text-3xl md:text-5xl font-bold text-white">
        {title}{' '}
        <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">{accent}</span>
      </h3>
      <div className="mt-6 mx-auto h-px w-24 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
    </Reveal>
  );
}

/* --------------------------------- data ---------------------------------- */

const projects = [
  {
    title: 'AstraCarrer',
    description: 'AI-powered job application platform with Next.js, Supabase/PostgreSQL, and browser automation — scouts, tailors, and submits applications end-to-end.',
    tech: ['Next.js', 'TypeScript', 'Supabase', 'AI/LLM APIs'],
    metrics: ['AI Automation', 'Live Production'],
    link: 'https://astracarrer.com',
    icon: Sparkles,
    color: 'from-teal-400 to-cyan-500',
    glow: 'group-hover:shadow-[0_0_45px_-8px_rgba(34,211,238,0.45)]',
  },
  {
    title: 'FarmOrg',
    description: 'Smart farm operations and agricultural investment platform — operations tooling plus investment flows over PostgreSQL/Supabase and REST APIs.',
    tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Supabase'],
    metrics: ['Full-Stack', 'REST APIs'],
    icon: Sprout,
    color: 'from-amber-400 to-green-500',
    glow: 'group-hover:shadow-[0_0_45px_-8px_rgba(52,211,153,0.45)]',
  },
  {
    title: 'VANET Malicious Node Detection',
    description: 'Machine learning system achieving 94% accuracy in detecting cyber attacks in vehicular networks using Random Forest classifier.',
    tech: ['Python', 'scikit-learn', 'pandas', 'NumPy'],
    metrics: ['94% Accuracy', '5,000 Nodes', 'F1: 0.94'],
    link: 'https://github.com/Bharaneswarreddy/vanet-ml-detection',
    icon: Brain,
    color: 'from-blue-500 to-cyan-400',
    glow: 'group-hover:shadow-[0_0_45px_-8px_rgba(96,165,250,0.45)]',
  },
  {
    title: 'Secure IoT Communication System',
    description: 'MQTT-based messaging system with Fernet encryption handling 1,000+ messages per minute with 99.5% reliability.',
    tech: ['Python', 'MQTT', 'Cryptography'],
    metrics: ['1,000+ msg/min', '99.5% Reliability'],
    link: 'https://github.com/Bharaneswarreddy/iot-mqtt-secure',
    icon: Cpu,
    color: 'from-violet-500 to-fuchsia-500',
    glow: 'group-hover:shadow-[0_0_45px_-8px_rgba(167,139,250,0.45)]',
  },
  {
    title: 'TA Management System',
    description: 'Full-stack application with role-based access control supporting 200+ concurrent users.',
    tech: ['React', 'Node.js', 'MySQL', 'Docker'],
    metrics: ['200+ Users', '50% Faster'],
    link: 'https://github.com/Bharaneswarreddy/ta-management-system',
    icon: Database,
    color: 'from-emerald-500 to-teal-400',
    glow: 'group-hover:shadow-[0_0_45px_-8px_rgba(52,211,153,0.45)]',
  },
  {
    title: 'Algorithm Performance Analysis',
    description: 'Comparative study demonstrating 95% runtime reduction using optimized algorithms.',
    tech: ['Python', 'Algorithm Design'],
    metrics: ['95% Faster', 'O(n log n)'],
    link: 'https://github.com/Bharaneswarreddy/closest-pair-algorithm',
    icon: Code,
    color: 'from-orange-500 to-rose-500',
    glow: 'group-hover:shadow-[0_0_45px_-8px_rgba(251,146,60,0.45)]',
  },
  {
    title: 'Cloud Security Research',
    description: 'Comprehensive comparative analysis of AWS and GCP security frameworks.',
    tech: ['AWS', 'GCP', 'Security'],
    metrics: ['IAM Analysis', 'Compliance'],
    link: 'https://github.com/Bharaneswarreddy/cloud-security-research',
    icon: Shield,
    color: 'from-indigo-500 to-violet-500',
    glow: 'group-hover:shadow-[0_0_45px_-8px_rgba(129,140,248,0.45)]',
  },
];

const skills = {
  Languages: ['Python', 'JavaScript', 'SQL', 'Java', 'R', 'Go'],
  'ML & Data Science': ['scikit-learn', 'TensorFlow', 'pandas', 'NumPy'],
  'Web Development': ['React', 'Node.js', 'Express', 'HTML5', 'CSS3'],
  'Data & Databases': ['MySQL', 'PostgreSQL', 'Tableau', 'Power BI'],
  'Cloud & DevOps': ['AWS', 'Azure', 'GCP', 'Linux', 'Docker', 'Terraform', 'Git'],
};

const experience = [
  {
    role: 'Linux Server Engineer (Contractor)',
    company: 'Jabil · via Aerotek',
    period: 'Sep 2026 - Present',
    current: true,
    achievements: [
      'Maintain and provision Linux servers, VMs, and virtualization infrastructure',
      'Automate server workflows with scripting and configuration management',
      'Support networking and reliability across production data center systems',
    ],
  },
  {
    role: 'AI Software Engineer Intern',
    company: 'ThinkBubble',
    period: 'May 2026 - Sep 2026',
    achievements: [
      'Built NL-to-Blender 3D pipeline (Flask) with sockets and concurrency handling',
      'Integrated LLM APIs into a production 3D content generation workflow',
      'Shipped a hybrid on-site system used by the design team',
    ],
  },
  {
    role: 'Full-Stack Web Developer Intern',
    company: 'Techvanto Private Limited',
    period: 'Aug 2023 - Sep 2024',
    achievements: [
      'Developed CollegeClue platform serving 10,000+ students',
      'Improved application processing efficiency by 40%',
      'Reduced page load times by 30%',
      'Implemented JWT authentication for 5,000+ users',
    ],
  },
  {
    role: 'Data Engineering Intern',
    company: 'Celebal Technologies',
    period: 'Jun 2023 - Aug 2023',
    achievements: [
      'Processed 500,000+ records weekly using Python and SQL',
      'Improved data quality by 35%',
      'Engineered ETL pipelines reducing manual work by 60%',
      'Created 10+ Tableau dashboards',
    ],
  },
];

/* --------------------------------- layout --------------------------------- */

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scrollScale = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = ['home', 'about', 'projects', 'skills', 'experience', 'contact'];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 120 && rect.bottom >= 120;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#04040c] text-slate-200 font-body overflow-x-clip">
      {/* scroll progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] z-[60] bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500 origin-left"
        style={{ scaleX: scrollScale }}
      />

      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-[#04040c]/70 backdrop-blur-xl border-b border-white/5 shadow-[0_8px_40px_-12px_rgba(34,211,238,0.25)]' : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <button
              onClick={() => scrollToSection('home')}
              className="font-display text-lg font-bold tracking-widest text-white"
            >
              BR<span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">.</span>G
            </button>
            <div className="hidden md:flex gap-8">
              {['home', 'about', 'projects', 'skills', 'experience', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize text-sm tracking-wider transition-all hover:text-cyan-300 ${
                    activeSection === section ? 'text-cyan-300 font-semibold' : 'text-slate-400'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section id="home" className="relative min-h-screen flex items-center px-6">
        {/* static fallback gradient (shows under canvas / if WebGL unavailable) */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(34,211,238,0.12),transparent_55%),radial-gradient(ellipse_at_20%_75%,rgba(139,92,246,0.14),transparent_55%),linear-gradient(#04040c,#04040c)]" />
        <div className="absolute inset-0">
          <Suspense fallback={null}>
            <HeroCanvas />
          </Suspense>
        </div>
        {/* grid overlay */}
        <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(rgba(148,163,184,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.5)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

        <div className="relative z-10 max-w-6xl mx-auto w-full pt-28 pb-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/5 text-cyan-300 text-xs font-display tracking-[0.25em] uppercase mb-8"
          >
            <Terminal size={14} />
            System Online
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-tight max-w-3xl"
          >
            Bharaneswar Reddy
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-500 bg-clip-text text-transparent">
              Gundra
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-display text-sm sm:text-base md:text-lg tracking-[0.18em] text-cyan-300/90 uppercase"
          >
            AI Infrastructure Engineer • Linux Systems Engineer • Cloud Enthusiast
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed"
          >
            MS Computer Science graduate from Florida Atlantic University (3.76 GPA) and Linux Server Engineer at Jabil —
            building ML models with <span className="text-cyan-300 font-semibold">94% accuracy</span>, apps serving{' '}
            <span className="text-cyan-300 font-semibold">10,000+ users</span>, and data pipelines processing{' '}
            <span className="text-cyan-300 font-semibold">500,000+ records</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <button
              onClick={() => scrollToSection('projects')}
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-display text-sm tracking-widest uppercase text-[#04040c] bg-gradient-to-r from-cyan-400 to-violet-500 font-bold hover:shadow-[0_0_35px_-5px_rgba(34,211,238,0.7)] transition-shadow"
            >
              View Work
              <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
            <a
              href="https://github.com/Bharaneswarreddy"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:border-cyan-400/50 hover:shadow-[0_0_25px_-5px_rgba(34,211,238,0.5)] transition-all"
              aria-label="GitHub"
            >
              <Github size={22} />
            </a>
            <a
              href="https://linkedin.com/in/bharaneswarreddygundra"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:border-cyan-400/50 hover:shadow-[0_0_25px_-5px_rgba(34,211,238,0.5)] transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin size={22} />
            </a>
            <a
              href="mailto:bharaneswarreddygundra@gmail.com"
              className="p-3.5 rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:border-cyan-400/50 hover:shadow-[0_0_25px_-5px_rgba(34,211,238,0.5)] transition-all"
              aria-label="Email"
            >
              <Mail size={22} />
            </a>
          </motion.div>

          <button
            onClick={() => scrollToSection('about')}
            className="mt-16 animate-bounce text-slate-500 hover:text-cyan-300 transition-colors"
            aria-label="Scroll down"
          >
            <ChevronDown size={32} />
          </button>
        </div>
      </section>

      {/* About */}
      <section id="about" className="relative py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeading eyebrow="Profile" title="About" accent="Me" />
          <div className="grid md:grid-cols-2 gap-8">
            <Reveal i={0}>
              <div className="h-full p-8 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md hover:border-cyan-400/30 transition-colors">
                <p className="text-lg text-slate-300 leading-relaxed">
                  I'm an infrastructure-focused engineer passionate about building reliable systems — from Linux servers and
                  virtualization to the AI platforms that run on top of them.
                </p>
                <p className="mt-5 text-lg text-slate-400 leading-relaxed">
                  Through industry experience and multiple projects, I've learned that great software isn't just about
                  writing code—it's about understanding user needs and building systems people can rely on.
                </p>
              </div>
            </Reveal>
            <Reveal i={1}>
              <div className="h-full p-8 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md hover:border-violet-400/30 transition-colors">
                <h4 className="font-display text-sm tracking-[0.25em] uppercase text-violet-300 mb-4">Education</h4>
                <p className="text-xl text-white font-semibold">MS in Computer Science</p>
                <p className="text-slate-400 mt-1">Florida Atlantic University</p>
                <p className="mt-3 text-2xl font-bold bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
                  GPA: 3.76/4.0
                </p>
                <p className="text-slate-500 text-sm mt-1">May 2026</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="relative py-24 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(139,92,246,0.08),transparent_60%)]" />
        <div className="relative max-w-6xl mx-auto">
          <SectionHeading eyebrow="Deployments" title="Featured" accent="Projects" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {projects.map((project, index) => {
              const Icon = project.icon;
              return (
                <Reveal key={index} i={index % 3}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                    className={`group h-full rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md overflow-hidden transition-all hover:border-white/25 ${project.glow}`}
                  >
                    <div className={`h-1 bg-gradient-to-r ${project.color}`} />
                    <div className="p-7 space-y-5">
                      <div className="flex items-start justify-between">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${project.color} shadow-lg`}>
                          <Icon className="text-white" size={24} />
                        </div>
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg text-slate-500 hover:text-cyan-300 hover:bg-white/5 transition-colors"
                            aria-label={`Open ${project.title}`}
                          >
                            <ExternalLink size={20} />
                          </a>
                        )}
                      </div>
                      <h4 className="font-display text-lg font-bold text-white">{project.title}</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 text-xs font-medium bg-white/5 border border-white/10 text-slate-300 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="pt-4 border-t border-white/10 flex flex-wrap gap-3">
                        {project.metrics.map((metric, i) => (
                          <span key={i} className="text-xs font-semibold tracking-wide text-cyan-300">
                            {metric}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeading eyebrow="Arsenal" title="Technical" accent="Skills" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {Object.entries(skills).map(([category, items], index) => (
              <Reveal key={index} i={index % 3}>
                <div className="h-full p-7 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md hover:border-cyan-400/30 transition-colors">
                  <h4 className="font-display text-base font-bold tracking-wider text-white mb-5">{category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.85 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05, duration: 0.35 }}
                        className="px-3.5 py-2 text-sm font-medium text-slate-200 rounded-lg border border-white/10 bg-gradient-to-br from-cyan-400/10 to-violet-500/10 hover:from-cyan-400/20 hover:to-violet-500/20 hover:border-cyan-400/40 cursor-default transition-colors"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="relative py-24 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(34,211,238,0.07),transparent_60%)]" />
        <div className="relative max-w-4xl mx-auto">
          <SectionHeading eyebrow="Timeline" title="Work" accent="Experience" />
          <div className="relative">
            <div className="absolute left-[7px] top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400/60 via-violet-500/40 to-transparent" />
            <div className="space-y-10">
              {experience.map((exp, index) => (
                <Reveal key={index} i={0}>
                  <div className="relative pl-10">
                    <span className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full bg-[#04040c] border-2 border-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
                    <div className="p-7 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md hover:border-violet-400/30 hover:shadow-[0_0_40px_-10px_rgba(139,92,246,0.35)] transition-all">
                        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                          <div>
                            <h4 className="font-display text-xl font-bold text-white">{exp.role}</h4>
                            <p className="text-cyan-300 font-semibold mt-1">{exp.company}</p>
                          </div>
                          <span className="px-3.5 py-1.5 text-xs font-display tracking-wider rounded-lg border border-cyan-400/30 bg-cyan-400/10 text-cyan-300">
                            {exp.period}
                          </span>
                        </div>
                        {exp.current && (
                          <p className="mb-3 text-xs font-display tracking-[0.25em] uppercase text-emerald-300">
                            ● Active
                          </p>
                        )}
                        <ul className="space-y-2.5 text-left">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start gap-3 text-slate-300 text-[0.95rem]">
                              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0 shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>
      <section id="contact" className="relative py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeading eyebrow="Uplink" title="Let's" accent="Connect" />
          <Reveal>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Open to AI Infrastructure, Cloud Infrastructure, DevOps, SRE, and Linux Systems roles across the United
              States.
            </p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              { href: 'mailto:bharaneswarreddygundra@gmail.com', icon: Mail, label: 'Email', sub: 'bharaneswarreddygundra@gmail.com', color: 'text-cyan-300' },
              { href: 'https://linkedin.com/in/bharaneswarreddygundra', icon: Linkedin, label: 'LinkedIn', sub: 'Connect with me', color: 'text-violet-300' },
              { href: 'https://github.com/Bharaneswarreddy', icon: Github, label: 'GitHub', sub: 'View my code', color: 'text-fuchsia-300' },
            ].map((card, i) => (
              <Reveal key={card.label} i={i}>
                <motion.a
                  href={card.href}
                  {...(card.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="block p-8 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md hover:border-cyan-400/40 hover:shadow-[0_0_45px_-10px_rgba(34,211,238,0.4)] transition-all group"
                >
                  <card.icon size={32} className={`mx-auto ${card.color} mb-4 group-hover:scale-110 transition-transform`} />
                  <h4 className="font-display font-semibold text-white tracking-wider">{card.label}</h4>
                  <p className="text-sm text-slate-500 mt-2 break-all">{card.sub}</p>
                </motion.a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-white/5 bg-black/40">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-slate-500 text-sm">© 2026 Bharaneswar Reddy Gundra. Built with React & Tailwind CSS.</p>
          <p className="text-slate-600 text-xs mt-2 font-display tracking-[0.3em] uppercase">United States</p>
        </div>
      </footer>
    </div>
  );
}
