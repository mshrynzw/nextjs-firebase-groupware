import { TimecardProvider } from "@/context/app/TimecardContext"
import { NextPage } from "next"
import Index from "@/components/app/timecard/Index"
import { AppProvider } from "@/context/AppContext"

export const generateMetadata = () => {
  return {
    title : "Timecard",
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