import React, { useState } from 'react';
import { Send, Linkedin, Instagram, Github, Mail, User, MessageSquare, Share2 } from 'lucide-react';
import { Reveal } from './ui/Reveal';

const Contact: React.FC = () => {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle submission logic
        console.log("Form submitted", formState);
        alert("Thanks for the message! (Demo only)");
        setFormState({ name: '', email: '', message: ''});
    };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 pb-0">
      <Reveal width="100%">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-purple-500 tracking-tight">
            Contact Me
          </h2>
          <p className="text-gray-400 text-sm">
            Got a question? Send me a message, and I'll get back to you soon.
          </p>
        </div>
      </Reveal>

      <Reveal width="100%">
        {/* Main Card Container */}
        <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-8 relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-radial-gradient from-purple-500/10 to-transparent pointer-events-none"></div>
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

          {/* Form Section */}
          <div className="mb-10 relative z-10">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 mb-2">
                  Get in Touch
                </h3>
                <p className="text-gray-400 text-xs md:text-sm">
                  Have something to discuss? Send me a message and let's talk.
                </p>
              </div>
              <Share2
                className="text-gray-500/50 hover:text-purple-400 transition-colors cursor-pointer"
                size={24}
              />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative group">
                <User
                  className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-purple-400 transition-colors"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formState.name}
                  onChange={(e) =>
                    setFormState({ ...formState, name: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-12 pr-4 text-gray-300 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all placeholder:text-gray-600 text-sm backdrop-blur-sm shadow-inner"
                  required
                />
              </div>

              <div className="relative group">
                <Mail
                  className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-purple-400 transition-colors"
                  size={18}
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formState.email}
                  onChange={(e) =>
                    setFormState({ ...formState, email: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-12 pr-4 text-gray-300 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all placeholder:text-gray-600 text-sm backdrop-blur-sm shadow-inner"
                  required
                />
              </div>

              <div className="relative group">
                <MessageSquare
                  className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-purple-400 transition-colors"
                  size={18}
                />
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  value={formState.message}
                  onChange={(e) =>
                    setFormState({ ...formState, message: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-12 pr-4 text-gray-300 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all placeholder:text-gray-600 resize-none text-sm backdrop-blur-sm shadow-inner"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold shadow-lg shadow-purple-900/20 hover:shadow-purple-900/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 text-sm"
              >
                <Send size={16} />
                Send Message
              </button>
            </form>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-white/5 mb-8"></div>

          {/* Social Section */}
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-6 h-1 bg-indigo-500 rounded-full"></span>
              <h3 className="text-lg font-bold text-white">Connect With Me</h3>
            </div>

            <div className="space-y-3">
              {/* Social Items */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/30 hover:bg-white/10 transition-all group"
              >
                <div className="p-2.5 rounded-lg bg-[#0077b5] text-white transition-colors shadow-lg shadow-blue-900/20">
                  <Linkedin size={20} />
                </div>
                <div>
                  <h4 className="text-gray-200 font-bold text-sm">
                    Let's Connect
                  </h4>
                  <p className="text-gray-500 text-xs">on LinkedIn</p>
                </div>
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/30 hover:bg-white/10 transition-all group"
              >
                <div className="p-2.5 rounded-lg bg-[#E1306C] text-white transition-colors shadow-lg shadow-pink-900/20">
                  <Instagram size={20} />
                </div>
                <div>
                  <h4 className="text-gray-200 font-bold text-sm">Instagram</h4>
                  <p className="text-gray-500 text-xs">@alright.abhi</p>
                </div>
              </a>

              <a
                href="https://github.com/Syed-Zahaab-Hussain"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/30 hover:bg-white/10 transition-all group"
              >
                <div className="p-2.5 rounded-lg bg-[#1F2937] text-white transition-colors shadow-lg shadow-gray-900/20">
                  <Github size={20} />
                </div>
                <div>
                  <h4 className="text-gray-200 font-bold text-sm">Github</h4>
                  <p className="text-gray-500 text-xs">@Syed-Zahaab-Hussain</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
};

export default Contact;