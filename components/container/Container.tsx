import React from "react"

const Container=({children})=>{
  return(
    <div className="fixed top-0 right-0 bottom-0 left-0 min-h-screen pt-20 pb-20 opacity-95 bg-blueGray-50 md:ml-64 md:pt-0">
      {children}
    </div>
  )
}

export default Container
