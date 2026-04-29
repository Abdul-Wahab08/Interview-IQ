import React from 'react'

function Loader() {
  return (
    <div className="flex gap-1 items-center">
  <span className="w-2 h-2 rounded-full bg-gray-700 animate-[pulse_1.2s_ease-in-out_infinite]"></span>
  <span className="w-2 h-2 rounded-full bg-gray-700 animate-[pulse_1.2s_ease-in-out_0.2s_infinite]"></span>
  <span className="w-2 h-2 rounded-full bg-gray-700 animate-[pulse_1.2s_ease-in-out_0.4s_infinite]"></span>
</div>
  )
}

export default Loader
