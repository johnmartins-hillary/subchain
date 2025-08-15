import React from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const faqs = [
  {
    question: "How does solar energy work?",
    answer:
      "Solar panels convert sunlight into electricity using photovoltaic cells. During the day, panels generate power that can be used immediately or stored in batteries for nighttime use. Our systems provide 24/7 reliable electricity even in areas with limited grid access.",
  },
  {
    question: "Do I need a loan to get started?",
    answer:
      "We offer flexible financing options including pay-as-you-go plans, microloans, and community funding models. Many of our installations are funded through partnerships with local organizations and international development programs.",
  },
  {
    question: "How is my data protected during charging?",
    answer:
      "We take data privacy seriously. All charging stations use encrypted connections and we never store personal information on charging devices. Our systems are designed to be completely secure and private.",
  },
  {
    question: "Can I get more information about sourcing?",
    answer:
      "We source all components from certified manufacturers and prioritize local suppliers where possible. Our solar panels come with 25-year warranties and we maintain detailed documentation of all equipment sources and specifications.",
  },
  {
    question: "Can unauthorised systems impact data?",
    answer:
      "Our systems are completely isolated and secure. Only authorized LiteAfrika technicians can access system controls. All data transmission is encrypted and we maintain strict access controls to prevent unauthorized system interference.",
  },
  {
    question: "What is LiteAfrika?",
    answer:
      "LiteAfrika is a solar energy company dedicated to bringing clean, affordable, and reliable electricity to communities across Africa. We specialize in community-scale solar installations with 24/7 support and maintenance services.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Get answers to common questions about our solar energy solutions
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 px-6 py-2"
                >
                  <AccordionTrigger className="text-left font-medium text-gray-900 hover:text-gray-700">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
