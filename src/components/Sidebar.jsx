import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Sidebar({ isOpen, isMobile }) {
  const location = useLocation()

  const links = [
    { to: '/', label: '🏠 Dashboard' },
    { to: '/poster', label: '🎨 Poster Generator' },
    { to: '/social', label: '📣 Social Posts Content' },
    { to: '/bios', label: '💬 Bios Writer' },
  ]

  return (
    <aside
      className={`bg-white rounded-r-3xl p-4 md:p-8 flex flex-col gap-8 shadow-xl max-h-screen sticky top-0
        transition-width duration-300 ease-in-out
        ${isMobile ? (isOpen ? 'w-72' : 'w-20') : 'w-72'}
      `}
    >

      <div className={`flex items-center gap-4 cursor-pointer select-none ${!isOpen && isMobile ? 'justify-center' : ''}`}>
        <div
          className={`w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white font-extrabold text-lg`}
        >
          AH
        </div>
        {(isOpen || !isMobile) && (
          <div>
            <div className="font-bold text-lg text-gray-900">Human Testman</div>
            <div className="text-xs text-green-500 font-semibold tracking-wide">⦿ Online</div>
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-3">
          {links.map(({ to, label }) => {
            const isActive = location.pathname === to

            const firstSpaceIndex = label.indexOf(' ')
            const emoji = firstSpaceIndex === -1 ? label : label.slice(0, firstSpaceIndex)
            const text = firstSpaceIndex === -1 ? '' : label.slice(firstSpaceIndex + 1)

            return (
              <li key={to}>
                <Link
                  to={to}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-colors duration-300 select-none
                    ${
                      isActive
                        ? 'bg-teal-100 text-teal-700 shadow-inner'
                        : 'text-gray-700 hover:bg-teal-50 hover:text-teal-600'
                    }
                  `}
                >
                  <span>{emoji}</span>
                  {(isOpen || !isMobile) && <span className="whitespace-nowrap">{text}</span>}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {(isOpen || !isMobile) && (
        <div>
          <button className="w-full px-5 py-3 rounded-full bg-gradient-to-r from-teal-400 to-cyan-500 text-white font-bold shadow-lg hover:brightness-110 transition duration-300">
            + Invite people
          </button>
        </div>
      )}
    </aside>
  )
}
