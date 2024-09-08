import { NextPage } from "next"
import Index from "@/components/app/setting/group/Index"
import { AppProvider } from "@/context/AppContext"
import { GroupProvider } from "@/context/app/setting/GroupContext"


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
