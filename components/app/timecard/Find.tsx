import Loading from "@/app/loading"
import { TimecardContext } from "@/context/app/TimecardContext"
import React, { useContext, useEffect, useState } from "react"
import { AppContext } from "@/context/AppContext"
import { formatMonthDateDay, formatTime, getDatesInCurrentMonth, getDayColor } from "@/lib/datetime"
import styles from "./Find.module.css"
import { faPenToSquare, faEllipsis, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { startOfMonth, endOfMonth, format } from 'date-fns';

const Find : React.FC = ({ setEditTimecard, setDeleteTimecard, setCreateDate}) => {
  const { setScreen } = useContext(AppContext)
  const { timecards, setTimecards } = useContext(TimecardContext)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // const { user } = appContext
  const startDate = format(startOfMonth(new Date()), 'yyyy-MM-dd');
  const endDate = format(endOfMonth(new Date()), 'yyyy-MM-dd');
  // const { loading, error, data, refetch } = useQuery(GET_TIMECARDS, {
  //   variables : { userId : user?.id, startDate, endDate }
  // })

  useEffect(() => {
    const fetchInfos = async () => {
      try {
        const response = await fetch("/api/getTimecards", { next : { revalidate : process.env.NEXT_PUBLIC_ISR_INTERBAL } })
        const data = await response.json()
        setTimecards(data)
      } catch (error) {
        console.error(error.message)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchInfos()
  }, [])

  const handleEdit = (timecard) => {
    setEditTimecard(timecard)
    setScreen("edit")
  }

  const handleDelete = (timecard) => {
    setDeleteTimecard(timecard)
    setScreen("delete")
  }

  const handleCreate = (date) => {
    setCreateDate(date)
    setScreen("create")
  }

  if (loading) return <Loading/>
  if (error) return <p>Error: {error}</p>

  const dates : Date[] = getDatesInCurrentMonth()

  return (
    <div className="relative block w-full min-w-0 overflow-x-auto break-words rounded-lg bg-white p-4 shadow-lg">
      <div className={styles.tableContainer}>
        <table className="w-full border-collapse items-center bg-transparent">
          <thead className={styles.stickyHeader}>
          <tr>
            <th className={`sticky left-0 z-10 whitespace-nowrap px-6 py-3 text-center align-middle text-xs font-semibold uppercase bg-blueGray-600 text-blueGray-200 border-blueGray-500`}>Date</th>
            <th className="whitespace-nowrap px-6 py-3 text-center align-middle text-xs font-semibold uppercase bg-blueGray-600 text-blueGray-200 border-blueGray-500"/>
            <th className="whitespace-nowrap px-6 py-3 text-center align-middle text-xs font-semibold uppercase bg-blueGray-600 text-blueGray-200 border-blueGray-500">Type</th>
            <th className="whitespace-nowrap px-6 py-3 text-center align-middle text-xs font-semibold uppercase bg-blueGray-600 text-blueGray-200 border-blueGray-500">Start Work</th>
            <th className="whitespace-nowrap px-6 py-3 text-center align-middle text-xs font-semibold uppercase bg-blueGray-600 text-blueGray-200 border-blueGray-500">Start Break</th>
            <th className="whitespace-nowrap px-6 py-3 text-center align-middle text-xs font-semibold uppercase bg-blueGray-600 text-blueGray-200 border-blueGray-500">End Break</th>
            <th className="whitespace-nowrap px-6 py-3 text-center align-middle text-xs font-semibold uppercase bg-blueGray-600 text-blueGray-200 border-blueGray-500">End Work</th>
          </tr>
          </thead>
          <tbody>
          {dates.map((date) => {
            const localDate = new Date(date).toLocaleDateString()
            const matchingTimecards = timecards.filter((timecard) =>
              new Date(timecard.date).toLocaleDateString() === localDate
            )

            return matchingTimecards.length > 0 ? (
              matchingTimecards.map((timecard) => (
                <tr key={timecard.id} className={styles.tableRow}>
                  <th className={`${styles.stickyColumn} items-center whitespace-nowrap p-2 px-6 text-left align-middle text-sm ${getDayColor(date)}`}>
                    {formatMonthDateDay(date)}
                  </th>
                  <td className="whitespace-nowrap p-2 px-6 text-center align-middle text-sm space-x-4">
                    <button onClick={() => handleEdit(timecard)}>
                      <FontAwesomeIcon icon={faEllipsis}/>
                    </button>
                    <button onClick={() => handleDelete(timecard)}>
                      <FontAwesomeIcon icon={faTrash}/>
                    </button>
                  </td>
                  <td className="whitespace-nowrap p-2 px-6 align-middle text-sm">{timecard.settingTimecard.title}</td>
                  <td className="whitespace-nowrap p-2 px-6 align-middle text-sm">{timecard.startWork ? formatTime(timecard.startWork) : ""}</td>
                  <td className="whitespace-nowrap p-2 px-6 align-middle text-sm">{timecard.startBreak ? formatTime(timecard.startBreak) : ""}</td>
                  <td className="whitespace-nowrap p-2 px-6 align-middle text-sm">{timecard.endBreak ? formatTime(timecard.endBreak) : ""}</td>
                  <td className="whitespace-nowrap p-2 px-6 align-middle text-sm">{timecard.endWork ? formatTime(timecard.endWork) : ""}</td>
                </tr>
              ))
            ) : (
              <tr key={localDate} className={styles.tableRow}>
                <th className={`${styles.stickyColumn} items-center whitespace-nowrap p-2 px-6 text-left align-middle text-sm ${getDayColor(date)}`}>
                  {formatMonthDateDay(date)}
                </th>
                <td className="whitespace-nowrap p-2 px-6 text-center align-middle text-sm">
                  <button onClick={() => handleCreate(localDate)}>
                    <FontAwesomeIcon icon={faPenToSquare}/>
                  </button>
                </td>
                <td colSpan={5} className="whitespace-nowrap p-2 px-6 align-middle text-sm"></td>
              </tr>
            )
          })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Find