import React, { useState } from "react";
import Logo from "../../assets/maximus-vinyl-3d-logo-crop.png";
import { motion } from "framer-motion";
import { slideUp, slideInFromSide } from "../../utility/animation";

import {
  MousePointer2,
  Truck,
  Clock,
  ShieldCheck,
  Menu,
  X,
} from "lucide-react";
import Navbar from "../Navbar/Navbar";

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0f1115] text-gray-100 font-sans selection:bg-cyan-500/30">
      {/* Navigation */}
      <Navbar />
      {/* <nav className="fixed w-full z-50 bg-[#0f1115]/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="p-10 sm:p-10 md:p-15 lg:p-30 xl:p-36">
            <motion.img
              variants={slideUp(0.2)}
              initial="initial"
              animate="animate"
              src={Logo}
              alt="logo del Juego"
            />
          </div>

          <div className="hidden md:flex gap-8 text-sm font-medium tracking-widest uppercase text-gray-400">
            <a
              href="#services"
              className="hover:text-cyan-400 transition-colors"
            >
              Services
            </a>
            <a
              href="#process"
              className="hover:text-cyan-400 transition-colors"
            >
              Process
            </a>
            <a
              href="#contact"
              className="hover:text-cyan-400 transition-colors"
            >
              Contact
            </a>
          </div>

          <button className="hidden md:block px-6 py-2 border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 transition-all rounded-full text-xs font-bold tracking-[0.2em]">
            GET A QUOTE
          </button>

          <button
            className="md:hidden text-gray-400"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav> */}

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Futuristic Background Elements */}
        <div className="absolute top-20 left-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-[-5%] w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block px-3 py-1 border border-cyan-500/30 bg-cyan-500/5 rounded-full mb-6">
              <span className="text-[10px] font-bold tracking-[0.3em] text-cyan-400 uppercase">
                Next-Gen Print Solutions
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight tracking-tighter uppercase italic text-gray-100">
              Your Vision, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                Amplified.
              </span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-lg mb-10 leading-relaxed">
              Bring your brand to life with professional marketing materials
              tailored to your exact needs. From local shops to personal
              projects, we wrap the future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-cyan-500 text-black font-black uppercase italic tracking-wider hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(34,211,238,0.4)]">
                Start Your Project
              </button>
              {/* <button className="px-8 py-4 border border-gray-700 bg-gray-800/50 text-white font-black uppercase italic tracking-wider hover:border-cyan-500 transition-all">
                View Portfolio
              </button> */}
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative aspect-video bg-gray-900 border border-gray-700 rounded-2xl flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614850523296-e8c0d9732391?auto=format&fit=crop&q=80')] bg-cover opacity-40 mix-blend-overlay"></div>
              <div className="z-10 text-center">
                <div className="text-cyan-400 font-mono text-sm mb-2 animate-pulse">
                  SYSTEM_IN_DEVELOPMENT // LOADING
                </div>
                <div className="h-1 w-48 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500 w-2/3 shadow-[0_0_10px_#22d3ee]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Grid */}
      <section id="services" className="py-24 px-6 bg-[#14171c]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<MousePointer2 className="text-cyan-400" />}
              title="Seamless Platform"
              desc="Direct connection to printing experts through our high-speed digital interface."
            />
            <FeatureCard
              icon={<Clock className="text-purple-400" />}
              title="Same Day Delivery"
              desc="Select projects qualify for lightning-fast local pickup or delivery within hours."
            />
            <FeatureCard
              icon={<ShieldCheck className="text-cyan-400" />}
              title="ECO-Friendly & High Quality"
              desc="High Quality-grade vinyl that combines with ECO-friendly ink to deliver precision printing for the ultimate professional finish."
            />
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section id="process" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="bg-gradient-to-b from-gray-800/50 to-transparent p-12 rounded-3xl border border-gray-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Truck size={120} className="text-cyan-400" />
          </div>
          <div className="md:w-2/3">
            <h2 className="text-4xl font-black mb-6 uppercase italic">
              Real-Time Execution
            </h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Our seamless platform connects your vision directly to our
              printing experts with real-time updates every step of the way. No
              more wondering where your project stands—monitor progress from
              design to curing in real-time.
            </p>
            <ul className="space-y-4 mb-10">
              {[
                "Live Status Dashboard",
                "Expert Design Consultation",
                "Local Pickup Available",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-sm font-bold tracking-widest uppercase italic"
                >
                  <div className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]"></div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800 px-6 text-center">
        <div className="max-w-7xl flex justify-center my-auto mx-auto">
          <div className="mb-8 font-black uppercase italic text-2xl tracking-tighter">
            <img src={Logo} alt="Logo" className="w-[200px]" />
          </div>
          <p className="text-gray-500 text-xs tracking-[0.3em] uppercase mb-4">
            &copy; 2026 Maximus Vinyl Wrap.
          </p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="p-8 bg-gray-900/40 border border-gray-800 hover:border-cyan-500/50 transition-all group">
    <div className="mb-6 group-hover:scale-110 transition-transform duration-300 uppercase">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-4 uppercase italic tracking-tight">
      {title}
    </h3>
    <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
  </div>
);

export default LandingPage;
