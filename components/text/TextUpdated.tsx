import React from "react"

const TextUpdated = ({ updated, username }) => {
  return (
    <div className="flex items-end justify-between pb-8">
      <p className="text-sm text-blueGray-400">
        <span className="whitespace-nowrap">
          {updated}
        </span>
        <span className="ml-2 text-lightBlue-500">
          {username}
        </span>
      </p>
    </div>
  )
}

export default TextUpdated
