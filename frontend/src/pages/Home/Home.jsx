import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div
        data-dialog-backdrop="web-3-modal"
        data-dialog-backdrop-close="true"
        className="inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300"
      >
        <div
          className="relative m-4 bg-white rounded-lg shadow-sm"
          data-dialog="web-3-modal"
        >
          <div className="flex items-start justify-between p-4">
            <div className="w-full text-center">
              <h5 className="text-xl font-medium text-slate-800">Sauna tool</h5>
              <p className="text-sm font-light text-slate-500">
                Choose which tool you want to use
              </p>
            </div>
          </div>
          <div className="relative px-4">
            <div className="mb-6">
              <p className="pt-3 text-xs uppercase text-slate-500">
                Input Tool
              </p>
              <button
                className="flex items-center justify-center w-full px-4 py-2 mt-3 text-sm text-center transition-all border rounded-md shadow-sm border-slate-300 hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                onClick={() => navigate("/add-startup")}
              >
                <span className="w-5 h-5 mr-2">🦄</span>
                Add Startup
              </button>

              <button
                className="flex items-center justify-center w-full px-4 py-2 mt-2 text-sm text-center transition-all border rounded-md shadow-sm border-slate-300 hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                onClick={() => navigate("/add-coaches")}
              >
                <span className="w-5 h-5 mr-2">🤖</span>
                Add Coaches
              </button>
            </div>
            <div>
              <p className="pt-3 text-xs uppercase text-slate-500">View Tool</p>
              <button
                className="flex items-center justify-center w-full px-4 py-2 mt-3 text-sm text-center transition-all border rounded-md shadow-sm border-slate-300 hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                onClick={() => navigate("/view-startups")}
              >
                <span className="w-5 h-5 mr-2">🌍</span>
                View Startups
              </button>

              <button
                className="flex items-center justify-center w-full px-4 py-2 mt-3 text-sm text-center transition-all border rounded-md shadow-sm border-slate-300 hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                onClick={() => navigate("/view-coaches")}
              >
                <span className="w-5 h-5 mr-2">🐱</span>
                View Coaches
              </button>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 p-4 mt-2 text-blue-gray-500">
            <p className="pt-3 mt-2 text-xs uppercase text-slate-500">
              Main Func tool
            </p>
            <button
              className="flex items-center justify-center w-full px-4 py-2 text-sm text-center transition-all border rounded-md shadow-sm border-slate-300 hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              onClick={() => navigate("/start-matching")}
            >
              <span className="w-5 h-5 mr-2">🌚</span>
              Start Matching
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}