import React, { useState, useEffect, useContext } from "react"
import Cookies from "js-cookie"
import LabelHeader from "@/components/label/LabelHeader"
import Label from "@/components/label/Label"
import ButtonSubmit from "@/components/button/ButtonSubmit"
import Form from "@/components/form/Form"
import InputDate from "@/components/input/InputDate"
import InputTitle from "@/components/input/InputTitle"
import InputColor from "@/components/input/InputColor"
import { AppContext } from "@/context/AppContext"
import { ScheduleContext } from "@/context/app/ScheduleContext"
import { editedSchedule } from "@/lib/app/schedule"
import { formatDateTimeByEventCalender } from "@/lib/datetime"

const Edit : React.FC = ({ editSchedule }) => {
  const { setScreen } = useContext(AppContext)
  const { setSchedules } = useContext(ScheduleContext)
  const uid = Cookies.get("uid")

  const [eventData, setEventData] = useState({
    start : "",
    end : "",
    title : "",
    textColor : "",
    backgroundColor : ""
  })

  useEffect(() => {
    setEventData({
      start : formatDateTimeByEventCalender(editSchedule.event.start),
      end : formatDateTimeByEventCalender(editSchedule.event.end),
      title : editSchedule.event.title,
      textColor : editSchedule.event.textColor,
      backgroundColor : editSchedule.event.backgroundColor
    })
  }, [editSchedule])

  const handleChange = (e) => {
    const { name, value } = e.target
    setEventData(prev => ({ ...prev, [name] : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const updateSchedule = await editedSchedule(editSchedule.event.id, uid, eventData.start, eventData.end, eventData.title, eventData.textColor, eventData.backgroundColor)
    setSchedules((prevSchedules) =>
      prevSchedules.map(schedule =>
        schedule.id === updateSchedule.id
          ? { ...schedule, ...updateSchedule }
          : schedule
      )
    )
    setScreen("find")
  }

  return (
    <div>
      <LabelHeader screen="edit"/>
      <Form onSubmit={handleSubmit}>
        <Label name="start"/>
        <InputDate name="start" value={eventData.start} onChange={handleChange}/>

        <Label name="end"/>
        <InputDate name="end" value={eventData.end} onChange={handleChange}/>

        <Label name="title"/>
        <InputTitle value={eventData.title} onChange={handleChange}/>

        <Label name="textColor"/>
        <InputColor name="textColor" value={eventData.textColor} onChange={handleChange}/>

        <Label name="backgroundColor"/>
        <InputColor name="backgroundColor" value={eventData.backgroundColor} onChange={handleChange}/>

        <ButtonSubmit/>
      </Form>
    </div>
  )
}

export default Edit