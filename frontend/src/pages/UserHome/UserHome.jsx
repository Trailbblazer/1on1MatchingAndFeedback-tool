import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function UserHome({ userData, onLogout }) {
  const navigate = useNavigate();
  const [userStats] = useState({
    totalMeetings: 0, // This are mock data, replace with actual API calls
    upcomingMeetings: 0,
    completedSessions: 0,
    profileCompletion: 0
  });

  const quickActions = [
    {
      title: "Complete Profile",
      subtitle: "Add company details",
      icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
      action: () => navigate("/user-profile"),
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-50 to-blue-100",
      iconBg: "bg-blue-500"
    },
    {
      title: "View Meetings",
      subtitle: "Check schedule",
      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
      action: () => navigate("/user-meetings"),
      gradient: "from-emerald-500 to-emerald-600",
      bgGradient: "from-emerald-50 to-emerald-100",
      iconBg: "bg-emerald-500"
    }
  ];

  const upcomingMeetings = [
    {

      // Mock data for upcoming meetings
      id: 1,
      coachName: "Sarah Johnson",
      date: "2025-08-15",
      time: "2:00 PM",
      topic: "Marketing Strategy",
      location: "Zoom",
      status: "confirmed"
    },
    
    {
      // Another mock data for upcoming meetings
      id: 2,
      coachName: "David Chen",
      date: "2025-08-18",
      time: "10:00 AM",
      topic: "Product Development",
      location: "Office Meeting Room A",
      status: "pending"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b shadow-sm bg-white/80 backdrop-blur-lg border-gray-200/50">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-10 h-10 shadow-lg bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-transparent bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
                  Welcome, {userData?.name || 'User'}!
                </h1>
                <p className="text-sm font-medium text-gray-600">Startup Coaching Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              {userData?.picture && (
                <img
                  src={userData.picture}
                  alt="Profile"
                  className="w-8 h-8 border-2 border-white rounded-full shadow-sm"
                />
              )}
              <button
                onClick={onLogout}
                className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 mx-auto max-w-7xl">
        {/* Welcome Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-8 mb-8 text-white shadow-xl bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="mb-2 text-3xl font-bold">Ready to grow your startup?</h2>
              <p className="text-lg text-indigo-100">Connect with expert coaches and accelerate your business journey</p>
            </div>
            <div className="hidden md:block">
              <svg className="w-24 h-24 text-white/20" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
          {[
            { 
              title: "Total Meetings", 
              value: userStats.totalMeetings, 
              icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
              gradient: "from-blue-500 to-blue-600"
            },
            { 
              title: "Upcoming Sessions", 
              value: userStats.upcomingMeetings, 
              icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
              gradient: "from-emerald-500 to-emerald-600"
            },
            { 
              title: "Completed Sessions", 
              value: userStats.completedSessions, 
              icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
              gradient: "from-purple-500 to-purple-600"
            },
            { 
              title: "Profile Complete", 
              value: `${userStats.profileCompletion}%`, 
              icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
              gradient: "from-orange-500 to-orange-600"
            }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-6 text-white shadow-lg rounded-2xl bg-gradient-to-br ${stat.gradient}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="mb-1 text-sm font-medium">{stat.title}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <div className="p-3 bg-white/20 rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="p-8 mb-8 bg-white border shadow-xl rounded-2xl border-white/20"
        >
          <h2 className="mb-6 text-2xl font-bold text-gray-800">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {quickActions.map((action, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={action.action}
                className={`p-6 rounded-2xl bg-gradient-to-br ${action.bgGradient} border border-white/50 shadow-lg transition-all duration-300 text-left`}
              >
                <div className={`w-12 h-12 ${action.iconBg} rounded-xl shadow-lg mb-4 flex items-center justify-center`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={action.icon} />
                  </svg>
                </div>
                <h3 className="mb-1 text-lg font-bold text-gray-800">{action.title}</h3>
                <p className="text-sm font-medium text-gray-600">{action.subtitle}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Meetings */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="p-8 bg-white border shadow-xl rounded-2xl border-white/20"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Upcoming Meetings</h2>
            <button
              onClick={() => navigate("/user-meetings")}
              className="px-4 py-2 text-sm font-medium text-indigo-600 transition-colors rounded-lg bg-indigo-50 hover:bg-indigo-100"
            >
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {upcomingMeetings.map((meeting) => (
              <div
                key={meeting.id}
                className="p-6 transition-colors border border-gray-100 rounded-xl bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-full">
                        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{meeting.coachName}</h3>
                        <p className="text-sm text-gray-600">{meeting.topic}</p>
                        <div className="flex items-center mt-1 space-x-4 text-xs text-gray-500">
                          <span>📅 {meeting.date}</span>
                          <span>🕐 {meeting.time}</span>
                          <span>📍 {meeting.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="ml-4">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      meeting.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {meeting.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
