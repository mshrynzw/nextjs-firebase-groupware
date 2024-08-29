import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import React, { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { createdChat } from "@/lib/app/chat"

const Create = ({user, ws}) => {
  const [text, setText] = useState("")
  const handleSend = async () => {
    const response = await createdChat(user, text)

    if (response.ok) {
      const responseData = await response.json()
      const newMessageId = uuidv4()

      const chat = {
        id : newMessageId,
        attributes : {
          text : responseData.text,
          user : {
            data : { id : user.id }
          },
          createdAt : new Date().toISOString()
        }
      }

      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(chat))
        setText("")
      }
    } else {
      console.error("Error:", response.statusText)
    }
  }

  return (
    <div className="fixed right-0 bottom-0 left-0 m-0 w-full p-4 shadow-xl bg-blueGray-600 md:pl-72 xl:px-72">
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          await handleSend()
        }}
      >
        <div className="flex items-center space-x-4">
          <textarea
            name="text" id="text" rows="3" required value={text}
            className="flex-grow rounded border-0 bg-white px-2 py-2 text-sm shadow transition-all duration-150 ease-linear placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
            onChange={(e) => setText(e.target.value)}
          />
          <button
            type="submit"
            className="flex-shrink-0 rounded-lg px-6 py-3 text-sm font-bold uppercase text-white shadow-xl outline-none transition-all duration-150 ease-linear bg-blueGray-200 hover:bg-white hover:shadow"
          >
            <FontAwesomeIcon
              icon={faPenToSquare}
              className="h-6 w-6 p-1 text-blueGray-800"
            />
          </button>
        </div>
      </form>
    </div>
  )
}

export default Create