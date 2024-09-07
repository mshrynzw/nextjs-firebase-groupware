import React, { useContext } from "react"
import ButtonSubmit from "@/components/button/ButtonSubmit"
import LabelHeader from "@/components/label/LabelHeader"
import { ScheduleContext } from "@/context/app/ScheduleContext"
import { AppContext } from "@/context/AppContext"
import { deletedSchedule } from "@/lib/app/schedule"


const Delete : React.FC = ({ deleteSchedule }) => {
  const { setScreen } = useContext(AppContext)
  const { setSchedules } = useContext(ScheduleContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    await deletedSchedule(deleteSchedule.event.id)
    setSchedules((prevSchedules) => prevSchedules.filter(schedule => schedule.id !== deleteSchedule.event.id))
    setScreen("find")
  }

  return (
    <>
      <LabelHeader screen="delete"/>
      <ButtonSubmit onClick={handleSubmit}/>
    </>
  )
}

export default Delete
