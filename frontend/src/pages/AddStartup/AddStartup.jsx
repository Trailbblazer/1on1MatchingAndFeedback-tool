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
    } catch (error) {
      alert(`Failed to add startup: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center flex-col justify-center min-h-screen bg-gradient-to-br from-purple-200 via-purple-400 to-purple-600">
      <div
        className="w-full max-w-lg px-10 py-8 mx-auto bg-white rounded-lg shadow-xl"
        style={{ margin: "3% 0" }}
      >
        <div className="max-w-md mx-auto space-y-6">
          <p className="text-center text-sm text-gray-600">
            We'd love to learn more about your startup! Please provide the
            following details so we can add it to our platform:
          </p>

          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            <div className="w-full">
              <label className="block mb-1 text-sm text-slate-800">
                Startup Name
              </label>
              <input
                type="text"
                name="StartupName"
                placeholder="e.g John Doe"
                value={formData.StartupName}
                onChange={handleInputChange}
                className="w-full h-10 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                required
              />
            </div>

            <div className="w-full">
              <label className="block mb-1 text-sm text-slate-800 mt-4">
                Startup Members
              </label>
              <input
                type="text"
                name="StartupMembers"
                placeholder="e.g 3-5 Members"
                value={formData.StartupMembers}
                onChange={handleInputChange}
                className="w-full h-10 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
              />
            </div>

            <div className="w-full">
              <label className="block mb-1 text-sm text-slate-800 mt-4">
                Primary Contact Email
              </label>
              <input
                type="email"
                name="PrimaryContact"
                placeholder="e.g example@domain.com"
                value={formData.PrimaryContact}
                onChange={handleInputChange}
                className="w-full h-10 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                required
              />
            </div>

            <div className="w-full">
              <label className="block mb-1 text-sm text-slate-800 mt-4">
                Secondary Contact Email
              </label>
              <input
                type="email"
                name="SecondaryContact"
                placeholder="e.g example@domain.com"
                value={formData.SecondaryContact}
                onChange={handleInputChange}
                className="w-full h-10 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
              />
            </div>

            <div className="w-full">
              <label className="block mb-1 text-sm text-slate-800 mt-4">
                Startup Description
              </label>
              <textarea
                name="StartupDescription"
                placeholder="Describe your startup"
                value={formData.StartupDescription}
                onChange={handleInputChange}
                className="w-full h-20 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
              />
            </div>

            <div className="w-full">
              <label className="block mb-1 text-sm text-slate-800 mt-4">
                Startup Website
              </label>
              <input
                type="url"
                name="StartupWebsite"
                placeholder="e.g https://www.yourstartup.com"
                value={formData.StartupWebsite}
                onChange={handleInputChange}
                className="w-full h-10 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
              />
            </div>

            <div className="w-full">
              <label className="block mb-1 text-sm text-slate-800 mt-4">
                Social Media Link 1
              </label>
              <input
                type="url"
                name="StartupSocialMedia1"
                placeholder="e.g https://twitter.com/yourstartup"
                value={formData.StartupSocialMedia1}
                onChange={handleInputChange}
                className="w-full h-10 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
              />
            </div>

            <div className="w-full">
              <label className="block mb-1 text-sm text-slate-800 mt-4">
                Number of Meetings
              </label>
              <input
                type="number"
                name="MeetingsCount"
                placeholder="e.g 10"
                value={formData.MeetingsCount}
                onChange={handleInputChange}
                className="w-full h-10 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                min={0}
              />
            </div>
            <div className="space-y-2">
              <button
                type="submit"
                className={`w-full text-sm flex items-center justify-center bg-slate-800 rounded hover:bg-slate-700 text-white py-3 px-6 transition-all duration-300`}
                disabled={isLoading}
              >
                {isLoading ? "Adding..." : "Add Startup"}
              </button>

              <button
                type="button"
                className="w-full text-sm flex items-center justify-center bg-slate-800 rounded hover:bg-slate-700 text-white py-3 px-6"
                onClick={() => (window.location.href = "/")}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddStartup;
