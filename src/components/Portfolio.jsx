import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowRight,
  Briefcase,
  GraduationCap,
  MapPin,
  Mail,
  Phone,
  Code2,
  Trophy,
  UserCircle2
} from 'lucide-react';

export default function Portfolio() {
  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Framer motion variants
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="min-h-screen grain-bg">
      {/* Editorial Navigation */}
      <nav className="fixed top-0 w-full z-50 px-8 py-6 mix-blend-difference text-[var(--color-bg-base)]">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm font-medium tracking-widest uppercase">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            N. Sodbayar
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.2 }} className="flex space-x-12">
            <a href="#about" className="hover:opacity-70 transition-opacity">Philosophy</a>
            <a href="#work" className="hover:opacity-70 transition-opacity">Selected Work</a>
            <a href="#craft" className="hover:opacity-70 transition-opacity">Craft</a>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center px-8 overflow-hidden pointer-events-none">
        <motion.div 
          style={{ y: yHero, opacity: opacityHero }}
          className="max-w-7xl mx-auto w-full relative z-10"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-[var(--color-text-muted)] tracking-[0.2em] text-sm uppercase mb-6 pl-2"
          >
            Digital Craft & Engineering
          </motion.h2>
          
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
            className="text-6xl md:text-8xl lg:text-9xl font-semibold leading-[0.95] tracking-tight text-[var(--color-text-primary)] mb-8"
          >
            Articulating <br/>
            <span className="italic font-light text-[var(--color-accent-bronze)]">Technology.</span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="max-w-xl pl-2 pointer-events-auto"
          >
            <p className="text-xl md:text-2xl text-[var(--color-text-muted)] leading-relaxed font-light">
              Information Technology Engineer focusing on immersive digital objects and mobile experiences.
            </p>
          </motion.div>
        </motion.div>

        {/* Decorative Skeuomorphic Element */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 0.8, ease: "easeOut" }}
          className="absolute right-[5%] top-[20%] w-[30vw] h-[50vh] sk-glass-metal -z-10 transform rotate-[-5deg]"
        />
      </section>

      {/* Identity / Identity Block */}
      <section id="about" className="py-32 px-8 relative z-20">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16"
        >
          {/* Identity Left Column */}
          <motion.div variants={fadeIn} className="col-span-1 md:col-span-4">
            <div className="sk-panel-elevated p-10 h-full flex flex-col justify-between">
              <div>
                <UserCircle2 size={32} className="text-[var(--color-accent-bronze)] mb-8" strokeWidth={1} />
                <h3 className="text-2xl font-bold mb-2">Norovnyam Sodbayar</h3>
                <p className="text-[var(--color-text-muted)] font-medium mb-12">Chingeltei District, Ulaanbaatar</p>
                
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-[var(--color-bg-inset)] pb-4">
                    <span className="text-sm text-[var(--color-text-light)] uppercase tracking-wider">Birthdate</span>
                    <span className="font-medium text-[var(--color-text-primary)]">2004-03-31</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-[var(--color-bg-inset)] pb-4">
                    <span className="text-sm text-[var(--color-text-light)] uppercase tracking-wider">Education</span>
                    <span className="font-medium text-[var(--color-text-primary)] text-right">National University<br/>of Mongolia</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Statement Right Column */}
          <motion.div variants={fadeIn} className="col-span-1 md:col-span-8 flex flex-col justify-center">
            <div className="sk-panel-inset p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <h1 className="text-9xl font-serif">"</h1>
              </div>
              <h3 className="text-[var(--color-text-light)] uppercase tracking-[0.2em] text-xs mb-8">Personal Philosophy</h3>
              <p className="text-3xl md:text-4xl lg:text-5xl font-serif leading-tight text-[var(--color-text-primary)] relative z-10">
                “Just looking for a job, but I keep learning in every second. So <span className="italic text-[var(--color-accent-bronze)]">if you hire me, I will show you who I am.</span>”
              </p>
              
              <div className="mt-12 flex gap-6">
                <a href="#contact" className="sk-button inline-flex items-center gap-3 px-8 py-4 text-sm font-bold uppercase tracking-widest text-[var(--color-accent-olive)]">
                  Contact Me <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Selected Work (Experience presented as premium case studies) */}
      <section id="work" className="py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24 text-center"
          >
            <h2 className="text-5xl font-semibold mb-6">Selected Work</h2>
            <p className="text-[var(--color-text-muted)] max-w-xl mx-auto">A curation of professional tenures and executed craft.</p>
          </motion.div>

          {/* Project 1: Omni Capital */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="group relative mb-32"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 relative z-10">
                <div className="sk-object-extruded h-[500px] w-full p-4 overflow-hidden">
                  <div className="w-full h-full bg-[#E8E6E1] rounded-lg shadow-inner flex flex-col justify-center items-center text-[var(--color-text-light)] transition-transform duration-700 group-hover:scale-105">
                    <Briefcase size={64} strokeWidth={1} className="mb-6 opacity-30" />
                    <span className="font-serif italic text-2xl opacity-60">Omni Capital NBFI</span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-5 relative z-20 lg:-ml-16 mt-8 lg:mt-0">
                <div className="sk-glass-metal p-12">
                  <div className="flex gap-3 mb-8">
                    <span className="sk-panel-inset px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">Mobile Engineering</span>
                    <span className="sk-panel-inset px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">2025</span>
                  </div>
                  <h3 className="text-4xl font-semibold mb-4">Mobile Architect</h3>
                  <p className="text-[var(--color-text-muted)] leading-loose mb-8">
                    Primary mobile application developer. Tasked with the architecture, maintenance, and seamless deployment of high-performing, fluid enterprise mobile applications.
                  </p>
                  <button className="flex items-center gap-2 text-[var(--color-accent-burgundy)] font-medium uppercase tracking-wide text-sm hover:opacity-70 transition-opacity">
                    Explore Details <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Project 2: Tee Education */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="group relative"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-row-reverse">
              <div className="lg:col-span-5 relative z-20 lg:-mr-16 mt-8 lg:mt-0 order-2 lg:order-1">
                <div className="sk-glass-metal p-12">
                  <div className="flex gap-3 mb-8">
                    <span className="sk-panel-inset px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">Leadership</span>
                    <span className="sk-panel-inset px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">2025</span>
                  </div>
                  <h3 className="text-4xl font-semibold mb-4">Software Educator</h3>
                  <p className="text-[var(--color-text-muted)] leading-loose mb-8">
                    Guided the next generation of engineers in fundamental coding practices while managing and coordinating a collaborative team of five individuals.
                  </p>
                  <button className="flex items-center gap-2 text-[var(--color-accent-burgundy)] font-medium uppercase tracking-wide text-sm hover:opacity-70 transition-opacity">
                    Explore Details <ArrowRight size={16} />
                  </button>
                </div>
              </div>
              <div className="lg:col-span-7 relative z-10 order-1 lg:order-2">
                <div className="sk-object-extruded h-[500px] w-full p-4 overflow-hidden">
                  <div className="w-full h-full bg-[#E1E3E8] rounded-lg shadow-inner flex flex-col justify-center items-center text-[var(--color-text-light)] transition-transform duration-700 group-hover:scale-105">
                    <GraduationCap size={64} strokeWidth={1} className="mb-6 opacity-30" />
                    <span className="font-serif italic text-2xl opacity-60">Tee Education</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Craft & Technical Acumen (Skills) */}
      <section id="craft" className="py-32 px-8 bg-[#F0EFEA]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-16">
            <div className="w-full md:w-1/3">
              <h2 className="text-4xl font-semibold mb-6">The Craft</h2>
              <p className="text-[var(--color-text-muted)] leading-loose mb-12">
                A meticulous blend of frontend engineering, systems thought, and physical discipline. True performance stems from both digital algorithms and athletic endurance.
              </p>
              
              <div className="sk-panel-inset p-8">
                <h4 className="flex items-center gap-3 text-lg font-semibold mb-6">
                  <Trophy size={20} className="text-[var(--color-accent-bronze)]" /> Physical Excellence
                </h4>
                <ul className="space-y-4">
                  <li className="flex justify-between items-center border-b border-[var(--color-bg-base)] pb-2">
                    <span className="text-[var(--color-text-muted)]">Volleyball</span>
                    <span className="font-mono text-sm text-[var(--color-text-primary)]">Professional</span>
                  </li>
                  <li className="flex justify-between items-center border-b border-[var(--color-bg-base)] pb-2">
                    <span className="text-[var(--color-text-muted)]">Basketball</span>
                    <span className="font-mono text-sm text-[var(--color-text-primary)]">Advanced</span>
                  </li>
                  <li className="flex justify-between items-center pb-2">
                    <span className="text-[var(--color-text-muted)]">Table Tennis</span>
                    <span className="font-mono text-sm text-[var(--color-text-primary)]">Advanced</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Tooling Specs */}
               {[
                { name: 'React Native', level: 60 },
                { name: 'JavaScript / Node', level: 50 },
                { name: 'Python', level: 50 },
                { name: 'SQL', level: 50 },
                { name: 'Unity', level: 50 },
                { name: 'Figma UI/UX', level: 60 }
              ].map((skill, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="sk-panel-elevated p-8 relative overflow-hidden"
                >
                  <Code2 size={24} strokeWidth={1} className="text-[var(--color-text-light)] mb-8" />
                  <div className="flex justify-between items-end mb-4">
                    <span className="text-xl font-medium">{skill.name}</span>
                    <span className="font-mono text-sm text-[var(--color-text-muted)]">{skill.level}% Ratio</span>
                  </div>
                  {/* Tactile track and knob */}
                  <div className="sk-track h-4 w-full relative flex items-center px-1">
                    <div 
                      className="absolute left-1 h-2 bg-gradient-to-r from-[var(--color-accent-bronze)] to-[var(--color-text-primary)] rounded-full opacity-60" 
                      style={{ width: `calc(${skill.level}% - 8px)` }} 
                    />
                    <div 
                      className="sk-knob h-6 w-6 z-10 transition-all duration-1000 ease-out absolute shadow-lg border border-white/50 cursor-pointer"
                      style={{ left: `calc(${skill.level}% - 12px)` }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Contact Panels */}
      <footer id="contact" className="py-24 px-8 relative overflow-hidden">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="sk-panel-elevated p-16 w-full"
          >
            <h2 className="text-5xl font-semibold mb-8">Initiate Dialogue</h2>
            <p className="text-xl text-[var(--color-text-muted)] mb-12">
              For engineering inquiries, design collaborations, or athletic challenges.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-8">
              <a href="mailto:ssodko243@gmail.com" className="sk-button flex items-center gap-4 px-8 py-4 font-medium">
                <Mail size={20} className="text-[var(--color-accent-olive)]" />
                ssodko243@gmail.com
              </a>
              <a href="tel:94918249" className="sk-button flex items-center gap-4 px-8 py-4 font-medium">
                <Phone size={20} className="text-[var(--color-accent-olive)]" />
                +(976) 9491-8249
              </a>
            </div>
          </motion.div>

          <p className="mt-24 text-[var(--color-text-light)] text-sm tracking-widest uppercase">
            Curated and Engineered by N. Sodbayar © 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
