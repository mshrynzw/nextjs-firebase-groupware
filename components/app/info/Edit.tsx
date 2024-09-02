import React, { useContext, useEffect, useState } from "react"
import { doc, getDoc } from "firebase/firestore"
import { remark } from "remark"
import html from "remark-html"
import { editAction } from "@/actions/app/infoAction"
import TextPreview from "@/components/text/TextPreview"
import LabelHeader from "@/components/label/LabelHeader"
import Label from "@/components/label/Label"
import TextUpdated from "@/components/text/TextUpdated"
import InputTitle from "@/components/input/InputTitle"
import Form from "@/components/form/Form"
import ContainerCentered from "@/components/container/ContainerCentered"
import InputDescription from "@/components/input/InputDescription"
import ButtonSubmit from "@/components/button/ButtonSubmit"
import { AppContext } from "@/context/AppContext"
import { InfoContext } from "@/context/app/InfoContext"
import { formatDateTimeFromFirebase } from "@/lib/datetime"
import { db } from "@/lib/firebase"

const Edit : React.FC = ({ editInfo, handlePreview, isPreview, type }) => {
  const { setScreen } = useContext(AppContext)
  const { setInfos } = useContext(InfoContext)

  const [title, setTitle] = useState<string>(editInfo.title)
  const [description, setDescription] = useState<string>(editInfo.description)
  const [htmlContent, setHtmlContent] = useState<string>("")

  useEffect(() => {
    const fetchInfos = async () => {
      const userDoc = await getDoc(doc(db, "users", editInfo.uid))
      editInfo.displayName = userDoc.exists() ? userDoc.data().displayName : "Unknown User"
    }
    fetchInfos()
  }, [])

  const handleMarkdownChange = async (e) => {
    setDescription(e.target.value)
    const processedContent = await remark().use(html).process(description)
    setHtmlContent(processedContent.toString())
  }

  const formAction = async (e) => {
    const formData = new FormData(e.currentTarget)
    formData.append("title", title)
    formData.append("description", description)

    try {
      const updateInfo = await editAction(formData, editInfo.id)
      setScreen("find")
      setInfos((prevInfos) =>
        prevInfos.map(info =>
          info.id === updateInfo.id
            ? { ...info, ...updateInfo }
            : info
        )
      )
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <ContainerCentered>
        <LabelHeader screen="edit"/>
        <Form action={formAction}>
          <Label name="title"/>
          <InputTitle value={title} onChange={(e) => setTitle(e.target.value)}/>
          <div className="relative">
            <Label name="description"/>
            {type === "markdown" ? (
              <InputDescription value={description} onChange={handleMarkdownChange}/>
            ) : (
              <InputDescription value={description} onChange={(e) => setDescription(e.target.value)}/>
            )}
            <Label name="updated"/>
            <TextUpdated updated={formatDateTimeFromFirebase(editInfo.updatedAt)} username={editInfo.displayName}/>
          </div>
          <ButtonSubmit/>
        </Form>
      </ContainerCentered>
      {isPreview && (<TextPreview type={type} description={description} htmlContent={htmlContent} handlePreview={handlePreview}/>)}
    </>
  )
}

export default Edit
