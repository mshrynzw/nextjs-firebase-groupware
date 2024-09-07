import React, { useContext, useEffect, useState } from "react"
import Cookies from "js-cookie"
import LabelHeader from "@/components/label/LabelHeader"
import Label from "@/components/label/Label"
import InputDate from "@/components/input/InputDate"
import InputTitle from "@/components/input/InputTitle"
import InputColor from "@/components/input/InputColor"
import ButtonSubmit from "@/components/button/ButtonSubmit"
import Form from "@/components/form/Form"
import { AppContext } from "@/context/AppContext"
import { ScheduleContext } from "@/context/app/ScheduleContext"
import { formatDateTime, getNow, getOneHourAgo } from "@/lib/datetime"
import { createdSchedule } from "@/lib/app/schedule"

const Create : React.FC = ({ createSchedule }) => {
  const { setScreen } = useContext(AppContext)
  const { setSchedules } = useContext(ScheduleContext)
  const uid = Cookies.get("uid")

  const [start, setStart] = useState<string>(formatDateTime(getNow()))
  const [end, setEnd] = useState<string>(formatDateTime(getOneHourAgo()))
  const [title, setTitle] = useState("")
  const [textColor, setTextColor] = useState<string>("#FFFFFF")
  const [backgroundColor, setBackgroundColor] = useState<string>("#475569")

  useEffect(() => {
    setStart(createSchedule?.startStr)
    setEnd(createSchedule?.endStr)
  }, [createSchedule])

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const newSchedule= await createdSchedule(uid, start, end, title, textColor, backgroundColor)
      setScreen("find")
      setSchedules((prevSchedules) => [...prevSchedules, newSchedule])
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <LabelHeader screen="create"/>
      <Form onSubmit={handleSubmit}>
        <Label name="start"/>
        <InputDate name="start" value={start} onChange={(e) => setStart(e.target.value)}/>

        <Label name="end"/>
        <InputDate name="end" value={end} onChange={(e) => setEnd(e.target.value)}/>

        <Label name="title"/>
        <InputTitle value={title} onChange={(e) => setTitle(e.target.value)}/>

        <Label name="textColor"/>
        <InputColor name="textColor" value={textColor} onChange={(e) => setTextColor(e.target.value)}/>

        <Label name="backgroundColor"/>
        <InputColor name="backgroundColor" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)}/>

        <ButtonSubmit/>
      </Form>
    </>
  )
}

export default Create