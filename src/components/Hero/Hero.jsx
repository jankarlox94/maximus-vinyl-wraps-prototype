import React from "react";
// import Personaje from "../../assets/Personaje.png";
import Personaje from "../../assets/personaje-maximus.png";

import Logo from "../../assets/maxi3d.png";
import { motion } from "framer-motion";
import { slideUp, slideInFromSide } from "../../utility/animation";

const Hero = () => {
  return (
    <section className="flex justify-center mt-36 md:mt-20">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* descripciones */}
        <div className="p-10 sm:p-10 md:p-15 lg:p-30 xl:p-36">
          <motion.img
            variants={slideUp(0.2)}
            initial="initial"
            animate="animate"
            src={Logo}
            alt="logo del Juego"
          />
          <motion.p
            variants={slideUp(0.3)}
            initial="initial"
            animate="animate"
            className="py-12 font-black tracking-tighter text-gray-700 lg:text-lg 2xl:text-3xl animate-glow-pulse"
          >
            Bring your brand to life with professional marketing materials
            tailored to your exact needs. From local shops to personal projects,
            our seamless platform connects your vision directly to our printing
            experts with real-time updates every step of the way.
          </motion.p>
          <motion.div
            variants={slideUp(1)}
            initial="initial"
            animate="animate"
            className="flex justify-center gap-4"
          >
            {/* Botón Jugar ahora */}
            <a className="bg-gray-600 py-2 px-12 rounded-3xl text-white hover:bg-red-600 transition-all duration-300 flex items-center cursor-pointer">
              Print And Pickup/Delivery the same day
              <i className="ml-2 bi bi-save text-xl"></i>
            </a>
          </motion.div>
        </div>

        {/* imagen */}
        <motion.div
          variants={slideInFromSide("right", 0.5)}
          initial="initial"
          animate="animate"
          className="p-10 sm:p-10 md:p-15 lg:p-28 xl:p-33"
        >
          <img src={Personaje} alt="Personaje de juego" />
        </motion.div>
        <style jsx>{`
          @keyframes glow-pulse {
            0%,
            100% {
              text-shadow: 0 0 4px rgba(12, 138, 234, 0.31),
                0 0 10px rgba(12, 138, 234, 0.31);
            }
            50% {
              text-shadow: 0 0 10px rgba(12, 138, 234, 0.31),
                0 0 20px rgba(12, 138, 234, 0.31),
                0 0 30px rgba(12, 138, 234, 0.31);
            }
          }
          .animate-glow-pulse {
            animation: glow-pulse 4s ease-in-out infinite;
          }
        `}</style>
      </div>
    </section>
  );
};

export default Hero;
