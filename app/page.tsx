import { NextPage } from "next"
import Head from "next/head"
import LineChart from "@/components/app/dashboard/LineChart"

const Index : NextPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">

        <LineChart/>

        <LineChart/>

        <LineChart/>

        <LineChart/>

      </div>
    </>
  )
}

export default Index