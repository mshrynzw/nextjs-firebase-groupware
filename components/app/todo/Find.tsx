import Loading from "@/app/loading"
import { TodoContext } from "@/context/app/TodoContext"
import React, { useContext, useEffect, useState } from "react"
import { formatTimeWithoutYear, getLocalTime } from "@/lib/datetime"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsis, faTrash } from "@fortawesome/free-solid-svg-icons"
import { AppContext } from "@/context/AppContext"
import LabelHeader from "@/components/label/LabelHeader"

const Find : React.FC = ({ setEditTodo, setDeleteTodo }) => {
  const { setScreen } = useContext(AppContext)
  const { todos, setTodos } = useContext(TodoContext)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchInfos = async () => {
      try {
        const response = await fetch("/api/getTodos", { next : { revalidate : process.env.NEXT_PUBLIC_ISR_INTERBAL } })
        const data = await response.json()
        setTodos(data)
      } catch (error) {
        console.error(error.message)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchInfos()
  }, [])

  const handleEdit = (info) => {
    setEditTodo(info)
    setScreen("edit")
  }

  const handleDelete = (info) => {
    setDeleteTodo(info)
    setScreen("delete")
  }

  if (loading) return <Loading/>
  if (error) return <p>Error: {error}</p>

  return (
    <div className="relative">
      <div className="mx-auto w-full px-4 md:px-10">
        <LabelHeader screen="find"/>

        <div className="flex flex-wrap">
          {todos.map((todo) => {
            try {
              const updatedTime = getLocalTime(todo.updatedAt)

              return (
                <div key={todo.id} className="w-full px-4 py-4 md:w-6/12 lg:w-4/12 xl:w-3/12">
                  <div className="relative mb-6 flex min-w-0 flex-col break-words rounded bg-white shadow-lg xl:mb-0">
                    <div className="flex-auto p-4">

                      <div className="flex flex-wrap">
                        <div className="relative w-full max-w-full flex-1 flex-grow pr-4">
                          <h3 className="text-xl font-semibold text-blueGray-700">
                            {todo.title}
                          </h3>
                          <p className="mt-4 whitespace-pre-wrap break-words text-xs font-bold text-blueGray-400">
                            {todo.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap">
                        <div className="relative mt-4 w-full max-w-full flex-1 flex-grow text-xs">
                          <div>
                            Priority : <span className="font-bold">{String(todo.priority)}</span>
                          </div>
                          <div>
                            Duo : <span className="font-bold">{formatTimeWithoutYear(new Date(todo.due).toLocaleString())}</span>
                          </div>
                          <div>
                            Check : <span className="font-bold">{String(todo.check)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex items-end justify-between">
                        <p className="text-sm text-blueGray-400">
                            <span className="whitespace-nowrap">
                              {formatTimeWithoutYear(updatedTime)}
                            </span>
                        </p>
                        <div className="mt-2 flex justify-end">
                          <button
                            onClick={() => handleEdit(todo)}
                            className="mr-2 flex h-8 w-8 items-center justify-center rounded-md p-2 text-white shadow-sm bg-blueGray-700 hover:bg-blueGray-400 hover:shadow-xl"
                          >
                            <FontAwesomeIcon icon={faEllipsis}/>
                          </button>
                          <button
                            onClick={() => handleDelete(todo)}
                            className="flex h-8 w-8 items-center justify-center rounded-md p-2 text-white shadow-sm bg-blueGray-700 hover:bg-blueGray-400 hover:shadow-xl"
                          >
                            <FontAwesomeIcon icon={faTrash}/>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            } catch (e) {
              console.error("Error processing message:", todo, e)
              return <p key={todo.id}>Error displaying message</p>
            }
          })}
        </div>
      </div>
    </div>
  )
}

export default Find
