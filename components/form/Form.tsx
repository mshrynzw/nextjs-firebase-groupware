import React from "react"

const Form = ({ onSubmit, children }) => {
  const handleSubmit = async (e) => {
    e.preventDefault()
    await onSubmit()
  }

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      {children}
    </form>
  )
}

export default Form
