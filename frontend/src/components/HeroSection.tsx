import React from "react";
import { motion } from "framer-motion";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <section id="home" className="min-h-screen pt-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
              style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}
            >
              Powering Your Community
              <br />
              <span className="text-yellow-400">with 24/7 Solar Energy</span>
            </motion.h1>

            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-lg text-white/90 max-w-xl"
              style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}
            >
              Clean, reliable, and affordable solar energy solutions for African
              communities. Join thousands who have already made the switch to
              sustainable power.
            </motion.p>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <button
                onClick={onGetStarted}
                className="bg-[#FFC404] text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-all transform hover:scale-105"
              >
                Get Started Today
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition-all">
                Learn More
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-8 border-t border-white/20"
        >
          {[
            { number: "50K+", label: "Families Powered" },
            { number: "12,768", label: "Solar Installations" },
            { number: "90+", label: "Communities Served" },
            { number: "24/7", label: "Support Available" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
              className="text-center text-white"
            >
              <div className="text-2xl lg:text-3xl font-bold text-yellow-400 mb-2">
                {stat.number}
              </div>
              <div className="text-sm lg:text-base text-white/80">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Background Overlay */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `
      linear-gradient(to top right, rgba(0,0,0,0.8), rgba(0,0,0,0)),
      url("/assets/banner.jpg")
    `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />
    </section>
  );
}
