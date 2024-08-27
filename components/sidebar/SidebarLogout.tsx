"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import Cookies from "js-cookie"
import { auth } from "@/lib/firebase"

const SidebarLogout =()=>{
  const handleLogout = async () => {
    Cookies.remove("token")
    await auth.signOut()
    window.location.href = "/login"
  }

  return (
    <button
      className={
        "text-xs uppercase p-3 font-bold block text-blueGray-700 hover:text-blueGray-500"}
      onClick={handleLogout}>
      <FontAwesomeIcon
        icon={faRightFromBracket}
        className={
          "fas fa-tv mr-2 text-sm opacity-75"
        }
      />{" "}
      Logout
    </button>
  )
}

export default SidebarLogout