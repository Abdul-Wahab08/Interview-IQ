import { useState } from "react"

export const QuestionCard = ({ question, index }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  
  return (
    <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 overflow-hidden hover:border-teal-500/30 transition-all duration-300">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-5 py-4 flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-4">
          <span className="flex items-center justify-center w-8 h-8 p-4 rounded-full bg-teal-500/20 text-teal-400 text-sm font-semibold">
            {index + 1}
          </span>
          <span className="font-medium text-gray-200">{question.question}</span>
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
        <div className="px-5 pb-5 pt-2 border-t border-gray-700/50 space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-teal-400 mb-2">Intention</h4>
            <p className="text-gray-300 text-sm">{question.intention}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-green-400 mb-2">Suggested Answer</h4>
            <p className="text-gray-300 text-sm leading-relaxed">{question.answer}</p>
          </div>
        </div>
      )}
    </div>
  )
}