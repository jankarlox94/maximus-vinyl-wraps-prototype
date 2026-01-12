import React from "react";
import LandingImg from "../../assets/landing-img-definitive.png";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

const HeroTop = () => {
  const navbarRedes = [
    {
      id: 1,
      title: "Vinyl Wraps",
      link: "https://www.instagram.com",
      icon: "bi bi-instagram",
    },
    {
      id: 2,
      title: "Decals",
      link: "https://www.tiktok.com",
      icon: "bi bi-tiktok",
    },

    {
      id: 3,
      title: "Advertising",
      link: "https://www.tiktok.com",
      icon: "bi bi-tiktok",
    },

    {
      id: 4,
      title: "Signs",
      link: "https://www.tiktok.com",
      icon: "bi bi-tiktok",
    },
    {
      id: 5,
      title: "Car Wrapping",
      link: "https://www.tiktok.com",
      icon: "bi bi-tiktok",
    },
    {
      id: 6,
      title: "Logo Design",
      link: "https://www.tiktok.com",
      icon: "bi bi-tiktok",
    },
    ,
    {
      id: 7,
      title: "High Gloss Self-Healing PPF protection film",
      link: "https://www.tiktok.com",
      icon: "bi bi-tiktok",
    },
  ];
  // REPLACE THIS URL with the actual path to your high-res futuristic garage image.
  // I'm using a placeholder that captures the vibe of the reference image.
  const bgImageUrl = "https://i.imgur.com/8Y7yv7t.jpeg";

  return (
    <div className="relative w-full min-h-screen bg-gray-900 overflow-hidden font-sans">
      {/* --- Background Image Area --- 
        This section fills the entire screen width and height.
      */}
      <div className="absolute inset-0 z-0">
        <img
          src={LandingImg}
          alt="Futuristic Print and Vinyl Wrap Facility"
          // object-cover ensures the image fills the space without distortion.
          // h-full w-full makes it take the whole screen.
          className="w-full h-full object-cover object-center opacity-80 lg:opacity-100"
        />
        {/* --- Gradient Overlay ---
          This darkens the image, especially on the left side, ensures the white text 
          remains readable regardless of the image brightness. 
        */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/30"></div>

        {/* Optional: Adds the subtle glowing frame effect to the very edge of the screen, inspired by the original image's border */}
        <div className="absolute inset-0 border-[6px] border-cyan-500/30 pointer-events-none shadow-[inset_0_0_50px_rgba(6,182,212,0.4)] mix-blend-overlay"></div>
      </div>

      {/* --- Content Container ---
        Positioned absolutely over the image, centered vertically.
      */}
      <div className="relative z-10 container mx-auto px-6 sm:px-12 h-full flex flex-col justify-center min-h-screen py-20">
        <div className="max-w-3xl pl-4 sm:pl-0">
          {/* Subtitle Badge */}
          <div className="inline-block px-3 py-1 border border-cyan-500/30 bg-cyan-500/5 rounded-full mb-6">
            <span className="text-[10px] font-bold tracking-[0.3em] text-cyan-400 uppercase">
              OKC's Next-Gen Print Solutions
            </span>
          </div>

          {/* Main Headline with Gradient Text */}
          <h1 className="text-6xl md:text-6xl font-black mb-6 leading-tight tracking-tighter uppercase italic text-gray-100">
            Your Vision, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Amplified.
            </span>
          </h1>

          {/* Description Text */}
          <p className="text-gray-100 text-lg md:text-xl max-w-lg mb-10 leading-relaxed">
            From local shops to personal projects, we bring your projects into
            life with professional marketing materials tailored to your exact
            needs. We offer the following services:
          </p>
          <div className="mb-8 grid grid-cols-4">
            <ul className="col-span-2">
              <li className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                <span>Vinyl Wraps</span>
              </li>
              <li className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                <span>Decals</span>
              </li>
              <li className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                <span>Advertising</span>
              </li>
            </ul>
            <ul className="col-span-2">
              <li className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                <span>Signs</span>
              </li>
              <li className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                <span>Car Wrapping</span>
              </li>
              <li className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                <span>Logo Design</span>
              </li>
            </ul>
            <ul className="mt-2 col-span-4">
              <li className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                <span>High Gloss Self-Healing PPF protection film</span>
              </li>
            </ul>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 bg-cyan-500 text-black font-black uppercase italic tracking-wider hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(34,211,238,0.4)]">
              Start Your Project
            </button>
            <button
              disabled
              className="px-8 py-4 border border-gray-700 bg-gray-800/50 text-white font-black uppercase italic tracking-wider hover:border-cyan-500 transition-all"
            >
              Or Text Us Today (405) 421 7326
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroTop;
