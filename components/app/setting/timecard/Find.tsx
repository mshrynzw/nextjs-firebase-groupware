import React, { useContext, useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsis, faTrash } from "@fortawesome/free-solid-svg-icons"
import { TimecardContext } from "@/context/app/setting/TimecardContext"
import { AppContext } from "@/context/AppContext"
import Loading from "@/app/loading"
import LabelHeader from "@/components/label/LabelHeader"
import { formatDateTimeFromFirebase } from "@/lib/datetime"

const Find : React.FC = ({ setEditTimecardSetting, setDeleteTimecardSetting }) => {
  const { setScreen } = useContext(AppContext)
  const { timecards, setTimecards } = useContext(TimecardContext)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSettingTimecards = async () => {
      try {
        const response = await fetch("/api/setting/getTimecards", { next : { revalidate : process.env.NEXT_PUBLIC_ISR_INTERBAL } })
        const data = await response.json()
        setTimecards(data)
      } catch (error) {
        console.error(error.message)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchSettingTimecards()
  }, [])

  const handleEdit = (timecardSetting) => {
    setEditTimecardSetting(timecardSetting)
    setScreen("edit")
  }

  const handleDelete = (timecardSetting) => {
    setDeleteTimecardSetting(timecardSetting)
    setScreen("delete")
  }

  if (loading) return <Loading/>
  if (error) return <p>Error: {error}</p>

  return (
    <div className="relative">
      <div className="mx-auto w-full px-4 md:px-10">
        <LabelHeader screen="find"/>

        <div className="flex flex-wrap">
          {timecards.map((timecardSetting) => {
            try {
              return (
                <div key={timecardSetting.id} className="w-full px-4 py-4 xl:w-6/12">
                  <div className="relative mb-6 flex min-w-0 flex-col break-words rounded bg-white shadow-lg xl:mb-0">
                    <div className="flex-auto p-4">
                      <div className="flex flex-wrap">
                        <div className="relative w-full max-w-full flex-1 flex-grow pr-4 space-y-2">
                          <h3 className="text-xl font-semibold text-blueGray-700">
                            {timecardSetting.title}
                          </h3>
                          <p className="whitespace-pre-wrap break-words text-xs font-bold text-blueGray-400">
                            {timecardSetting.description}
                          </p>
                          <p className="whitespace-pre-wrap break-words text-xs font-bold text-blueGray-400">
                            {String(timecardSetting.order)}
                          </p>
                          <p className="whitespace-pre-wrap break-words text-xs font-bold text-blueGray-400">
                            {timecardSetting.color}
                          </p>
                          <div className="mt-2 flex items-end justify-between">
                            <div className="text-sm text-blueGray-400">
                              <div className="whitespace-nowrap">
                                {formatDateTimeFromFirebase(timecardSetting.updatedAt)}
                              </div>
                            </div>
                            <div className="flex justify-end">
                              <button
                                onClick={() => handleEdit(timecardSetting)}
                                className="mr-2 flex h-8 w-8 items-center justify-center rounded-md p-2 text-white shadow-sm bg-blueGray-700 hover:bg-blueGray-400 hover:shadow-xl"
                              >
                                <FontAwesomeIcon icon={faEllipsis}/>
                              </button>
                              <button
                                onClick={() => handleDelete(timecardSetting)}
                                className="flex h-8 w-8 items-center justify-center rounded-md p-2 text-white shadow-sm bg-blueGray-700 hover:bg-blueGray-400 hover:shadow-xl"
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
              console.error("Error processing message:", timecardSetting, e)
              return <p key={timecardSetting.id}>Error displaying message</p>
            }
          })}
        </div>
      </div>
    </div>
  )
}

export default Find
