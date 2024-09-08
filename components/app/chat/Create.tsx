import React, { useContext, useState } from "react"
import Cookies from "js-cookie"
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ChatContext } from "@/context/app/ChatContext"
import { createdChat } from "@/lib/app/chat"

const Create : React.FC = () => {
  const uid = Cookies.get("uid")
  const { setChats } = useContext(ChatContext)

  const [message, setMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (message.trim() === "") return

    const newChat = await createdChat(uid, message)
    setChats((prevChats) => [...prevChats, newChat])
    setMessage("")
  }

  return (
    <div className="fixed right-0 bottom-0 left-0 m-0 w-full p-4 shadow-xl bg-blueGray-600 md:pl-72 xl:px-72">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center space-x-4">
          <textarea
            name="text" id="text" rows="3" required value={message}
            className="flex-grow rounded border-0 bg-white px-2 py-2 text-sm shadow transition-all duration-150 ease-linear placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
            onChange={(e) => setMessage(e.target.value)}
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