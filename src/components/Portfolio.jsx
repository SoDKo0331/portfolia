import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
  ArrowRight, Mail, Phone, MapPin, Briefcase,
  GraduationCap, Code2, Terminal, Github, Globe,
  Layers, Trophy, Zap, ChevronDown, ExternalLink
} from 'lucide-react';

const TRANSLATIONS = {
  mn: {
    nav: { about: 'Миний тухай', work: 'Ажлын туршлага', skills: 'Ур чадвар', contact: 'Холбоо барих' },
    hero: {
      status: 'Ажилд ороход бэлэн',
      title: 'Мэдээлэл технологийн инженер',
      location: 'Улаанбаатар, Монгол',
      firstName: 'Норовням',
      lastName: 'Содбаяр',
      subtitle: 'Мобайл инженер. Програм хангамжийн багш. Тасралтгүй суралцагч.',
      cta: 'Би секунд бүрт суралцсаар байна — намайг ажилд авбал би өөрийгөө харуулах болно.',
      hireMe: './холбоо-барих',
      terminal: {
        title: 'Мобайл инженер',
        gpa: '3.6 / 4.0 @ МУИС',
        status: 'Боломжуудад нээлттэй ✅'
      }
    },
    about: {
      label: '// Өөрийн тухай',
      quote: '"Зүгээр л ажил хайж байгаа ч, секунд бүрт суралцсаар байна.',
      quoteHighlight: ' Хэрэв та намайг ажилд авбал би өөрийгөө хэн бэ гэдгийг харуулах болно."',
      cards: {
        edu: { label: 'Боловсрол', value: 'МУИС', sub: 'Програм хангамж — 3.6 GPA' },
        loc: { label: 'Байршил', value: 'Чингэлтэй дүүрэг', sub: 'Улаанбаатар, Монгол' },
        avail: { label: 'Бэлэн байдал', value: 'Ажилд ороход бэлэн', sub: '1.8сая – 2.1сая ₮ хүлээлттэй' },
        lang: { label: 'Хэл', value: 'EN / JA / MN', sub: 'Дунд / Ахисан дунд / Төрөлх' }
      }
    },
    work: {
      title: 'Ажлын туршлага',
      label: '// онцлох',
      exp: [
        {
          role: 'Мобайл инженер',
          company: 'Омни Капитал ББСБ ХХК',
          period: '2025.08 – Одоо',
          duration: '8 сар',
          desc: 'Бизнесийн түвшний мобайл аппликейшнуудын архитектурыг боловсруулж, зах зээлд гаргасан. Төлөвлөлтөөс эхлээд хөгжүүлэлт, нэвтрүүлэлт хүртэлх бүхий л үе шатыг хариуцан ажилладаг.',
          tags: ['React Native', 'Мобайл', 'UI/UX']
        },
        {
          role: 'Програм хангамжийн багш',
          company: 'Tee Education',
          period: '2025.07 – Одоо',
          duration: '9 сар',
          desc: 'Сурагчдад код бичих анхан шатны мэдлэг олгосон. 5 багштай багийг удирдан чиглүүлж, сургалтын хөтөлбөрийн уялдаа холбоог ханган ажиллаж байна.',
          tags: ['Манлайлал', 'Багшлах', 'Багийн ахлагч']
        }
      ]
    },
    skills: {
      title: 'Ур чадвар',
      label: '// технологийн сан',
      tags: { mobile: 'мобайл', lang: 'хэл', web: 'вэб', backend: 'бэкэнд', db: 'өгөгдлийн сан', engine: 'энжин', design: 'дизайн', devops: 'девопс' },
      also: 'Мөн дараах чиглэлээр сайн:',
      extra: ['Волейбол (Мэргэжлийн)', 'Сагсан бөмбөг (Ахисан)', 'Англи хэл', 'Япон хэл (Ахисан дунд)', 'Ачаалал даах', 'Багийн манлайлал', 'Харилцааны ур чадвар']
    },
    contact: {
      label: '// хамтдаа бүтээцгээе',
      title: 'Боломжуудад',
      titleHighlight: 'нээлттэй',
      desc: 'Эхний өдрөөсөө хувь нэмрээ оруулахад бэлэн. Бид хамтдаа юу бүтээж чадахыг хамтдаа судалцгаая.',
      footer: '© 2026 — Н. Содбаяр — сэтгэл гарган бүтээв'
    }
  },
  en: {
    nav: { about: 'About', work: 'Experience', skills: 'Skills', contact: 'Contact' },
    hero: {
      status: 'Available for hire',
      title: 'IT Engineer',
      location: 'Ulaanbaatar, Mongolia',
      firstName: 'Norovnyam',
      lastName: 'Sodbayar',
      subtitle: 'Mobile Engineer. Software Educator. Perpetual Learner.',
      cta: 'I keep learning every second — hire me and I\'ll show you who I am.',
      hireMe: './hire-me',
      terminal: {
        title: 'Mobile Engineer',
        gpa: '3.6 / 4.0 @ NUM',
        status: 'Open to opportunities ✅'
      }
    },
    about: {
      label: '// personal statement',
      quote: '"Just looking for a job, but I keep learning in every second.',
      quoteHighlight: ' So if you hire me, I will show you who I am."',
      cards: {
        edu: { label: 'Education', value: 'NUM', sub: 'Software Eng. — 3.6 GPA' },
        loc: { label: 'Location', value: 'Chingeltei District', sub: 'Ulaanbaatar, MN' },
        avail: { label: 'Availability', value: 'Open to Hire', sub: '1.8M – 2.1M MNT' },
        lang: { label: 'Languages', value: 'EN / JA / MN', sub: 'Int. / Upper-Int. / Native' }
      }
    },
    work: {
      title: 'Experience',
      label: '// selected',
      exp: [
        {
          role: 'Mobile Engineer',
          company: 'Omni Capital NBFI LLC',
          period: 'Aug 2025 – Present',
          duration: '8 months',
          desc: 'Architected and shipped production-grade mobile applications. Owned the full lifecycle from planning and development to deployment.',
          tags: ['React Native', 'Mobile', 'UI/UX']
        },
        {
          role: 'Software Educator',
          company: 'Tee Education',
          period: 'Jul 2025 – Present',
          duration: '9 months',
          desc: 'Taught fundamental coding skills to students. Led and coordinated a team of 5 educators, driving curriculum consistency.',
          tags: ['Leadership', 'Teaching', 'Team Lead']
        }
      ]
    },
    skills: {
      title: 'Skills',
      label: '// tech stack',
      tags: { mobile: 'mobile', lang: 'lang', web: 'web', backend: 'backend', db: 'db', engine: 'engine', design: 'design', devops: 'devops' },
      also: 'Also excels at:',
      extra: ['Volleyball (Pro)', 'Basketball (Adv)', 'English', 'Japanese (Upper-Int)', 'Work Under Pressure', 'Team Leadership', 'Communication']
    },
    contact: {
      label: '// let\'s build something',
      title: 'Open to',
      titleHighlight: 'Opportunities',
      desc: 'Ready to contribute from day one. Let\'s connect and explore what we can build together.',
      footer: '© 2026 — N. Sodbayar — crafted with intent'
    }
  }
};

const SKILLS = [
  { name: 'React Native', pct: 60, tagKey: 'mobile', color: 'green' },
  { name: 'JavaScript', pct: 50, tagKey: 'lang', color: 'green' },
  { name: 'Python',      pct: 50, tagKey: 'lang', color: 'indigo' },
  { name: 'HTML / CSS',  pct: 60, tagKey: 'web', color: 'green' },
  { name: 'Node.js',     pct: 40, tagKey: 'backend', color: 'indigo' },
  { name: 'SQL',         pct: 50, tagKey: 'db', color: 'purple' },
  { name: 'Unity',       pct: 50, tagKey: 'engine', color: 'purple' },
  { name: 'Figma',       pct: 60, tagKey: 'design', color: 'pink' },
  { name: 'GitLab',      pct: 50, tagKey: 'devops', color: 'indigo' },
];

const EXPERIENCES = [
  { color: 'green' },
  { color: 'indigo' },
];

function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 1, 0.5, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function Portfolio() {
  const [lang, setLang] = useState('mn');
  const t = TRANSLATIONS[lang];

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>

      {/* ── Background orbs ── */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        <div className="orb" style={{ width: 700, height: 700, top: '-15%', left: '-10%', background: 'rgba(110, 231, 183, 0.06)' }} />
        <div className="orb" style={{ width: 500, height: 500, bottom: '5%', right: '-10%', background: 'rgba(129, 140, 248, 0.07)' }} />
        <div className="orb" style={{ width: 400, height: 400, top: '40%', left: '40%', background: 'rgba(244, 114, 182, 0.04)' }} />
      </div>

      {/* ── Nav ── */}
      <nav className="glass-panel flex items-center justify-between md:justify-start gap-4 md:gap-10" style={{
        position: 'fixed', top: 20, left: '50%', transform: 'translateX(-50%)',
        zIndex: 100, padding: '12px 20px',
        borderRadius: 40, maxWidth: 680, width: '95%'
      }}>
        <span className="hidden sm:block" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: 600 }}>
          sodbayar.dev
        </span>
        <span className="sm:hidden" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: 600 }}>
          S.
        </span>
        <div className="flex items-center gap-4 md:gap-8 overflow-x-auto no-scrollbar py-1 flex-1">
          {[
            { label: t.nav.about, href: '#about' },
            { label: t.nav.work, href: '#work' },
            { label: t.nav.skills, href: '#skills' },
            { label: t.nav.contact, href: '#contact' }
          ].map(({ label, href }) => (
            <a key={href}
              href={href}
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                color: 'var(--text-secondary)', textDecoration: 'none',
                textTransform: 'uppercase', letterSpacing: '0.05em',
                whiteSpace: 'nowrap',
                transition: 'color 0.2s'
              }}
              onMouseEnter={e => e.target.style.color = 'var(--accent-primary)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
            >
              {label}
            </a>
          ))}
        </div>
        
        {/* Language Toggle */}
        <button 
          onClick={() => setLang(lang === 'mn' ? 'en' : 'mn')}
          className="glass-panel"
          style={{
            padding: '6px 12px',
            fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
            color: 'var(--accent-primary)',
            border: '1px solid var(--glass-border)',
            background: 'rgba(110, 231, 183, 0.1)',
            cursor: 'pointer',
            borderRadius: '20px',
            whiteSpace: 'nowrap'
          }}
        >
          {lang === 'mn' ? 'EN' : 'MN'}
        </button>
      </nav>

      {/* ── Hero ── */}
      <section ref={heroRef} style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '0 6vw', zIndex: 1 }}>
        <motion.div style={{ y: yParallax, opacity: opacityHero }} className="w-full max-w-7xl mx-auto">

          {/* Top badge row */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40 }}
          >
            <span className="badge-status">{t.hero.status}</span>
            <span className="dev-tag">{t.hero.title}</span>
            <span className="dev-tag dev-tag-purple">{t.hero.location}</span>
          </motion.div>

          {/* Headline */}
          <div style={{ overflow: 'hidden', marginBottom: 28 }}>
            <motion.h1
              initial={{ opacity: 0, y: 90 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 12vw, 9rem)',
                fontWeight: 800,
                lineHeight: 0.95,
                letterSpacing: '-0.03em',
                color: 'var(--text-primary)',
              }}
            >
              {t.hero.firstName}<br />
              <span className="text-gradient-green">{t.hero.lastName}</span>
            </motion.h1>
          </div>

          {/* Mono subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.85rem, 1.5vw, 1.1rem)',
              color: 'var(--text-secondary)',
              marginBottom: 52, maxWidth: 560, lineHeight: 1.8
            }}
          >
            <span style={{ color: 'var(--text-muted)' }}>//</span>{' '}
            {t.hero.subtitle}<br/>
            <span style={{ color: 'var(--text-muted)' }}>//</span>{' '}
            {t.hero.cta}
          </motion.p>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}
          >
            <a href="#contact" className="btn-glass">
              <Terminal size={15} /> {t.hero.hireMe}
            </a>
            <a href="mailto:ssodko243@gmail.com"
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.78rem',
                color: 'var(--text-secondary)', textDecoration: 'none',
                display: 'flex', alignItems: 'center', gap: 8,
                transition: 'color 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-primary)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
            >
              <Mail size={15} /> ssodko243@gmail.com
            </a>
            <a href="tel:94918249"
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.78rem',
                color: 'var(--text-secondary)', textDecoration: 'none',
                display: 'flex', alignItems: 'center', gap: 8,
                transition: 'color 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-primary)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
            >
              <Phone size={15} /> +976 9491-8249
            </a>
          </motion.div>

          {/* Floating terminal snippet */}
          <motion.div
            initial={{ opacity: 0, x: 60, rotate: 4 }}
            animate={{ opacity: 1, x: 0, rotate: 3 }}
            transition={{ duration: 1, delay: 1.1, ease: [0.25, 1, 0.5, 1] }}
            className="glass-terminal hidden lg:block"
            style={{
              position: 'absolute', right: '3vw', top: '22vh',
              width: 'clamp(280px, 28vw, 420px)',
              padding: '20px 24px', fontFamily: 'var(--font-mono)'
            }}
          >
            {/* Terminal chrome */}
            <div style={{ display: 'flex', gap: 7, marginBottom: 18 }}>
              <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#FF5F57' }} />
              <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#FFBD2E' }} />
              <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#28C840' }} />
              <span style={{ marginLeft: 'auto', fontSize: '0.65rem', color: 'var(--text-muted)' }}>sodbayar_dev.sh</span>
            </div>
            {[
              { line: '$ whoami', color: 'var(--text-secondary)' },
              { line: `→ ${t.hero.firstName} ${t.hero.lastName}`, color: 'var(--accent-primary)' },
              { line: '$ cat title.txt', color: 'var(--text-secondary)' },
              { line: `→ ${t.hero.terminal.title}`, color: 'var(--accent-secondary)' },
              { line: '$ cat gpa.txt', color: 'var(--text-secondary)' },
              { line: `→ ${t.hero.terminal.gpa}`, color: 'var(--accent-primary)' },
              { line: '$ cat status.txt', color: 'var(--text-secondary)' },
              { line: `→ ${t.hero.terminal.status}`, color: 'var(--accent-tertiary)' },
              { line: '█', color: 'var(--accent-primary)', blink: true },
            ].map((item, i) => (
              <div key={i} style={{
                fontSize: '0.75rem', lineHeight: 1.9,
                color: item.color,
                animation: item.blink ? 'pulse-green 1s steps(1) infinite' : undefined
              }}>
                {item.line}
              </div>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)' }}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={22} style={{ color: 'var(--text-muted)' }} />
          </motion.div>
        </motion.div>
      </section>

      {/* ── About ── */}
      <section id="about" className="py-16 md:py-32" style={{ position: 'relative', zIndex: 1, paddingLeft: '6vw', paddingRight: '6vw' }}>
        <FadeIn>
          <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {/* Big quote glass panel */}
            <div className="glass-elevated lg:col-span-2 p-8 md:p-14">
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 28 }}>
                {t.about.label}
              </p>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2.4rem)', fontWeight: 700, lineHeight: 1.35, color: 'var(--text-primary)', maxWidth: 700 }}>
                {t.about.quote}
                <span className="text-gradient-green">{t.about.quoteHighlight}</span>
              </p>
            </div>

            {/* Info cards */}
            {[
              { icon: <GraduationCap size={20} />, ...t.about.cards.edu, color: 'green' },
              { icon: <MapPin size={20} />, ...t.about.cards.loc, color: 'indigo' },
              { icon: <Briefcase size={20} />, ...t.about.cards.avail, color: 'green' },
              { icon: <Globe size={20} />, ...t.about.cards.lang, color: 'purple' },
            ].map((card, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="glass-panel glass-hover" style={{ padding: '36px 32px', height: '100%' }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: card.color === 'green' ? 'rgba(110,231,183,0.1)' : card.color === 'indigo' ? 'rgba(129,140,248,0.1)' : 'rgba(244,114,182,0.1)',
                    border: `1px solid ${card.color === 'green' ? 'rgba(110,231,183,0.2)' : card.color === 'indigo' ? 'rgba(129,140,248,0.2)' : 'rgba(244,114,182,0.2)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: card.color === 'green' ? 'var(--accent-primary)' : card.color === 'indigo' ? 'var(--accent-secondary)' : 'var(--accent-tertiary)',
                    marginBottom: 20
                  }}>
                    {card.icon}
                  </div>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>{card.label}</p>
                  <p style={{ fontWeight: 600, marginBottom: 6, fontSize: '1.05rem' }}>{card.value}</p>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{card.sub}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── Selected Work ── */}
      <section id="work" className="py-12 md:py-24" style={{ position: 'relative', zIndex: 1, paddingLeft: '6vw', paddingRight: '6vw' }}>
        <FadeIn>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 60 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800 }}>
                {t.work.title}
              </h2>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>{t.work.label}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {t.work.exp.map((exp, i) => (
                <FadeIn key={i} delay={i * 0.15}>
                  <div
                    className="glass-panel p-8 md:p-12 flex flex-col md:grid md:grid-cols-[1fr_auto] gap-8 items-start"
                    style={{
                      transition: 'border-color 0.3s, box-shadow 0.3s',
                      cursor: 'default'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = EXPERIENCES[i].color === 'green' ? 'rgba(110,231,183,0.35)' : 'rgba(129,140,248,0.35)';
                      e.currentTarget.style.boxShadow = EXPERIENCES[i].color === 'green' ? 'var(--glow-green)' : 'var(--glow-indigo)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'var(--glass-border)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
                        {exp.tags.map(t => (
                          <span key={t} className={`dev-tag${EXPERIENCES[i].color === 'indigo' ? ' dev-tag-purple' : ''}`}>{t}</span>
                        ))}
                      </div>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', fontWeight: 700, marginBottom: 8 }}>{exp.role}</h3>
                      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: EXPERIENCES[i].color === 'green' ? 'var(--accent-primary)' : 'var(--accent-secondary)', marginBottom: 20 }}>
                        {exp.company}
                      </p>
                      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, maxWidth: 540, fontSize: '0.95rem' }}>{exp.desc}</p>
                    </div>
                    <div className="md:text-right min-w-[140px]">
                      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: 8 }}>{exp.period}</p>
                      <div className={`dev-tag${EXPERIENCES[i].color === 'indigo' ? ' dev-tag-purple' : ''}`} style={{ display: 'inline-block' }}>{exp.duration}</div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── Skills ── */}
      <section id="skills" className="pb-20 md:pb-32" style={{ position: 'relative', zIndex: 1, paddingLeft: '6vw', paddingRight: '6vw' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 60 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800 }}>
                {t.skills.title}
              </h2>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>{t.skills.label}</span>
            </div>
          </FadeIn>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
            {SKILLS.map((skill, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div className="glass-panel glass-hover" style={{ padding: '32px 28px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: '1rem', marginBottom: 8 }}>{skill.name}</p>
                      <span className={`dev-tag${skill.color === 'indigo' ? ' dev-tag-purple' : skill.color === 'pink' ? ' dev-tag-pink' : ''}`}>
                        {t.skills.tags[skill.tagKey]}
                      </span>
                    </div>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 600,
                      color: skill.color === 'green' ? 'var(--accent-primary)' : skill.color === 'indigo' ? 'var(--accent-secondary)' : 'var(--accent-tertiary)'
                    }}>
                      {skill.pct}
                    </span>
                  </div>
                  <div className="skill-track">
                    <motion.div
                      className="skill-fill"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: i * 0.04, ease: [0.25, 1, 0.5, 1] }}
                      style={{
                        background: skill.color === 'green'
                          ? 'linear-gradient(90deg, var(--accent-primary), #34D399)'
                          : skill.color === 'indigo'
                          ? 'linear-gradient(90deg, var(--accent-secondary), #A78BFA)'
                          : 'linear-gradient(90deg, var(--accent-tertiary), #FB7185)',
                        boxShadow: skill.color === 'green'
                          ? '0 0 12px rgba(110,231,183,0.5)'
                          : skill.color === 'indigo'
                          ? '0 0 12px rgba(129,140,248,0.5)'
                          : '0 0 12px rgba(244,114,182,0.5)'
                      }}
                    />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Sports / Soft skills strip */}
          <FadeIn delay={0.3}>
            <div className="glass-panel" style={{ marginTop: 32, padding: '36px 40px', display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Trophy size={20} style={{ color: 'var(--accent-amber)', flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{t.skills.also}</span>
              </div>
              {t.skills.extra.map(s => (
                <span key={s} className="dev-tag dev-tag-purple">{s}</span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="pb-16 md:pb-28" style={{ position: 'relative', zIndex: 1, paddingLeft: '6vw', paddingRight: '6vw' }}>
        <FadeIn>
          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            <div className="glass-elevated"
              style={{ padding: 'clamp(40px, 6vw, 72px)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}
            >
              {/* back glow effect */}
              <div style={{
                position: 'absolute', top: '-30%', left: '50%', transform: 'translateX(-50%)',
                width: 400, height: 300,
                background: 'radial-gradient(circle, rgba(110,231,183,0.08) 0%, transparent 70%)',
                pointerEvents: 'none'
              }} />
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 28 }}>
                {t.contact.label}
              </p>
              <h2 style={{
                fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 5vw, 4rem)',
                fontWeight: 800, marginBottom: 20, lineHeight: 1.1
              }}>
                {t.contact.title} <span className="text-gradient-green">{t.contact.titleHighlight}</span>
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, maxWidth: 500, margin: '0 auto 48px', fontSize: '0.95rem' }}>
                {t.contact.desc}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
                <a href="mailto:ssodko243@gmail.com" className="btn-glass">
                  <Mail size={16} /> ssodko243@gmail.com
                </a>
                <a href="tel:94918249" className="btn-glass" style={{
                  background: 'rgba(129,140,248,0.1)',
                  color: 'var(--accent-secondary)',
                  borderColor: 'rgba(129,140,248,0.3)'
                }}>
                  <Phone size={16} /> +976 9491-8249
                </a>
              </div>
            </div>

            <p style={{
              textAlign: 'center', marginTop: 60,
              fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
              color: 'var(--text-muted)', letterSpacing: '0.1em'
            }}>
              {t.contact.footer}
            </p>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
