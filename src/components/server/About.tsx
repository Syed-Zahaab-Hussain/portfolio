import React from 'react';
import { Download, ArrowUpRight, Code2 } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { stats } from '@/data/stats';

const About: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <Reveal width="100%">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-teal-400">
              About Me
            </span>
          </h2>

          <div className="max-w-3xl space-y-6 text-gray-300 text-lg leading-relaxed mb-10">
             <p>
                Hello, I'm <span className="font-bold text-white">Syed Zahaab Hussain</span>, passionate about building smart and scalable web & mobile applications. I've completed a full-stack development course and constantly explore new technologies to refine my skills.
             </p>
             <p className="text-gray-400">
                Focused on continuous learning, I aim to transition into the IT industry by 2027 and eventually move towards AI and data science. My journey is driven by curiosity and a desire to create impact through code.
             </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
             <button className="flex items-center gap-2 px-8 py-3 rounded-lg bg-[#8b5cf6] text-white font-medium hover:bg-[#7c3aed] transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]">
                 <Download size={20} />
                 <span>Download CV</span>
             </button>
             <a href="#portfolio" className="flex items-center gap-2 px-8 py-3 rounded-lg border border-purple-500/30 text-purple-300 hover:bg-purple-500/10 transition-all group">
                 <Code2 size={20} className="group-hover:rotate-12 transition-transform"/>
                 <span>View Projects</span>
             </a>
          </div>
        </div>
      </Reveal>

      <Reveal width="100%" delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {stats.map((stat, index) => (
                 <div key={index} className="group relative p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-6">
                        <div className="p-4 rounded-full bg-white/5 text-gray-400 group-hover:text-purple-400 group-hover:bg-purple-500/10 transition-colors">
                            <stat.icon size={28} />
                        </div>
                        <span className="text-4xl font-bold text-white">{stat.value}</span>
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-gray-200 tracking-wider mb-2 uppercase">{stat.label}</h4>
                        <p className="text-xs text-gray-500">{stat.subLabel}</p>
                    </div>
                     <div className="absolute bottom-4 right-4 text-gray-800 group-hover:text-purple-400/40 transition-colors">
                        <ArrowUpRight size={16} />
                    </div>
                 </div>
             ))}
          </div>
      </Reveal>
    </div>
  );
};

export default About;
