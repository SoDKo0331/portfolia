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

        <motion.div className="hero-proof" style={{ y: portraitY }}>
          <div className="proof-header"><span>SELECTED SIGNALS</span><span>2025—26</span></div>
          <div className="proof-number">03</div>
          <div className="proof-label">production apps<br />shipped</div>
          <div className="proof-rule" />
          <div className="proof-row"><span>01</span><strong>React Native</strong><small>mobile</small></div>
          <div className="proof-row"><span>02</span><strong>Information Technology</strong><small>degree</small></div>
          <div className="proof-row"><span>03</span><strong>JLPT N2</strong><small>Japanese</small></div>
          <div className="proof-footer"><span>BUILD / TEACH / PLAY</span><b>↗</b></div>
        </motion.div>

        <motion.div className="title-system" style={{ y: textY }}>
          <p className="system-label">001 / VISUAL ARCHIVE / 感情の記録</p>
          <p className="hero-kicker">Mobile engineer <span>×</span> visual maker</p>
          <h1>
            SODKO
            <br />
            <span>BUILDS</span>
          </h1>
          <p className="title-sub">I build digital products with a visual point of view.</p>
        </motion.div>

        <div className="mini-stack">
          {['Mobile apps', 'Web interfaces', 'Visual systems'].map((item) => (
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
        <h2>Ideas into<br />experiences.</h2>
        <div className="profile-grid">
          <p className="lead-copy">
            I turn ideas into useful, expressive digital experiences. My work sits between mobile
            engineering, frontend code and visual design — from production apps to interfaces that
            have a clear mood and a memorable point of view.
          </p>
          <p className="body-copy">
            I enjoy the full process: understanding the problem, shaping the visual direction,
            building the interaction and polishing the details. I care about clarity, speed,
            composition and the small decisions that make technology feel human.
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
            <p className="system-label">003 / WHAT I BUILD</p>
          <div className="work-grid">
            {[
              ['01', 'Mobile products', 'React Native applications shaped for real users, real flows and production release.'],
              ['02', 'Interfaces', 'Responsive web experiences where visual direction and interaction work as one.'],
              ['03', 'Visual systems', 'Posters, edits and motion experiments that give an idea a recognisable voice.'],
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
            <h3>Always<br />exploring.</h3>
          </div>
          <div className="life-copy">
            <p>Curiosity is part of how I work. I learn by trying, teaching and staying active: playing volleyball and basketball, challenging friends at table tennis or chess, riding a bike, and noticing the visual details that can become the next idea.</p>
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
