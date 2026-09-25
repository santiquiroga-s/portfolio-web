import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useSpring } from 'framer-motion';
import {
  ArrowDown,
  ArrowUpRight,
  Download,
  ExternalLink,
  Menu,
  Minus,
  RotateCcw,
  X,
  ZoomIn,
} from 'lucide-react';

const technologies = [
  {
    category: 'Frontend',
    items: [
      { name: 'HTML / CSS', icon: '/icons/html.svg' },
      { name: 'JavaScript', icon: '/icons/javascript.svg' },
      { name: 'React', icon: '/icons/react.svg' },
      { name: 'Tailwind CSS', icon: '/icons/tailwind.svg' },
      { name: 'Vite', icon: '/favicon.svg' },
    ],
  },
  {
    category: 'Backend / Datos',
    items: [
      { name: 'Node.js', icon: '/icons/nodejs.svg' },
      { name: 'Python', icon: '/icons/python.svg' },
      { name: 'PostgreSQL', icon: '/icons/postgresql.svg' },
      { name: 'Supabase', textIcon: 'S' },
    ],
  },
  {
    category: 'Herramientas',
    items: [
      { name: 'Git', textIcon: 'GIT' },
      { name: 'GitHub', icon: '/icons/github.svg' },
      { name: 'Vercel', textIcon: '▲' },
    ],
  },
];

const bartolImages = [
  {
    src: '/projects/bartol-productos.png',
    label: 'Gestión / Productos',
    description:
      'Administración de productos, stock, costos, precios y ganancias.',
  },
  {
    src: '/projects/bartol-ventas.png',
    label: 'Ventas / Control',
    description:
      'Resumen de ventas, ingresos, ganancias, medios de pago e historial.',
  },
  {
    src: '/projects/bartol-nueva-venta.png',
    label: 'Registro / Nueva venta',
    description:
      'Registro de ventas con múltiples productos, cantidades, precios cobrados, estados de pago y diferentes medios de pago.',
  },
];

const vueltoImages = [
  {
    src: '/projects/vuelto-inicio.png',
    label: 'Ingreso de importes',
  },
  {
    src: '/projects/vuelto-resultado.png',
    label: 'Resultado del cálculo',
  },
];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function SectionLabel({ number, children }) {
  return (
    <div className="section-label">
      <span>{number}</span>
      <span>/</span>
      <span>{children}</span>
      <div className="section-line" />
    </div>
  );
}

function CustomCursor({ cursorText, cursorDark }) {
  const mouseX = useSpring(-100, {
    stiffness: 600,
    damping: 45,
    mass: 0.5,
  });

  const mouseY = useSpring(-100, {
    stiffness: 600,
    damping: 45,
    mass: 0.5,
  });

  const followerX = useSpring(-100, {
    stiffness: 180,
    damping: 24,
    mass: 0.7,
  });

  const followerY = useSpring(-100, {
    stiffness: 180,
    damping: 24,
    mass: 0.7,
  });

  useEffect(() => {
    const handleMouseMove = (event) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
      followerX.set(event.clientX);
      followerY.set(event.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, followerX, followerY]);

  return (
    <>
      <motion.div
        className={`cursor-dot ${cursorDark ? 'cursor-dot-dark' : ''}`}
        style={{
          x: mouseX,
          y: mouseY,
        }}
      />

      <motion.div
        className={`cursor-follower ${cursorText ? 'cursor-follower-active' : ''} ${cursorDark ? 'cursor-follower-dark' : ''}`}
        style={{
          x: followerX,
          y: followerY,
        }}
      >
        <AnimatePresence mode="wait">
          {cursorText && (
            <motion.span
              key={cursorText}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.15 }}
            >
              {cursorText}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

function ProjectImage({
  image,
  className = '',
  onOpen,
  onCursorChange,
}) {
  return (
    <motion.button
      type="button"
      className={`project-image ${className}`}
      onClick={() => onOpen(image)}
      onMouseEnter={() => onCursorChange('VER +')}
      onMouseLeave={() => onCursorChange('')}
      whileHover={{ scale: 0.995 }}
      transition={{ duration: 0.25 }}
      aria-label={`Ampliar ${image.label}`}
    >
      <img src={image.src} alt={image.label} />

      <div className="project-image-overlay">
        <span>{image.label}</span>
        <ZoomIn size={18} />
      </div>
    </motion.button>
  );
}

export default function PortfolioSantiagoQuiroga() {
  const [showMiniName, setShowMiniName] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [cursorText, setCursorText] = useState('');
  const [cursorDark, setCursorDark] = useState(false);
  const [imageZoom, setImageZoom] = useState(1);

  const heroNameRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroNameRef.current) return;

      const heroNameBottom =
        heroNameRef.current.getBoundingClientRect().bottom;

      setShowMiniName(heroNameBottom < 80);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setSelectedImage(null);
        setImageZoom(1);
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  useEffect(() => {
    document.body.style.overflow =
      selectedImage || mobileMenuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedImage, mobileMenuOpen]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }

    setMobileMenuOpen(false);
  };

  const handleInteractiveEnter = (text = '') => {
    setCursorText(text);
  };

  const handleInteractiveLeave = () => {
    setCursorText('');
  };

  const increaseImageZoom = () => {
    setImageZoom((currentZoom) =>
      Math.min(currentZoom + 0.25, 3)
    );
  };

  const decreaseImageZoom = () => {
    setImageZoom((currentZoom) =>
      Math.max(currentZoom - 0.25, 1)
    );
  };

  const resetImageZoom = () => {
    setImageZoom(1);
  };

  const openImageModal = (image) => {
    setImageZoom(1);
    setSelectedImage(image);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setImageZoom(1);
  };

  const handleImageWheel = (event) => {
    event.preventDefault();

    if (event.deltaY < 0) {
      increaseImageZoom();
    } else {
      decreaseImageZoom();
    }
  };

  return (
    <div className="portfolio-shell">
      <CustomCursor
        cursorText={cursorText}
        cursorDark={cursorDark}
      />

      {/* NAVBAR */}
      <header className="site-header">
        <div className="site-header-inner">
          <div className="nav-name-wrapper">
            <AnimatePresence>
              {showMiniName && (
                <motion.button
                  type="button"
                  className="nav-name"
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  onClick={() =>
                    window.scrollTo({
                      top: 0,
                      behavior: 'smooth',
                    })
                  }
                  onMouseEnter={() => handleInteractiveEnter('INICIO')}
                  onMouseLeave={handleInteractiveLeave}
                >
                  Santiago Quiroga
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          <nav
            className="desktop-nav"
            aria-label="Navegación principal"
            onMouseEnter={() => setCursorDark(true)}
            onMouseLeave={() => {
              setCursorDark(false);
              setCursorText('');
            }}
          >
            <button
              type="button"
              onClick={() => scrollToSection('about')}
              onMouseEnter={() => handleInteractiveEnter('01')}
              onMouseLeave={handleInteractiveLeave}
            >
              Sobre mí
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('projects')}
              onMouseEnter={() => handleInteractiveEnter('02')}
              onMouseLeave={handleInteractiveLeave}
            >
              Proyectos
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('skills')}
              onMouseEnter={() => handleInteractiveEnter('03')}
              onMouseLeave={handleInteractiveLeave}
            >
              Tecnologías
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              onMouseEnter={() => handleInteractiveEnter('04')}
              onMouseLeave={handleInteractiveLeave}
            >
              Contacto
            </button>
          </nav>

          <button
            type="button"
            className="mobile-menu-button"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Abrir menú"
          >
            <Menu size={25} />
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="mobile-menu-top">
              <span>Santiago Quiroga</span>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Cerrar menú"
              >
                <X size={28} />
              </button>
            </div>

            <div className="mobile-menu-links">
              <button
                type="button"
                onClick={() => scrollToSection('about')}
              >
                <span>01</span>
                Sobre mí
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('projects')}
              >
                <span>02</span>
                Proyectos
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('skills')}
              >
                <span>03</span>
                Tecnologías
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('contact')}
              >
                <span>04</span>
                Contacto
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* HERO */}
        <section className="hero-section">
          <div className="hero-inner">
            <motion.div
              className="hero-topline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              <span ref={heroNameRef}>Santiago Quiroga</span>
            </motion.div>

            <div className="hero-content">
              <motion.h1
                initial={{ opacity: 0, y: 55 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                DESARROLLO
                <br />
                SOLUCIONES DIGITALES
                <br />
                <span>FUNCIONALES</span>
              </motion.h1>

              <motion.div
                className="hero-bottom"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.35,
                }}
              >
                <p>
                  Desarrollo soluciones digitales mediante tecnologías
                  frontend, backend, bases de datos y análisis de datos.
                  Experiencia en la creación de aplicaciones y sistemas
                  orientados a resolver necesidades reales mediante soluciones
                  modernas y funcionales.
                </p>

                <div className="hero-actions">
                  <button
                    type="button"
                    className="primary-link"
                    onClick={() => scrollToSection('projects')}
                    onMouseEnter={() =>
                      handleInteractiveEnter('VER')
                    }
                    onMouseLeave={handleInteractiveLeave}
                  >
                    Ver proyectos
                    <ArrowDown size={18} />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="content-section">
          <motion.div
            className="section-container"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
          >
            <SectionLabel number="01">SOBRE MÍ</SectionLabel>

            <div className="about-grid">
              <div className="about-title">
                <span>PERFIL</span>
                <h2>
                  Formación técnica.
                  <br />
                  Aplicación práctica.
                </h2>
              </div>

              <div className="about-copy">
                <p>
                  Soy estudiante de la Licenciatura en Sistemas de Información
                  y continúo mi formación en distintas áreas del desarrollo de
                  software. Mi perfil abarca desarrollo frontend y backend,
                  bases de datos y análisis de datos, combinando la formación
                  académica con la aplicación práctica de estos conocimientos.
                </p>

                <p>
                  He utilizado distintas tecnologías para el desarrollo de
                  proyectos reales, trabajando con React, JavaScript, Python,
                  Node.js, PostgreSQL y Supabase, entre otras herramientas.
                  Estos proyectos abarcan desde aplicaciones web y sistemas de
                  gestión hasta soluciones orientadas al procesamiento y
                  administración de información.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="content-section projects-section">
          <div className="section-container">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={fadeUp}
            >
              <SectionLabel number="02">PROYECTOS</SectionLabel>

              <div className="projects-intro">
                <p className="eyebrow">TRABAJOS SELECCIONADOS</p>

                <h2>
                  Proyectos desarrollados para
                  <br />
                  resolver necesidades reales.
                </h2>
              </div>
            </motion.div>

            {/* BARTOL */}
            <article className="project-case project-bartol">
              <div className="project-background-number">01</div>

              <motion.div
                className="project-heading"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
              >
                <div>
                  <span className="project-index">
                    01 / PROYECTO REAL
                  </span>

                  <h3>
                    DISTRIBUIDORA
                    <br />
                    BARTOL
                  </h3>
                </div>

                <div className="project-summary">
                  <p>
                    Sistema web desarrollado para Distribuidora Bartol con el
                    objetivo de centralizar la gestión de productos, stock,
                    precios y ventas del negocio. Cuenta con un catálogo
                    público para clientes y un entorno privado de
                    administración.
                  </p>

                  <div className="project-stack-inline">
                    <span>React</span>
                    <span>JavaScript</span>
                    <span>Vite</span>
                    <span>Supabase</span>
                    <span>PostgreSQL</span>
                    <span>ExcelJS</span>
                  </div>

                  <a
                    href="https://bartol-distribuciones.vercel.app/"
                    target="_blank"
                    rel="noreferrer"
                    className="project-external-link"
                    onMouseEnter={() =>
                      handleInteractiveEnter('ABRIR ↗')
                    }
                    onMouseLeave={handleInteractiveLeave}
                  >
                    Visitar sitio
                    <ExternalLink size={17} />
                  </a>
                </div>
              </motion.div>

              <motion.div
                className="bartol-main-image"
                initial={{ opacity: 0, y: 55, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <ProjectImage
                  image={bartolImages[0]}
                  onOpen={openImageModal}
                  onCursorChange={setCursorText}
                />
              </motion.div>

              <div className="project-gallery">
                <motion.div
                  className="gallery-item gallery-item-left"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.8 }}
                >
                  <ProjectImage
                    image={bartolImages[1]}
                    onOpen={openImageModal}
                    onCursorChange={setCursorText}
                  />

                  <div className="gallery-copy">
                    <span>VENTAS / CONTROL</span>

                    <p>
                      {bartolImages[1].description}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="gallery-item gallery-item-right"
                  initial={{ opacity: 0, y: 65 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.8, delay: 0.08 }}
                >
                  <ProjectImage
                    image={bartolImages[2]}
                    onOpen={openImageModal}
                    onCursorChange={setCursorText}
                  />

                  <div className="gallery-copy">
                    <span>REGISTRO / NUEVA VENTA</span>

                    <p>
                      {bartolImages[2].description}
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* ROLES */}
              <motion.div
                className="roles-block"
                initial={{ opacity: 0, y: 45 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.75 }}
              >
                <div className="roles-header">
                  <span>03 NIVELES DE ACCESO</span>

                  <p>
                    Supabase Auth / Row Level Security
                  </p>
                </div>

                <div className="roles-grid">
                  <div>
                    <span>01</span>
                    <h4>Cliente</h4>
                    <p>
                      Acceso público al catálogo, productos, precios,
                      categorías y búsqueda.
                    </p>
                  </div>

                  <div>
                    <span>02</span>
                    <h4>Empleado</h4>
                    <p>
                      Acceso autenticado a funciones operativas con permisos
                      limitados.
                    </p>
                  </div>

                  <div>
                    <span>03</span>
                    <h4>Dueño</h4>
                    <p>
                      Administración completa de productos, ventas, stock,
                      costos y reportes.
                    </p>
                  </div>
                </div>
              </motion.div>
            </article>

            {/* CALCULA TU VUELTO */}
            <article className="project-case project-vuelto">
              <div className="project-background-number">02</div>

              <motion.div
                className="project-heading"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
              >
                <div>
                  <span className="project-index">
                    02 / WEB APP
                  </span>

                  <h3>
                    CALCULA
                    <br />
                    TU VUELTO
                  </h3>
                </div>

                <div className="project-summary">
                  <p>
                    Herramienta web desarrollada para agilizar el cálculo del
                    vuelto en operaciones de venta. Permite ingresar el total
                    de una compra y el monto abonado, calcular automáticamente
                    el cambio y obtener una sugerencia de billetes argentinos.
                  </p>

                  <div className="project-stack-inline">
                    <span>HTML5</span>
                    <span>CSS3</span>
                    <span>JavaScript</span>
                    <span>LocalStorage</span>
                  </div>

                  <a
                    href="https://calculatuvuelto.vercel.app/"
                    target="_blank"
                    rel="noreferrer"
                    className="project-external-link"
                    onMouseEnter={() =>
                      handleInteractiveEnter('ABRIR ↗')
                    }
                    onMouseLeave={handleInteractiveLeave}
                  >
                    Visitar sitio
                    <ExternalLink size={17} />
                  </a>
                </div>
              </motion.div>

              <motion.div
                className="vuelto-showcase"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="vuelto-image vuelto-image-main">
                  <ProjectImage
                    image={vueltoImages[0]}
                    onOpen={openImageModal}
                    onCursorChange={setCursorText}
                  />
                </div>

                <div className="vuelto-image vuelto-image-result">
                  <ProjectImage
                    image={vueltoImages[1]}
                    onOpen={openImageModal}
                    onCursorChange={setCursorText}
                  />
                </div>
              </motion.div>

              <div className="feature-row">
                <span>Cálculo automático</span>
                <span>Desglose en billetes</span>
                <span>Accesos rápidos</span>
                <span>Modo claro / oscuro</span>
                <span>Responsive</span>
              </div>
            </article>
          </div>
        </section>

        {/* TECHNOLOGIES */}
        <section id="skills" className="content-section skills-section">
          <motion.div
            className="section-container"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={fadeUp}
          >
            <SectionLabel number="03">TECNOLOGÍAS</SectionLabel>

            <div className="skills-heading">
              <p className="eyebrow">STACK / HERRAMIENTAS</p>

              <h2>
                Tecnologías que utilizo
                <br />
                para construir mis proyectos.
              </h2>
            </div>

            <div className="technology-grid">
              {technologies.map((group) => (
                <div
                  className="technology-column"
                  key={group.category}
                >
                  <h3>{group.category}</h3>

                  <div className="technology-list">
                    {group.items.map((technology) => (
                      <div
                        className="technology-item"
                        key={technology.name}
                        onMouseEnter={() =>
                          handleInteractiveEnter('↗')
                        }
                        onMouseLeave={handleInteractiveLeave}
                      >
                        <div className="technology-icon">
                          {technology.icon ? (
                            <img
                              src={technology.icon}
                              alt=""
                            />
                          ) : (
                            <span>{technology.textIcon}</span>
                          )}
                        </div>

                        <span>{technology.name}</span>

                        <ArrowUpRight
                          className="technology-arrow"
                          size={16}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* CONTACT */}
        <section
          id="contact"
          className="contact-section"
          onMouseEnter={() => setCursorDark(true)}
          onMouseLeave={() => {
            setCursorDark(false);
            setCursorText('');
          }}
        >
          <motion.div
            className="section-container"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
          >
            <SectionLabel number="04">CONTACTO</SectionLabel>

            <div className="contact-content">
              <p className="eyebrow">¿TENÉS UN PROYECTO EN MENTE?</p>

              <button
                type="button"
                className="contact-title"
                onClick={() =>
                  document
                    .querySelector('.contact-links')
                    ?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'center',
                    })
                }
              >
                HABLEMOS
                <ArrowDown />
              </button>

              <p className="contact-description">
                Disponible para participar en proyectos, oportunidades
                laborales y desarrollo de soluciones digitales.
              </p>

              <a
                href="/CV_Santiago_Quiroga.pdf"
                download
                className="contact-cv"
              >
                <Download size={16} />
                Descargar CV
              </a>

              <div className="contact-links">
                <a
                  href="mailto:santquiroga10@gmail.com?subject=Contacto%20desde%20Portfolio"
                >
                  Email <ArrowUpRight size={15} />
                </a>

                <a
                  href="https://www.linkedin.com/in/santiagoquiroga10"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn <ArrowUpRight size={15} />
                </a>

                <a
                  href="https://github.com/santiquiroga-s"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub <ArrowUpRight size={15} />
                </a>

                <a
                  href="https://wa.me/542646236375"
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="section-container footer-inner">
          <div>
            <strong>Santiago Quiroga</strong>
            <span>San Juan, Argentina</span>
          </div>

          <div>
            <span>© 2026</span>

            <button
              type="button"
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                })
              }
            >
              Volver arriba
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </footer>

      {/* IMAGE MODAL */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="image-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeImageModal}
          >
            <div
              className="image-modal-toolbar"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={decreaseImageZoom}
                disabled={imageZoom <= 1}
                aria-label="Alejar imagen"
              >
                <Minus size={18} />
              </button>

              <span>
                {Math.round(imageZoom * 100)}%
              </span>

              <button
                type="button"
                onClick={increaseImageZoom}
                disabled={imageZoom >= 3}
                aria-label="Acercar imagen"
              >
                <ZoomIn size={18} />
              </button>

              <button
                type="button"
                onClick={resetImageZoom}
                className="image-reset-button"
                aria-label="Restablecer zoom"
              >
                <RotateCcw size={17} />
                <span>Restablecer</span>
              </button>
            </div>

            <button
              type="button"
              className="image-modal-close"
              onClick={closeImageModal}
              aria-label="Cerrar imagen"
            >
              <X size={28} />
            </button>

            <div
              className={`image-modal-viewport ${
                imageZoom > 1 ? 'is-zoomed' : ''
              }`}
              onClick={(event) => event.stopPropagation()}
              onWheel={handleImageWheel}
            >
              <motion.img
                src={selectedImage.src}
                alt={selectedImage.label}
                className="image-modal-zoom-image"
                animate={{
                  scale: imageZoom,
                }}
                transition={{
                  duration: 0.22,
                  ease: [0.22, 1, 0.36, 1],
                }}
                drag={imageZoom > 1}
                dragConstraints={{
                  top: -600,
                  right: 600,
                  bottom: 600,
                  left: -600,
                }}
                dragElastic={0.08}
              />
            </div>

            <div className="image-modal-caption">
              <span>{selectedImage.label}</span>

              <span>
                {imageZoom > 1
                  ? 'Arrastrá para explorar'
                  : 'Usá + o la rueda para ampliar'}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}