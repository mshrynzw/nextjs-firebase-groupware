import { NextPage } from "next"
import React from "react"
import Index from "@/components/app/schedule"
import { AppProvider } from "@/context/AppContext"
import { ScheduleProvider } from "@/context/app/ScheduleContext"

export const generateMetadata = () => {
  return {
    title : "Page",
    description : ""
  }
}

const Page : NextPage = () => {
  return (
    <>
      <AppProvider>
        <ScheduleProvider>
          <Index/>
        </ScheduleProvider>
      </AppProvider>
    </>
  )
}

export default Page
