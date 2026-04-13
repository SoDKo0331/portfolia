import React, { useState, useEffect } from 'react';
import { 
  Mail, Phone, MapPin, Briefcase, GraduationCap, 
  Code, Activity, Award, User, ChevronDown, MonitorPlay,
  Brain, FileText, Database, ShieldCheck
} from 'lucide-react';

const Portfolio = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      {/* Background ambient effects */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10">
        {/* Navigation / Header */}
        <nav className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50 z-50">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="text-xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              N/S
            </div>
            <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-400">
              <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
              <a href="#experience" className="hover:text-cyan-400 transition-colors">Experience</a>
              <a href="#skills" className="hover:text-cyan-400 transition-colors">Skills</a>
              <a href="#education" className="hover:text-cyan-400 transition-colors">Education</a>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center pt-20 px-6">
          <div className={`max-w-4xl mx-auto text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-cyan-400 font-mono text-lg mb-4 tracking-wider">Hello, my name is</h2>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
              Norovnyam Sodbayar.
            </h1>
            <h3 className="text-3xl md:text-5xl font-bold text-slate-400 mb-8">
              Information Technology Engineer.
            </h3>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-12">
              "Just looking for a job, but I keep learning in every second. So if you hire me, I will show you who I am. hha"
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <a href="#contact" className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                Hire Me
              </a>
              <div className="flex items-center gap-6 text-slate-400">
                <a href="mailto:ssodko243@gmail.com" className="hover:text-cyan-400 transition-colors flex items-center gap-2">
                  <Mail size={20} />
                  <span>ssodko243@gmail.com</span>
                </a>
                <span className="hidden md:inline">|</span>
                <span className="flex items-center gap-2">
                  <Phone size={20} />
                  <span>94918249 , 99584543</span>
                </span>
              </div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-slate-500">
              <ChevronDown size={32} />
            </div>
          </div>
        </section>

        {/* About & Basic Info Section */}
        <section id="about" className="py-24 px-6 bg-slate-900/50">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <div className="h-[1px] w-12 bg-cyan-500"></div>
              <h2 className="text-3xl font-bold text-white"><span className="text-cyan-400 mr-2">01.</span>Basic Info</h2>
              <div className="h-[1px] flex-1 bg-slate-800"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <InfoCard icon={<User />} label="Birthdate" value="2004-03-31" subvalue="(Male)" />
              <InfoCard icon={<MapPin />} label="Location" value="Chingeltei District" subvalue="Ulaanbaatar, MN" />
              <InfoCard icon={<Briefcase />} label="Salary Expectation" value="1.8M - 2.1M MNT" subvalue="Target: IT Engineer" />
              <InfoCard icon={<ShieldCheck />} label="Details" value="Reg: ПЮ04233115" subvalue="Driver's License: M" />
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-24 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-16">
              <div className="h-[1px] flex-1 bg-slate-800"></div>
              <h2 className="text-3xl font-bold text-white"><span className="text-cyan-400 mr-2">02.</span>Experience</h2>
              <div className="h-[1px] w-12 bg-cyan-500"></div>
            </div>

            <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
              
              {/* Omni Capital */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-slate-900 bg-cyan-500 text-slate-900 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <MonitorPlay size={18} />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-800/40 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 hover:bg-slate-800/60 transition-colors shadow-xl">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-xl text-white">Mobile Engineer</h3>
                    <span className="text-cyan-400 text-sm font-mono">Present</span>
                  </div>
                  <div className="text-slate-400 text-sm font-medium mb-4">Omni Capital NBFI LLC • 2025-08-03</div>
                  <p className="text-slate-300 leading-relaxed">
                    Working as a primary mobile application developer. Responsible for building, maintaining, and deploying highly responsive mobile applications.
                  </p>
                </div>
              </div>

              {/* Tee Education */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-slate-900 bg-purple-500 text-slate-100 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <GraduationCap size={18} />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-800/40 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 hover:bg-slate-800/60 transition-colors shadow-xl">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-xl text-white">Teacher</h3>
                    <span className="text-purple-400 text-sm font-mono">Present</span>
                  </div>
                  <div className="text-slate-400 text-sm font-medium mb-4">Tee Education • 2025-07-03</div>
                  <p className="text-slate-300 leading-relaxed">
                    Teaching basic coding skills to students. Demonstrated strong leadership by managing and coordinating a team of 5 people effectively.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-24 px-6 bg-slate-900/50">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-16">
              <div className="h-[1px] w-12 bg-cyan-500"></div>
              <h2 className="text-3xl font-bold text-white"><span className="text-cyan-400 mr-2">03.</span>Skills Spectrum</h2>
              <div className="h-[1px] flex-1 bg-slate-800"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Technical Skills */}
              <div className="bg-slate-800/30 rounded-2xl p-8 border border-slate-700/50">
                <h3 className="flex items-center gap-3 text-2xl font-bold text-white mb-8">
                  <Code className="text-cyan-400" /> Technical Arsenal
                </h3>
                <div className="space-y-6">
                  <SkillBar name="HTML / CSS" level={60} />
                  <SkillBar name="Figma" level={60} />
                  <SkillBar name="JavaScript" level={50} />
                  <SkillBar name="Python" level={50} />
                  <SkillBar name="React & React Native" level={50} />
                  <SkillBar name="SQL" level={50} />
                  <SkillBar name="Unity Development" level={50} />
                  <SkillBar name="GitLab" level={50} />
                  <SkillBar name="Node.js" level={40} />
                </div>
              </div>

              {/* Other Skills */}
              <div className="space-y-8">
                {/* Languages */}
                <div className="bg-slate-800/30 rounded-2xl p-8 border border-slate-700/50">
                  <h3 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
                    <FileText className="text-purple-400" /> Languages
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    <Badge color="cyan" label="English" sub="Intermediate" />
                    <Badge color="purple" label="Japanese" sub="Upper-Intermediate" />
                    <Badge color="blue" label="Mongolian" sub="Native" />
                  </div>
                </div>

                {/* Soft Skills */}
                <div className="bg-slate-800/30 rounded-2xl p-8 border border-slate-700/50">
                  <h3 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
                    <Brain className="text-green-400" /> Core Strengths
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {['Team Communication', 'Adaptability', 'Innovation', 'Work Under Pressure', 'Presentation', 'Tutoring'].map(skill => (
                      <span key={skill} className="px-4 py-2 bg-slate-700/50 text-slate-200 rounded-full text-sm border border-slate-600/50">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Sports & Professional Skills */}
                <div className="bg-slate-800/30 rounded-2xl p-8 border border-slate-700/50">
                  <h3 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
                    <Activity className="text-rose-400" /> Sports & Pro Skills
                  </h3>
                  <ul className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm text-slate-300">
                    <li className="flex items-start gap-2"><div className="mt-1 w-1.5 h-1.5 rounded-full bg-rose-400"></div> Volleyball (Professional)</li>
                    <li className="flex items-start gap-2"><div className="mt-1 w-1.5 h-1.5 rounded-full bg-rose-400"></div> Basketball (Advanced)</li>
                    <li className="flex items-start gap-2"><div className="mt-1 w-1.5 h-1.5 rounded-full bg-rose-400"></div> Football/Soccer (Advanced)</li>
                    <li className="flex items-start gap-2"><div className="mt-1 w-1.5 h-1.5 rounded-full bg-rose-400"></div> Table Tennis (Advanced)</li>
                    <li className="flex items-start gap-2 col-span-2 mt-2"><div className="mt-1 w-1.5 h-1.5 rounded-full bg-cyan-400"></div> Exercise Therapy & Physical Techniques</li>
                    <li className="flex items-start gap-2 col-span-2"><div className="mt-1 w-1.5 h-1.5 rounded-full bg-cyan-400"></div> Sports Rules & Competition Regulations</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-24 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-12"><span className="text-cyan-400 mr-2">04.</span>Education</h2>
            
            <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700 p-10 rounded-2xl shadow-2xl relative overflow-hidden group hover:border-cyan-500/50 transition-colors">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Award size={120} />
              </div>
              <div className="relative z-10">
                <GraduationCap size={48} className="text-cyan-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-2">National University of Mongolia</h3>
                <p className="text-xl text-purple-400 font-medium mb-6">Bachelor of Software Engineering</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-slate-300">
                  <span className="flex items-center gap-2"><Calendar size={18} className="text-slate-500" /> 2022 - 2026</span>
                  <span className="hidden sm:block text-slate-700">|</span>
                  <span className="flex items-center gap-2"><Award size={18} className="text-yellow-500" /> 3.6 GPA</span>
                  <span className="hidden sm:block text-slate-700">|</span>
                  <span className="flex items-center gap-2"><MapPin size={18} className="text-slate-500" /> Mongolia</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-800/50 bg-slate-950 py-8 px-6 text-center">
          <p className="text-slate-500 font-mono text-sm group cursor-pointer">
            Built from scratch by <span className="text-cyan-500 group-hover:text-cyan-400 transition-colors">Norovnyam Sodbayar</span>.
          </p>
        </footer>
      </div>
    </div>
  );
};

// Sub-components
const InfoCard = ({ icon, label, value, subvalue }) => (
  <div className="bg-slate-800/30 backdrop-blur border border-slate-700/50 p-6 rounded-xl hover:-translate-y-1 hover:bg-slate-800/50 transition-all duration-300">
    <div className="text-cyan-400 mb-4">{icon}</div>
    <div className="text-sm text-slate-400 mb-1">{label}</div>
    <div className="text-xl font-bold text-white mb-1">{value}</div>
    <div className="text-sm font-mono text-slate-500">{subvalue}</div>
  </div>
);

const SkillBar = ({ name, level }) => (
  <div>
    <div className="flex justify-between mb-2">
      <span className="text-slate-300 font-medium text-sm">{name}</span>
      <span className="text-cyan-400 font-mono text-sm">{level}%</span>
    </div>
    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
      <div 
        className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
        style={{ width: `${level}%` }}
      ></div>
    </div>
  </div>
);

const Badge = ({ label, sub, color }) => {
  const colors = {
    cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  };

  return (
    <div className={`px-4 py-3 rounded-lg border flex flex-col gap-1 ${colors[color]}`}>
      <span className="font-bold">{label}</span>
      <span className="text-xs opacity-80">{sub}</span>
    </div>
  );
};

export default Portfolio;
