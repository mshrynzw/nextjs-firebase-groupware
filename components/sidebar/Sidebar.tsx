import Link from "next/link"
import { headers, cookies } from "next/headers"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarDays, faCheck, faCircleInfo, faClock, faHouse, faMessage, faRightFromBracket, faRightToBracket, faTimes, faUser, faUserPlus, faUsers } from "@fortawesome/free-solid-svg-icons"
import SidebarToggle from "@/components/sidebar/SidebarToggle"
import SidebarLogout from "@/components/sidebar/SidebarLogout"
import SidebarItem from "@/components/sidebar/SidebarItem"

const Sidebar = () => {
  const token = cookies().get("token")?.value
  const pathname = headers().get("x-pathname") || ""

  return (
    <>
      <nav className="relative z-50 flex flex-wrap items-center justify-between bg-white px-6 py-4 shadow-xl md:fixed md:top-0 md:bottom-0 md:left-0 md:block md:w-64 md:flex-row md:flex-nowrap md:overflow-hidden md:overflow-y-auto">
        <div className="mx-auto flex w-full flex-wrap items-center justify-between px-0 md:min-h-full md:flex-col md:flex-nowrap md:items-stretch">
          <SidebarToggle>

            {/* Navigation */}
            <ul className="flex list-none flex-col md:min-w-full md:flex-col">

              <h6 className="block pt-1 pb-4 text-xs font-bold uppercase no-underline text-blueGray-500 md:min-w-full">
                Menu
              </h6>
              <SidebarItem href="/" icon={faHouse} pathname={pathname}/>
              <SidebarItem href="/info" icon={faCircleInfo} pathname={pathname}/>
              <SidebarItem href="/chat" icon={faMessage} pathname={pathname}/>
              <SidebarItem href="/todo" icon={faCheck} pathname={pathname}/>
              <SidebarItem href="/schedule" icon={faCalendarDays} pathname={pathname}/>
              <SidebarItem href="/timecard" icon={faClock} pathname={pathname}/>

              <hr className="my-4 md:min-w-full"/>

              <h6 className="block pt-1 pb-4 text-xs font-bold uppercase no-underline text-blueGray-500 md:min-w-full">
                Setting
              </h6>
              <SidebarItem href="/setting/group" icon={faUsers} pathname={pathname}/>
              <SidebarItem href="/setting/timecard" icon={faClock} pathname={pathname}/>

              <hr className="my-4 md:min-w-full"/>

              <h6 className="block pt-1 pb-4 text-xs font-bold uppercase no-underline text-blueGray-500 md:min-w-full">
                Account
              </h6>

              {token ? (
                <li className="items-center">
                  <div
                    className={
                      "flex items-center text-xs uppercase p-3 font-bold text-blueGray-700 hover:text-blueGray-500"
                    }
                  >
                    <FontAwesomeIcon
                      icon={faUser}
                      className={
                        "fas fa-tv mr-2 text-sm opacity-75 w-4 h-4"
                      }
                    />{" "}
                    {/*TODO*/}
                    {/*{user.username}*/}
                  </div>
                </li>
              ) : (
                <li className="items-center">
                  <Link
                    href="/signup"
                    className={
                      "text-xs uppercase p-3 font-bold block " +
                      (pathname === "/signup"
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                  >
                    <FontAwesomeIcon
                      icon={faUserPlus}
                      className={
                        "fas fa-tv mr-2 text-sm opacity-75 w-4 h-4"
                      }
                    />{" "}
                    Sign Up
                  </Link>
                </li>
              )}
              {token ? (
                <li className="items-center">
                  <SidebarLogout/>
                </li>
              ) : (
                <li className="items-center">
                  <Link
                    href="/login"
                    className={
                      "text-xs uppercase p-3 font-bold block " +
                      (pathname === "/login"
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                  >
                    <FontAwesomeIcon
                      icon={faRightToBracket}
                      className={
                        "fas fa-tv mr-2 text-sm opacity-75 w-4 h-4"
                      }
                    />{" "}
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </SidebarToggle>
        </div>
      </nav>
    </>
  )
}

export default Sidebar