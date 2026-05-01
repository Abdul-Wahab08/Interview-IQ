export const SkillGapCard = ({ skillGap }) => {

 const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'high':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'low':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  return (
    <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 p-4 flex items-center justify-between hover:border-teal-500/30 transition-all duration-300">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 p-2 rounded-lg bg-red-500/20 flex items-center justify-center">
          <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <span className="font-medium text-gray-200">{skillGap.skill}</span>
      </div>
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getSeverityColor(skillGap.severity)}`}>
        {skillGap.severity}
      </span>
    </div>
  )
}