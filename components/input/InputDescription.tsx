import React from "react"

const InputDescription = ({ value, onChange }) => {
  return (
    <textarea
      name="description"
      id="description"
      value={value}
      required
      className="mb-8 h-80 w-full rounded-tl rounded-br rounded-bl border-0 bg-white px-2 py-2 text-sm shadow transition-all duration-150 ease-linear placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
      onChange={onChange}
    />
  )
}

export default InputDescription