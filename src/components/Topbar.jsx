import React from 'react'

export default function Topbar({ toggleSidebar, isMobile }) {
  return (
    <header className="mb-8 bg-white shadow-sm rounded-xl p-4 max-w-7xl mx-auto">
      {isMobile && (
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={toggleSidebar}
            className="text-teal-600 hover:text-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-400 rounded"
            aria-label="Toggle sidebar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      )}

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight font-poppins">
            👋 Hello, Human
          </h1>
          <p className="text-lg text-teal-600 font-medium font-poppins">
            AI Artist Toolkit — create & promote your work
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button
            className="px-5 py-2 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold shadow-lg hover:from-teal-600 hover:to-cyan-600 transition duration-300 focus:outline-none focus:ring-4 focus:ring-cyan-300"
            aria-label="Ask AI"
          >
            💬 Ask AI
          </button>
          <button
            className="px-5 py-2 rounded-full border border-slate-300 text-slate-700 font-semibold hover:bg-slate-100 transition duration-300 focus:outline-none focus:ring-2 focus:ring-teal-300"
            aria-label="Get Updates"
          >
            📬 Get Updates
          </button>
        </div>
      </div>
    </header>
  )
}
