import { NextPage } from "next"
import React from "react"
import Head from "next/head"
import Image from "next/image"
import LoginForm from "@/components/app/login/LoginForm"

const Page : NextPage = () => {

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <div className="flex content-center items-center justify-center">
        <div className="w-full px-4">
          <div className="relative mb-6 flex w-full min-w-0 flex-col rounded-lg border-0 shadow-lg bg-blueGray-200">
            <div className="mb-0 flex flex-nowrap items-center justify-center rounded-t px-4 py-10 pb-4 space-x-4 lg:px-10">
              <Image
                src="/favicon.webp" alt="Icon" width={64} height={64}
                className="rounded-2xl shadow-xl"
              />
              <span className="text-lg font-bold uppercase no-underline text-blueGray-500">
                Login
              </span>
            </div>

            <div className="flex-auto px-4 py-10 pt-0 lg:px-10">
              <LoginForm/>
            </div>
          </div>

          <div className="relative mt-6 flex justify-center">
            <a href="#pablo" className="text-blueGray-800 hover:text-blueGray-600">
              <small>Forgot password?</small>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page