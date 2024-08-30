import { TimecardContext } from "@/context/setting/TimecardContext"
import { deletedTimecardSetting } from "@/lib/app/setting/timecard"
import { formatDateTimeFromFirebase, getLocalTime } from "@/lib/datetime"
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

const Delete = ({ deleteTimecardSetting }) => {
  const { setScreen } = useContext(AppContext)
  const { setTimecards } = useContext(TimecardContext)

  const handleDelete = async () => {
    await deletedTimecardSetting(deleteTimecardSetting.id)
    setScreen("find")
    setTimecards((prevTimecards) => prevTimecards.filter(timecard => timecard.id !== deleteTimecardSetting.id))
  }

  return (
    <ContainerCentered>
      <LabelHeader screen="delete"/>
      <Label name="title"/>
      <Paragraph>{deleteTimecardSetting.title}</Paragraph>
      <Label name="description"/>
      <Paragraph>{deleteTimecardSetting.description}</Paragraph>
      <div className="mb-8 flex space-x-4">
        <div className="basis-1/2">
          <Label name="order"/>
          <Paragraph>{String(deleteTimecardSetting.order)}</Paragraph>
        </div>
        <div className="basis-1/2">
          <Label name="color"/>
          <Paragraph>{deleteTimecardSetting.color}</Paragraph>
        </div>
      </div>
      <Label name="updated"/>
      <TextUpdated updated={formatDateTimeFromFirebase(deleteTimecardSetting.updatedAt)}/>
      <ButtonSubmit onClick={handleDelete}/>.
    </ContainerCentered>
  )
}

export default Delete
