"use client"

import React from "react"
import Cookies from "js-cookie"
import { formAction } from "@/actions/formAction"

const LoginForm =()=>{
  const handleSubmit = async (e : React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    try {
      const { token, uid } = await formAction(formData)
      Cookies.set("token", token, { expires : 7 })
      Cookies.set("uid", uid, { expires : 7 })
      window.location.href = "/"
    } catch (error) {
      console.error(error.message)
    }
  }

  return(
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
  )
}

export default LoginForm