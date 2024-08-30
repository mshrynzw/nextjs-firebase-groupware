import { InfoProvider } from "@/context/InfoContext"
import { NextPage } from "next"
import Head from "next/head"
import Index from "@/components/app/info/Index"
import { AppProvider } from "@/context/AppContext"

const Info : NextPage = () => {
  return (
    <>
      <Head>
        <title>Info</title>
      </Head>
      <AppProvider>
        <InfoProvider>
          <Index/>
        </InfoProvider>
      </AppProvider>
    </>
  )
}

export default Info