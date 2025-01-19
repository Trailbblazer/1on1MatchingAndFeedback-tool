import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div
        data-dialog-backdrop="web-3-modal"
        data-dialog-backdrop-close="true"
        className="inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300"
      >
        <div
          className="relative m-4 rounded-lg bg-white shadow-sm"
          data-dialog="web-3-modal"
        >
          <div className="flex items-start justify-between p-4">
            <div className="text-center w-full">
              <h5 className="text-xl font-medium text-slate-800">Sauna tool</h5>
              <p className="text-slate-500 text-sm font-light">
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
                className="w-full mt-3 rounded-md flex items-center justify-center border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                onClick={() => (window.location.href = "/add-startup")}
              >
                <span className="h-5 w-5 mr-2">🦄</span> {/* Unicorn Emoji */}
                Add Startup
              </button>

              <button
                className="w-full mt-2 rounded-md flex items-center justify-center border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                onClick={() => (window.location.href = "/add-coaches")}
              >
                <span className="h-5 w-5 mr-2">🤖</span> {/* Robot Emoji */}
                Add Coaches
              </button>
            </div>
            <div>
              <p className="pt-3 text-xs uppercase text-slate-500">View Tool</p>
              <button
                className="mt-3 w-full rounded-md flex items-center justify-center border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                onClick={() => (window.location.href = "/view-startups")}
              >
                <span className="h-5 w-5 mr-2">🌍</span> {/* Earth Emoji */}
                View Startups
              </button>

              <button
                className="mt-3 w-full rounded-md flex items-center justify-center border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                onClick={() => (window.location.href = "/view-coaches")}
              >
                <span className="h-5 w-5 mr-2">🐱</span> {/* Cat Emoji */}
                View Coaches
              </button>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 p-4 text-blue-gray-500 mt-2">
            <p className="pt-3 text-xs uppercase text-slate-500 mt-2">
              Main Func tool
            </p>
            <button
              className="w-full rounded-md flex items-center justify-center border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              onClick={() => (window.location.href = "/start-matching")}
            >
              <span className="h-5 w-5 mr-2">🌚</span> {/* New Moon Emoji */}
              Start Matching
            </button>
          </div>
        </div>
      </div>
      {/* Modal Code End */}
    </div>
  );
}
