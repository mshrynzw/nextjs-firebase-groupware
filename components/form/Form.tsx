import React from "react"

const Form = ({ action, children, onSubmit }) => {
  return (
    <form className="flex flex-col" action={action} onSubmit={onSubmit}>
      {children}
    </form>
  )
}

export default Form
