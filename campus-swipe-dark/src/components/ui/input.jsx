import React from 'react'
export const Input = React.forwardRef(function Input({className="", ...props}, ref){
  return <input ref={ref} className={`w-full rounded-xl bg-white border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`} {...props}/>
})