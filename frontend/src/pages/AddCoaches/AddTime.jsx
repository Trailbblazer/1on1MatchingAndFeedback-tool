import React, { useState } from "react";

const CoachAvailabilityPage = () => {
  const [formData, setFormData] = useState({
    locationType: "online",
    availableDays: [],
    timeSlots: [],
    meetingDuration: 60,
  });

  const [newSlot, setNewSlot] = useState({
    day: "",
    startTime: "",
    endTime: ""
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleAddTimeSlot = (e) => {
    e.preventDefault();
    if (newSlot.day && newSlot.startTime && newSlot.endTime) {
      setFormData(prev => ({
        ...prev,
        timeSlots: [...prev.timeSlots, {
          ...newSlot,
          id: Date.now()
        }]
      }));
      setNewSlot({ day: "", startTime: "", endTime: "" });
    }
  };

  const handleRemoveTimeSlot = (id) => {
    setFormData(prev => ({
      ...prev,
      timeSlots: prev.timeSlots.filter(slot => slot.id !== id)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log("Availability data:", formData);
      alert('Availability saved successfully!');
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const canSubmit = formData.timeSlots.length > 0;

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
              <span className="block">Set Coach</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-lime-400">
                Availability
              </span>
            </h1>
            <p className="max-w-2xl mx-auto mt-6 text-xl text-emerald-200">
              Define when coaches are available for sessions
            </p>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </div>

      {/* Main Form Section */}
      <div className="relative max-w-4xl px-4 py-16 mx-auto -mt-10 sm:px-6 lg:px-8">
        <div className="overflow-hidden bg-white border border-gray-100 shadow-2xl rounded-3xl">
          <div className="px-8 py-8">
            <div className="space-y-8">
              <div className="mb-8 text-center">
                <h3 className="mb-2 text-2xl font-bold text-gray-800">Availability Settings</h3>
                <p className="text-gray-600">Configure when coaches are available for sessions</p>
              </div>

              {/* Location Type */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-800">Meeting Type</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="radio"
                      id="online"
                      name="locationType"
                      checked={formData.locationType === "online"}
                      onChange={() => setFormData({...formData, locationType: "online"})}
                      className="hidden peer"
                    />
                    <label
                      htmlFor="online"
                      className="flex flex-col items-center justify-center p-6 border-2 border-gray-200 cursor-pointer rounded-xl peer-checked:border-emerald-500 peer-checked:bg-emerald-50 hover:bg-gray-50"
                    >
                      <div className="p-3 mb-3 rounded-full bg-emerald-100 text-emerald-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h5 className="mb-1 font-medium text-gray-900">Online Meeting</h5>
                      <p className="text-sm text-gray-500">Video call via our platform</p>
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="in-person"
                      name="locationType"
                      checked={formData.locationType === "in-person"}
                      onChange={() => setFormData({...formData, locationType: "in-person"})}
                      className="hidden peer"
                    />
                    <label
                      htmlFor="in-person"
                      className="flex flex-col items-center justify-center p-6 border-2 border-gray-200 cursor-pointer rounded-xl peer-checked:border-emerald-500 peer-checked:bg-emerald-50 hover:bg-gray-50"
                    >
                      <div className="p-3 mb-3 rounded-full bg-emerald-100 text-emerald-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <h5 className="mb-1 font-medium text-gray-900">In-Person</h5>
                      <p className="text-sm text-gray-500">At Startup Sauna location</p>
                    </label>
                  </div>
                </div>
              </div>

              {/* Meeting Duration */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-800">Session Duration</h4>
                <div className="flex items-center space-x-4">
                  <select
                    value={formData.meetingDuration}
                    onChange={(e) => setFormData({...formData, meetingDuration: e.target.value})}
                    className="px-4 py-3 text-gray-800 bg-white border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                  >
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">60 minutes</option>
                    <option value="90">90 minutes</option>
                  </select>
                  <span className="text-sm text-gray-500">Duration of each session</span>
                </div>
              </div>

              {/* Time Slots */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-800">Add Time Slots</h4>
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                    <div key={day} className="text-center">
                      <input
                        type="checkbox"
                        id={`day-${day}`}
                        checked={formData.availableDays.includes(day)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({...formData, availableDays: [...formData.availableDays, day]});
                          } else {
                            setFormData({...formData, availableDays: formData.availableDays.filter(d => d !== day)});
                          }
                        }}
                        className="hidden peer"
                      />
                      <label
                        htmlFor={`day-${day}`}
                        className="block p-2 text-sm font-medium border rounded-lg cursor-pointer peer-checked:bg-emerald-500 peer-checked:text-white peer-checked:border-emerald-500 hover:bg-gray-100"
                      >
                        {day}
                      </label>
                    </div>
                  ))}
                </div>

                {formData.availableDays.length > 0 ? (
                  <div className="space-y-4">
                    <div className="flex space-x-4">
                      <div className="flex-1">
                        <label className="block mb-1 text-sm text-gray-600">Start Time</label>
                        <input
                          type="time"
                          value={newSlot.startTime}
                          onChange={(e) => setNewSlot({...newSlot, startTime: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block mb-1 text-sm text-gray-600">End Time</label>
                        <input
                          type="time"
                          value={newSlot.endTime}
                          onChange={(e) => setNewSlot({...newSlot, endTime: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div className="flex items-end">
                        <button
                          type="button"
                          onClick={handleAddTimeSlot}
                          disabled={!newSlot.startTime || !newSlot.endTime}
                          className="px-4 py-2 text-white rounded-lg bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-400"
                        >
                          Add Slot
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 text-center text-gray-500 rounded-lg bg-gray-50">
                    Select days to add time slots
                  </div>
                )}

                {formData.timeSlots.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <h6 className="text-sm font-medium text-gray-700">Current Availability:</h6>
                    <div className="space-y-2">
                      {formData.timeSlots.map((slot) => (
                        <div key={slot.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                          <span className="text-sm font-medium">
                            {slot.day}: {slot.startTime} - {slot.endTime}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemoveTimeSlot(slot.id)}
                            className="p-1 text-gray-400 hover:text-red-500"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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
                        Saving...
                      </>
                    ) : (
                      'Save Availability'
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <p className="mb-6 text-sm text-gray-500">Flexible scheduling for maximum impact</p>
          <div className="flex items-center justify-center space-x-8 opacity-40">
            <div className="px-6 py-3 bg-gray-200 rounded-lg">
              <span className="text-xs font-semibold text-gray-600">FLEXIBLE SCHEDULING</span>
            </div>
            <div className="px-6 py-3 bg-gray-200 rounded-lg">
              <span className="text-xs font-semibold text-gray-600">AUTOMATIC REMINDERS</span>
            </div>
            <div className="px-6 py-3 bg-gray-200 rounded-lg">
              <span className="text-xs font-semibold text-gray-600">CALENDAR SYNC</span>
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

export default CoachAvailabilityPage;