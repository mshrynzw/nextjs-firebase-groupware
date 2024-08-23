import React from "react"

const InputNumber = ({ name, value, onChange }) => {
  return (
    <input
      type="datetime-local"
      name={name}
      id={name}
      value={value}
      required
      className="mb-8 w-full rounded-tl rounded-br rounded-bl border-0 bg-white px-2 py-2 text-center text-sm shadow transition-all duration-150 ease-linear placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
      onChange={onChange}
    />
  )
}

export default InputNumber