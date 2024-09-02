import { TodoProvider } from "@/context/app/TodoContext"
import { NextPage } from "next"
import Index from "@/components/app/todo/Index"
import { AppProvider } from "@/context/AppContext"

export const generateMetadata = () => {
  return {
    title : "Todo",
    description : ""
  }
}

const Page : NextPage = () => {
  return (
    <>
      <AppProvider>
        <TodoProvider>
          <Index/>
        </TodoProvider>
      </AppProvider>
    </>
  )
}

export default Page