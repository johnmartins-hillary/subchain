import React, { useState } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowRight, X } from "lucide-react";

export function BlogPage() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const [selectedPost, setSelectedPost] = useState<any>(null);

  const blogPosts = [
    {
      title: "Understanding React Re-Renders in Plain English",
      excerpt:
        "Ever wondered why your component re-renders even when props don’t change? Let’s break down React's rendering behavior with real-world examples.",
      date: "30 July, 2025",
      image: "/assets/react-s-re-rendering-logic.png",
      content: `
React's re-rendering logic is simple but misunderstood. Components re-render when:
1. Props or state change.
2. Their parent re-renders, unless memoized.

🔍 Example:
If a parent passes a new function as a prop every render, the child re-renders too. Use \`useCallback\` to stabilize function props.

✅ Solution: 
- Use \`React.memo\` for functional components.
- Use \`useCallback\` and \`useMemo\` where necessary.
- Split components smartly to isolate re-renders.

Start debugging re-renders with React DevTools and optimize without premature micro-optimizations.
    `,
    },
    {
      title: "CSS Grid vs Flexbox: When to Use Which (With Real Scenarios)",
      excerpt:
        "Not sure whether to use Grid or Flexbox for your next layout? Here’s a practical comparison that clears the confusion.",
      date: "28 July, 2025",
      image: "/assets/css-grid-vs-flexbox.png",
      content: `
🤔 Use Flexbox when:
- You need a one-dimensional layout (row OR column).
- Content needs to shrink/grow dynamically in one direction.
- Alignment is more important than placement.

🎯 Use Grid when:
- You need a two-dimensional layout (row AND column).
- You need precise placement of elements in a grid.
- Complex designs with overlapping or reordered items.

👨‍💻 Real tip:
Use \`display: grid\` for page-level layout and \`display: flex\` for UI components inside the layout. They work great together.

Mastering both helps you build responsive designs faster with cleaner code.
    `,
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.4,
      },
    },
  };

  const postVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <div className="h-auto bg-gray-50 relative overflow-hidden" ref={ref}>
      {/* Animated yellow rectangles */}
      <motion.div
        className="z-10 absolute top-0 left-0 w-24 sm:w-32 h-full bg-[#FFC404] rounded-r-3xl"
        initial={{ x: -128 }}
        animate={isInView ? { x: 0 } : { x: -128 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />
      <motion.div
        className="z-10 absolute top-0 right-0 w-24 sm:w-32 h-full bg-[#FFC404] rounded-l-3xl"
        initial={{ x: 128 }}
        animate={isInView ? { x: 0 } : { x: 128 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      />

      <div className="z-40 relative container mx-auto px-4 sm:px-6 md:px-10 lg:px-16 py-16 sm:py-20">
        {/* Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.p
            className="text-gray-600 text-base sm:text-lg mb-2 sm:mb-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            BLOG
          </motion.p>
          <motion.h1
            className="text-3xl sm:text-5xl md:text-6xl font-bold text-red-500 leading-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
            }
            transition={{ duration: 0.6, delay: 1 }}
          >
            Awesome Articles
          </motion.h1>
        </motion.div>

        {/* Blog Posts */}
        <motion.div
          className="max-w-4xl mx-auto space-y-6 sm:space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-3xl p-5 sm:p-6 md:p-8 shadow-sm flex flex-col md:flex-row gap-4 md:gap-8 items-start md:items-center"
              variants={postVariants}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                transition: { duration: 0.3 },
              }}
            >
              <div className="w-full md:w-48 h-40 md:h-32 rounded-2xl overflow-hidden flex-shrink-0">
                <ImageWithFallback
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                <motion.h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">
                  {post.title}
                </motion.h3>
                <motion.p className="text-gray-600 leading-relaxed text-sm sm:text-base mb-4">
                  {post.excerpt}
                </motion.p>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <p className="text-gray-500 italic text-sm">{post.date}</p>
                  <button
                    className="flex items-center gap-2 text-red-500 hover:text-red-600 text-sm font-medium transition-colors"
                    onClick={() => setSelectedPost(post)}
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Modal */}
        {selectedPost && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center px-4 sm:px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPost(null)}
          >
            <div
              className="bg-white rounded-xl p-6 sm:p-8 max-w-2xl w-full shadow-xl relative overflow-y-auto max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-xl sm:text-3xl font-bold mb-4 text-red-500">
                {selectedPost.title}
              </h2>
              <p className="text-sm sm:text-base text-gray-600 whitespace-pre-line">
                {selectedPost.content}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
