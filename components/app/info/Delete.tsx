import { InfoContext } from "@/context/app/InfoContext"
import React, { useContext, useEffect } from "react"
import { deletedInfo } from "@/lib/app/info"
import { formatDateTimeFromFirebase } from "@/lib/datetime"
import LabelHeader from "@/components/label/LabelHeader"
import Label from "@/components/label/Label"
import TextUpdated from "@/components/text/TextUpdated"
import ContainerCentered from "@/components/container/ContainerCentered"
import Paragraph from "@/components/paragraph/Paragraph"
import ButtonSubmit from "@/components/button/ButtonSubmit"
import { AppContext } from "@/context/AppContext"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

const Delete = ({ deleteInfo }) => {
  const { setScreen } = useContext(AppContext)
  const { setInfos } = useContext(InfoContext)

  useEffect(() => {
    const fetchInfos = async () => {
      const userDoc = await getDoc(doc(db, "users", deleteInfo.uid))
      deleteInfo.displayName = userDoc.exists() ? userDoc.data().displayName : "Unknown User"
    }
    fetchInfos()
  }, [])

  const handleDelete = async () => {
    await deletedInfo(deleteInfo.id)
    setScreen("find")
    setInfos((prevInfos) => prevInfos.filter(info => info.id !== deleteInfo.id))
  }

  return (
    <ContainerCentered>
      <LabelHeader screen="delete"/>
      <Label name="title"/>
      <Paragraph>{deleteInfo.title}</Paragraph>
      <Label name="description"/>
      <Paragraph>{deleteInfo.description}</Paragraph>
      <Label name="updated"/>
      <TextUpdated updated={formatDateTimeFromFirebase(deleteInfo.updatedAt)} username={deleteInfo.displayName}/>
      <ButtonSubmit onClick={handleDelete}/>
    </ContainerCentered>
  )
}

export default Delete