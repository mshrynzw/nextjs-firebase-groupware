import { InfoProvider } from "@/context/InfoContext"
import { NextPage } from "next"
import Index from "@/components/app/info/Index"
import { AppProvider } from "@/context/AppContext"

export const generateMetadata = () => {
  return {
    title : "Info",
    description : ""
  }
}

const Info : NextPage = () => {
  return (
    <>
      <AppProvider>
        <InfoProvider>
          <Index/>
        </InfoProvider>
      </AppProvider>
    </>
  )
}

export default Info