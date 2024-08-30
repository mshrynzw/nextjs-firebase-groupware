import { NextPage } from "next"
import Index from "@/components/app/setting/timecard/Index"
import { AppProvider } from "@/context/AppContext"
import { TimecardProvider } from "@/context/setting/TimecardContext"

export const generateMetadata = () => {
  return {
    title : "Setting Timecard",
    description : ""
  }
}

const Page : NextPage = () => {
  return (
    <>
      <AppProvider>
        <TimecardProvider>
          <Index/>
        </TimecardProvider>
      </AppProvider>
    </>
  )
}

export default Page
