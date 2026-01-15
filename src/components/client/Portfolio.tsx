"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { ExternalLink, Info, Code2, Award, Database, Eye } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { projects } from '@/data/projects';
import { certificates } from '@/data/certificates';
import { techStackItems } from '@/data/techStack';

const Portfolio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'projects' | 'certificates' | 'stack'>('projects');

  return (
    <div className="w-full">
      <Reveal width="100%">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-teal-400">
              Portfolio Showcase
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore my journey through projects, certifications, and technical expertise. Each section represents a milestone in my continuous learning path.
          </p>
        </div>
      </Reveal>

      {/* Tabs */}
      <Reveal width="100%">
        <div className="flex justify-center mb-12">
            <div className="inline-flex p-1 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                <button
                    onClick={() => setActiveTab('projects')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                        activeTab === 'projects' ? 'bg-purple-600/20 text-purple-300 shadow-lg' : 'text-gray-400 hover:text-white'
                    }`}
                >
                    <Code2 size={18} />
                    Projects
                </button>
                <button
                    onClick={() => setActiveTab('certificates')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                        activeTab === 'certificates' ? 'bg-purple-600/20 text-purple-300 shadow-lg' : 'text-gray-400 hover:text-white'
                    }`}
                >
                    <Award size={18} />
                    Certificates
                </button>
                <button
                    onClick={() => setActiveTab('stack')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                        activeTab === 'stack' ? 'bg-purple-600/20 text-purple-300 shadow-lg' : 'text-gray-400 hover:text-white'
                    }`}
                >
                    <Database size={18} />
                    Tech Stack
                </button>
            </div>
        </div>
      </Reveal>

      {/* Content Grid */}
      <div className="min-h-[400px]">
        {activeTab === 'projects' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                    <Reveal key={project.id} delay={index * 0.1} width="100%">
                        <div className="group rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                            <div className="relative h-48 overflow-hidden">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-60"></div>
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>

                                <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                                    {project.tech.map(t => (
                                        <span key={t} className="text-xs px-2 py-1 rounded bg-white/5 text-gray-300 border border-white/5">
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between mt-auto">
                                    <a href={project.demoLink} className="flex items-center gap-2 text-sm font-medium text-white hover:text-purple-400 transition-colors">
                                        Live Demo <ExternalLink size={14} />
                                    </a>
                                    <button className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors">
                                        Details <Info size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                ))}
            </div>
        )}

        {activeTab === 'certificates' && (
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates.map((cert, index) => (
                    <Reveal key={cert.id} delay={index * 0.1} width="100%">
                         <div className="group relative rounded-2xl bg-white/5 border border-white/10 overflow-hidden h-64 cursor-pointer hover:border-purple-500/30 transition-all">
                            {/* Image */}
                            <Image
                                src={cert.image}
                                alt={cert.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110 brightness-90 group-hover:brightness-100"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                                <div className="flex items-center gap-2 text-white font-medium bg-white/10 px-5 py-2.5 rounded-full backdrop-blur-md border border-white/20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <Eye size={18} />
                                    <span>View Certificate</span>
                                </div>
                            </div>
                         </div>
                    </Reveal>
                ))}
             </div>
        )}

        {activeTab === 'stack' && (
             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {techStackItems.map((item, index) => (
                    <Reveal key={item.name} delay={index * 0.05} width="100%">
                        <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-1 group">
                            <div className="h-16 w-16 mb-4 flex items-center justify-center">
                                <Image
                                    src={item.icon}
                                    alt={item.name}
                                    width={64}
                                    height={64}
                                    className={`drop-shadow-md transition-all duration-300 group-hover:drop-shadow-[0_0_15px_rgba(168,85,247,0.6)] group-hover:scale-110 ${item.invert ? 'filter invert' : ''}`}
                                />
                            </div>
                            <span className="text-gray-300 font-bold text-sm group-hover:text-white transition-colors">{item.name}</span>
                        </div>
                    </Reveal>
                ))}
             </div>
        )}
      </div>

       {activeTab === 'projects' && projects.length > 3 && (
        <Reveal width="100%">
             <div className="flex justify-center mt-12">
                <button className="px-6 py-2 rounded-lg bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 transition-all text-white">
                    See More
                </button>
            </div>
        </Reveal>
       )}
    </div>
  );
};

export default Portfolio;
