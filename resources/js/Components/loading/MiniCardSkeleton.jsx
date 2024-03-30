import React from 'react'

function MiniCardSkeleton() {
  return (
    <div className="w-72 h-96 border rounded-xl animate-pulse">
      <div className="w-full h-48 bg-gray-300 rounded-t-xl"></div>
      <div className="px-5 py-3">
        <div className="w-3/4 h-5 bg-gray-300 rounded mb-2"></div>
        <div className="w-1/2 h-5 bg-gray-300 rounded"></div>
        <div className="flex items-center justify-between mt-10">
          <div className="w-full h-8 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  )
}

export default MiniCardSkeleton
