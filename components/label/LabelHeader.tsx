import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsis, faHouse, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons"
import React from "react"

const LabelHeader = ({ screen }) => {
  return (
    <>
      {screen === "find" ? (
        <h1
          className="w-full border-b-4 bg-transparent py-1 text-center font-bold uppercase shadow-xl outline-none ease-linear text-blueGray-800 border-blueGray-800 focus:outline-none"
        >
          <FontAwesomeIcon icon={faHouse} className="mr-2 fas fa-tv"/>
          Find
        </h1>
      ) : (
        <h1
          className="mb-8 w-full border-b-4 bg-white py-1 text-center font-bold uppercase outline-none ease-linear text-blueGray-800 border-blueGray-800 focus:outline-none"
        >
          {screen === "create" ? (
            <>
              <FontAwesomeIcon icon={faPenToSquare} className="mr-2 fas fa-tv"/>
              Create
            </>
          ) : screen === "edit" ? (
            <>
              <FontAwesomeIcon icon={faEllipsis} className={"mr-2 fas fa-tv"}/>
              Edit
            </>
          ) : screen === "delete" ? (
            <>
              <FontAwesomeIcon icon={faTrash} className={"mr-2 fas fa-tv"}/>
              Delete
            </>
          ) : null}
        </h1>
      )}
    </>
  )
}

export default LabelHeader