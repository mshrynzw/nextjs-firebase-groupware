import React, { useState, useEffect, useContext } from "react"
import { editedSchedule } from "@/lib/app/schedule"
import { formatDateTimeByEventCalender } from "@/lib/datetime"
import { AppContext } from "@/context/AppContext"
import LabelHeader from "@/components/label/LabelHeader"
import Label from "@/components/label/Label"
import ButtonSubmit from "@/components/button/ButtonSubmit"
import Form from "@/components/form/Form"
import InputDate from "@/components/input/InputDate"
import InputTitle from "@/components/input/InputTitle"
import InputColor from "@/components/input/InputColor"

const Edit = ({ editSchedule, refetch }) => {
  const { setScreen } = useContext(AppContext)

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

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEventData(prev => ({ ...prev, [name] : value }))
  }

  const handleEdit = async () => {
    await editedSchedule(Number(editSchedule.event.id), new Date(eventData.start), new Date(eventData.end), eventData.title, eventData.textColor, eventData.backgroundColor)
    refetch()
    setScreen("find")
  }

  return (
    <div>
      <LabelHeader screen="edit"/>
      <Form onSubmit={handleEdit}>
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