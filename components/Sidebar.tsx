import { useContext, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { AppContext } from "@/context/AppContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faCalendarDays, faCheck, faCircleInfo, faClock, faHouse, faMessage, faRightFromBracket, faRightToBracket, faTimes, faUser, faUserPlus, faUsers } from "@fortawesome/free-solid-svg-icons"

const Sidebar = () => {
  const appContext = useContext(AppContext)

  const { user, setUser } = appContext

  const [collapseShow, setCollapseShow] = useState("hidden")
  const router = useRouter()

  const handleLogout = () => {
    setUser(null)
    router.push("/login")
  }

  return (
    <>
      <nav className="relative z-50 flex flex-wrap items-center justify-between bg-white px-6 py-4 shadow-xl md:fixed md:top-0 md:bottom-0 md:left-0 md:block md:w-64 md:flex-row md:flex-nowrap md:overflow-hidden md:overflow-y-auto">
        <div className="mx-auto flex w-full flex-wrap items-center justify-between px-0 md:min-h-full md:flex-col md:flex-nowrap md:items-stretch">
          {/*TODO*/}
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

            {/* Navigation */}
            <ul className="flex list-none flex-col md:min-w-full md:flex-col">

              <h6 className="block pt-1 pb-4 text-xs font-bold uppercase no-underline text-blueGray-500 md:min-w-full">
                Menu
              </h6>

              <li className="items-center">
                <Link
                  href="/"
                  className={
                    "hover:text-blueGray-500 text-xs uppercase p-3 font-bold block text-blueGray-300" +
                    (router.pathname === "/" && " bg-blueGray-600 rounded-lg shadow-xl")
                  }
                >
                  <FontAwesomeIcon
                    icon={faHouse}
                    className={
                      "fas fa-tv mr-2 text-sm opacity-75"
                    }
                  />{" "}
                  Dashboard
                </Link>
              </li>

              <li className="items-center">
                <Link
                  href="/info"
                  className={
                    "hover:text-blueGray-500 text-xs uppercase p-3 font-bold block text-blueGray-300" +
                    (router.pathname === "/info" && " bg-blueGray-600 rounded-lg shadow-xl")
                  }
                >
                  <FontAwesomeIcon
                    icon={faCircleInfo}
                    className={
                      "fas fa-tv mr-2 text-sm opacity-75"
                    }
                  />{" "}
                  Info
                </Link>
              </li>

              <li className="items-center">
                <Link
                  href="/chat"
                  className={
                    "hover:text-blueGray-500 text-xs uppercase p-3 font-bold block text-blueGray-300" +
                    (router.pathname === "/chat" && " bg-blueGray-600 rounded-lg shadow-xl")
                  }
                >
                  <FontAwesomeIcon
                    icon={faMessage}
                    className={
                      "fas fa-tv mr-2 text-sm opacity-75"
                    }
                  />{" "}
                  Chat
                </Link>
              </li>

              <li className="items-center">
                <Link
                  href="/todo"
                  className={
                    "hover:text-blueGray-500 text-xs uppercase p-3 font-bold block text-blueGray-300" +
                    (router.pathname === "/todo" && " bg-blueGray-600 rounded-lg shadow-xl")
                  }
                >
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={
                      "fas fa-tv mr-2 text-sm opacity-75"
                    }
                  />{" "}
                  Todo
                </Link>
              </li>

              <li className="items-center">
                <Link
                  href="/schedule"
                  className={
                    "hover:text-blueGray-500 text-xs uppercase p-3 font-bold block text-blueGray-300" +
                    (router.pathname === "/schedule" && " bg-blueGray-600 rounded-lg shadow-xl")
                  }
                >
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    className={
                      "fas fa-tv mr-2 text-sm opacity-75"
                    }
                  />{" "}
                  Schedule
                </Link>
              </li>

              <li className="items-center">
                <Link
                  href="/timecard"
                  className={
                    "hover:text-blueGray-500 text-xs uppercase p-3 font-bold block text-blueGray-300" +
                    (router.pathname === "/timecard" && " bg-blueGray-600 rounded-lg shadow-xl")
                  }
                >
                  <FontAwesomeIcon
                    icon={faClock}
                    className={
                      "fas fa-tv mr-2 text-sm opacity-75"
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
                    "hover:text-blueGray-500 text-xs uppercase p-3 font-bold block text-blueGray-300" +
                    (router.pathname === "/setting/group" && " bg-blueGray-600 rounded-lg shadow-xl")
                  }
                >
                  <FontAwesomeIcon
                    icon={faUsers}
                    className={
                      "fas fa-tv mr-2 text-sm opacity-75"
                    }
                  />{" "}
                  Group
                </Link>
              </li>

              <li className="items-center">
                <Link
                  href="/setting/timecard"
                  className={
                    "hover:text-blueGray-500 text-xs uppercase p-3 font-bold block text-blueGray-300" +
                    (router.pathname === "/setting/timecard" && " bg-blueGray-600 rounded-lg shadow-xl")
                  }
                >
                  <FontAwesomeIcon
                    icon={faClock}
                    className={
                      "fas fa-tv mr-2 text-sm opacity-75"
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

              {user ? (
                <li className="items-center">
                  <div
                    className={
                      "text-xs uppercase p-3 font-bold block text-blueGray-700 hover:text-blueGray-500"
                    }
                  >
                    <FontAwesomeIcon
                      icon={faUser}
                      className={
                        "fas fa-tv mr-2 text-sm opacity-75"
                      }
                    />{" "}
                    {user.username}
                  </div>
                </li>
              ) : (
                <li className="items-center">
                  <Link
                    href="/signup"
                    className={
                      "text-xs uppercase p-3 font-bold block " +
                      (router.pathname === "/signup"
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                  >
                    <FontAwesomeIcon
                      icon={faUserPlus}
                      className={
                        "fas fa-tv mr-2 text-sm opacity-75"
                      }
                    />{" "}
                    Sign Up
                  </Link>
                </li>
              )}
              {user ? (
                <li className="items-center">
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
                </li>
              ) : (
                <li className="items-center">
                  <Link
                    href="/login"
                    className={
                      "text-xs uppercase p-3 font-bold block " +
                      (router.pathname === "/login"
                        ? "text-lightBlue-500 hover:text-lightBlue-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                    }
                  >
                    <FontAwesomeIcon
                      icon={faRightToBracket}
                      className={
                        "fas fa-tv mr-2 text-sm opacity-75"
                      }
                    />{" "}
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Sidebar