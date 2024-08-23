import React from "react"

const Paragraph = ({ children, className }) => {
  return (
    <p className={`mb-8 w-full rounded border-0 bg-white px-2 py-2 text-sm shadow transition-all duration-150 ease-linear placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring ${className}`}>
      {children}
    </p>
  )
}

export default Paragraph