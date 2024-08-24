import React from "react";
import { Button } from "@/components/ui/button";
import {
  Github,
  Lock,
  Code,
  BookOpen,
  Menu,
  Eye,
  EyeOff,
  Users,
} from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                The Enthusiast
              </span>
            </div>
            <div className="hidden md:flex space-x-4">
              <Button variant="ghost">Home</Button>
              <Button variant="ghost">Projects</Button>
              <Button variant="ghost">Blog</Button>
              <Button variant="ghost">About</Button>
            </div>
            <div className="md:hidden">
              <Button variant="ghost">
                <Menu />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 sm:text-5xl md:text-6xl">
              Empowering Privacy Through Open Source
            </h1>
            <p className="mt-3 text-xl text-gray-500 dark:text-gray-400 sm:mt-5 sm:max-w-xl">
              We build transparent, secure, and community-driven web
              applications to protect your digital rights.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4">
              <Button
                size="lg"
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                <Github className="mr-2 h-5 w-5" /> Explore Projects
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-gray-700"
              >
                <BookOpen className="mr-2 h-5 w-5" /> Read Our Blog
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="w-64 h-64 relative">
              <div className="absolute inset-0 bg-indigo-500 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute inset-2 bg-indigo-600 rounded-full opacity-40 animate-pulse animation-delay-1000"></div>
              <div className="absolute inset-4 bg-indigo-700 rounded-full opacity-60 animate-pulse animation-delay-2000"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Lock className="h-24 w-24 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {[
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
            ].map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                <div className="flex items-center justify-center h-16 w-16 rounded-md bg-indigo-500 text-white mb-4">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-700 dark:bg-indigo-900">
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
              <Button
                size="lg"
                className="bg-white text-indigo-600 hover:bg-indigo-50"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 md:order-2">
              <a
                href="https://github.com/The-Enthusiast-404"
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">GitHub</span>
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://x.com/introvertedbot"
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-gray-500"
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
