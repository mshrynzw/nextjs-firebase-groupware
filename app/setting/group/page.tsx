import Index from "@/components/app/setting/group/Index"
import { AppProvider } from "@/context/AppContext"
import { GroupProvider } from "@/context/app/setting/GroupContext"
import { NextPage } from "next"


export const generateMetadata = () => {
  return {
    title : "Setting Group",
    description : ""
  }
}

const Page : NextPage = () => {
  return (
    <>
      <AppProvider>
        <GroupProvider>
          <Index/>
        </GroupProvider>
      </AppProvider>
    </>
  )
}

export default Page
