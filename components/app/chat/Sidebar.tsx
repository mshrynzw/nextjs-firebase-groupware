import Loading from "@/app/loading"
import Cookies from "js-cookie"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes, faUser, faUsers, faUsersRectangle } from "@fortawesome/free-solid-svg-icons"
import Group from "@/types/setting/group"

const Sidebar = () => {
  const uid = Cookies.get("uid")

  const [collapseShow, setCollapseShow] = useState("hidden")
  // const [groups, setGroups] = useState<Group[]>([])
  // const [loading, setLoading] = useState(true)
  // const [error, setError] = useState<string | null>(null)

  // TODO
  // useEffect(() => {
  //   const fetchGroups = async () => {
  //     try {
  //       const response = await fetch(`/api/setting/getGroupsByUser?uid=${uid}`, { next : { revalidate : process.env.NEXT_PUBLIC_ISR_INTERBAL } })
  //       const data = await response.json()
  //       setGroups(data)
  //       console.log("groups", groups)
  //     } catch (error) {
  //       console.error(error.message)
  //       setError(error.message)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }
  //
  //   fetchGroups()
  // }, [])

  // if (loading) return <Loading/>
  // if (error) return <p>Error: {error}</p>

  return (
    <>
      <nav
        className="absolute top-0 right-0 left-0 z-40 flex-wrap items-center justify-between bg-transparent px-6 py-4 xl:fixed xl:top-0 xl:right-0 xl:bottom-0 xl:left-auto xl:block xl:w-64 xl:flex-row xl:flex-nowrap xl:overflow-hidden xl:overflow-y-auto xl:bg-white">
        <div className="mx-auto flex w-full flex-wrap items-center justify-between px-0 xl:min-h-full xl:flex-col xl:flex-nowrap xl:items-stretch">
          {/*TODO*/}
          {/* Toggler */}
          <button
            className="rounded-md border-4 bg-gray-200 text-sm font-semibold shadow-xl duration-300 ease-in-out border-blueGray-600 text-blueGray-600 hover:text-blueGray-200 hover:bg-blueGray-600 hover:-translate-y-1 hover:scale-110 xl:hidden"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <FontAwesomeIcon icon={faUsersRectangle} className="h-8 w-8 p-2"/>
          </button>

          {/* Collapse */}
          <div
            className={
              "xl:flex xl:flex-col xl:items-stretch xl:opacity-100 xl:relative xl:mt-4 xl:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="mb-4 block border-b border-solid pb-4 border-blueGray-200 xl:hidden xl:min-w-full">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <div className="mr-0 inline-block whitespace-nowrap p-4 px-0 text-left text-sm font-bold uppercase text-blueGray-600 xl:block xl:pb-2">
                    Channel
                  </div>
                </div>
                <div className="flex w-6/12 justify-end">
                  <button
                    type="button"
                    className="cursor-pointer rounded border border-solid border-transparent bg-transparent px-3 py-1 text-xl leading-none text-black opacity-50 xl:hidden"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <FontAwesomeIcon icon={faTimes}/>
                  </button>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <ul className="flex list-none flex-col xl:min-w-full xl:flex-col">

              <h6 className="block pt-1 pb-4 text-xs font-bold uppercase no-underline text-blueGray-500 xl:min-w-full">
                Team
              </h6>

              {/*ToDO*/}
              {/*{groups.map((group) => {*/}
              {/*  return (*/}
              {/*    <li className="items-center" key={group.id}>*/}
              {/*      <Link*/}
              {/*        href="/"*/}
              {/*        className="text-xs uppercase p-3 font-bold block text-blueGray-300 bg-blueGray-600 rounded-lg shadow-xl"*/}
              {/*      >*/}
              {/*        <FontAwesomeIcon*/}
              {/*          icon={faUsers}*/}
              {/*          className="fas fa-tv mr-2 text-sm opacity-75 text-blueGray-300"*/}
              {/*        />{" "}*/}
              {/*        {group.title}*/}
              {/*      </Link>*/}
              {/*    </li>*/}
              {/*  )*/}
              {/*})}*/}

              {/* Divider */}
              <hr className="my-4 xl:min-w-full"/>

              <h6 className="block pt-1 pb-4 text-xs font-bold uppercase no-underline text-blueGray-500 xl:min-w-full">
                Direct
              </h6>

              <li className="items-center">
                <Link
                  href="/setting/group"
                  className="text-xs uppercase p-3 font-bold block text-lightBlue-500 hover:text-lightBlue-600"
                >
                  <FontAwesomeIcon
                    icon={faUser}
                    className="fas fa-tv mr-2 text-sm opacity-75"
                  />{" "}
                  Andy Blueman
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Sidebar