// TODO
"use client"

import { NextPage } from "next"
import React from "react"
import Head from "next/head"
import Image from "next/image"
import Cookies from "js-cookie"
import { formAction } from "@/actions/formAction"

const Page : NextPage = () => {
  const handleSubmit = async (e : React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    try {
      const { token } = await formAction(formData)
      Cookies.set("token", token, { expires : 7 })
      window.location.href = "/"
    } catch (error) {
      console.error(error.message)
    }
  }

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
              <form onSubmit={handleSubmit}>
                <div className="relative mb-3 w-full">
                  <label
                    className="mb-2 block text-xs font-bold uppercase text-blueGray-600"
                    htmlFor="email"
                  >
                    Email

                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    className="w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                  />
                </div>

                <div className="relative mb-3 w-full">
                  <label
                    className="mb-2 block text-xs font-bold uppercase text-blueGray-600"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="current-password"
                    className="w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                  />
                </div>

                <div className="mb-3">
                  <label className="inline-flex cursor-pointer items-center">
                    <input
                      id="customCheckLogin" type="checkbox"
                      className="ml-1 h-5 w-5 rounded border-0 transition-all duration-150 ease-linear form-checkbox text-blueGray-700"
                    />
                    <span
                      className="ml-2 text-sm font-semibold text-blueGray-600"
                    >
                        Remember me
                      </span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="mr-1 mb-1 w-full rounded px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear bg-blueGray-800 hover:shadow-lg focus:outline-none active:bg-blueGray-600"
                >
                  Login
                </button>
              </form>
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