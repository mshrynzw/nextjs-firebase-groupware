import React, { useContext, useEffect, useState } from "react"
import { faEllipsis, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { formatDateTimeFromFirebase } from "@/lib/datetime"
import LabelHeader from "@/components/label/LabelHeader"
import { db } from "@/lib/firebase"
import info from "@/types/info"
import { collection, getDocs, doc, getDoc } from "firebase/firestore"
import { AppContext } from "@/context/AppContext"

const Find = ({ setEditInfo, setDeleteInfo }) => {
  const { setScreen } = useContext(AppContext)

  const [infos, setInfos] = useState<info[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchInfos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "infos"))

        const infosData = await Promise.all(querySnapshot.docs.map(async (d) => {
          const infoData = { id : d.id, ...d.data() }
          const userDoc = await getDoc(doc(db, "users", infoData.uid))
          infoData.displayName = userDoc.exists() ? userDoc.data().displayName : "Unknown User"
          return infoData
        }))

        setInfos(infosData)
      } catch (error) {
        console.error(error.message)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchInfos()
  }, [])

  const handleEdit = (info) => {
    setEditInfo(info)
    setScreen("edit")
  }

  const handleDelete = (info) => {
    setDeleteInfo(info)
    setScreen("delete")
  }

  // TODO
  if (loading) return <p>Loading...</p>
  if (error) {
    console.error("Error: ", error)
    return <p>Error: {error}</p>
  }

  return (
    <div className="relative">
      <div className="mx-auto w-full px-4 md:px-10">
        <LabelHeader screen="find"/>

        <div className="flex flex-wrap">
          {infos.map((info) => {
            try {
              return (
                <div key={info.id} className="w-full px-4 py-4 xl:w-6/12">
                  <div className="relative mb-6 flex min-w-0 flex-col break-words rounded bg-white shadow-lg xl:mb-0">
                    <div className="flex-auto p-4">
                      <div className="flex flex-wrap">
                        <div className="relative w-full max-w-full flex-1 flex-grow pr-4 space-y-2">
                          <h3 className="text-xl font-semibold text-blueGray-700">
                            {info.title}
                          </h3>
                          <p className="whitespace-pre-wrap break-words text-xs font-bold text-blueGray-400">
                            {info.description}
                          </p>
                          <div className="mt-2 flex items-end justify-between">
                            <p className="text-sm text-blueGray-400">
                              <span className="whitespace-nowrap">
                                {formatDateTimeFromFirebase(info.updatedAt)}
                              </span>
                              <span className="ml-2 text-lightBlue-500">
                                {info.displayName}
                              </span>
                            </p>
                            <div className="flex justify-end space-x-2">
                              <button
                                onClick={() => handleEdit(info)}
                                className="h-8 w-8 rounded-md bg-gray-200 p-2 text-sm font-semibold shadow-xl duration-300 ease-in-out text-blueGray-600 hover:text-blueGray-200 hover:bg-blueGray-600 hover:-translate-y-1 hover:scale-110"
                              >
                                <FontAwesomeIcon icon={faEllipsis}/>
                              </button>
                              <button
                                onClick={() => handleDelete(info)}
                                className="h-8 w-8 rounded-md bg-gray-200 p-2 text-sm font-semibold shadow-xl duration-300 ease-in-out text-blueGray-600 hover:text-blueGray-200 hover:bg-blueGray-600 hover:-translate-y-1 hover:scale-110"
                              >
                                <FontAwesomeIcon icon={faTrash}/>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            } catch (e) {
              console.error("Error processing message:", info, e)
              return <p key={info.id}>Error displaying message</p>
            }
          })}
        </div>
      </div>
    </div>
  )
}

export default Find