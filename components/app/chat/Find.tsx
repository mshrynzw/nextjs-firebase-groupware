import React, { useContext, useEffect } from "react"
import { collection, query, orderBy, onSnapshot } from "firebase/firestore"
import Cookies from "js-cookie"
import { ChatContext } from "@/context/app/ChatContext"
import { getLocalTime } from "@/lib/datetime"
import { db } from "@/lib/firebase"

const Find = () => {
  const uid = Cookies.get("uid")
  const { chats, setChats } = useContext(ChatContext)

  useEffect(() => {
    const q = query(collection(db, "chats"), orderBy("updatedAt", "asc"))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const dats = []
      querySnapshot.forEach((doc) => {
        dats.push({ id : doc.id, ...doc.data() })
      })
      setChats(dats)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <>
      {chats.map((chat) => {
        try {
          const updated = getLocalTime(chat.createdAt)
          const isOwnMessage = chat.uid == uid
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
                        {chat.displayName}
                      </span>
                </div>
                <p
                  className={`max-w-xs lg:max-w-md px-2 py-1 mt-1 rounded-lg shadow-xl whitespace-pre-wrap break-words ${
                    isOwnMessage
                      ? "bg-blueGray-600 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {chat.message}
                </p>
              </div>
            </div>
          )
        } catch (e) {
          console.error("Error processing chat:", chat, e)
          return <p key={chat.id}>Error displaying chat</p>
        }
      })}
    </>
  )
}

export default Find