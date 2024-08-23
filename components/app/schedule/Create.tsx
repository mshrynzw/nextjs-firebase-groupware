import React, { useContext, useEffect, useState } from "react"
import { AppContext } from "@/context/AppContext"
import { formatDateTimeByStrapi, getNow, getOneHourAgo } from "@/lib/datetime"
import { createdSchedule } from "@/lib/api/schedule"
import LabelHeader from "@/components/label/LabelHeader"
import Label from "@/components/label/Label"
import InputDate from "@/components/input/InputDate"
import InputTitle from "@/components/input/InputTitle"
import InputColor from "@/components/input/InputColor"
import ButtonSubmit from "@/components/button/ButtonSubmit"
import Form from "@/components/form/Form"

const Create = ({ createSchedule, refetch}) => {
  const { setScreen, user } = useContext(AppContext)

  const [start, setStart] = useState<string>(formatDateTimeByStrapi(getNow()))
  const [end, setEnd] = useState<string>(formatDateTimeByStrapi(getOneHourAgo()))
  const [title, setTitle] = useState("")
  const [textColor, setTextColor] = useState<string>("#FFFFFF")
  const [backgroundColor, setBackgroundColor] = useState<string>("#475569")

  useEffect(() => {
    setStart(createSchedule?.startStr)
    setEnd(createSchedule?.endStr)
  }, [createSchedule])
  const handleCreat = async () => {
    try {
      if (user) {
        await createdSchedule(user, new Date(start), new Date(end), title, textColor, backgroundColor)
      }
      setStart(formatDateTimeByStrapi(getNow()))
      setEnd(formatDateTimeByStrapi(getOneHourAgo()))
      setTitle("")
      setTextColor("#FFFFFF")
      setBackgroundColor("#475569")
      refetch()
      setScreen("find")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <LabelHeader screen="create"/>
      <Form onSubmit={handleCreat}>
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