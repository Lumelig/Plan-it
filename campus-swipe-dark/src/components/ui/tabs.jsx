import React, {createContext, useContext, useState} from 'react'
const TabsCtx = createContext({value:"", setValue:()=>{}})
export function Tabs({defaultValue, value:controlled, onValueChange, className="", children}){
  const [value, setValue] = useState(defaultValue || controlled || "")
  const current = controlled ?? value
  const set = (v)=>{ setValue(v); onValueChange && onValueChange(v) }
  return <TabsCtx.Provider value={{value:current, setValue:set}}><div className={className}>{children}</div></TabsCtx.Provider>
}
export function TabsList({className="", ...props}){ return <div className={`flex gap-2 ${className}`} {...props}/> }
export function TabsTrigger({value, className="", children}){
  const {value:current, setValue} = useContext(TabsCtx)
  const active = current===value
  return <button onClick={()=>setValue(value)} className={`px-3 py-2 rounded-xl border ${active?"bg-blue-600 text-white border-blue-600":"border-gray-300 text-gray-700 bg-white hover:bg-gray-50"} ${className}`}>{children}</button>
}
export function TabsContent({value, className="", children}){
  const {value:current} = useContext(TabsCtx)
  if(current!==value) return null
  return <div className={className}>{children}</div>
}