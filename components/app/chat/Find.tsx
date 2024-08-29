import React, { useEffect, useState } from "react"
import { getLocalTime } from "@/lib/datetime"
import { useContext } from "react"

import { AppContext } from "@/context/AppContext"
import { useQuery } from "@apollo/client"
import { createdChat, GET_CHATS, wwsUrl } from "@/lib/app/chat"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import Sidebar from "@/components/app/chat/Sidebar"
import Create from "@/components/app/chat/Create"

const Find = () => {
  const appContext = useContext(AppContext)
  const { user } = appContext

  const [ws, setWs] = useState<WebSocket | null>(null)
  const [chats, setChats] = useState<{ id : string; attributes : { text : string; user : { id : string; username : string }; createdAt : string } }[]>([])

  const { loading, error, data } = useQuery(GET_CHATS)

  useEffect(() => {
    const websocket = new WebSocket(wwsUrl)
    setWs(websocket)

    websocket.onopen = () => {
      console.debug("WebSocket connection established")
    }

    websocket.onmessage = (event) => {
      const data = JSON.parse(JSON.parse(event.data).message)
      console.debug("Received from WebSocket:", data)
      setChats((prev) => [...prev, data])
    }

    websocket.onclose = () => {
      console.debug("WebSocket connection closed")
    }

    return () => {
      websocket.close()
    }
  }, [])

  useEffect(() => {
    if (data && data.chats) {
      setChats(data.chats.data)
    }
  }, [data])

  if (loading) return <p>Loading...</p>
  if (error) {
    console.error(error)
    return <p>Error</p>
  }

  return (
    <>
      <div className="xl:mr-64">
        <div className="mb-24 space-y-4">
          {chats.map((chat) => {
            try {
              const updated = getLocalTime(chat.attributes.createdAt)
              const isOwnMessage = chat.attributes.user.data.id == user.id
              return (
                <div
                  key={chat.id}
                  className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
                >
                  <div className="flex flex-col">
                    <div className={`text-sm text-blueGray-400 ${isOwnMessage ? "flex justify-end" : ""}`}>
                      <span className="whitespace-nowrap">
                        {updated}
                      </span>
                      <span className="ml-2 text-lightBlue-500">
                        {chat.attributes.user.data.attributes.username}
                      </span>
                    </div>
                    <p
                      className={`max-w-xs lg:max-w-md px-2 py-1 mt-1 rounded-lg shadow-xl whitespace-pre-wrap break-words ${
                        isOwnMessage
                          ? "bg-blueGray-600 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {chat.attributes.text}
                    </p>
                  </div>
                </div>
              )
            } catch (e) {
              console.error("Error processing chat:", chat, e)
              return <p key={chat.id}>Error displaying chat</p>
            }
          })}
        </div>

        <Create user={user} ws={ws}/>
      </div>
      <Sidebar/>
    </>
  )
}

export default Find