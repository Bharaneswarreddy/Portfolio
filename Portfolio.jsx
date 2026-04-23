import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Code, Database, Brain, ChevronDown } from 'lucide-react';

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = ['home', 'about', 'projects', 'skills', 'experience', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projects = [
    {
      title: "VANET Malicious Node Detection",
      description: "Machine learning system achieving 94% accuracy in detecting cyber attacks in vehicular networks using Random Forest classifier.",
      tech: ["Python", "scikit-learn", "pandas", "NumPy"],
      metrics: ["94% Accuracy", "5,000 Nodes", "F1: 0.94"],
      github: "https://github.com/Bharaneswarreddy/vanet-ml-detection",
      icon: Brain,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Secure IoT Communication System",
      description: "MQTT-based messaging system with Fernet encryption handling 1,000+ messages per minute with 99.5% reliability.",
      tech: ["Python", "MQTT", "Cryptography"],
      metrics: ["1,000+ msg/min", "99.5% Reliability"],
      github: "https://github.com/Bharaneswarreddy/iot-mqtt-secure",
      icon: Code,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "TA Management System",
      description: "Full-stack application with role-based access control supporting 200+ concurrent users.",
      tech: ["React", "Node.js", "MySQL", "Docker"],
      metrics: ["200+ Users", "50% Faster"],
      github: "https://github.com/Bharaneswarreddy/ta-management-system",
      icon: Database,
      color: "from-green-500 to-teal-500"
    },
    {
      title: "Algorithm Performance Analysis",
      description: "Comparative study demonstrating 95% runtime reduction using optimized algorithms.",
      tech: ["Python", "Algorithm Design"],
      metrics: ["95% Faster", "O(n log n)"],
      github: "https://github.com/Bharaneswarreddy/closest-pair-algorithm",
      icon: Code,
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Cloud Security Research",
      description: "Comprehensive comparative analysis of AWS and GCP security frameworks.",
      tech: ["AWS", "GCP", "Security"],
      metrics: ["IAM Analysis", "Compliance"],
      github: "https://github.com/Bharaneswarreddy/cloud-security-research",
      icon: Database,
      color: "from-indigo-500 to-purple-500"
    }
  ];

  const skills = {
    "Languages": ["Python", "JavaScript", "SQL", "Java", "R", "Go"],
    "ML & Data Science": ["scikit-learn", "TensorFlow", "pandas", "NumPy"],
    "Web Development": ["React", "Node.js", "Express", "HTML5", "CSS3"],
    "Data & Databases": ["MySQL", "PostgreSQL", "Tableau", "Power BI"],
    "Cloud & DevOps": ["AWS", "Azure", "GCP", "Docker", "Git"]
  };

  const experience = [
    {
      role: "Full-Stack Web Developer Intern",
      company: "Techvanto Private Limited",
      period: "Aug 2023 - Apr 2024",
      achievements: [
        "Developed CollegeClue platform serving 10,000+ students",
        "Improved application processing efficiency by 40%",
        "Reduced page load times by 30%",
        "Implemented JWT authentication for 5,000+ users"
      ]
    },
    {
      role: "Data Engineering Intern",
      company: "Celebal Technologies",
      period: "Jun 2023 - Aug 2023",
      achievements: [
        "Processed 500,000+ records weekly using Python and SQL",
        "Improved data quality by 35%",
        "Engineered ETL pipelines reducing manual work by 60%",
        "Created 10+ Tableau dashboards"
      ]
    }
  ];

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Bharaneswar Reddy
            </h1>
            <div className="hidden md:flex gap-8">
              {['home', 'about', 'projects', 'skills', 'experience', 'contact'].map(section => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-colors ${activeSection === section ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-600'}`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-6xl md:text-7xl font-bold text-gray-900">
            Bharaneswar Reddy Gundra
          </h2>
          <p className="text-2xl md:text-3xl text-gray-600">
            ML Engineer • Full-Stack Developer • Data Enthusiast
          </p>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            MS Computer Science student at Florida Atlantic University (3.74 GPA) 
            building ML models with <span className="text-blue-600 font-semibold">94% accuracy</span>, 
            apps serving <span className="text-blue-600 font-semibold">10,000+ users</span>, 
            and data pipelines processing <span className="text-blue-600 font-semibold">500,000+ records</span>.
          </p>
          <div className="flex justify-center gap-6">
            <a href="https://github.com/Bharaneswarreddy" target="_blank" rel="noopener noreferrer" 
               className="p-3 rounded-full bg-gray-900 text-white hover:scale-110 transition-transform">
              <Github size={24} />
            </a>
            <a href="https://linkedin.com/in/bharaneswarreddygundra" target="_blank" rel="noopener noreferrer"
               className="p-3 rounded-full bg-blue-600 text-white hover:scale-110 transition-transform">
              <Linkedin size={24} />
            </a>
            <a href="mailto:bharaneswarreddygundra@gmail.com"
               className="p-3 rounded-full bg-indigo-600 text-white hover:scale-110 transition-transform">
              <Mail size={24} />
            </a>
          </div>
          <button onClick={() => scrollToSection('about')} className="mt-12 animate-bounce">
            <ChevronDown size={32} className="text-gray-400" />
          </button>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-4xl font-bold text-gray-900 mb-12 text-center">About Me</h3>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                I'm a graduate student passionate about building intelligent systems that solve real-world problems 
                through machine learning, data analysis, and scalable software engineering.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Through two internships and multiple projects, I've learned that great software isn't just about 
                writing code—it's about understanding user needs and building systems people can rely on.
              </p>
            </div>
            <div className="space-y-4">
              <div className="p-6 bg-white rounded-2xl shadow-lg">
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Education</h4>
                <p className="text-gray-700 font-medium">MS in Computer Science</p>
                <p className="text-gray-600">Florida Atlantic University</p>
                <p className="text-blue-600 font-semibold">GPA: 3.74/4.0</p>
                <p className="text-gray-500 text-sm">Expected May 2026</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-20 px-6 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-gray-900 mb-12 text-center">Featured Projects</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => {
              const Icon = project.icon;
              return (
                <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${project.color}`} />
                  <div className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${project.color}`}>
                        <Icon className="text-white" size={24} />
                      </div>
                      <a href={project.github} target="_blank" rel="noopener noreferrer"
                         className="p-2 rounded-lg hover:bg-gray-100">
                        <ExternalLink size={20} className="text-gray-600" />
                      </a>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900">{project.title}</h4>
                    <p className="text-gray-600 text-sm">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, i) => (
                        <span key={i} className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="pt-4 border-t flex flex-wrap gap-2">
                      {project.metrics.map((metric, i) => (
                        <span key={i} className="text-xs font-semibold text-blue-600">{metric}</span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-gray-900 mb-12 text-center">Technical Skills</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(skills).map(([category, items], index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
                <h4 className="text-xl font-bold text-gray-900">{category}</h4>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill, i) => (
                    <span key={i} className="px-3 py-2 text-sm font-medium bg-gradient-to-r from-blue-50 to-indigo-50 text-gray-700 rounded-lg">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="py-20 px-6 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-4xl font-bold text-gray-900 mb-12 text-center">Experience</h3>
          <div className="space-y-8">
            {experience.map((exp, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900">{exp.role}</h4>
                    <p className="text-lg text-blue-600 font-semibold">{exp.company}</p>
                  </div>
                  <span className="px-4 py-2 bg-blue-50 text-gray-700 rounded-lg font-medium">
                    {exp.period}
                  </span>
                </div>
                <ul className="space-y-2">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0"></span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h3 className="text-4xl font-bold text-gray-900">Let's Connect</h3>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Seeking Summer 2026 opportunities in Software Engineering, Machine Learning, and Data Science.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <a href="mailto:bharaneswarreddygundra@gmail.com" 
               className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all group">
              <Mail size={32} className="mx-auto text-indigo-600 mb-4 group-hover:scale-110 transition-transform" />
              <h4 className="font-semibold text-gray-900">Email</h4>
              <p className="text-sm text-gray-600 mt-2">bharaneswarreddygundra@gmail.com</p>
            </a>
            <a href="https://linkedin.com/in/bharaneswarreddygundra" target="_blank" rel="noopener noreferrer"
               className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all group">
              <Linkedin size={32} className="mx-auto text-blue-600 mb-4 group-hover:scale-110 transition-transform" />
              <h4 className="font-semibold text-gray-900">LinkedIn</h4>
              <p className="text-sm text-gray-600 mt-2">Connect with me</p>
            </a>
            <a href="https://github.com/Bharaneswarreddy" target="_blank" rel="noopener noreferrer"
               className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all group">
              <Github size={32} className="mx-auto text-gray-900 mb-4 group-hover:scale-110 transition-transform" />
              <h4 className="font-semibold text-gray-900">GitHub</h4>
              <p className="text-sm text-gray-600 mt-2">View my code</p>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400">© 2026 Bharaneswar Reddy Gundra. Built with React & Tailwind CSS.</p>
          <p className="text-gray-500 text-sm mt-2">Boca Raton, FL | Open to relocation</p>
        </div>
      </footer>
    </div>
  );
}
