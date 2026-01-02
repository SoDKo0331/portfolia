import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Instagram, Mountain, Palette, Building2 } from 'lucide-react';

export default function HeyMongol() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Determine active section
      const sections = ['hero', 'about', 'content', 'contact'];
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

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="relative bg-[#FFF8E7] text-[#001C3D] overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] -left-24 w-72 h-72 border-[40px] border-[#0055A4]/10 rounded-full animate-[float_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-[10%] -right-20 w-64 h-64 border-[30px] border-[#D32F2F]/10 rotate-45 animate-[float_10s_ease-in-out_infinite_reverse]" />
        <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-gradient-to-br from-[#FFB300]/5 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-[#FFF8E7]/95 backdrop-blur-lg shadow-lg border-b-4 border-[#0055A4]' 
          : 'bg-transparent border-b-2 border-[#0055A4]/30'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="relative group cursor-pointer" onClick={() => scrollToSection('hero')}>
              <h1 className="text-4xl md:text-5xl font-black tracking-[0.2em] bg-gradient-to-r from-[#0055A4] via-[#D32F2F] to-[#0055A4] bg-clip-text text-transparent animate-[fadeIn_1s_ease_0.3s_both]">
                HEY MONGOL
              </h1>
              <div className="absolute -bottom-1 left-0 h-1 bg-[#FFB300] transition-all duration-500 w-0 group-hover:w-3/5" />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8 animate-[fadeIn_1s_ease_0.5s_both]">
              {[
                { id: 'about', label: 'Бидний тухай' },
                { id: 'content', label: 'Контент' },
                { id: 'contact', label: 'Холбоо барих' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative text-base font-semibold transition-colors duration-300 ${
                    activeSection === item.id ? 'text-[#D32F2F]' : 'text-[#001C3D] hover:text-[#D32F2F]'
                  }`}
                >
                  {item.label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#D32F2F] transition-all duration-300 ${
                    activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-[#0055A4]/10 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden overflow-hidden transition-all duration-500 ${
            isMenuOpen ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'
          }`}>
            <nav className="flex flex-col gap-4 py-4 border-t border-[#0055A4]/20">
              {[
                { id: 'about', label: 'Бидний тухай' },
                { id: 'content', label: 'Контент' },
                { id: 'contact', label: 'Холбоо барих' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left px-4 py-2 text-lg font-semibold text-[#001C3D] hover:text-[#D32F2F] hover:bg-[#0055A4]/5 rounded-lg transition-all"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0055A4]/90 via-[#D32F2F]/80 to-[#001C3D]/95 animate-[slowZoom_20s_ease-in-out_infinite_alternate]">
          <div 
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1528150230181-99bbf7932f82?auto=format&fit=crop&w=1600&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        </div>
        
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(255, 179, 0, 0.1) 50px, rgba(255, 179, 0, 0.1) 51px),
                           repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(255, 179, 0, 0.1) 50px, rgba(255, 179, 0, 0.1) 51px)`
        }} />

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-[0.15em] leading-tight mb-8 animate-[fadeInUp_1s_ease_0.5s_both]">
            МОНГОЛ ОРНЫГ
            <br />
            <span className="bg-gradient-to-r from-[#FFB300] to-[#FFF8E7] bg-clip-text text-transparent">
              ШИНЭЭР НЭЭ
            </span>
          </h1>
          
          <div className="w-24 h-1 bg-[#FFB300] mx-auto mb-8 animate-[expandWidth_1s_ease_0.9s_both]" />
          
          <p className="text-xl md:text-3xl text-white/95 tracking-wider mb-12 font-light animate-[fadeInUp_1s_ease_0.7s_both]">
            Уламжлал болон орчин үеийн гайхамшигт нэгдэл
          </p>
          
          <button
            onClick={() => scrollToSection('content')}
            className="group relative px-12 py-5 bg-[#FFB300] text-[#001C3D] font-bold text-lg rounded-full overflow-hidden shadow-2xl hover:shadow-[#FFB300]/50 transition-all duration-500 hover:-translate-y-1 animate-[fadeInUp_1s_ease_1.1s_both]"
          >
            <span className="relative z-10">Эхлэх</span>
            <div className="absolute inset-0 bg-white/30 scale-0 group-hover:scale-150 rounded-full transition-transform duration-700" />
          </button>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown className="text-white/70" size={32} />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl md:text-6xl font-black text-[#0055A4] tracking-wider mb-4 relative inline-block">
              БИДНИЙ ТУХАЙ
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-1 bg-[#D32F2F]" />
            </h2>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl text-[#8D8D8D] leading-relaxed text-center animate-on-scroll">
              <span className="text-[#0055A4] font-semibold">"Hey Mongol"</span> бол Монгол орны гайхамшигт байгаль, соёл, нүүдэлчин ахуйг 
              дэлхий дахинд болон залуу үедээ таниулах зорилготой платформ юм. Бид эртний 
              уламжлалыг хадгалахын зэрэгцээ орчин үеийн өнөө цагийг холбож, Монголын 
              өвөрмөц онцлогийг сонирхолтой контентоор хүргэнэ.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section id="content" className="relative py-24 md:py-32 px-6 bg-gradient-to-b from-transparent to-[#0055A4]/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 animate-on-scroll">
            <h2 className="text-4xl md:text-6xl font-black text-[#0055A4] tracking-wider mb-4 relative inline-block">
              ОНЦЛОХ КОНТЕНТ
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-1 bg-[#D32F2F]" />
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            {[
              {
                icon: Mountain,
                title: 'Аялал жуулчлал',
                description: 'Хөвсгөл нуураас Говийн элсэн манхан хүртэлх хамгийн сонирхолтой аяллын маршрутууд, нуугдмал газруудын танилцуулга, аяллын практик зөвлөмжүүд.',
                color: 'from-[#0055A4] to-[#0055A4]/70',
                delay: '0s'
              },
              {
                icon: Palette,
                title: 'Соёл уламжлал',
                description: 'Монгол наадам, ёс заншил, гэр бүлийн баяр ёслол, үндэсний хувцас, эртний түүх болон өв уламжлалын өнөөгийн утга учир.',
                color: 'from-[#D32F2F] to-[#D32F2F]/70',
                delay: '0.2s'
              },
              {
                icon: Building2,
                title: 'Lifestyle',
                description: 'Орчин үеийн Улаанбаатар хотын амьдралын хэв маяг, кафе соёл, урлаг, хөгжим, залуучуудын хандлага болон шинэ үеийн бизнес.',
                color: 'from-[#FFB300] to-[#FFB300]/70',
                delay: '0.4s'
              }
            ].map((card, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 animate-on-scroll border-l-8 border-[#0055A4] hover:border-[#D32F2F] overflow-hidden"
                style={{ animationDelay: card.delay }}
              >
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                
                {/* Icon */}
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${card.color} text-white mb-6 group-hover:scale-110 transition-transform duration-500`}>
                  <card.icon size={32} />
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-bold text-[#001C3D] mb-4 group-hover:text-[#0055A4] transition-colors">
                  {card.title}
                </h3>
                <p className="text-[#8D8D8D] leading-relaxed text-base">
                  {card.description}
                </p>
                
                {/* Hover Accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0055A4] via-[#D32F2F] to-[#FFB300] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="relative bg-[#001C3D] text-white py-20 px-6 overflow-hidden">
        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0055A4] via-[#D32F2F] to-[#FFB300]" />
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-black tracking-[0.2em] text-[#FFB300] mb-6">
            HEY MONGOL
          </h2>
          
          <p className="text-white/80 text-lg mb-3">
            &copy; 2026 Hey Mongol. Бүх эрх хуулиар хамгаалагдсан.
          </p>
          
          <p className="text-white/70 mb-8">
            Монголын соёл, уламжлалыг дэлхийд таниулах гүүр
          </p>
          
          <a
            href="https://www.instagram.com/hey.mongol/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 text-[#FFB300] hover:text-white text-xl font-semibold transition-all duration-300 hover:gap-5"
          >
            <Instagram size={24} />
            <span>@hey.mongol</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
          </a>
        </div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255, 179, 0, 0.3) 35px, rgba(255, 179, 0, 0.3) 36px)`
        }} />
      </footer>

      {/* Styles for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes expandWidth {
          from { width: 0; }
          to { width: 6rem; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(10deg); }
        }
        
        @keyframes slowZoom {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }
        
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(50px);
          animation: fadeInUp 0.8s ease forwards;
          animation-play-state: running;
        }
        
        @font-face {
          font-family: 'Bebas Neue';
          font-weight: 900;
        }
      `}</style>
    </div>
  );
}
