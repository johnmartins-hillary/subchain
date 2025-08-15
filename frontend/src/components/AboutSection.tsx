import React from "react";
import { motion } from "framer-motion";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.h2
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-3xl lg:text-4xl font-bold"
            >
              About LiteAfrika
            </motion.h2>

            <motion.p
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-lg text-gray-300 leading-relaxed"
            >
              LiteAfrika is pioneering the solar energy revolution across
              Africa. Founded with a mission to provide clean, affordable, and
              reliable energy access to underserved communities, we have become
              a leading force in sustainable development.
            </motion.p>

            <motion.p
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-gray-300 leading-relaxed"
            >
              Our innovative approach combines cutting-edge solar technology
              with deep understanding of local needs. We work directly with
              communities to design custom solutions that not only provide
              immediate energy access but also create long-term economic
              opportunities and environmental benefits.
            </motion.p>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6 pt-6"
            >
              <div>
                <div className="text-2xl font-bold text-yellow-400 mb-2">
                  500+
                </div>
                <div className="text-gray-300">Projects Completed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-400 mb-2">
                  15+
                </div>
                <div className="text-gray-300">Countries Served</div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-green-400/20 rounded-3xl transform rotate-3"></div>
            <div className="relative bg-gradient-to-br from-blue-600 to-green-600 rounded-3xl p-1">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop"
                alt="Solar installation in African community"
                className="w-full h-[400px] object-cover rounded-3xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
