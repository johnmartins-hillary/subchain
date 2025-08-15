/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Github, Twitter, MessageCircle } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className="bg-muted border-t"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <motion.div
            className="col-span-1 sm:col-span-2 lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <motion.div
                className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                <span className="text-white font-bold text-sm">SC</span>
              </motion.div>
              <span className="font-bold text-lg">SubChain</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Decentralized subscription infrastructure built on Sui blockchain.
            </p>
          </motion.div>

          {/* Platform */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-medium mb-4">Platform</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <motion.li
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                <Link
                  to="/plans"
                  className="hover:text-foreground transition-colors"
                >
                  Browse Plans
                </Link>
              </motion.li>
              <motion.li
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                <Link
                  to="/creator"
                  className="hover:text-foreground transition-colors"
                >
                  Create Plan
                </Link>
              </motion.li>
              <motion.li
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                <Link
                  to="/dashboard"
                  className="hover:text-foreground transition-colors"
                >
                  Dashboard
                </Link>
              </motion.li>
              <motion.li
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                <a href="#" className="hover:text-foreground transition-colors">
                  Analytics
                </a>
              </motion.li>
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="font-medium mb-4">Resources</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <motion.li
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                <a href="#" className="hover:text-foreground transition-colors">
                  Documentation
                </a>
              </motion.li>
              <motion.li
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                <a href="#" className="hover:text-foreground transition-colors">
                  API Reference
                </a>
              </motion.li>
              <motion.li
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                <a href="#" className="hover:text-foreground transition-colors">
                  Smart Contracts
                </a>
              </motion.li>
              <motion.li
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                <a href="#" className="hover:text-foreground transition-colors">
                  Support
                </a>
              </motion.li>
            </ul>
          </motion.div>

          {/* Community */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="font-medium mb-4">Community</h4>
            <div className="flex space-x-4">
              <motion.a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                <Twitter className="w-5 h-5" />
                <span className="sr-only">Twitter</span>
              </motion.a>
              <motion.a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                <MessageCircle className="w-5 h-5" />
                <span className="sr-only">Discord</span>
              </motion.a>
              <motion.a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                <Github className="w-5 h-5" />
                <span className="sr-only">GitHub</span>
              </motion.a>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="border-t mt-8 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            © {currentYear} SubChain. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center sm:justify-end gap-6">
            <motion.a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              whileHover={{ y: -1 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              Privacy
            </motion.a>
            <motion.a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              whileHover={{ y: -1 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              Terms
            </motion.a>
            <motion.a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              whileHover={{ y: -1 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              Security
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
