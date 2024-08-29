import { createAction } from "@/actions/infoAction"
import { InfoContext } from "@/context/InfoContext"
import React, { useContext, useState } from "react"
import { remark } from "remark"
import html from "remark-html"
import { AppContext } from "@/context/AppContext"
import TextPreview from "@/components/text/TextPreview"
import LabelHeader from "@/components/label/LabelHeader"
import Label from "@/components/label/Label"
import InputTitle from "@/components/input/InputTitle"
import InputDescription from "@/components/input/InputDescription"
import ButtonSubmit from "@/components/button/ButtonSubmit"
import ContainerCentered from "@/components/container/ContainerCentered"
import Form from "@/components/form/Form"
import Cookies from "js-cookie"

const Create = ({ handlePreview, isPreview, type }) => {
  const { setScreen } = useContext(AppContext)
  const { setInfos } = useContext(InfoContext)

  const uid = Cookies.get("uid")

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [htmlContent, setHtmlContent] = useState<string>("")

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
      const newInfo = await createAction(formData, uid, type)
      setInfos((prevInfos) => [...prevInfos, newInfo])
      setScreen("find")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <ContainerCentered>
        <LabelHeader screen="create"/>
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
          </div>
          <ButtonSubmit/>
        </Form>
      </ContainerCentered>
      {isPreview && (<TextPreview type={type} description={description} htmlContent={htmlContent} handlePreview={handlePreview}/>)}
    </>
  )
}

export default Create