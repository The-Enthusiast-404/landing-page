import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@remix-run/react";
import { Github, Lock, Code, BookOpen, Menu, X, Users } from "lucide-react";

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState("Home");

  const features = [
    {
      icon: Code,
      title: "Open Source",
      description:
        "All our projects are open source, fostering transparency and community collaboration.",
    },
    {
      icon: Lock,
      title: "Privacy First",
      description:
        "We prioritize user privacy in every line of code we write and every decision we make.",
    },
    {
      icon: Users,
      title: "Community Driven",
      description:
        "Join a global community of developers and privacy advocates shaping the future of the web.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Navigation */}
      <nav className="bg-gray-950 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-white">
                The Enthusiast
              </Link>
            </div>
            <div className="hidden md:flex space-x-1">
              {[
                { name: "Home", to: "/" },
                {
                  name: "Projects",
                  to: "https://github.com/orgs/The-Enthusiast-404/repositories",
                },
                { name: "Blog", to: "https://blog.theenthusiast.dev" },
                { name: "About", to: "/about" },
              ].map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className={`text-gray-300 hover:text-white hover:bg-gray-800 rounded-md px-3 py-2 text-sm font-medium relative ${
                    activeNavItem === item.name ? "text-white" : ""
                  }`}
                  onClick={() => setActiveNavItem(item.name)}
                >
                  {item.name}
                  {activeNavItem === item.name && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500"
                      layoutId="navbar-underline"
                    />
                  )}
                </Link>
              ))}
            </div>
            <div className="md:hidden">
              <button
                className="text-gray-300 hover:text-white focus:outline-none"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-gray-950 shadow-lg absolute w-full z-40"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {[
                { name: "Home", to: "/" },
                { name: "Projects", to: "/projects" },
                { name: "Blog", to: "/blog" },
                { name: "About", to: "/about" },
              ].map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className={`block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 ${
                    activeNavItem === item.name ? "text-white bg-gray-800" : ""
                  }`}
                  onClick={() => {
                    setActiveNavItem(item.name);
                    setMobileMenuOpen(false);
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <header className="bg-gray-900">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="md:w-1/2 mb-8 md:mb-0"
          >
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              Empowering Privacy Through{" "}
              <span className="text-indigo-500">Open Source</span>
            </h1>
            <p className="mt-3 text-xl text-gray-300 sm:mt-5 sm:max-w-xl">
              We build transparent, secure, and community-driven web
              applications to protect your digital rights.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4">
              <a
                href="https://github.com/The-Enthusiast-404"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <Github className="mr-2 h-5 w-5" /> Explore Projects
              </a>
              <Link
                to="https://blog.theenthusiast.dev"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
              >
                <BookOpen className="mr-2 h-5 w-5" /> Read Our Blog
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:w-1/2 flex justify-center"
          >
            <div className="w-64 h-64 relative">
              <div className="absolute inset-0 bg-indigo-500 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute inset-2 bg-indigo-600 rounded-full opacity-40 animate-pulse animation-delay-1000"></div>
              <div className="absolute inset-4 bg-indigo-700 rounded-full opacity-60 animate-pulse animation-delay-2000"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Lock className="h-24 w-24 text-white" />
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            Our Core Principles
          </h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center text-center cursor-pointer group"
              >
                <div className="flex items-center justify-center h-16 w-16 rounded-md bg-indigo-500 text-white mb-4 group-hover:bg-indigo-600 transition-colors duration-300">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-semibold mb-2 text-indigo-300 group-hover:text-indigo-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-900">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">
              Ready to take control of your digital privacy?
            </span>
            <span className="block text-indigo-300">
              Join our open-source revolution today.
            </span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/get-started"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 md:order-2">
              <a
                href="https://github.com/The-Enthusiast-404"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-indigo-400"
              >
                <span className="sr-only">GitHub</span>
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://x.com/introvertedbot"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-indigo-400"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
            <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
              © 2024 The Enthusiast. All rights reserved. Committed to
              protecting your digital rights.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
