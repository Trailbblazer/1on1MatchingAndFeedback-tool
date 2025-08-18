import React, { useState } from "react";

const AddStartup = () => {
  const [formData, setFormData] = useState({
    StartupName: "",
    StartupMembers: "",
    PrimaryContact: "",
    SecondaryContact: "",
    StartupDescription: "",
    StartupWebsite: "",
    StartupSocialMedia1: "",
    StartupSocialMedia2: "",
    MeetingsCount: 0,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addStartupToDatabase = async (formData) => {
    const backendUrl =
      process.env.REACT_APP_BACKEND_URL || "http://127.0.0.1:5000";
    const endpoint = `${backendUrl}/startups`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        throw new Error("Failed to add startup.");
      }

      const data = await response.json();
      console.log("Response Data:", data);
      return data;
    } catch (error) {
      console.error("Error adding startup:", error);
      alert("Failed to add startup. Please check the console for details.");
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await addStartupToDatabase(formData);
      alert("Startup added successfully!");
      setFormData({
        StartupName: "",
        StartupMembers: "",
        PrimaryContact: "",
        SecondaryContact: "",
        StartupDescription: "",
        StartupWebsite: "",
        StartupSocialMedia1: "",
        StartupSocialMedia2: "",
        MeetingsCount: 0,
      });
      setCurrentStep(1);
    } catch (error) {
      alert(`Failed to add startup: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    if (currentStep === 1) {
      return formData.StartupName && formData.PrimaryContact;
    }
    if (currentStep === 2) {
      return formData.StartupDescription;
    }
    return true;
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="mb-8 text-center">
              <h3 className="mb-2 text-2xl font-bold text-gray-800">Basic Information</h3>
              <p className="text-gray-600">Let's start with the essentials about your startup</p>
            </div>

            <div className="space-y-6">
              <div className="relative">
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Startup Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="StartupName"
                    placeholder="Enter your startup name"
                    value={formData.StartupName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 text-gray-800 placeholder-gray-400 transition-all duration-300 bg-white border-2 border-gray-200 shadow-sm rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="relative">
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Team Size
                </label>
                <input
                  type="text"
                  name="StartupMembers"
                  placeholder="e.g., 3-5 members"
                  value={formData.StartupMembers}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 text-gray-800 placeholder-gray-400 transition-all duration-300 bg-white border-2 border-gray-200 shadow-sm rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              <div className="relative">
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Primary Contact Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="PrimaryContact"
                    placeholder="founder@yourstartup.com"
                    value={formData.PrimaryContact}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 text-gray-800 placeholder-gray-400 transition-all duration-300 bg-white border-2 border-gray-200 shadow-sm rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="relative">
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Secondary Contact Email
                </label>
                <input
                  type="email"
                  name="SecondaryContact"
                  placeholder="cofounder@yourstartup.com"
                  value={formData.SecondaryContact}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 text-gray-800 placeholder-gray-400 transition-all duration-300 bg-white border-2 border-gray-200 shadow-sm rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="mb-8 text-center">
              <h3 className="mb-2 text-2xl font-bold text-gray-800">Tell Your Story</h3>
              <p className="text-gray-600">Help us understand what makes your startup unique</p>
            </div>

            <div className="relative">
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Startup Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="StartupDescription"
                placeholder="Describe your startup's mission, vision, and what problem you're solving..."
                value={formData.StartupDescription}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-4 py-4 text-gray-800 placeholder-gray-400 transition-all duration-300 bg-white border-2 border-gray-200 shadow-sm resize-none rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                required
              />
              <div className="absolute bottom-4 right-4">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
            </div>

            <div className="relative">
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Number of Meetings Held
              </label>
              <input
                type="number"
                name="MeetingsCount"
                placeholder="0"
                value={formData.MeetingsCount}
                onChange={handleInputChange}
                min={0}
                className="w-full px-4 py-4 text-gray-800 placeholder-gray-400 transition-all duration-300 bg-white border-2 border-gray-200 shadow-sm rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="mb-8 text-center">
              <h3 className="mb-2 text-2xl font-bold text-gray-800">Online Presence</h3>
              <p className="text-gray-600">Share your digital footprint with us</p>
            </div>

            <div className="space-y-6">
              <div className="relative">
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Website URL
                </label>
                <div className="relative">
                  <input
                    type="url"
                    name="StartupWebsite"
                    placeholder="https://www.yourstartup.com"
                    value={formData.StartupWebsite}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 text-gray-800 placeholder-gray-400 transition-all duration-300 bg-white border-2 border-gray-200 shadow-sm rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="relative">
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Primary Social Media
                </label>
                <div className="relative">
                  <input
                    type="url"
                    name="StartupSocialMedia1"
                    placeholder="https://linkedin.com/company/yourstartup"
                    value={formData.StartupSocialMedia1}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 text-gray-800 placeholder-gray-400 transition-all duration-300 bg-white border-2 border-gray-200 shadow-sm rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 011 1v1a1 1 0 01-1 1v11a2 2 0 01-2 2H5a2 2 0 01-2-2V7a1 1 0 01-1-1V5a1 1 0 011-1h4zM9 3v1h6V3H9zm3 6a3 3 0 110 6 3 3 0 010-6z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="relative">
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Secondary Social Media
                </label>
                <input
                  type="url"
                  name="StartupSocialMedia2"
                  placeholder="https://twitter.com/yourstartup"
                  value={formData.StartupSocialMedia2}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 text-gray-800 placeholder-gray-400 transition-all duration-300 bg-white border-2 border-gray-200 shadow-sm rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-900 to-purple-800">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent from-10% to-indigo-900/40"></div>
          <div className="absolute inset-0 bg-noise opacity-10"></div>
        </div>
        
        <div className="relative max-w-4xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 text-sm font-semibold tracking-wider text-indigo-100 uppercase rounded-full bg-indigo-700/50 backdrop-blur-sm">
                Join Our Ecosystem
              </span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              <span className="block">Register Your</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                Startup Today
              </span>
            </h1>
            <p className="max-w-2xl mx-auto mt-6 text-xl text-indigo-200">
              Join thousands of innovative startups in our AI-powered acceleration platform
            </p>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </div>

      {/* Main Form Section */}
      <div className="relative max-w-4xl px-4 py-16 mx-auto -mt-10 sm:px-6 lg:px-8">
        <div className="overflow-hidden bg-white border border-gray-100 shadow-2xl rounded-3xl">
          {/* Progress Bar */}
          <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-purple-50">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Registration Progress</h2>
              <span className="text-sm font-medium text-gray-600">
                Step {currentStep} of {totalSteps}
              </span>
            </div>
            <div className="flex space-x-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex-1">
                  <div className={`h-2 rounded-full transition-all duration-300 ${
                    step <= currentStep ? 'bg-gradient-to-r from-indigo-500 to-purple-500' : 'bg-gray-200'
                  }`} />
                  <div className="mt-2 text-xs font-medium text-center">
                    <span className={step <= currentStep ? 'text-indigo-600' : 'text-gray-400'}>
                      {step === 1 && 'Basic Info'}
                      {step === 2 && 'Description'}
                      {step === 3 && 'Online Presence'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="px-8 py-8">
            <form onSubmit={handleSubmit}>
              {renderStepContent()}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-6 mt-8 border-t border-gray-100">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    currentStep === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300 shadow-sm hover:shadow'
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous
                  </div>
                </button>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => (window.location.href = "/")}
                    className="px-6 py-3 font-semibold text-gray-600 transition-all duration-300 bg-gray-100 shadow-sm rounded-xl hover:bg-gray-200 hover:shadow"
                  >
                    Cancel
                  </button>

                  {currentStep < totalSteps ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!canProceed()}
                      className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                        canProceed()
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center">
                        Continue
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isLoading || !canProceed()}
                      className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                        !isLoading && canProceed()
                          ? 'bg-gradient-to-r from-emerald-600 to-cyan-600 text-white hover:from-emerald-700 hover:to-cyan-700 shadow-lg hover:shadow-xl'
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
                            Registering...
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Complete Registration
                          </>
                        )}
                      </div>
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <p className="mb-6 text-sm text-gray-500">Trusted by innovative startups worldwide</p>
          <div className="flex items-center justify-center space-x-8 opacity-40">
            <div className="px-6 py-3 bg-gray-200 rounded-lg">
              <span className="text-xs font-semibold text-gray-600">500+ STARTUPS</span>
            </div>
            <div className="px-6 py-3 bg-gray-200 rounded-lg">
              <span className="text-xs font-semibold text-gray-600">50+ COUNTRIES</span>
            </div>
            <div className="px-6 py-3 bg-gray-200 rounded-lg">
              <span className="text-xs font-semibold text-gray-600">95% SUCCESS RATE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute bg-indigo-300 rounded-full top-1/4 left-1/4 w-96 h-96 mix-blend-multiply filter blur-3xl opacity-5"></div>
        <div className="absolute bg-purple-300 rounded-full top-1/3 right-1/4 w-96 h-96 mix-blend-multiply filter blur-3xl opacity-5"></div>
        <div className="absolute rounded-full bg-cyan-300 bottom-1/4 left-1/2 w-96 h-96 mix-blend-multiply filter blur-3xl opacity-5"></div>
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

export default AddStartup;