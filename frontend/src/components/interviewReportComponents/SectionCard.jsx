export const SectionCard = ({ title, icon, children, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 w-full text-left ${
      active
        ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
        : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-transparent'
    }`}
  >
    <span className="text-xl">{icon}</span>
    <span className="font-medium">{title}</span>
  </button>
)