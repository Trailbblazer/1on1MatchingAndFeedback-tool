import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const UserProfile = ({ userData }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    stage: '',
    employees: '',
    description: '',
    website: '',
    location: '',
    fundingStatus: '',
    challenges: []
  });

  const industries = [
    'Technology', 'Healthcare', 'Finance', 'E-commerce', 'Education', 
    'Marketing', 'Manufacturing', 'Real Estate', 'Food & Beverage', 'Other'
  ];

  const stages = [
    'Idea Stage', 'MVP Development', 'Early Stage', 'Growth Stage', 'Scaling', 'Established'
  ];

  const employeeRanges = [
    '1-5', '6-10', '11-25', '26-50', '51-100', '100+'
  ];

  const fundingStatuses = [
    'Bootstrapped', 'Seeking Seed', 'Seed Funded', 'Series A', 'Series B+', 'Not Seeking Funding'
  ];

  const commonChallenges = [
    'Product Development', 'Marketing & Sales', 'Fundraising', 'Team Building',
    'Operations', 'Strategy', 'Legal & Compliance', 'Financial Management'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleChallengeToggle = (challenge) => {
    setFormData(prev => ({
      ...prev,
      challenges: prev.challenges.includes(challenge)
        ? prev.challenges.filter(c => c !== challenge)
        : [...prev.challenges, challenge]
    }));
  };

  const handleSave = () => {
    // Here you would typically save to your backend
    console.log('Saving profile:', formData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b shadow-sm bg-white/80 backdrop-blur-lg border-gray-200/50">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/user-dashboard')}
                className="p-2 text-gray-500 transition-colors rounded-lg hover:text-gray-700 hover:bg-gray-100"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Company Profile</h1>
                <p className="text-sm text-gray-600">Manage your startup information</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700"
                >
                  Edit Profile
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-gray-600 transition-colors bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl p-8 mx-auto">
        {/* Personal Info */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 mb-8 bg-white border shadow-xl rounded-2xl border-white/20"
        >
          <div className="flex items-center mb-6 space-x-6">
            {userData?.picture && (
              <img
                src={userData.picture}
                alt="Profile"
                className="w-20 h-20 border-4 border-white rounded-full shadow-lg"
              />
            )}
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{userData?.name || 'User Name'}</h2>
              <p className="text-gray-600">{userData?.email || 'user@example.com'}</p>
              <div className="flex items-center mt-2">
                <div className="w-3 h-3 mr-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-gray-500">Profile Active</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Company Information */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-8 mb-8 bg-white border shadow-xl rounded-2xl border-white/20"
        >
          <h3 className="mb-6 text-xl font-bold text-gray-900">Company Information</h3>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Company Name */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Company Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter company name"
                />
              ) : (
                <div className="px-4 py-3 text-gray-900 rounded-lg bg-gray-50">
                  {formData.companyName || 'Not specified'}
                </div>
              )}
            </div>

            {/* Industry */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Industry</label>
              {isEditing ? (
                <select
                  value={formData.industry}
                  onChange={(e) => handleInputChange('industry', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select industry</option>
                  {industries.map(industry => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
              ) : (
                <div className="px-4 py-3 text-gray-900 rounded-lg bg-gray-50">
                  {formData.industry || 'Not specified'}
                </div>
              )}
            </div>

            {/* Stage */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Company Stage</label>
              {isEditing ? (
                <select
                  value={formData.stage}
                  onChange={(e) => handleInputChange('stage', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select stage</option>
                  {stages.map(stage => (
                    <option key={stage} value={stage}>{stage}</option>
                  ))}
                </select>
              ) : (
                <div className="px-4 py-3 text-gray-900 rounded-lg bg-gray-50">
                  {formData.stage || 'Not specified'}
                </div>
              )}
            </div>

            {/* Employees */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Number of Employees</label>
              {isEditing ? (
                <select
                  value={formData.employees}
                  onChange={(e) => handleInputChange('employees', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select range</option>
                  {employeeRanges.map(range => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
              ) : (
                <div className="px-4 py-3 text-gray-900 rounded-lg bg-gray-50">
                  {formData.employees || 'Not specified'}
                </div>
              )}
            </div>

            {/* Website */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Website</label>
              {isEditing ? (
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="https://yourcompany.com"
                />
              ) : (
                <div className="px-4 py-3 text-gray-900 rounded-lg bg-gray-50">
                  {formData.website ? (
                    <a href={formData.website} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800">
                      {formData.website}
                    </a>
                  ) : 'Not specified'}
                </div>
              )}
            </div>

            {/* Location */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Location</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="City, Country"
                />
              ) : (
                <div className="px-4 py-3 text-gray-900 rounded-lg bg-gray-50">
                  {formData.location || 'Not specified'}
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">Company Description</label>
            {isEditing ? (
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Describe your company, its mission, and what you do..."
              />
            ) : (
              <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900 min-h-[100px]">
                {formData.description || 'No description provided'}
              </div>
            )}
          </div>

          {/* Funding Status */}
          <div className="mt-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">Funding Status</label>
            {isEditing ? (
              <select
                value={formData.fundingStatus}
                onChange={(e) => handleInputChange('fundingStatus', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select funding status</option>
                {fundingStatuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            ) : (
              <div className="px-4 py-3 text-gray-900 rounded-lg bg-gray-50">
                {formData.fundingStatus || 'Not specified'}
              </div>
            )}
          </div>
        </motion.div>

        {/* Challenges & Goals */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-8 bg-white border shadow-xl rounded-2xl border-white/20"
        >
          <h3 className="mb-6 text-xl font-bold text-gray-900">Areas Where You Need Coaching</h3>
          
          {isEditing ? (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {commonChallenges.map(challenge => (
                <button
                  key={challenge}
                  onClick={() => handleChallengeToggle(challenge)}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 text-sm font-medium ${
                    formData.challenges.includes(challenge)
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {challenge}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {formData.challenges.length > 0 ? (
                formData.challenges.map(challenge => (
                  <span
                    key={challenge}
                    className="px-3 py-1 text-sm font-medium text-indigo-800 bg-indigo-100 rounded-full"
                  >
                    {challenge}
                  </span>
                ))
              ) : (
                <span className="text-gray-500">No challenges specified</span>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default UserProfile;