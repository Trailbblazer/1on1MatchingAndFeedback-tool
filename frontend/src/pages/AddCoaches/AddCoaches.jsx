import React, { useState } from "react";
import { addCoach } from "../../api/coachApi";

const AddCoachPage = () => {
  const [formData, setFormData] = useState({
    CoachName: "",
    LinkedInAccount: "",
    Expertise: "",
    Bio: "",
    ExperienceYears: 0,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await addCoach(formData);
      alert('Coach created successfully!');
      setFormData({
        CoachName: "",
        LinkedInAccount: "",
        Expertise: "",
        Bio: "",
        ExperienceYears: 0,
      });
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const canSubmit = formData.CoachName && formData.LinkedInAccount;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-900 to-teal-800">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent from-10% to-emerald-900/40"></div>
          <div className="absolute inset-0 bg-noise opacity-10"></div>
        </div>
        
        <div className="relative max-w-4xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              <span className="block">Add New</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-lime-400">
                Coach Profile
              </span>
            </h1>
            <p className="max-w-2xl mx-auto mt-6 text-xl text-emerald-200">
              Register a new coach to our network
            </p>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </div>

      {/* Main Form Section */}
      <div className="relative max-w-4xl px-4 py-16 mx-auto -mt-10 sm:px-6 lg:px-8">
        <div className="overflow-hidden bg-white border border-gray-100 shadow-2xl rounded-3xl">
          <div className="px-8 py-8">
            <div className="space-y-6">
              <div className="mb-8 text-center">
                <h3 className="mb-2 text-2xl font-bold text-gray-800">Coach Information</h3>
                <p className="text-gray-600">Enter the coach's professional details</p>
              </div>

              <div className="space-y-6">
                <div className="relative">
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="CoachName"
                      placeholder="Enter coach's full name"
                      value={formData.CoachName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 text-gray-800 placeholder-gray-400 transition-all duration-300 bg-white border-2 border-gray-200 shadow-sm rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    LinkedIn Account <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      name="LinkedInAccount"
                      placeholder="https://linkedin.com/in/yourprofile"
                      value={formData.LinkedInAccount}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 text-gray-800 placeholder-gray-400 transition-all duration-300 bg-white border-2 border-gray-200 shadow-sm rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Years of Experience
                  </label>
                  <input
                    type="number"
                    name="ExperienceYears"
                    placeholder="0"
                    value={formData.ExperienceYears}
                    onChange={handleInputChange}
                    min={0}
                    className="w-full px-4 py-4 text-gray-800 placeholder-gray-400 transition-all duration-300 bg-white border-2 border-gray-200 shadow-sm rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  />
                </div>

                <div className="relative">
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Areas of Expertise
                  </label>
                  <input
                    type="text"
                    name="Expertise"
                    placeholder="e.g., Product Management, Marketing, Fundraising"
                    value={formData.Expertise}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 text-gray-800 placeholder-gray-400 transition-all duration-300 bg-white border-2 border-gray-200 shadow-sm rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  />
                </div>

                <div className="relative">
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Professional Bio
                  </label>
                  <textarea
                    name="Bio"
                    placeholder="Tell us about the coach's background and expertise..."
                    value={formData.Bio}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-4 py-4 text-gray-800 placeholder-gray-400 transition-all duration-300 bg-white border-2 border-gray-200 shadow-sm resize-none rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  />
                  <div className="absolute bottom-4 right-4">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-between pt-6 mt-8 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => window.location.href = '/'}
                  className="px-6 py-3 font-semibold text-gray-600 transition-all duration-300 bg-gray-100 shadow-sm rounded-xl hover:bg-gray-200 hover:shadow"
                >
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Home
                  </div>
                </button>

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading || !canSubmit}
                  className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    canSubmit && !isLoading
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 shadow-lg hover:shadow-xl'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center">
                    {isLoading ? (
                      <>
                        <svg className="w-4 h-4 mr-3 -ml-1 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating...
                      </>
                    ) : (
                      'Create Coach Profile'
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <p className="mb-6 text-sm text-gray-500">Join our network of experienced coaches</p>
          <div className="flex items-center justify-center space-x-8 opacity-40">
            <div className="px-6 py-3 bg-gray-200 rounded-lg">
              <span className="text-xs font-semibold text-gray-600">100+ COACHES</span>
            </div>
            <div className="px-6 py-3 bg-gray-200 rounded-lg">
              <span className="text-xs font-semibold text-gray-600">1000+ SESSIONS</span>
            </div>
            <div className="px-6 py-3 bg-gray-200 rounded-lg">
              <span className="text-xs font-semibold text-gray-600">4.9/5 RATING</span>
            </div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute rounded-full bg-emerald-300 top-1/4 left-1/4 w-96 h-96 mix-blend-multiply filter blur-3xl opacity-5"></div>
        <div className="absolute bg-teal-300 rounded-full top-1/3 right-1/4 w-96 h-96 mix-blend-multiply filter blur-3xl opacity-5"></div>
        <div className="absolute bg-green-300 rounded-full bottom-1/4 left-1/2 w-96 h-96 mix-blend-multiply filter blur-3xl opacity-5"></div>
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noiseFilter)' opacity='0.2'/%3E%3C/svg%3E");
        }
      `}</style>
    </div>
  );
};

export default AddCoachPage;