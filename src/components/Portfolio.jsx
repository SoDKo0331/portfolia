import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDownToLine, ArrowUpRight, Github, Instagram, Mail } from 'lucide-react';

const annotations = [
  {
    className: 'note-a',
    text: 'SODKO creates graphic design, posters, edited visuals, and reel-style motion pieces.',
    accent: 'График дизайн',
  },
  {
    className: 'note-b',
    text: 'Also writes code for web interfaces, visual systems, and interactive portfolio work.',
    accent: 'Code + visuals',
  },
];

const fragments = ['Poster Design', 'Image Edit', 'Code / UI'];

function Fish({ className }) {
  return (
    <motion.div
      className={`fish-sheet ${className}`}
      animate={{ x: [0, 18, -10, 0], y: [0, -8, 6, 0], rotate: [-3, 4, -2, -3] }}
      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
    >
      <img src="/assets/single-blue-fish.png" alt="" />
    </motion.div>
  );
}

export default function Portfolio() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -35]);

  return (
    <main className="poster-site" ref={ref}>
      <div className="poster-grain" />
      <div className="poster-scan" />

      <section className="poster-hero">
        <header className="poster-topline">
          <a href="#top" className="brand-mark">SODKO</a>
          <p>Mobile Engineering / Code / Visuals</p>
          <a href="mailto:ssodko243@gmail.com" className="top-contact">
            Contact <ArrowUpRight size={14} />
          </a>
        </header>

        <motion.div className="portrait-wrap" style={{ y: portraitY }}>
          <div className="portrait-halo" />
          <div className="portrait-shape" aria-label="Abstract chrome orb visual">
            <div className="orb-ring orb-ring-one" />
            <div className="orb-ring orb-ring-two" />
            <div className="orb-core"><span /></div>
            <div className="orb-glint" />
          </div>
        </motion.div>

        <Fish className="fish-one" />
        <Fish className="fish-two" />
        <Fish className="fish-three" />
        <Fish className="fish-four" />
        <Fish className="fish-five" />

        <motion.div className="title-system" style={{ y: textY }}>
          <p className="system-label">001 / VISUAL ARCHIVE / 感情の記録</p>
          <h1>
            SODKO
            <br />
            <span>VISUAL</span>
          </h1>
          <p className="title-sub">Mobile engineering / code / visual experiments</p>
        </motion.div>

        {annotations.map((item) => (
          <motion.article
            key={item.className}
            className={`poster-note ${item.className}`}
            initial={{ opacity: 0, filter: 'blur(12px)', y: 16 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
          >
            <span />
            <p>{item.text}</p>
            <strong>{item.accent}</strong>
          </motion.article>
        ))}

        <div className="mini-stack">
          {fragments.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>

        <div className="poster-actions">
          <a href="https://instagram.com/n_sodbayar">
            <Instagram size={15} /> Instagram
          </a>
          <a href="https://github.com/SoDKo0331">
            <Github size={15} /> GitHub
          </a>
          <a href="mailto:ssodko243@gmail.com">
            <Mail size={15} /> Email
          </a>
          <a href="/assets/CV-Norovnyam-Sodbayar-2026.pdf" download>
            <ArrowDownToLine size={15} /> CV download
          </a>
        </div>
      </section>

      <section className="after-poster">
        <div className="section-heading">
          <p className="system-label">002 / SHORT PROFILE</p>
          <span className="section-index">[ 03—06 ]</span>
        </div>
        <h2>Graphic design.<br />Code. Visual emotion.</h2>
        <div className="profile-grid">
          <p className="lead-copy">
            I build visual worlds that feel a little unexpected. My work moves between graphic
            design, frontend code, image editing and motion — always looking for the point where
            a strong idea becomes something you can see, feel and interact with.
          </p>
          <p className="body-copy">
            I like making things from a blank canvas: a poster with a clear attitude, a sharp image
            edit, a short reel that catches attention, or a web interface that feels alive. I care
            about composition, type, color and the small details that make a digital experience
            memorable.
          </p>
        </div>

        <div className="resume-section">
          <div className="resume-title">
            <p className="system-label">002.1 / PROFILE</p>
            <h3>Norovnyam<br />Sodbayar</h3>
            <a className="cv-button" href="/assets/CV-Norovnyam-Sodbayar-2026.pdf" download><ArrowDownToLine size={16} /> Download CV</a>
          </div>
          <div className="resume-details">
            <div className="resume-block"><span className="resume-label">Currently</span><h4>Mobile Engineer</h4><p>Omni Capital NBFI · Aug 2025 — present</p><p>Worked across 2–4 projects and helped ship 3 production mobile applications.</p></div>
            <div className="resume-block"><span className="resume-label">Also</span><h4>IT Teacher</h4><p>TEEE · Jul 2025 — present</p><p>Teaching school students foundational IT and coding skills.</p></div>
            <div className="resume-block"><span className="resume-label">Education</span><h4>BSc Information Technology</h4><p>National University of Mongolia · 2022 — 2026 · GPA 3.6</p></div>
          </div>
        </div>

        <div className="skills-section">
          <p className="system-label">002.2 / TOOLKIT</p>
          <div className="skill-cloud">{['React Native', 'Python', 'SQL', 'Java', 'JavaScript', 'HTML / CSS', 'PostgreSQL', 'React', 'Node.js', 'Spring Boot', 'Figma', 'GitLab'].map((skill, i) => <span className={i === 0 ? 'skill-primary' : ''} key={skill}>{skill}</span>)}</div>
          <div className="language-row"><span>Languages</span><strong>English — Intermediate</strong><strong>Japanese — Upper-intermediate (JLPT N2)</strong></div>
        </div>

        <div className="work-section">
          <p className="system-label">003 / WHAT I DO</p>
          <div className="work-grid">
            {[
              ['01', 'Graphic design', 'Posters, campaign visuals and visual systems with a distinct point of view.'],
              ['02', 'Image + motion', 'Edited images, reel visuals and short-form experiments built to move.'],
              ['03', 'Code / UI', 'Responsive web interfaces where design and interaction work as one.'],
            ].map(([number, title, copy]) => (
              <article className="work-card" key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
                <ArrowUpRight size={18} />
              </article>
            ))}
          </div>
        </div>

        <div className="life-section">
          <div>
            <p className="system-label">004 / OFF THE CLOCK</p>
            <h3>Curious by default.</h3>
          </div>
          <div className="life-copy">
            <p>When I am away from a screen, I stay active and curious. I play volleyball and basketball at an advanced level, enjoy table tennis and football, ride a bike, play chess, and keep collecting the visual details that later become ideas.</p>
            <div className="interest-tags">
              <span>volleyball</span><span>basketball</span><span>table tennis</span><span>football</span><span>cycling</span><span>chess</span>
            </div>
          </div>
        </div>

        <footer className="site-footer">
          <p>Have an idea worth making visible?</p>
          <a href="mailto:ssodko243@gmail.com">Let's talk <ArrowUpRight size={18} /></a>
        </footer>
      </section>
    </main>
  );
}
