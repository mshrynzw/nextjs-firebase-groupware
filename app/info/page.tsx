import { NextPage } from "next"
import Head from "next/head"
import Index from "@/components/app/info"
import { AppProvider } from "@/context/AppContext"

const Info : NextPage = () => {
  return (
    <>
      <Head>
        <title>Info</title>
      </Head>
      <AppProvider>
        <Index/>
      </AppProvider>
    </>
  )
}

export default Info