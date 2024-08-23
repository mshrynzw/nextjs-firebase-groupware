import React from "react"

const InputCheck = ({ name, value, onChange }) => {
  return (
    <input
      type="checkbox"
      name={name}
      id={name}
      checked={value}
      className="h-6 w-6 scale-150 rounded border-0 shadow focus:ring focus:ring-blue-500 focus:ring-opacity-50 focus:ring-offset-0"
      onChange={onChange}
    />
  )
}

export default InputCheck