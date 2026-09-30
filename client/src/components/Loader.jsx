import { VideoIcon } from 'lucide-react'
import React from 'react'

const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center
      bg-slate-50 text-slate-900 z-50">
      
      {/* Spinner */}
      <div className="relative flex items-center justify-center">
        {/* Spinning border */}
        <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
        
        {/* Static icon in center */}
        <VideoIcon className="w-6 h-6 text-primary absolute" />
      </div>

      {/* Text */}
      <p className="mt-4 text-sm font-semibold text-slate-600 animate-pulse">
        {text}
      </p>
    </div>
  )
}

export default Loader
