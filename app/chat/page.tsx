import { NextPage } from "next"
import Index from "@/components/app/chat/Index"
import { ChatProvider } from "@/context/app/ChatContext"

export const generateMetadata = () => {
  return {
    title : "Chat",
    description : ""
  }
}

const Page : NextPage = () => {
  return (
    <ChatProvider>
      <Index/>
    </ChatProvider>
  )
}

export default Page
