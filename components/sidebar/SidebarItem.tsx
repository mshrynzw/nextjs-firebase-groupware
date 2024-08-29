"use client"

import React from "react"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import Cookies from "js-cookie"

interface SidebarItemProps {
  href : string,
  icon : IconProp,
  pathname : string
}

const SidebarItem : React.FC<SidebarItemProps> = ({ href, icon, pathname }) => {
  const app = href === "/" ? "dashboard" : href.replace("/", "").replace("setting/", "")

  const handleClick = () => {
    Cookies.set("app", app, { expires : 7 })
  }

  return (
    <li className="items-center">
      <Link
        href={href}
        className={
          "flex items-center hover:text-blueGray-500 text-xs uppercase p-3 font-bold text-blueGray-300" +
          (pathname === href && " bg-blueGray-600 rounded-lg shadow-xl")
        }
        onClick={handleClick}
      >
        <FontAwesomeIcon
          icon={icon}
          className={
            "fas fa-tv mr-2 text-sm opacity-75 w-4 h-4"
          }
        />{" "}
        {app}
      </Link>
    </li>
  )
}

export default SidebarItem