import React, { useContext, useState } from "react"
import { editedTimecardSetting, GET_ORDER } from "@/lib/api/setting/timecard"
import { getLocalTime } from "@/lib/datetime"
import { AppContext } from "@/context/AppContext"
import LabelHeader from "@/components/label/LabelHeader"
import Form from "@/components/form/Form"
import Label from "@/components/label/Label"
import InputTitle from "@/components/input/InputTitle"
import InputDescription from "@/components/input/InputDescription"
import InputNumber from "@/components/input/InputNumber"
import InputColor from "@/components/input/InputColor"
import ButtonSubmit from "@/components/button/ButtonSubmit"
import ContainerCentered from "@/components/container/ContainerCentered"
import { useQuery } from "@apollo/client"
import TextUpdated from "@/components/text/TextUpdated"

const Edit = ({ editTimecardSetting, refetch }) => {
  const { setScreen } = useContext(AppContext)

  const { loading, error, data } = useQuery(GET_ORDER)

  const [title, setTitle] = useState<string>(editTimecardSetting.attributes.title)
  const [description, setDescription] = useState<string>(editTimecardSetting.attributes.description)
  const [order, setOrder] = useState<number>(Number(editTimecardSetting.attributes.order))
  const [color, setColor] = useState<string>(editTimecardSetting.attributes.color)

  const handleEdit = async () => {
    await editedTimecardSetting(editTimecardSetting.id, title, description, order, color)
    refetch()
    setScreen("find")
  }

  const updated = getLocalTime(editTimecardSetting.attributes.updatedAt)

  if (loading) return <p>Loading...</p>
  if (error) {
    console.error("Error fetching messages:", error)
    return <p>Error: {error.message}</p>
  }
  let max = 1
  const min = 0
  if (data) {
    max += Math.max(...data.timecardSettings.data.map(setting => setting.attributes.order))
  }

  return (
    <ContainerCentered>
      <LabelHeader screen="edit"/>
      <Form onSubmit={handleEdit}>
        <Label name="title"/>
        <InputTitle value={title} onChange={(e) => setTitle(e.target.value)}/>
        <Label name="description"/>
        <InputDescription value={description} onChange={(e) => setDescription(e.target.value)}/>
        <div className="mb-8 flex space-x-4">
          <div className="basis-1/2">
            <Label name="order"/>
            <InputNumber value={Number(order)} max={max} min={min} onChange={(e) => setOrder(Number(e.target.value))}/>
          </div>
          <div className="basis-1/2">
            <Label name="color"/>
            <InputColor name="color" value={color} onChange={(e) => setColor(e.target.value)}/>
          </div>
        </div>
        <Label name="updated"/>
        <TextUpdated updated={updated}/>
        <ButtonSubmit/>
      </Form>
    </ContainerCentered>
  )
}

export default Edit
