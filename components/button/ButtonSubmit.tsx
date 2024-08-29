import React from "react"


const ButtonSubmit = ({ onClick }) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className="mr-1 mb-1 w-full rounded-xl bg-gray-200 p-2 px-6 py-3 text-sm font-bold uppercase shadow-xl outline-none duration-300 ease-in-out text-blueGray-600 bg-blueGray-800 hover:text-blueGray-200 hover:bg-blueGray-600 hover:-translate-y-1 hover:scale-110 focus:outline-none"
    >
      Submit
    </button>
  )
}

export default ButtonSubmit