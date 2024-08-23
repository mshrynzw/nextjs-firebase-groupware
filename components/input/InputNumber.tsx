import React from "react"

const InputNumber = ({ value, max, min, onChange }) => {
  return (
    <input
      type="number"
      name="order"
      id="order"
      value={value}
      max={max}
      min={min}
      required
      className="mb-8 w-full rounded-tl rounded-br rounded-bl border-0 bg-white px-2 py-2 text-center text-sm shadow transition-all duration-150 ease-linear placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
      onChange={onChange}
    />
  )
}

export default InputNumber