import React from "react"

const Form = ({ action, children }) => {
  return (
    <form className="flex flex-col" action={action}>
      {children}
    </form>
  )
}

export default Form
