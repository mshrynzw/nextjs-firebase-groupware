import React from "react"

const InputTitle = ({ value, onChange }) => {
  return (
    <input
      type="text"
      name="title"
      id="title"
      required
      className="mb-8 w-full rounded border-0 bg-white px-2 py-2 text-sm shadow transition-all duration-150 ease-linear placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
      value={value}
      onChange={onChange}
    />
  )
}

export default InputTitle