import React from "react"

const InputSelectUsers = ({ users, setUsers }) => {
  return (
    <select
      name="users" id="users" multiple required
      className="mb-8 w-full rounded border-0 bg-white px-2 py-2 text-sm shadow transition-all duration-150 ease-linear placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
      onChange={(e) => {
        const selectedOptions = Array.from(e.target.selectedOptions)
        const selectedUsers = selectedOptions.map(option => {
          return users.find(user => user.displayName === option.value)
        })
        setUsers(selectedUsers)
      }}>
      {users.map((user) => {
        return (
          <option key={user.id} value={users.displayName}>{user.displayName}</option>
        )
      })}
    </select>
  )
}

export default InputSelectUsers