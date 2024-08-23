import React from "react"


const ButtonSubmit = ({ onClick }) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className="mr-1 mb-1 w-full rounded-xl px-6 py-3 text-sm font-bold uppercase text-white shadow-xl outline-none ease-linear bg-blueGray-800 focus:outline-none"
    >
      Submit
    </button>
  )
}

export default ButtonSubmit