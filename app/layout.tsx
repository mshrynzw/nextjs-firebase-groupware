import React from "react"
import type { Metadata } from "next"
import "./globals.css"
import Sidebar from "@/components/sidebar/Sidebar"
import Cookies from "js-cookie"
import { NextRequest } from "next/server"
import { cookies } from "next/headers"

export const metadata : Metadata = {
  title : "GROUPWARE",
  description : "Groupware"
}

const RootLayout = ({ children, request } : Readonly<{ children : React.ReactNode; request : NextRequest }>) => {
  const token = cookies().get("token")?.value

  return (
    <html lang="en">
    {/*TODO*/}
    <body>
    {token ? (
      <>
        <Sidebar/>
        <div className="relative bg-blueGray-50 md:ml-64">
          <main className="min-h-screen w-full p-4 md:p-12">
            {children}
          </main>
        </div>
      </>
    ) : (
      <div className="flex h-screen w-screen items-center justify-center">
        {children}
      </div>
    )}
    </body>
    </html>
  )
}

export default RootLayout