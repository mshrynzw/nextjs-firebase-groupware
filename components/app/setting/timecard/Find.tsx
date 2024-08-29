import React, { useContext, useEffect } from "react"
import { gql } from "apollo-boost"
import { useQuery } from "@apollo/client"
import { getLocalTime } from "@/lib/datetime"
import { AppContext } from "@/context/AppContext"
import LabelHeader from "@/components/label/LabelHeader"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsis, faTrash } from "@fortawesome/free-solid-svg-icons"
import { GET_SETTING_TIMECARDS } from "@/lib/app/setting/timecard"



const Find = ({ setEditTimecardSetting, setDeleteTimecardSetting, refetchFlag }) => {
  const { setScreen } = useContext(AppContext)

  const { loading, error, data, refetch } = useQuery(GET_SETTING_TIMECARDS)

  useEffect(() => {
    refetch()
  }, [refetchFlag])

  const handleEdit = (timecardSetting) => {
    setEditTimecardSetting(timecardSetting)
    setScreen("edit")
  }

  const handleDelete = (timecardSetting) => {
    setDeleteTimecardSetting(timecardSetting)
    setScreen("delete")
  }

  if (loading) return <p>Loading...</p>
  if (error) {
    console.error("Error fetching messages:", error)
    return <p>Error: {error.message}</p>
  }

  return (
    <div className="relative">
      <div className="mx-auto w-full px-4 md:px-10">
        <LabelHeader screen="find"/>

        <div className="flex flex-wrap">
          {data.timecardSettings.data.map((timecardSetting) => {
            try {
              const createdAtLocalTime = getLocalTime(timecardSetting.attributes.createdAt)
              const updatedAtLocalTime = getLocalTime(timecardSetting.attributes.updatedAt)
              return (
                <div key={timecardSetting.id} className="w-full px-4 py-4 xl:w-6/12">
                  <div className="relative mb-6 flex min-w-0 flex-col break-words rounded bg-white shadow-lg xl:mb-0">
                    <div className="flex-auto p-4">
                      <div className="flex flex-wrap">
                        <div className="relative w-full max-w-full flex-1 flex-grow pr-4 space-y-2">
                          <h3 className="text-xl font-semibold text-blueGray-700">
                            {timecardSetting.attributes.title}
                          </h3>
                          <p className="whitespace-pre-wrap break-words text-xs font-bold text-blueGray-400">
                            {timecardSetting.attributes.description}
                          </p>
                          <p className="whitespace-pre-wrap break-words text-xs font-bold text-blueGray-400">
                            {String(timecardSetting.attributes.order)}
                          </p>
                          <p className="whitespace-pre-wrap break-words text-xs font-bold text-blueGray-400">
                            {timecardSetting.attributes.color}
                          </p>
                          <div className="mt-2 flex items-end justify-between">
                            <div className="text-sm text-blueGray-400">
                              <div className="whitespace-nowrap">
                                {updatedAtLocalTime}
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
