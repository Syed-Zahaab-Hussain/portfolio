import React from 'react';
import { Code2 } from 'lucide-react';
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
                Hello, I&apos;m <span className="font-bold text-white">Syed Zahaab Hussain</span>, a full-stack developer building web applications with React, Next.js, Node.js and PostgreSQL.
             </p>
             <p className="text-gray-300">
                My work includes inventory and checkout systems, role-based administration and e-commerce. I enjoy turning practical requirements into applications people can use.
             </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
             <a href="#portfolio" className="flex items-center gap-2 px-8 py-3 rounded-lg border border-purple-500/30 text-purple-300 hover:bg-purple-500/10 transition-all group">
                 <Code2 size={20} className="group-hover:rotate-12 transition-transform"/>
                 <span>View Projects</span>
             </a>
          </div>
        </div>
      </Reveal>

      <Reveal width="100%" delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {stats.map((stat) => (
                 <div key={stat.label} className="group relative p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-6">
                        <div className="p-4 rounded-full bg-white/5 text-gray-300 group-hover:text-purple-400 group-hover:bg-purple-500/10 transition-colors">
                            <stat.icon size={28} />
                        </div>
                        {stat.value && <span className="text-4xl font-bold text-white">{stat.value}</span>}
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-gray-200 tracking-wider mb-2 uppercase">{stat.label}</h3>
                        <p className="text-xs text-gray-400">{stat.subLabel}</p>
                    </div>
                 </div>
             ))}
          </div>
      </Reveal>
    </div>
  );
};

export default About;
