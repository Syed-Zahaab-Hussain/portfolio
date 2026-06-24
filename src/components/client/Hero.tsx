"use client";

import React, { useState, useEffect } from "react";
import { Layers, Send } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { socialLinks } from "@/data/social";
import { heroTechStack } from "@/data/techStack";

const Hero: React.FC = () => {
  const [text, setText] = useState("");
  const fullText = "Software Engineering. Student";

  useEffect(() => {
    if (text.length >= fullText.length) {
      return;
    }

    const timeout = setTimeout(() => {
      setText(fullText.slice(0, text.length + 1));
    }, 100);

    return () => clearTimeout(timeout);
  }, [text]);

  return (
    <div className="flex flex-col justify-center h-full pt-24 md:pt-36">
      {/* Introduction */}
      <div className="space-y-6 max-w-4xl">
        <Reveal>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.1]">
            Full Stack <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-500 to-indigo-500">
              Developer
            </span>
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="h-8 md:h-10 flex items-center">
            <span className="text-xl md:text-3xl text-gray-400 font-medium">
              {text}
              <span className="animate-blink border-r-2 border-purple-500 ml-1 h-full inline-block align-middle">
                &nbsp;
              </span>
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed">
            Crafting the next generation of web applications. I leverage the
            React & Node.js ecosystem to build secure, data-driven platforms
            that are fast by default and accessible to everyone.
          </p>
        </Reveal>

        {/* Tech Stack Pills */}
        <Reveal delay={0.3}>
          <div className="flex flex-wrap gap-3 mt-4">
            {heroTechStack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-gray-300 text-sm hover:bg-white/10 hover:border-purple-500/50 hover:text-purple-400 transition-all duration-300 cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </Reveal>

        {/* Buttons */}
        <Reveal delay={0.4}>
          <div className="flex flex-wrap items-center gap-4 mt-8 p-4 -ml-4">
            <a
              href="#portfolio"
              className="group relative px-6 py-3 rounded-lg bg-[#0a0a0a] border border-white/10 shadow-[0_0_15px_rgba(168,85,247,0.5)] hover:shadow-[0_0_25px_rgba(168,85,247,0.7)] overflow-hidden transition-all hover:bg-white/5"
            >
              <div className="flex items-center gap-2 z-10 relative text-white font-medium">
                <Layers
                  size={20}
                  className="group-hover:rotate-12 transition-transform text-purple-400"
                />
                <span>Projects</span>
              </div>
            </a>

            <a
              href="#contact"
              className="group relative px-6 py-3 rounded-lg bg-[#0a0a0a] border border-white/10 shadow-[0_0_15px_rgba(168,85,247,0.5)] hover:shadow-[0_0_25px_rgba(168,85,247,0.7)] overflow-hidden transition-all hover:bg-white/5"
            >
              <div className="flex items-center gap-2 z-10 relative text-white font-medium">
                <Send
                  size={20}
                  className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform text-purple-400"
                />
                <span>Contact</span>
              </div>
            </a>
          </div>
        </Reveal>

        {/* Socials */}
        <Reveal delay={0.5}>
          <div className="flex items-center gap-4 mt-4 p-4 -ml-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-lg bg-[#0a0a0a] border border-white/10 shadow-[0_0_15px_rgba(168,85,247,0.5)] hover:shadow-[0_0_25px_rgba(168,85,247,0.7)] text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-300"
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default Hero;
