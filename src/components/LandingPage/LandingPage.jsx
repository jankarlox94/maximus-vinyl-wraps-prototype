import Logo from "../../assets/maxi3d.png";
import { Link } from "react-router-dom";

import Navbar from "../Navbar/Navbar";

import Carousel1 from "../../assets/carousel-pics/carousel-1.webp";
import Carousel2 from "../../assets/carousel-pics/carousel-2.webp";
import Carousel3 from "../../assets/carousel-pics/carousel-3.webp";
import Carousel4 from "../../assets/carousel-pics/carousel-4.webp";
import Carousel5 from "../../assets/carousel-pics/carousel-5.webp";

import Carousel6 from "../../assets/carousel-pics/carousel-6.webp";
import Carousel7 from "../../assets/carousel-pics/carousel-7.webp";
import Carousel8 from "../../assets/carousel-pics/carousel-8.webp";
import Carousel9 from "../../assets/carousel-pics/carousel-9.webp";
import Carousel10 from "../../assets/carousel-pics/carousel-10.webp";

import Carousel11 from "../../assets/carousel-pics/carousel-11.webp";
import Carousel12 from "../../assets/carousel-pics/carousel-12.webp";
import Carousel13 from "../../assets/carousel-pics/carousel-13.webp";
import Carousel14 from "../../assets/carousel-pics/carousel-14.webp";
import Carousel15 from "../../assets/carousel-pics/carousel-15.webp";

import Carousel16 from "../../assets/carousel-pics/carousel-16.webp";
import Carousel17 from "../../assets/carousel-pics/carousel-17.webp";
import Carousel18 from "../../assets/carousel-pics/carousel-18.webp";
import Carousel19 from "../../assets/carousel-pics/carousel-19.webp";
import Carousel20 from "../../assets/carousel-pics/carousel-20.webp";
import Carousel21 from "../../assets/carousel-pics/carousel-21.webp";
import Carousel22 from "../../assets/carousel-pics/carousel-22.webp";

import { MousePointer2, Truck, Clock, ShieldCheck } from "lucide-react";
import HeroTop from "../HeroTop/HeroTop";
import JobCarousel from "../JobCarousel/JobCarousel";

const images = [
  { url: Carousel1, title: "Full color Print - Made in the USA" },
  { url: Carousel2, title: "Restaurant Wall Decoration" },
  { url: Carousel3, title: "Custom Vinyl Wrap" },
  { url: Carousel4, title: "Commercial Vinyl Wrap" },
  { url: Carousel5, title: "Commercial Vinyl Wrap" },
  { url: Carousel6, title: "Commercial Vinyl Wrap" },
  { url: Carousel7, title: "Custom Vinyl Wrap Installation" },
  { url: Carousel8, title: "Commercial Banner" },
  { url: Carousel9, title: "Custom Vinyl Wrap" },
  { url: Carousel10, title: "Commercial Vinyl Wrap" },
  { url: Carousel11, title: "Restaurant Wall Decoration" },
  { url: Carousel12, title: "Commercial Banner" },
  { url: Carousel13, title: "Restaurant Wall Decoration" },
  { url: Carousel14, title: "Custom Vinyl Wrap" },
  { url: Carousel15, title: "Custom Vinyl Wrap" },
  { url: Carousel16, title: "Commercial Vinyl Wrap for Trailer" },
  { url: Carousel17, title: "Commercial Vinyl Wrap" },
  { url: Carousel18, title: "Commercial Banner" },
  { url: Carousel19, title: "Commercial Vinyl Wrap for Trailer" },
  { url: Carousel20, title: "Custom Banner" },
  { url: Carousel21, title: "Decorative Vinyl" },
  { url: Carousel22, title: "Commercial Banner" },
];

const LandingPage = () => {
  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <header className="relative  pt-32 pb-20 px-6 w-full md:w-[95rem] 2xl:w-[180rem] overflow-hidden">
        {/* Futuristic Background Elements */}
        <div className="absolute top-20 left-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-[-5%] w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none"></div>
        <HeroTop />
      </header>

      {/* Features Grid */}
      <section id="services" className="py-24 px-6 bg-[#14171c]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<MousePointer2 className="text-cyan-400" />}
              title="Expert Design. Premium Printing. "
              desc="We offer a full-service printing experience tailored to your needs. Our specialists help you design, refine, and execute your projects with precision."
            />
            <FeatureCard
              icon={<Clock className="text-purple-400" />}
              title="Same Day Delivery/Same-Day Pickup."
              desc=" With our same-day service, you can go from an idea to a finished print in your hands by the end of the day"
            />
            <FeatureCard
              icon={<ShieldCheck className="text-cyan-400" />}
              title="ECO-Friendly & High Quality"
              desc="High Quality-grade vinyl that combines with ECO-friendly ink to deliver precision printing for the ultimate professional finish."
            />
          </div>
        </div>
        <JobCarousel images={images} />
      </section>

      {/* Content Section */}
      <section id="process" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="bg-gradient-to-b from-gray-800/50 to-transparent p-12 rounded-3xl border border-gray-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Truck size={120} className="text-cyan-400" />
          </div>
          <div className="md:w-2/3">
            <h2 className="text-4xl font-black mb-6 uppercase italic">
              Your All-in-One Printing Partner
            </h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              At Maximus Vinyl Wraps, we provide a seamless, full-service
              printing experience designed to take your project from initial
              concept to professional completion. Our team acts as your creative
              partner, offering expert design assistance to refine your vision
              before we execute the final print with precision and care. We
              understand the importance of your deadlines, which is why we offer
              premium same-day service, ensuring your high-quality prints are
              ready for pickup exactly when you need them.
            </p>
            <ul className="space-y-4 mb-10">
              {[
                "Expert Design Consultation",
                "Local Pickup Available",
                "High-end Custom Prints",
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
            <div className="flex ">
              <Link to="/catalog">
                <button className=" mx-auto px-8 py-4 bg-cyan-500 text-black font-black uppercase italic tracking-wider hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(34,211,238,0.4)]">
                  Start Your Project
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800 px-6 text-center">
        <div className="max-w-7xl flex flex-col justify-center my-auto mx-auto">
          <div className="my-auto mx-auto font-black uppercase italic text-2xl tracking-tighter">
            <img src={Logo} alt="Logo" className="w-[200px]" />
          </div>
          <p className="text-gray-500 text-xs tracking-[0.3em] uppercase mb-4">
            &copy; 2026 Maximus Vinyl Wraps.
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
