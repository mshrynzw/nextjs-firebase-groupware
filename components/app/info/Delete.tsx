import React, { useContext } from "react"
import { deletedInfo } from "@/lib/api/info"
import { getLocalTime } from "@/lib/datetime"
import LabelHeader from "@/components/label/LabelHeader"
import Label from "@/components/label/Label"
import TextUpdated from "@/components/text/TextUpdated"
import ContainerCentered from "@/components/container/ContainerCentered"
import Paragraph from "@/components/paragraph/Paragraph"
import ButtonSubmit from "@/components/button/ButtonSubmit"
import { AppContext } from "@/context/AppContext"

const Delete = ({ deleteInfo, refetch }) => {
  const { setScreen } = useContext(AppContext)

  const handleDelete = async () => {
    await deletedInfo(deleteInfo.id)
    setScreen("find")
    refetch()
  }

  const updated = getLocalTime(deleteInfo.attributes.updatedAt)

  return (
    <ContainerCentered>
      <LabelHeader screen="delete"/>
      <Label name="title"/>
      <Paragraph>{deleteInfo.attributes.title}</Paragraph>
      <Label name="description"/>
      <Paragraph>{deleteInfo.attributes.description}</Paragraph>
      <Label name="updated"/>
      <TextUpdated updated={updated} username={deleteInfo.attributes.user.data.attributes.username}/>
      <ButtonSubmit onClick={handleDelete}/>
    </ContainerCentered>
  )
}

export default Delete