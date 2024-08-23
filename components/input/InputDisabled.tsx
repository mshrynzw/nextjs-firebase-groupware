import React from "react"

const InputDisable = ({ type, name, value }) => {
  return (
    <input
      type={type}
      name={name}
      id={name}
      value={value}
      disabled={true}
      className="mb-8 w-48 rounded border-0 bg-white px-2 py-2 text-center text-sm shadow transition-all duration-150 ease-linear placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
    />
  )
}

export default InputDisable