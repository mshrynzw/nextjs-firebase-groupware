import React, { useContext, useState } from "react"
import { editedTodo } from "@/lib/api/todo"
import { formatDateTimeByStrapi, getLocalTime } from "@/lib/datetime"
import LabelHeader from "@/components/label/LabelHeader"
import Form from "@/components/form/Form"
import Label from "@/components/label/Label"
import InputTitle from "@/components/input/InputTitle"
import InputDescription from "@/components/input/InputDescription"
import InputNumber from "@/components/input/InputNumber"
import InputDate from "@/components/input/InputDate"
import InputCheck from "@/components/input/InputCheck"
import ButtonSubmit from "@/components/button/ButtonSubmit"
import ContainerCentered from "@/components/container/ContainerCentered"
import { AppContext } from "@/context/AppContext"

const Edit = ({ editTodo, refetch }) => {
  const { setScreen } = useContext(AppContext)

  const [title, setTitle] = useState<string>(editTodo.attributes.title)
  const [description, setDescription] = useState<string>(editTodo.attributes.description)
  const [priority, setPriority] = useState<number>(editTodo.attributes.priority)
  const [check, setCheck] = useState<boolean>(editTodo.attributes.check)
  const [due, setDue] = useState<string>(formatDateTimeByStrapi(editTodo.attributes.due))

  const handleEdit = async () => {
    await editedTodo(editTodo.id, title, description, priority, check, due)
    refetch()
    setScreen("find")
  }

  return (
    <ContainerCentered>
      <LabelHeader screen="create"/>
      <Form onSubmit={handleEdit}>
        <Label name="title"/>
        <InputTitle value={title} onChange={(e) => setTitle(e.target.value)}/>
        <Label name="description"/>
        <InputDescription value={description} onChange={(e) => setDescription(e.target.value)}/>

        <div className="md:space-x-4 md:flex md:flex-row">
          <div className="flex basis-1/3 flex-col">
            <Label name="priority"/>
            <InputNumber value={priority} min={1} max={5} onChange={(e) => setPriority(Number(e.target.value))}/>
          </div>

          <div className="flex flex-col md:basis-1/3">
            <Label name="due"/>
            <div className="flex md:justify-center">
              <InputDate name="due" value={due} onChange={(e) => setDue(e.target.value)}/>
            </div>
          </div>

          <div className="flex flex-col md:basis-1/3">
            <Label name="check"/>
            <div className="mb-8 flex h-full md:justify-center">
              <InputCheck name="check" value={check} onChange={(e) => setCheck(e.target.checked)}/>
            </div>
          </div>
        </div>

        <ButtonSubmit/>
      </Form>
    </ContainerCentered>
  )
}

export default Edit
