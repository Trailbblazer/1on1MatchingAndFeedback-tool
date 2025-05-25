import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { animate, stagger } from "framer-motion";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    animate(
      ".dashboard-section",
      { opacity: 1, y: 0 },
      { delay: stagger(0.15), duration: 0.7 }
    );
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Enhanced Animated Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-900 to-purple-800">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent from-10% to-indigo-900/40"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-grid-white/10 [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
          <div className="absolute inset-0 bg-noise opacity-10"></div>
        </div>
        
        <div className="relative px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <div className="inline-block mb-4">
              <span className="px-3 py-1 text-xs font-semibold tracking-wider text-indigo-100 uppercase rounded-full bg-indigo-700/50">
                AI-Powered Matching Platform
              </span>
            </div>
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
              <span className="block">Sampo</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                Acceleration Suite
              </span>
            </h1>
            <p className="max-w-3xl mx-auto mt-6 text-xl text-indigo-200">
              Transform your startup ecosystem with intelligent matching and optimization algorithms
            </p>
          </motion.div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </div>

      {/* Main Dashboard Sections */}
      <div className="px-4 py-12 mx-auto -mt-10 max-w-7xl sm:px-6 lg:px-8">
        {/* Input Tools Section */}
        <motion.div
          className="mb-16 translate-y-20 opacity-0 dashboard-section"
          whileHover={{ scale: 1.005 }}
        >
          <div className="overflow-hidden bg-white border border-gray-100 shadow-2xl rounded-2xl">
            <div className="md:flex">
              <div className="p-8 text-white md:w-1/3 bg-gradient-to-br from-indigo-600 to-purple-600">
                <div className="flex items-center mb-6">
                  <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <h2 className="ml-4 text-2xl font-bold">Data Input Portal</h2>
                </div>
                <p className="mb-6 text-indigo-100">
                  Add new startups and coaches to our intelligent matching database. 
                  Our system will automatically analyze and categorize each entry.
                </p>
                <div className="flex items-center text-sm font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Last updated: {new Date().toLocaleDateString()}
                </div>
              </div>
              
              <div className="p-8 md:w-2/3">
                <h3 className="mb-6 text-lg font-semibold text-gray-500">AVAILABLE INPUT ACTIONS</h3>
                <div className="grid gap-4">
                  <motion.button
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-between p-5 transition-all border border-gray-200 group rounded-xl hover:border-indigo-300 hover:bg-indigo-50/50"
                    onClick={() => navigate("/add-startup")}
                  >
                    <div className="flex items-center">
                      <div className="p-3 mr-4 text-indigo-600 transition-colors bg-indigo-100 rounded-lg group-hover:bg-indigo-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800">Register New Startup</h4>
                        <p className="mt-1 text-sm text-gray-500">Add a startup to our matching ecosystem</p>
                      </div>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400 transition-colors group-hover:text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>

                  <motion.button
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-between p-5 transition-all border border-gray-200 group rounded-xl hover:border-indigo-300 hover:bg-indigo-50/50"
                    onClick={() => navigate("/add-coaches")}
                  >
                    <div className="flex items-center">
                      <div className="p-3 mr-4 text-indigo-600 transition-colors bg-indigo-100 rounded-lg group-hover:bg-indigo-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800">Onboard New Coach</h4>
                        <p className="mt-1 text-sm text-gray-500">Add mentors and advisors to our network</p>
                      </div>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400 transition-colors group-hover:text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* View Tools Section */}
        <motion.div
          className="mb-16 translate-y-20 opacity-0 dashboard-section"
          whileHover={{ scale: 1.005 }}
        >
          <div className="overflow-hidden bg-white border border-gray-100 shadow-2xl rounded-2xl">
            <div className="flex-row-reverse md:flex">
              <div className="p-8 text-white md:w-1/3 bg-gradient-to-br from-cyan-600 to-blue-600">
                <div className="flex items-center mb-6">
                  <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h2 className="ml-4 text-2xl font-bold">Data Explorer</h2>
                </div>
                <p className="mb-6 text-cyan-100">
                  Browse and analyze existing startups and coaches in our system. 
                  Advanced filtering and search capabilities available.
                </p>
                <div className="flex items-center text-sm font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {Math.floor(Math.random() * 500) + 500} active records
                </div>
              </div>
              
              <div className="p-8 md:w-2/3">
                <h3 className="mb-6 text-lg font-semibold text-gray-500">EXPLORATION TOOLS</h3>
                <div className="grid gap-4">
                  <motion.button
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-between p-5 transition-all border border-gray-200 group rounded-xl hover:border-cyan-300 hover:bg-cyan-50/50"
                    onClick={() => navigate("/view-startups")}
                  >
                    <div className="flex items-center">
                      <div className="p-3 mr-4 transition-colors rounded-lg bg-cyan-100 text-cyan-600 group-hover:bg-cyan-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800">Startup Directory</h4>
                        <p className="mt-1 text-sm text-gray-500">View all registered startups with detailed analytics</p>
                      </div>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400 transition-colors group-hover:text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>

                  <motion.button
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-between p-5 transition-all border border-gray-200 group rounded-xl hover:border-cyan-300 hover:bg-cyan-50/50"
                    onClick={() => navigate("/view-coaches")}
                  >
                    <div className="flex items-center">
                      <div className="p-3 mr-4 transition-colors rounded-lg bg-cyan-100 text-cyan-600 group-hover:bg-cyan-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800">Coach Network</h4>
                        <p className="mt-1 text-sm text-gray-500">Browse our network of mentors and advisors</p>
                      </div>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400 transition-colors group-hover:text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Matching Engine Section */}
        <motion.div
          className="translate-y-20 opacity-0 dashboard-section"
          whileHover={{ scale: 1.005 }}
        >
          <div className="overflow-hidden bg-white border border-gray-100 shadow-2xl rounded-2xl">
            <div className="md:flex">
              <div className="p-8 text-white md:w-1/3 bg-gradient-to-br from-purple-600 to-pink-600">
                <div className="flex items-center mb-6">
                  <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <h2 className="ml-4 text-2xl font-bold">AI Matching Engine</h2>
                </div>
                <p className="mb-6 text-purple-100">
                  Our proprietary algorithm analyzes hundreds of data points to create optimal matches between startups and resources.
                </p>
                <div className="flex items-center text-sm font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  {Math.floor(Math.random() * 1000) + 500} successful matches
                </div>
              </div>
              
              <div className="p-8 md:w-2/3">
                <h3 className="mb-6 text-lg font-semibold text-gray-500">MATCHING OPERATIONS</h3>
                <div className="grid gap-6">
                  <div className="p-6 border border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                    <h4 className="mb-3 text-xl font-bold text-gray-800">Intelligent Matching</h4>
                    <p className="mb-4 text-gray-600">
                      Our AI analyzes compatibility across multiple dimensions including skills, industry, growth stage, and personality factors.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full px-6 py-4 font-semibold text-white transition-all rounded-lg shadow-md bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg"
                      onClick={() => navigate("/start-matching")}
                    >
                      <div className="flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Launch Matching Process
                      </div>
                    </motion.button>
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-4 bg-white border border-gray-200 rounded-lg">
                      <div className="flex items-center mb-2">
                        <div className="p-2 mr-3 text-purple-600 bg-purple-100 rounded-md">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                        <h5 className="font-semibold text-gray-800">Smart Filters</h5>
                      </div>
                      <p className="text-sm text-gray-500">
                        Customize matching parameters with our advanced filtering system
                      </p>
                    </div>
                    
                    <div className="p-4 bg-white border border-gray-200 rounded-lg">
                      <div className="flex items-center mb-2">
                        <div className="p-2 mr-3 text-pink-600 bg-pink-100 rounded-md">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                        </div>
                        <h5 className="font-semibold text-gray-800">Performance Analytics</h5>
                      </div>
                      <p className="text-sm text-gray-500">
                        Track match success rates and relationship outcomes
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Subtle Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute bg-purple-300 rounded-full top-1/4 left-1/4 w-96 h-96 mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute rounded-full top-1/3 right-1/4 w-96 h-96 bg-cyan-300 mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute bg-pink-300 rounded-full bottom-1/4 left-1/2 w-96 h-96 mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(50px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-30px, 30px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 10s infinite ease-in-out;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noiseFilter)' opacity='0.2'/%3E%3C/svg%3E");
        }
      `}</style>
    </div>
  );
}