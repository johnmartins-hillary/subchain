import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./components/pages/LandingPage";
import BrowsePlans from "./components/pages/BrowsePlans";
import PlanDetails from "./components/pages/PlanDetails";
import SubscriberDashboard from "./components/pages/SubscriberDashboard";
import CreatorDashboard from "./components/pages/CreatorDashboard";
import Profile from "./components/pages/Profile";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <LandingPage />
            </motion.div>
          }
        />
        <Route
          path="/plans"
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <BrowsePlans />
            </motion.div>
          }
        />
        <Route
          path="/plan/:id"
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <PlanDetails />
            </motion.div>
          }
        />
        <Route
          path="/dashboard"
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <SubscriberDashboard />
            </motion.div>
          }
        />
        <Route
          path="/creator"
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CreatorDashboard />
            </motion.div>
          }
        />
        <Route
          path="/profile"
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Profile />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}
