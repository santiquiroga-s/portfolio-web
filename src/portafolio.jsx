import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
  {
    title: 'Sistema de Gestión en Python',
    description:
      'Desarrollo de sistemas aplicando Programación Orientada a Objetos, lógica de negocio y estructuras de datos.',
    tech: ['Python', 'POO', 'CRUD'],
    github: 'https://github.com/santiquiroga-s',
  },
  {
    title: 'Aplicaciones Web Frontend',
    description:
      'Creación de interfaces modernas y responsivas utilizando tecnologías frontend actuales.',
    tech: ['React', 'JavaScript', 'Tailwind CSS'],
    github: 'https://github.com/santiquiroga-s',
  },
  {
    title: 'Bases de Datos',
    description:
      'Diseño y modelado de bases de datos relacionales utilizando PostgreSQL y SQL.',
    tech: ['PostgreSQL', 'SQL'],
    github: 'https://github.com/santiquiroga-s',
  },
];

const skills = [
  {
    category: 'Frontend',
    items: [
      { name: 'HTML / CSS', icon: '/icons/html.svg' },
      { name: 'JavaScript', icon: '/icons/javascript.svg' },
      { name: 'React', icon: '/icons/react.svg' },
      { name: 'Tailwind CSS', icon: '/icons/tailwind.svg' },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'Python', icon: '/icons/python.svg' },
      { name: 'NodeJS', icon: '/icons/nodejs.svg' },
      { name: 'PostgreSQL', icon: '/icons/postgresql.svg' },
    ],
  },
];


export default function PortfolioSantiagoQuiroga() {
  const [showMiniName, setShowMiniName] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowMiniName(window.scrollY > 250);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 border-b border-slate-800/60 bg-slate-950/70 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="h-8 flex items-center overflow-hidden">
            <AnimatePresence>
              {showMiniName && (
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="hidden md:block text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent"
                >
                  Santiago Quiroga
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <nav className="flex items-center gap-6 text-sm md:text-base text-slate-300">
            <button
              onClick={() => scrollToSection('about')}
              className="hover:text-cyan-300 transition-colors duration-300"
            >
              Sobre mí
            </button>

            <button
              onClick={() => scrollToSection('skills')}
              className="hover:text-cyan-300 transition-colors duration-300"
            >
              Tecnologías
            </button>

            <button
              onClick={() => scrollToSection('projects')}
              className="hover:text-cyan-300 transition-colors duration-300"
            >
              Proyectos
            </button>

            <button
              onClick={() => scrollToSection('contact')}
              className="hover:text-cyan-300 transition-colors duration-300"
            >
              Contacto
            </button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pt-40 pb-28 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block text-blue-300 border border-blue-400/30 bg-blue-500/10 px-4 py-1 rounded-full text-sm tracking-wide mb-8">
            Disponible para trabajar
          </span>

          <h1 className="text-5xl md:text-7xl font-black leading-tight pb-4 bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
            Santiago Quiroga
          </h1>

          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mt-6">
            Frontend Developer · Fullstack Enthusiast
          </p>

          <p className="text-slate-400 max-w-3xl mx-auto mt-6 text-lg leading-relaxed">
            Estudiante de Licenciatura en Sistemas de Información con interés en el desarrollo web y de software. Me especializo en tecnologías como React, JavaScript, Python y PostgreSQL, desarrollando proyectos académicos y personales para fortalecer mis habilidades y crecer profesionalmente en el área IT.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mt-12">
            <a
              href="mailto:santquiroga10@gmail.com?subject=Contacto%20desde%20Portfolio"
              className="flex items-center gap-2 bg-slate-900/80 border border-slate-700 hover:border-cyan-400 hover:bg-cyan-500/10 px-6 py-3 rounded-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <>
                <img
                    src="/icons/gmail.svg"
                    alt="Email"
                    className="w-5 h-5"
                />
                Email
              </>
            </a>

            <a
              href="https://wa.me/542646236375"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-slate-900/80 border border-slate-700 hover:border-green-400 hover:bg-green-500/10 px-6 py-3 rounded-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <>
                <img
                    src="/icons/whatsapp.svg"
                    alt="WhatsApp"
                    className="w-5 h-5"
                />
                WhatsApp
            </>
            </a>

            <a
              href="https://www.linkedin.com/in/santiagoquiroga10"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-slate-900/80 border border-slate-700 hover:border-blue-400 hover:bg-blue-500/10 px-6 py-3 rounded-2xl transition-all duration-300 hover:-translate-y-1"
            >
            <>
              <img
                src="/icons/linkedin.svg"
                alt="LinkedIn"
                className="w-5 h-5"
              />
              LinkedIn
            </>
            </a>

            <a
              href="https://github.com/santiquiroga-s"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-slate-900/80 border border-slate-700 hover:border-white hover:bg-white/10 px-6 py-3 rounded-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <>
                <img
                  src="/icons/github.svg"
                  alt="GitHub"
                  className="w-5 h-5"
                />
                GitHub
              </>
            </a>
          </div>

          <div className="flex justify-center mt-8">
            <a
              href="/CV_Santiago_Quiroga.pdf"
              download
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-slate-950 font-semibold px-8 py-4 rounded-2xl shadow-2xl hover:scale-105 transition-all duration-300"
            >
              ⬇ Descargar CV
            </a>
          </div>
        </motion.div>
      </section>

      {/* About */}
      <section
        id="about"
        className="relative z-10 max-w-6xl mx-auto px-6 py-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-slate-900/40 border border-slate-800 rounded-3xl p-10 backdrop-blur-xl hover:border-cyan-400/40 transition-all duration-300"
        >
          <h2 className="text-4xl font-bold mb-6 text-blue-300">
            Sobre mí
          </h2>

          <p className="text-slate-300 text-lg leading-relaxed max-w-4xl">
            Soy estudiante de la Licenciatura en Sistemas de Información y me apasiona el desarrollo de software y la resolución de problemas mediante la tecnología. Durante mi formación académica he adquirido conocimientos en Programación Orientada a Objetos, estructuras de datos, bases de datos relacionales, desarrollo web y paradigmas de programación, participando en diversos proyectos que me permitieron aplicar estos conceptos de manera práctica.  
            <p>Actualmente continúo ampliando mis conocimientos en tecnologías frontend y full stack, trabajando principalmente con React, JavaScript, Python y PostgreSQL. Me interesa especialmente el desarrollo de aplicaciones web modernas, la creación de interfaces intuitivas y el diseño de soluciones que aporten valor a los usuarios.</p>
            <p>Me considero una persona responsable, con capacidad de aprendizaje constante y gran interés por enfrentar nuevos desafíos. Mi objetivo es incorporarme al ámbito profesional para seguir desarrollando experiencia, contribuir en proyectos reales y continuar creciendo dentro de la industria tecnológica.</p>
          </p>
        </motion.div>
      </section>

      {/* Skills */}
      <section
        id="skills"
        className="relative z-10 max-w-6xl mx-auto px-6 py-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-14 text-center text-blue-300">
            Tecnologías
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((group) => (
              <div
                key={group.category}
                className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 hover:border-cyan-400/40 hover:bg-cyan-500/5 transition-all duration-300 hover:-translate-y-2"
              >
                <h3 className="text-2xl font-semibold mb-6 text-cyan-300">
                  {group.category}
                </h3>
                


                <div className="flex flex-wrap gap-3">
                  {group.items.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center gap-2 bg-slate-800/80 border border-slate-700 px-4 py-2 rounded-xl text-slate-300 hover:border-cyan-400 hover:text-cyan-300 transition-all duration-300"
                    >
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        className="w-5 h-5"
                      />

                      <span>{skill.name}</span>
                    </div>
                  ))}
                </div>





              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Projects */}
      <section
        id="projects"
        className="relative z-10 max-w-6xl mx-auto px-6 py-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-14 text-center text-blue-300">
            Proyectos
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.title}
                className="group bg-slate-900/40 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl hover:border-cyan-400/40 hover:bg-cyan-500/5 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-cyan-300 transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-slate-400 leading-relaxed mb-6">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="text-sm bg-blue-500/10 border border-blue-400/20 text-blue-300 px-3 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-slate-300 hover:text-cyan-300 transition-colors duration-300"
                >

                  <>
                    <img
                      src="/icons/github.svg"
                      alt="GitHub"
                      className="w-5 h-5"
                    />
                    Ver código
                  </>

                </a>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="relative z-10 max-w-6xl mx-auto px-6 py-24"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-blue-900/60 to-cyan-900/40 border border-blue-500/20 rounded-[2rem] p-12 text-center backdrop-blur-xl"
        >
          <h2 className="text-4xl font-bold mb-4">
            ¿Te gustaría contactarme?
          </h2>

          <p className="text-slate-200 max-w-2xl mx-auto text-lg leading-relaxed mb-10">
            Estoy en búsqueda de oportunidades para desarrollarme en el área IT
            y seguir creciendo profesionalmente.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="mailto:santquiroga10@gmail.com?subject=Contacto%20desde%20Portfolio"
              className="bg-white text-slate-950 font-semibold px-8 py-4 rounded-2xl hover:scale-105 transition-all duration-300"
            >

              <>
                <img
                  src="/icons/gmail.svg"
                  alt="Email"
                  className="w-5 h-5 inline-block mr-2"
                />
                Enviar Email
              </>

            </a>

            <a
              href="https://www.linkedin.com/in/santiagoquiroga10"
              target="_blank"
              rel="noreferrer"
              className="border border-slate-300/30 px-8 py-4 rounded-2xl hover:bg-white hover:text-slate-950 transition-all duration-300"
            >

              <>
                <img
                  src="/icons/linkedin.svg"
                  alt="LinkedIn"
                  className="w-5 h-5 inline-block mr-2"
                />
                Ver LinkedIn
              </>


            </a>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © 2026 Santiago Quiroga · Portfolio Developer
          </p>

          <div className="flex items-center gap-5 text-slate-400 text-xl">
            <a
              href="https://github.com/santiquiroga-s"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors duration-300"
            >
              <img
                src="/icons/github.svg"
                alt="GitHub"
                className="w-6 h-6"
              />
            </a>

            <a
              href="https://www.linkedin.com/in/santiagoquiroga10"
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-300 transition-colors duration-300"
            >
              <img
                src="/icons/linkedin.svg"
                alt="LinkedIn"
                className="w-6 h-6"
              />
            </a>

            <a
              href="mailto:santquiroga10@gmail.com?subject=Contacto%20desde%20Portfolio"
              className="hover:text-blue-300 transition-colors duration-300"
            >
              <img
                src="/icons/gmail.svg"
                alt="Email"
                className="w-6 h-6"
              />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
