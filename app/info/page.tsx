import { NextPage } from "next"
import { InfoProvider } from "@/context/app/InfoContext"
import Index from "@/components/app/info/Index"
import { AppProvider } from "@/context/AppContext"

export const generateMetadata = () => {
  return {
    title : "Info",
    description : ""
  }
}

const Page : NextPage = () => {
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

export default Page