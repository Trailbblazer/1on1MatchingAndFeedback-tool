import React from "react";

export default function StartMatching() {
  return (
    <div class="h-screen w-full flex flex-col justify-center items-center bg-gradient-to-br from-purple-200 via-purple-400 to-purple-600 relative">
      <h1 class="text-9xl font-extrabold text-white tracking-widest">404</h1>
      <div class="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>
      <p class="text-white text-lg mt-8">
        This page is currently under development. Please check back later!
      </p>
      <button
        className="mt-4 flex select-none items-center justify-center gap-2 rounded bg-transparent border border-white py-3 px-6 w-40 text-xs font-semibold text-white shadow-md shadow-slate-900/10 transition-all hover:bg-white hover:text-slate-800 hover:shadow-lg hover:shadow-slate-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button"
        onClick={() => (window.location.href = "/")}
      >
        Return
      </button>
    </div>
  );
}
