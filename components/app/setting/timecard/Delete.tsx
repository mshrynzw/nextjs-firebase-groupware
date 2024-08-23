import { deletedTimecardSetting } from "@/lib/api/setting/timecard"
import { getLocalTime } from "@/lib/datetime"
import LabelHeader from "@/components/label/LabelHeader"
import React, { useContext } from "react"
import ContainerCentered from "@/components/container/ContainerCentered"
import Label from "@/components/label/Label"
import Paragraph from "@/components/paragraph/Paragraph"
import ButtonSubmit from "@/components/button/ButtonSubmit"
import InputNumber from "@/components/input/InputNumber"
import InputColor from "@/components/input/InputColor"
import TextUpdated from "@/components/text/TextUpdated"
import { AppContext } from "@/context/AppContext"

const Delete = ({ deleteTimecardSetting, refetch }) => {
  const { setScreen } = useContext(AppContext)

  const handleDelete = async () => {
    await deletedTimecardSetting(deleteTimecardSetting.id)
    refetch()
    setScreen("find")
  }

  const updated = getLocalTime(deleteTimecardSetting.attributes.updatedAt)

  return (
    <ContainerCentered>
      <LabelHeader screen="delete"/>
      <Label name="title"/>
      <Paragraph>{deleteTimecardSetting.attributes.title}</Paragraph>
      <Label name="description"/>
      <Paragraph>{deleteTimecardSetting.attributes.description}</Paragraph>
      <div className="mb-8 flex space-x-4">
        <div className="basis-1/2">
          <Label name="order"/>
          <Paragraph>{String(deleteTimecardSetting.attributes.order)}</Paragraph>
        </div>
        <div className="basis-1/2">
          <Label name="color"/>
          <Paragraph>{deleteTimecardSetting.attributes.color}</Paragraph>
        </div>
      </div>
      <Label name="updated"/>
      <TextUpdated updated={updated}/>
      <ButtonSubmit onClick={handleDelete}/>.
    </ContainerCentered>
  )
}

export default Delete
