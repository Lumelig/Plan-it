import React, {createContext, useContext, useState} from 'react'
const SheetCtx = createContext({open:false, setOpen:()=>{}})
export function Sheet({open:controlled, onOpenChange, children}){
  const [open, set] = useState(!!controlled)
  const real = controlled ?? open
  const setOpen = (v)=>{ set(v); onOpenChange && onOpenChange(v) }
  return <SheetCtx.Provider value={{open:real, setOpen}}>{children}</SheetCtx.Provider>
}
export function SheetTrigger({asChild, children}){
  const {setOpen} = useContext(SheetCtx)
  return React.cloneElement(children, { onClick: ()=>setOpen(true) })
}
export function SheetContent({side="right", className="", children}){
  const {open, setOpen} = useContext(SheetCtx)
  if(!open) return null
  return (<div className="fixed inset-0 z-50">
    <div className="absolute inset-0 bg-black/60" onClick={()=>setOpen(false)} />
    <div className={`absolute top-0 ${side==='right'?'right-0':'left-0'} h-full w-[85%] max-w-sm bg-white border-l border-gray-200 p-4 overflow-auto shadow-xl ${className}`}>
      {children}
    </div>
  </div>)
}
export function SheetHeader({className="", ...props}){ return <div className={`mb-2 ${className}`} {...props}/> }
export function SheetTitle({className="", ...props}){ return <h2 className={`text-xl font-semibold text-gray-900 ${className}`} {...props}/> }