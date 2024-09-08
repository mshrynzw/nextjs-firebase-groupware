"use client"

import React, { createContext, useState, ReactNode } from "react"
import chat from "@/types/chat"

type ChatContextType = {
  chats : chat[];
  setChats : (chats : chat[]) => void;
}

export const ChatContext = createContext<ChatContextType | undefined>(undefined)

export const ChatProvider : React.FC<{ children : ReactNode }> = ({ children }) => {
  const [chats, setChats] = useState<chat[]>([])

  return (
    <ChatContext.Provider value={{ chats, setChats }}>
      {children}
    </ChatContext.Provider>
  )
}
