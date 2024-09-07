import React, { useContext, useEffect, useRef, useState } from "react"
import Calendar from "@event-calendar/core"
import TimeGrid from "@event-calendar/time-grid"
import Interaction from "@event-calendar/interaction"
import "@event-calendar/core/index.css"
import Loading from "@/app/loading"
import { AppContext } from "@/context/AppContext"
import { ScheduleContext } from "@/context/app/ScheduleContext"
import { getLocalTime } from "@/lib/datetime"

const Find : React.FC = ({ setCreateSchedule, setEditSchedule, setDeleteSchedule }) => {
  const { setScreen } = useContext(AppContext)
  const { schedules, setSchedules } = useContext(ScheduleContext)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const calendarRef = useRef(null)

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await fetch("/api/getSchedules", { next : { revalidate : process.env.NEXT_PUBLIC_ISR_INTERBAL } })
        const data = await response.json()
        setSchedules(data)
      } catch (error) {
        console.error(error.message)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchSchedules()
  }, [])

  useEffect(() => {
    const events = schedules.map((item) => ({
      id : item.id,
      start : getLocalTime(item.start),
      end : getLocalTime(item.end),
      title : item.title,
      textColor : item.textColor,
      color : item.backgroundColor
    }))

    if (calendarRef.current) {
      const ec = new Calendar({
        target : calendarRef.current,
        props : {
          plugins : [TimeGrid, Interaction],
          options : {
            view : "timeGridWeek",
            eventClick : (event) => {
              setScreen("editDelete")
              setEditSchedule(event)
              setDeleteSchedule(event)
            },
            select : (event) => {
              setScreen("create")
              setCreateSchedule({
                startStr : event.startStr,
                endStr : event.endStr
              })
            },
            selectable : {},
            events : events
          }
        }
      })

      return () => {
        ec.destroy()
      }
    }
  }, [schedules])

  if (loading) return <Loading/>
  if (error) return <p>Error: {error}</p>

  return (
    <div className="text-sm">
      <div ref={calendarRef}/>
    </div>
  )
}

export default Find