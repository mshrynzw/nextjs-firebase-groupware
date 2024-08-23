import React, { useContext, useState } from "react"
import { remark } from "remark"
import html from "remark-html"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsis, faSnowflake } from "@fortawesome/free-solid-svg-icons"
import { AppContext } from "@/context/AppContext"
import { editedInfo } from "@/lib/api/info"
import { getLocalTime } from "@/lib/datetime"
import TextPreview from "@/components/text/TextPreview"
import LabelHeader from "@/components/label/LabelHeader"
import Label from "@/components/label/Label"
import TextUpdated from "@/components/text/TextUpdated"
import InputTitle from "@/components/input/InputTitle"
import Form from "@/components/form/Form"
import ContainerCentered from "@/components/container/ContainerCentered"
import InputDescription from "@/components/input/InputDescription"
import ButtonSubmit from "@/components/button/ButtonSubmit"

const Edit = ({ editInfo, handlePreview, isPreview, type, refetch }) => {
  const { setScreen } = useContext(AppContext)

  const [title, setTitle] = useState<string>(editInfo.attributes.title)
  const [description, setDescription] = useState<string>(editInfo.attributes.description)
  const [htmlContent, setHtmlContent] = useState<string>("")

  const handleMarkdownChange = async (e) => {
    setDescription(e.target.value)
    const processedContent = await remark().use(html).process(description)
    setHtmlContent(processedContent.toString())
  }
  const handleEdit = async () => {
    await editedInfo(editInfo.id, title, description)
    refetch()
    setScreen("find")
  }

  const updated = getLocalTime(editInfo.attributes.updatedAt)

  return (
    <>
      <ContainerCentered>
        <LabelHeader screen="edit"/>
        <Form onSubmit={handleEdit}>
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
            <TextUpdated updated={updated} username={editInfo.attributes.user.data.attributes.username}/>
          </div>
          <ButtonSubmit/>
        </Form>
      </ContainerCentered>
      {isPreview && (<TextPreview type={type} description={description} htmlContent={htmlContent} handlePreview={handlePreview}/>)}
    </>
  )
}

export default Edit
