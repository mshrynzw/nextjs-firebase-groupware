import React from "react"


const ButtonSubmit = ({ onClick }) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className="rounded-md bg-gray-200 p-2 text-sm font-semibold shadow-xl duration-300 ease-in-out text-blueGray-600 hover:text-blueGray-200 hover:bg-blueGray-600 hover:-translate-y-1 hover:scale-110"
    >
      Submit
    </button>
  )
}

export default ButtonSubmit