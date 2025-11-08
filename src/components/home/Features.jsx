import React from "react";
import { motion } from "framer-motion";

export default function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="section-title mb-6"
        >
          Everything You Need to Succeed
        </motion.h2>
        <p className="section-subtitle mb-12">
          Powerful tools to help you record, track, and share achievements.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div whileHover={{ y: -8 }} className="feature-card">
            <div className="feature-icon">
              <i className="fa-solid fa-award"></i>
            </div>
            <h3 className="feature-title">Record Achievements</h3>
            <p>
              Easily record every award, certificate, and activity milestone in
              one place.
            </p>
          </motion.div>

          <motion.div whileHover={{ y: -8 }} className="feature-card">
            <div className="feature-icon">
              <i className="fa-solid fa-chart-line"></i>
            </div>
            <h3 className="feature-title">Track Growth</h3>
            <p>
              Visualize your development over time and reflect on your learning
              journey.
            </p>
          </motion.div>

          <motion.div whileHover={{ y: -8 }} className="feature-card">
            <div className="feature-icon">
              <i className="fa-solid fa-share-nodes"></i>
            </div>
            <h3 className="feature-title">Share Globally</h3>
            <p>
              Publish your achievements on the Explore feed and connect with
              others worldwide.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
