import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSnowflake } from "@fortawesome/free-solid-svg-icons"

const Label = ({ name }) => {
  return (
    <label
      htmlFor={name}
      className="mb-2 block text-sm font-bold uppercase text-blueGray-600"
    >
      <FontAwesomeIcon icon={faSnowflake} className={"fas fa-tv mr-2 text-sm text-blueGray-300"}/>{" "}
      {name}
    </label>
  )
}

export default Label
