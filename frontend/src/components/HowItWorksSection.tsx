import React from "react";
import { motion } from "framer-motion";
import { Zap, Users, Wrench, Headphones } from "lucide-react";

const steps = [
  {
    icon: <Users className="w-12 h-12" />,
    title: "Choose a Community",
    description:
      "Select a community that needs access to clean, reliable solar energy. Browse available communities and their energy needs.",
    color: "bg-[#FFC404]",
  },
  {
    icon: <Wrench className="w-12 h-12" />,
    title: "We Do a Community Assessment",
    description:
      "Our expert team conducts a thorough assessment of the community's energy requirements and infrastructure needs.",
    color: "bg-green-400",
  },
  {
    icon: <Zap className="w-12 h-12" />,
    title: "Fast rollout",
    description:
      "We quickly deploy solar panels and energy infrastructure, ensuring minimal disruption to daily community life.",
    color: "bg-blue-400",
  },
  {
    icon: <Headphones className="w-12 h-12" />,
    title: "Experience Support",
    description:
      "Enjoy 24/7 technical support and maintenance services to ensure your solar energy system operates at peak performance.",
    color: "bg-purple-400",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="grid md:grid-cols-2  px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 flex flex-col items-center justify-center"
        >
          <img src="/assets/about.png" alt="" className="w-[100px] h-[100px]" />
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            How LiteAfrika works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our streamlined process makes it easy to bring sustainable solar
            energy to communities across Africa
          </p>
        </motion.div>

        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ y: 80, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
                transition: { duration: 0.3 },
              }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-yellow-500"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                viewport={{ once: true }}
                className={`${step.color} w-20 h-20 rounded-2xl flex items-center justify-center text-white mb-6 mx-auto`}
              >
                {step.icon}
              </motion.div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                {step.title}
              </h3>

              <p className="text-gray-600 text-center leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
