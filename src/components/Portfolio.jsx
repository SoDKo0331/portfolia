import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Github, Instagram, Mail } from 'lucide-react';

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
          <p>Graphic Design / Code / Motion</p>
          <a href="mailto:ssodko243@gmail.com" className="top-contact">
            Contact <ArrowUpRight size={14} />
          </a>
        </header>

        <motion.div className="portrait-wrap" style={{ y: portraitY }}>
          <div className="portrait-halo" />
          <div className="portrait-shape">
            <img src="/assets/portrait-halation.png" alt="" />
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
          <p className="title-sub">Graphic design / code / motion experiments</p>
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
        </div>
      </section>

      <section className="after-poster">
        <p className="system-label">002 / SHORT PROFILE</p>
        <h2>Graphic design. Code. Visual emotion.</h2>
        <p>
          I make posters, edited images, reel visuals, and web interfaces. The work sits between
          graphic design and frontend code.
        </p>
      </section>
    </main>
  );
}
