import React, { useContext, useEffect, useState } from "react"
import { editAction } from "@/actions/app/setting/timecardAction"
import LabelHeader from "@/components/label/LabelHeader"
import Form from "@/components/form/Form"
import Label from "@/components/label/Label"
import InputTitle from "@/components/input/InputTitle"
import InputDescription from "@/components/input/InputDescription"
import InputNumber from "@/components/input/InputNumber"
import InputColor from "@/components/input/InputColor"
import ButtonSubmit from "@/components/button/ButtonSubmit"
import ContainerCentered from "@/components/container/ContainerCentered"
import TextUpdated from "@/components/text/TextUpdated"
import { AppContext } from "@/context/AppContext"
import { TimecardContext } from "@/context/app/setting/TimecardContext"
import { formatDateTimeFromFirebase } from "@/lib/datetime"

const Edit : React.FC = ({ editTimecardSetting }) => {
  const { setScreen } = useContext(AppContext)
  const { setTimecards } = useContext(TimecardContext)

  // TODO
  // const [title, setTitle] = useState<string>(editTimecardSetting.title)
  const [description, setDescription] = useState<string>(editTimecardSetting.description)
  const [order, setOrder] = useState<number>(Number(editTimecardSetting.order))
  const [color, setColor] = useState<string>(editTimecardSetting.color)

  const formAction = async (e) => {
    const formData = new FormData(e.currentTarget)
    formData.append("title")
    formData.append("description", description)
    formData.append("order", order)
    formData.append("color", color)

    try {
      const updateTimecard = await editAction(formData, editTimecardSetting.id)
      setScreen("find")
      setTimecards((prevTimecards) =>
        prevTimecards.map(timecard =>
          timecard.id === updateTimecard.id
            ? { ...timecard, ...updateTimecard }
            : timecard
        )
      )
    } catch (error) {
      console.error(error)
    }
  }

  // TODO
  // if (loading) return <p>Loading...</p>
  // if (error) {
  //   console.error("Error fetching messages:", error)
  //   return <p>Error: {error.message}</p>
  // }
  // let max = 1
  // const min = 0
  // if (data) {
  //   max += Math.max(...data.timecardSettings.data.map(setting => setting.attributes.order))
  // }

  return (
    <ContainerCentered>
      <LabelHeader screen="edit"/>
      <Form action={formAction}>
        <Label name="title"/>
        <InputTitle value={title} onChange={(e) => setTitle(e.target.value)}/>
        <Label name="description"/>
        <InputDescription value={description} onChange={(e) => setDescription(e.target.value)}/>
        <div className="mb-8 flex space-x-4">
          <div className="basis-1/2">
            <Label name="order"/>
            <InputNumber value={Number(order)} onChange={(e) => setOrder(Number(e.target.value))}/>
          </div>
          <div className="basis-1/2">
            <Label name="color"/>
            <InputColor name="color" value={color} onChange={(e) => setColor(e.target.value)}/>
          </div>
        </div>
        <Label name="updated"/>
        <TextUpdated updated={formatDateTimeFromFirebase(editTimecardSetting.updatedAt)}/>
        <ButtonSubmit/>
      </Form>
    </ContainerCentered>
  )
}

export default Edit
