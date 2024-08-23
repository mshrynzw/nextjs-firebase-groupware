import React from "react"

const ContainerCentered = ({ children }) => {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="m-8 w-full rounded-xl bg-white p-8 shadow-xl max-w xl:mx-64">
        {children}
      </div>
    </div>
  )
}

export default ContainerCentered