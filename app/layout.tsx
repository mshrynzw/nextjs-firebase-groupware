import Background from "@/components/background/Background"
import React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { redirect } from "next/navigation"
import { cookies, headers } from "next/headers"
import Sidebar from "@/components/sidebar/Sidebar"

export const metadata : Metadata = {
  title : {
    default : "Groupware",
    template : "%s | Groupware"
  },
  description : "Groupware"
}

const RootLayout = ({ children } : Readonly<{ children : React.ReactNode }>) => {
  const token = cookies().get("token")?.value

  const pathname = headers().get("x-pathname") || ""
  if (!token && pathname !== "/login") {
    redirect("/login")
  }

  return (
    <html lang="jp">
    <head>
      <link rel="icon" href="/favicon.ico" />
    </head>
    <body>
    {token ? (
      <>
        <Sidebar/>
        <div className="relative md:ml-64 z-10">
          <main className="min-h-screen w-full p-4 md:p-12">
            {children}
          </main>
        </div>
      </>
    ) : (
      <div className="flex h-screen w-screen items-center justify-center z-10">
        {children}
      </div>
    )}
    <Background/>
    </body>
    </html>
  )
}

export default RootLayout