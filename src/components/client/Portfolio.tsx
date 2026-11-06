"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { ExternalLink, Info, Code2, Award, Database, Eye } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { projects } from '@/data/projects';
import { certificates } from '@/data/certificates';
import { techStackItems } from '@/data/techStack';
import Link from 'next/link';

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
          <p className="text-gray-300 max-w-2xl mx-auto">
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
                    className={`flex cursor-pointer items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                        activeTab === 'projects' ? 'bg-purple-600/20 text-purple-300 shadow-lg' : 'text-gray-300 hover:text-white'
                    }`}
                >
                    <Code2 size={18} />
                    Projects
                </button>
                {certificates.length > 0 && <button
                    onClick={() => setActiveTab('certificates')}
                    className={`flex cursor-pointer items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                        activeTab === 'certificates' ? 'bg-purple-600/20 text-purple-300 shadow-lg' : 'text-gray-300 hover:text-white'
                    }`}
                >
                    <Award size={18} />
                    Certificates
                </button>}
                <button
                    onClick={() => setActiveTab('stack')}
                    className={`flex cursor-pointer items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                        activeTab === 'stack' ? 'bg-purple-600/20 text-purple-300 shadow-lg' : 'text-gray-300 hover:text-white'
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
                                <p className="text-gray-300 text-sm mb-4 line-clamp-2">{project.summary}</p>

                                <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                                    {project.tech.map(t => (
                                        <span key={t} className="text-xs px-2 py-1 rounded bg-white/5 text-gray-300 border border-white/5">
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between mt-auto">
                                    {project.demoLink && <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-white">Live Demo <ExternalLink size={14} /></a>}
                                    <Link href={`/projects/${project.slug}`} className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white">Details <Info size={14} /></Link>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                ))}
            </div>
        )}

        {activeTab === 'certificates' && (
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates.map((cert) => (
                    <div key={cert.id} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                        {cert.image && <Image src={cert.image} alt={cert.title} width={600} height={400} className="mb-4 rounded-lg" />}
                        <h3 className="font-bold text-white">{cert.title}</h3>
                        {(cert.url || cert.image) && <a href={cert.url ?? cert.image} className="mt-4 inline-flex items-center gap-2 text-violet-300" target="_blank" rel="noreferrer"><Eye size={18} /> View Certificate</a>}
                    </div>
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

    </div>
  );
};

export default Portfolio;
