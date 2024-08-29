import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons"

const Loading : React.FC = () => {
  return (
    <div className="relative top-0 z-50 mx-auto my-32 max-w-sm text-center">
      <div className="mb-4 block">
        <FontAwesomeIcon
          icon={faCircleNotch}
          className="mx-auto animate-spin text-6xl text-blueGray-800"
        />
      </div>
      <h4 className="text-lg font-medium text-blueGray-800">
        Loading...
      </h4>
    </div>
  )
}

export default Loading