import React, { useContext, useEffect } from "react"
import { useQuery } from "@apollo/client"
import { getLocalTime } from "@/lib/datetime"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsis, faTrash } from "@fortawesome/free-solid-svg-icons"
import { GET_GROUPS } from "@/lib/app/setting/group"
import { AppContext } from "@/context/AppContext"
import LabelHeader from "@/components/label/LabelHeader"

const Find = ({ setEditGroup, setDeleteGroup, refetchFlag }) => {
  const {setScreen} =useContext(AppContext)

  const { loading, error, data, refetch } = useQuery(GET_GROUPS)

  useEffect(() => {
    refetch()
  }, [refetchFlag])

  const handleEdit = (group) => {
    setEditGroup(group)
    setScreen("edit")
  }

  const handleDelete = (group) => {
    setDeleteGroup(group)
    setScreen("delete")
  }

  if (loading) return <p>Loading...</p>
  if (error) {
    console.error("Error fetching messages:", error)
    return <p>Error: {error.message}</p>
  }

  return (
    <div className="relative">
      <div className="mx-auto w-full px-4 md:px-10">
        <LabelHeader screen="find"/>

        <div className="flex flex-wrap">
          {data.groups.data.map((group) => {
            try {
              const updatedTime = getLocalTime(group.attributes.updatedAt)
              return (
                <div
                  key={group.id}
                  className="w-full px-4 py-4 lg:w-6/12 xl:w-4/12"
                >
                  <div className="relative mb-6 flex min-w-0 flex-col break-words rounded bg-white shadow-lg xl:mb-0">
                    <div className="flex-auto p-4">
                      <div className="flex flex-wrap">
                        <div className="relative w-full max-w-full flex-1 flex-grow pr-4 space-y-2">
                          <h3 className="text-xl font-semibold text-blueGray-700">
                            {group.attributes.title}
                          </h3>
                          <ul  className="whitespace-pre-wrap break-words text-xs font-bold text-blueGray-400">
                            {group.attributes.users.data.map((user) => {
                              return (
                                <li key={user.id}>{user.attributes.username}</li>
                              )
                            })}
                          </ul>
                          <div className="flex items-end justify-between">
                            <p className="text-sm text-blueGray-400">
                            <span className="whitespace-nowrap">
                              {updatedTime}
                            </span>
                            </p>
                            <div className="flex justify-end">
                              <button
                                onClick={() => handleEdit(group)}
                                className="mr-2 flex h-8 w-8 items-center justify-center rounded-md p-2 text-white shadow-sm bg-blueGray-700 hover:bg-blueGray-400 hover:shadow-xl"
                              >
                                <FontAwesomeIcon icon={faEllipsis}/>
                              </button>
                              <button
                                onClick={() => handleDelete(group)}
                                className="flex h-8 w-8 items-center justify-center rounded-md p-2 text-white shadow-sm bg-blueGray-700 hover:bg-blueGray-400 hover:shadow-xl"
                              >
                                <FontAwesomeIcon icon={faTrash}/>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            } catch (e) {
              console.error("Error processing message:", group, e)
              return <p key={group.id}>Error displaying message</p>
            }
          })}
        </div>
      </div>
    </div>
  )
}

export default Find
