import React from "react";

export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <img
          src="https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=900"
          alt="Students collaborating"
          className="rounded-2xl shadow-2xl w-full hover:scale-105 transition-transform duration-500"
        />

        <div>
          <h2 className="section-title mb-4 text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-500">
            Our Mission
          </h2>
          <p className="section-paragraph text-gray-700 leading-relaxed hover:text-indigo-600 transition-colors duration-300">
            We believe that learning happens everywhere — not just in the
            classroom. Our mission is to empower students to capture their
            journey and present it in a way that reflects their unique talents,
            passions, and dedication.
          </p>
        </div>
      </div>
    </section>
  );
}
