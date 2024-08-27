"use client"

import Link from "next/link"
import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons"

const SidebarToggle = ({ children } : Readonly<{ children : React.ReactNode }>) => {
  const [collapseShow, setCollapseShow] = useState("hidden")

  return (
    <>
      {/* Toggler */}
      <button
        className="cursor-pointer rounded border border-solid border-transparent bg-transparent px-3 py-1 text-xl leading-none text-black opacity-50 md:hidden"
        type="button"
        onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
      >
        <FontAwesomeIcon icon={faBars}/>
      </button>

      {/* Collapse */}
      <div
        className={
          "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
          collapseShow
        }
      >
        {/* Collapse header */}
        <div className="mb-4 block border-b border-solid pb-4 border-blueGray-200 md:hidden md:min-w-full">
          <div className="flex flex-wrap">
            <div className="w-6/12">
              <Link href="/"
                    className="mr-0 inline-block whitespace-nowrap p-4 px-0 text-left text-sm font-bold uppercase text-blueGray-600 md:block md:pb-2"
              >
                GW

              </Link>
            </div>
            <div className="flex w-6/12 justify-end">
              <button
                type="button"
                className="cursor-pointer rounded border border-solid border-transparent bg-transparent px-3 py-1 text-xl leading-none text-black opacity-50 md:hidden"
                onClick={() => setCollapseShow("hidden")}
              >
                <FontAwesomeIcon icon={faTimes}/>
              </button>
            </div>
          </div>
        </div>
        {children}
      </div>
    </>
  )
}

export default SidebarToggle