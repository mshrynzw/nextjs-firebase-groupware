import Link from "next/link"
import { headers, cookies } from "next/headers"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarDays, faCheck, faCircleInfo, faClock, faHouse, faMessage, faRightFromBracket, faRightToBracket, faTimes, faUser, faUserPlus, faUsers } from "@fortawesome/free-solid-svg-icons"
import SidebarToggle from "@/components/sidebar/SidebarToggle"
import SidebarLogout from "@/components/sidebar/SidebarLogout"

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

              <li className="items-center">
                <Link
                  href="/"
                  className={
                    "flex items-center hover:text-blueGray-500 text-xs uppercase p-3 font-bold text-blueGray-300" +
                    (pathname === "/" && " bg-blueGray-600 rounded-lg shadow-xl")
                  }
                >
                  <FontAwesomeIcon
                    icon={faHouse}
                    className={
                      "fas fa-tv mr-2 text-sm opacity-75 w-4 h-4"
                    }
                  />{" "}
                  Dashboard
                </Link>
              </li>

              <li className="items-center">
                <Link
                  href="/info"
                  className={
                    "flex items-center hover:text-blueGray-500 text-xs uppercase p-3 font-bold text-blueGray-300" +
                    (pathname === "/info" && " bg-blueGray-600 rounded-lg shadow-xl")
                  }
                >
                  <FontAwesomeIcon
                    icon={faCircleInfo}
                    className={
                      "fas fa-tv mr-2 text-sm opacity-75 w-4 h-4"
                    }
                  />{" "}
                  Info
                </Link>
              </li>

              <li className="items-center">
                <Link
                  href="/chat"
                  className={
                    "flex items-center hover:text-blueGray-500 text-xs uppercase p-3 font-bold text-blueGray-300" +
                    (pathname === "/chat" && " bg-blueGray-600 rounded-lg shadow-xl")
                  }
                >
                  <FontAwesomeIcon
                    icon={faMessage}
                    className={
                      "fas fa-tv mr-2 text-sm opacity-75 w-4 h-4"
                    }
                  />{" "}
                  Chat
                </Link>
              </li>

              <li className="items-center">
                <Link
                  href="/todo"
                  className={
                    "flex items-center hover:text-blueGray-500 text-xs uppercase p-3 font-bold text-blueGray-300" +
                    (pathname === "/todo" && " bg-blueGray-600 rounded-lg shadow-xl")
                  }
                >
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={
                      "fas fa-tv mr-2 text-sm opacity-75 w-4 h-4"
                    }
                  />{" "}
                  Todo
                </Link>
              </li>

              <li className="items-center">
                <Link
                  href="/schedule"
                  className={
                    "flex items-center hover:text-blueGray-500 text-xs uppercase p-3 font-bold text-blueGray-300" +
                    (pathname === "/schedule" && " bg-blueGray-600 rounded-lg shadow-xl")
                  }
                >
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    className={
                      "fas fa-tv mr-2 text-sm opacity-75 w-4 h-4"
                    }
                  />{" "}
                  Schedule
                </Link>
              </li>

              <li className="items-center">
                <Link
                  href="/timecard"
                  className={
                    "flex items-center hover:text-blueGray-500 text-xs uppercase p-3 font-bold text-blueGray-300" +
                    (pathname === "/timecard" && " bg-blueGray-600 rounded-lg shadow-xl")
                  }
                >
                  <FontAwesomeIcon
                    icon={faClock}
                    className={
                      "fas fa-tv mr-2 text-sm opacity-75 w-4 h-4"
                    }
                  />{" "}
                  Time Card
                </Link>
              </li>

              {/* Divider */}
              <hr className="my-4 md:min-w-full"/>

              <h6 className="block pt-1 pb-4 text-xs font-bold uppercase no-underline text-blueGray-500 md:min-w-full">
                Setting
              </h6>

              <li className="items-center">
                <Link
                  href="/setting/group"
                  className={
                    "flex items-center hover:text-blueGray-500 text-xs uppercase p-3 font-bold text-blueGray-300" +
                    (pathname === "/setting/group" && " bg-blueGray-600 rounded-lg shadow-xl")
                  }
                >
                  <FontAwesomeIcon
                    icon={faUsers}
                    className={
                      "fas fa-tv mr-2 text-sm opacity-75 w-4 h-4"
                    }
                  />{" "}
                  Group
                </Link>
              </li>

              <li className="items-center">
                <Link
                  href="/setting/timecard"
                  className={
                    "flex items-center hover:text-blueGray-500 text-xs uppercase p-3 font-bold text-blueGray-300" +
                    (pathname === "/setting/timecard" && " bg-blueGray-600 rounded-lg shadow-xl")
                  }
                >
                  <FontAwesomeIcon
                    icon={faClock}
                    className={
                      "fas fa-tv mr-2 text-sm opacity-75 w-4 h-4"
                    }
                  />{" "}
                  Time Card
                </Link>
              </li>

              {/* Divider */}
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