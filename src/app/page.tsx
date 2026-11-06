import Navbar from "@/components/client/Navbar";
import Hero from "@/components/client/Hero";
import About from "@/components/server/About";
import Portfolio from "@/components/client/Portfolio";
import Contact from "@/components/client/Contact";
import Footer from "@/components/server/Footer";
import ScrollSpy from "@/components/client/ScrollSpy";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#050505] text-slate-200 selection:bg-purple-500/30">

      {/* Background Grid Pattern */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
          backgroundSize: '35px 35px'
        }}
      />

      {/* Background Gradients - Animated Blobs */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px] animate-blob" />
        <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-teal-900/20 rounded-full blur-[100px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] animate-blob animation-delay-4000" />
      </div>

      {/* ScrollSpy wrapper provides active section state to Navbar */}
      <ScrollSpy>
        <div className="relative z-10">
          <Navbar />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 pb-8">
            <section id="home" className="min-h-screen flex flex-col justify-center">
              <Hero />
            </section>

            <section id="about" className="pt-20">
              <About />
            </section>

            <section id="portfolio" className="pt-20">
              <Portfolio />
            </section>

            <section id="contact" className="pt-20">
              <Contact />
            </section>
          </main>
          <Footer />
        </div>
      </ScrollSpy>
    </div>
  );
}
