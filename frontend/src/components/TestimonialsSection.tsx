import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Amara Okafor",
    role: "Community Leader",
    location: "Lagos, Nigeria",
    content:
      "LiteAfrika transformed our village. We now have reliable electricity 24/7, and our children can study at night. The installation was smooth and the team was incredibly professional.",
    rating: 5,
  },
  {
    name: "Kwame Asante",
    role: "School Principal",
    location: "Accra, Ghana",
    content:
      "Since installing solar panels through LiteAfrika, our school has been able to expand computer classes and evening study programs. The impact on education has been tremendous.",
    rating: 5,
  },
  {
    name: "Fatima Hassan",
    role: "Healthcare Worker",
    location: "Nairobi, Kenya",
    content:
      "Our clinic now operates around the clock thanks to LiteAfrika's solar solution. We can refrigerate vaccines properly and use medical equipment without power interruptions.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Quote className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            What they say about LiteAfrika
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from communities across Africa who have transformed their lives
            with clean solar energy
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ y: 80, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{
                y: -5,
                transition: { duration: 0.3 },
              }}
              className="bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "{testimonial.content}"
              </p>

              <div className="border-t border-gray-200 pt-4">
                <div className="font-semibold text-gray-900">
                  {testimonial.name}
                </div>
                <div className="text-sm text-gray-600">{testimonial.role}</div>
                <div className="text-sm text-gray-500">
                  {testimonial.location}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
