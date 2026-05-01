import { useState } from "react"

export const PreparationDayCard = ({ day, index }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  
  return (
    <div className="relative">
      {/* Timeline connector */}
      {index < day.length - 1 && (
        <div className="absolute left-6 top-16 w-0.5 h-16 bg-linear-to-b from-teal-500 to-transparent" />
      )}
      
      <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 overflow-hidden hover:border-teal-500/30 transition-all duration-300">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-5 py-4 flex items-center gap-4 text-left"
        >
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-linear-to-br from-teal-500 to-cyan-500 text-white font-bold">
            {day.day}
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-200">Day {day.day}</h4>
            <p className="text-teal-400 text-sm">{day.focus}</p>
          </div>
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isExpanded && (
          <div className="px-5 pb-5 pt-2 border-t border-gray-700/50">
            <ul className="space-y-2">
              {day.tasks.map((task, taskIndex) => (
                <li key={taskIndex} className="flex items-start gap-2 text-gray-300 text-sm">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                  {task}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}