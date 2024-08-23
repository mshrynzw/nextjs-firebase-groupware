import React from "react"

const InputSelectUsers=({data, setUsers})=>{
  return (
    <select
      name="users" id="users" multiple
      className="mb-8 w-full rounded border-0 bg-white px-2 py-2 text-sm shadow transition-all duration-150 ease-linear placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
      onChange={(e) => {
        const selectedOptions = Array.from(e.target.selectedOptions)
        const selectedUsers = selectedOptions.map(option => {
          return data.usersPermissionsUsers.data.find(user => user.attributes.username === option.value)
        })
        setUsers(selectedUsers)
      }}>
      {data.usersPermissionsUsers.data.map((user) => {
        return (
          <option key={user.id} value={user.attributes.username}>{user.attributes.username}</option>
        )
      })}
    </select>
  )
}

export default InputSelectUsers