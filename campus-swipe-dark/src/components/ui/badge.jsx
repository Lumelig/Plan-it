import React from 'react'
export function Badge({className="", variant="default", ...props}){
  const base="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium"
  const variants={ 
    default:"bg-gray-100 text-gray-900 border border-gray-200", 
    secondary:"bg-blue-100 text-blue-800 border border-blue-200",
    outline:"border border-gray-300 text-gray-700 bg-white" 
  }
  return <span className={`${base} ${variants[variant]||variants.default} ${className}`} {...props}/>
}